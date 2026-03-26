'use server'

import { prisma } from "@/services/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addAuthor } from "./author";
import { PostSchema } from "@/lib/zod";
import { verifyAndRedirect } from "@/lib/session";
import translate from 'translate';
import { PostTxtContent } from "@/models/post";

translate.engine = 'deepl';
translate.key = process.env.DEEPL_API_KEY;

const CreatePost = PostSchema.omit({ authorId: true, title_en: true, summary_en: true, content_en: true })
const UpdatePost = PostSchema.omit({ authorId: true })

export type State = {
  errors?: {
    title?: string[];
    title_en?: string[];
    summary?: string[];
    summary_en?: string[];
    content?: string[];
    content_en?: string[];
    status?: string[];
    type?: string[];
    published?: string[];
    images?: string[];
    authorGithub?: string[];
    createdAt?: string[];
  };
  message?: string | null;
};

export const createPost = async (prevState: State, formData: FormData): Promise<State> => {
  verifyAndRedirect();

  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    summary: formData.get('summary'),
    content: formData.get('content'),
    images: formData.getAll('images'),
    type: formData.get('typeId'),
    published: formData.get('published') === 'true',
    authorGithub: formData.get('authorGithub'),
    createdAt: new Date(formData.get('date')?.toString() || Date.now()),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  try {
    const newAuthor = await addAuthor(validatedFields.data.authorGithub);

    if (newAuthor) {
      const title_en = await translate(validatedFields.data.title, { from: 'pt', to: 'en' });
      const summary_en = await translate(validatedFields.data.summary, { from: 'pt', to: 'en' });
      const content_en = await translate(validatedFields.data.content, { from: 'pt', to: 'en' });

      await prisma.post.create({
        data: {
          title: validatedFields.data.title,
          title_en: title_en,
          summary: validatedFields.data.summary,
          summary_en: summary_en,
          content: validatedFields.data.content,
          content_en: content_en,
          images: validatedFields.data.images,
          type: validatedFields.data.type,
          published: validatedFields.data.published,
          author: {
            connect: {
              github: newAuthor.github,
              name: newAuthor.name,
              avatar: newAuthor.avatar,
            },
          },
          createdAt: new Date(validatedFields.data.createdAt),
        }
      })
    }
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Could not create post',
    }
  }

  revalidatePath('/br/admin/dashboard/posts');
  redirect('/br/admin/dashboard/posts');
}

export const updatePost = async (prevState: State, formData: FormData, postTxtContent: PostTxtContent, id: string): Promise<State> => {
  verifyAndRedirect();

  const validatedFields = UpdatePost.safeParse({
    title: postTxtContent.title,
    title_en: postTxtContent.title_en,
    summary: postTxtContent.summary,
    summary_en: postTxtContent.summary_en,
    content: postTxtContent.content,
    content_en: postTxtContent.content_en,
    images: formData.getAll('images'),
    type: formData.get('typeId'),
    published: formData.get('published') === 'true',
    authorGithub: formData.get('authorGithub'),
    createdAt: new Date(formData.get('date')?.toString() || Date.now()),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Could not update post',
    };
  }

  try {
    const author = await addAuthor(validatedFields.data.authorGithub);

    if (!author) {
      return {
        message: 'Could not find author',
      }
    }

    await prisma.post.update({
      where: { id },
      data: {
        title: validatedFields.data.title,
        title_en: validatedFields.data.title_en,
        summary: validatedFields.data.summary,
        summary_en: validatedFields.data.summary_en,
        content: validatedFields.data.content,
        content_en: validatedFields.data.content_en,
        images: validatedFields.data.images,
        type: validatedFields.data.type,
        published: validatedFields.data.published,
        author: {
          connect: {
            github: author.github,
            name: author.name,
            avatar: author.avatar,
          },
        },
        createdAt: new Date(validatedFields.data.createdAt),
      }
    })
  } catch (e) {
    console.error(e);
    return {
      message: 'Database Error: Could not update post',
    }
  }

  revalidatePath('/br/admin/dashboard/posts');
  redirect('/br/admin/dashboard/posts');
}

export const deletePost = async (id: string) => {
  verifyAndRedirect();

  try {
    await prisma.post.delete({
      where: { id }
    })
    revalidatePath('/br/admin/dashboard/posts');
    console.log('Deleted post with id:', id);
  } catch (e) {
    console.error(e);
    throw new Error('Database Error: Could not delete post');
  }
}