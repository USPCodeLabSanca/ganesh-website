/* eslint-disable  @typescript-eslint/no-explicit-any */

import { prisma } from '@/services/prisma';
import { Post, PostForm } from '@/models/post';
import { Author } from '@/models/author';
import { Sponsor } from '@/models/sponsor';
import { Video } from '@/models/video';

const ITEMS_PER_PAGE = 5;

export const fetchAuthorsPages = async (): Promise<number> => {
  try {
    const count = await prisma.author.count();

    if (!count) {
      return 1;
    }

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch total number of authors.');
  }
}

export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const data = await prisma.author.findMany({});

    const authors: Author[] = data.map((author: any) => ({
      id: author.id,
      github: author.github,
      name: author.name ?? undefined,
      avatar: author.avatar ?? undefined,
    }));

    return authors;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const fetchAuthorsByPage = async (page: number): Promise<Author[]> => {
  try {
    const data = await prisma.author.findMany({
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      include: {
        posts: true,
      }
    });

    const authors: Author[] = data.map((author: any) => ({
      id: author.id,
      github: author.github,
      name: author.name ?? undefined,
      avatar: author.avatar ?? undefined,
      postCount: author.posts.length,
    }));

    return authors;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const fetchAuthorById = async (id: string): Promise<Author | null> => {
  try {
    const data = await prisma.author.findUnique({
      where: { id }
    });

    if (!data) {
      return null;
    }

    const author: Author = {
      id: data.id,
      github: data.github,
      name: data.name ?? undefined,
      avatar: data.avatar ?? undefined,
    };

    return author;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const fetchPostsPages = async (type?: PostForm['type']): Promise<number> => {
  try {
    const count = await prisma.post.count(
      type ? { where: { type } } : undefined
    );

    if (!count) {
      return 1;
    }

    return Math.ceil(count / ITEMS_PER_PAGE);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export const fetchPosts = async (page: number, type?: PostForm['type'], published?: boolean): Promise<Post[]> => {
  try {
    const data = await prisma.post.findMany({
      where: {
        ...(type && { type }),
        ...(published && { published }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      select: {
        id: true,
        title: true,
        title_en: true,
        summary: true,
        summary_en: true,
        type: true,
        createdAt: true,
        published: true,
        author: {
          select: {
            github: true,
          }
        },
        images: true
      }
    });

    if (!data) {
      return [];
    }

    const posts: Post[] = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      title_en: post.title_en ?? undefined,
      summary: post.summary ?? undefined,
      summary_en: post.summary_en ?? undefined,
      type: post.type as PostForm['type'],
      createdAt: new Date(post.createdAt),
      published: post.published,
      authorGithub: post.author.github,
      images: post.images
    }));

    return posts;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const fetchPostById = async (id: string): Promise<PostForm | null> => {
  try {
    const data = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        title_en: true,
        summary: true,
        summary_en: true,
        content: true,
        content_en: true,
        images: true,
        createdAt: true,
        type: true,
        published: true,
        author: {
          select: {
            github: true,
            name: true,
            avatar: true,
          }
        }
      }
    });

    if (!data) {
      return null;
    }

    // Transform the images property if necessary
    const postForm: PostForm = {
      id: id,
      title: data.title,
      title_en: data.title_en ?? undefined,
      summary: data.summary ?? undefined,
      summary_en: data.summary_en ?? undefined,
      content: data.content,
      content_en: data.content_en ?? undefined,
      images: data.images,
      createdAt: new Date(data.createdAt),
      type: data.type as PostForm['type'],
      published: data.published,
      authorGithub: data.author.github,
      authorName: data.author.name ?? 'Anônimo',
      authorAvatar: data.author.avatar ?? undefined,
    };

    return postForm;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const fetchSponsors = async (): Promise<Sponsor[]> => {
  try {
    const data = await prisma.sponsor.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    const sponsors: Sponsor[] = data.map((sponsor: any) => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: sponsor.logo,
      link: sponsor.link,
      description: sponsor.description ?? undefined,
      description_en: sponsor.description_en ?? undefined,
      createdAt: new Date(sponsor.createdAt),
      updatedAt: new Date(sponsor.updatedAt),
    }));

    return sponsors;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const data = await prisma.video.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const videos: Video[] = data.map((video: any) => ({
      id: video.id,
      title: video.title,
      title_en: video.title_en,
      description: video.description,
      description_en: video.description_en,
      url: video.url,
      thumbnail: video.thumbnail,
      createdAt: new Date(video.createdAt),
      updatedAt: new Date(video.updatedAt),
    }));

    return videos;
  } catch (e) {
    console.error(e);
    return [];
  }
}