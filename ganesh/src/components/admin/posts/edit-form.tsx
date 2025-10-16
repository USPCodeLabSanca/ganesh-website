'use client'

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  Bars4Icon,
  BookOpenIcon,
  CameraIcon,
  BookmarkIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/button/button';
import Modal from '@/components/modal';
import { useActionState } from '@/lib/utils';
import { PostForm, PostTxtContent, postTypes } from '@/models/post';
import { State, updatePost } from '@/services/post';
import { Author } from '@/models/author';
import { useState } from 'react';
import Preview from '@/components/preview/preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import TxtInput from './txt-input';
import ErrorMessages from './error-messages';

export default function Form({ post, authors }: { post: PostForm; authors: Author[] }) {

  const initialState: State = { message: null, errors: {} };
  const updatePostWithId = (state: State, formData: FormData) => updatePost(state, formData, postTxtContent, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  // to open the markdown modal with the content
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(false);
  const [postTxtContent, setPostContent] = useState<PostTxtContent>({
    title: post.title,
    summary: post.summary,
    content: post.content,
    title_en: post.title_en,
    summary_en: post.summary_en,
    content_en: post.content_en,
  })
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostContent((prevState) => ({ ...prevState, [name]: value }));
  };

  // to filter the github usernames
  const [githubState, setGithubState] = useState({
    authorGithub: post.authorGithub,
    errors: { authorGithub: [] },
  });
  const [filteredAuthors, setFilteredAuthors] = useState(authors);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGithubState((prevState) => ({ ...prevState, authorGithub: value }));

    // Filter the authors based on the input
    setFilteredAuthors(
      authors.filter((author) =>
        author.github.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const handleSelect = (github: string) => {
    setGithubState((prevState) => ({ ...prevState, authorGithub: github }));
    setFilteredAuthors([]); // Hide dropdown after selection
  };

  // to add more images
  const [imageState, setImageState] = useState({
    images: post.images, // Initialize with one empty URL field
    errors: { images: [] },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newImages = [...imageState.images];
    newImages[index] = value;
    setImageState((prevState) => ({ ...prevState, images: newImages }));
  };
  const addImageField = () => {
    if (imageState.images[imageState.images.length - 1] === "") return;
    setImageState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""], // Add an empty string for a new URL input
    }));
  };

  return (
    <>
      {isMarkdownOpen && (
        <Modal onRequestClose={() => setIsMarkdownOpen(false)}>
          <Preview
            title={post.title}
            authorName={post.authorName}
            authorAvatar={post.authorAvatar}
            date={post.createdAt}
            txtContent={postTxtContent.content} />
        </Modal>
      )}

      <form className='md:mb-16 relative' action={formAction}>
        {/* Preview Button */}
        <button
          type="button"
          onClick={() => {
            setIsMarkdownOpen(true);
          }}
          className="cursor-pointer absolute right-3 top-2 px-3 py-1 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Preview Markdown
        </button>

        <div className="rounded-md bg-adminForeground text-gray-50 p-4 md:p-6">

          <Tabs defaultValue="pt-BR">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
              {/* <Search placeholder="Search invoices..." /> */}
              <TabsList>
                <TabsTrigger value="pt-BR">
                  PT-BR
                </TabsTrigger>
                <TabsTrigger value="en-US">
                  EN-US
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pt-BR">
              {/* Portuguese */}

              {/* Post Title */}
              <TxtInput
                label="Título do Post"
                name="title"
                rows={1}
                placeholder="Título"
                value={postTxtContent.title}
                onChange={handleContentChange}
                Icon={BookmarkIcon}
              />
              <ErrorMessages id="title-error" errors={state?.errors?.title} />

              {/* Post Summary */}
              <TxtInput
                label="Escreva um sumário"
                name="summary"
                rows={3}
                placeholder="Sumário"
                value={postTxtContent.summary}
                onChange={handleContentChange}
                Icon={Bars4Icon}
              />
              <ErrorMessages id="summary-error" errors={state?.errors?.summary} />

              {/* Post Content */}
              <TxtInput
                label="Conteúdo do Post (Markdown)"
                name="content"
                rows={20}
                placeholder="Conteúdo"
                value={postTxtContent.content}
                onChange={handleContentChange}
                Icon={BookOpenIcon}
              />
              <ErrorMessages id="content-error" errors={state?.errors?.content} />
            </TabsContent>
            <TabsContent value="en-US">
              {/* English */}

              {/* Post Title */}
              <TxtInput
                label="Título do Post em Inglês"
                name="title_en"
                rows={1}
                placeholder="Título em Inglês"
                value={postTxtContent.title_en}
                onChange={handleContentChange}
                Icon={BookmarkIcon}
              />
              <ErrorMessages id="title_en-error" errors={state?.errors?.title_en} />

              {/* Post Summary */}
              <TxtInput
                label="Escreva um sumário em Inglês"
                name="summary_en"
                rows={3}
                placeholder="Sumário em Inglês"
                value={postTxtContent.summary_en}
                onChange={handleContentChange}
                Icon={Bars4Icon}
              />
              <ErrorMessages id="summary_en-error" errors={state?.errors?.summary_en} />

              {/* Post Content */}
              <TxtInput
                label="Conteúdo do Post (Markdown) em Inglês"
                name="content_en"
                rows={20}
                placeholder="Conteúdo em Inglês"
                value={postTxtContent.content_en}
                onChange={handleContentChange}
                Icon={BookOpenIcon}
              />
              <ErrorMessages id="content_en-error" errors={state?.errors?.content_en} />
            </TabsContent>
          </Tabs>

          {/* Insert post images */}
          <div className="mb-4">
            <label htmlFor="images" className="mb-2 block text-sm font-medium">
              Insira imagens de thumbnail do post (URLs)
              <p className='text-xs text-primary'>Adicione as imagens no repositório do Github e coloque a URL delas aqui</p>
            </label>

            <div className="relative mt-2 rounded-md">
              {imageState.images.map((image: string, index: number) => (
                <div className="relative mb-2" key={index}>
                  <input
                    id={`images-${index}`}
                    name="images"
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(e, index)}
                    placeholder="Copie a URL aqui"
                    className="peer block w-full rounded-md border  py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                  />
                  <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-300" />
                </div>
              ))}

              {/* Add more URLs button */}
              <button
                type="button"
                onClick={addImageField}
                className="mx-4 mt-2 block text-sm text-blue-500"
              >
                + Adicionar mais URLs
              </button>
            </div>
            <ErrorMessages id="images-error" errors={state?.errors?.images} />
          </div>

          {/* Choose the type */}
          <div className="mb-4">
            <label htmlFor="type" className="mb-2 block text-sm font-medium">
              Selecione o tipo de post
            </label>
            <div className="relative">
              <select
                id="type"
                name="typeId"
                className="h-10 peer block w-full cursor-pointer rounded-md border  py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                defaultValue={post.type}
                aria-describedby="type-error"
              >
                <option value="" disabled>
                  Select a type
                </option>
                {postTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <DocumentCheckIcon className="hidden md:block pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 placeholder:text-gray-300 bg-black border-gray-500" />
            </div>
            <ErrorMessages id="type-error" errors={state?.errors?.type} />
          </div>

          {/* Post Status */}
          <fieldset className='mb-4'>
            <legend className="mb-2 block text-sm font-medium">
              Selecione o status do post
            </legend>
            <div className="rounded-md border border-none bg-adminForeground px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="false"
                    name="published"
                    type="radio"
                    value="false"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    aria-describedby="status-error"
                    {...(post.published ? {} : { defaultChecked: true })}
                  />
                  <label
                    htmlFor="false"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-600 px-3 py-1.5 text-xs font-medium text-gray-100"
                  >
                    Não Publicado <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="true"
                    name="published"
                    type="radio"
                    value="true"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    aria-describedby="status-error"
                    {...(post.published ? { defaultChecked: true } : {})}
                  />
                  <label
                    htmlFor="true"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Publicado <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <ErrorMessages id="status-error" errors={state?.errors?.published} />
          </fieldset>

          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
              Data de publicação [DD/MM/AAAA, HH:MM]
            </label>
            <div className='relative'>
              <input
                id="date"
                name="date"
                type="datetime-local"
                className="h-10 peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                defaultValue={post.createdAt.toISOString().slice(0, 16)}
              />
              <ClockIcon className="hidden md:block pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-300" />
            </div>
          </div>

          {/* Author Github */}
          <div className="mb-4">
            <label htmlFor="authorGithub" className="mb-2 block text-sm font-medium">
              Selecione ou escreva o seu username do Github
            </label>
            <div className="relative">
              <input
                id="authorGithub"
                name="authorGithub"
                type="text"
                className="peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                value={githubState.authorGithub} // Assuming `state.authorGithub` holds the input value
                onChange={(e) => handleInputChange(e)} // Handle input change
                aria-describedby="authorGithub-error"
                placeholder="Escreva ou selecione o username"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />

              {filteredAuthors.length > 0 && (
                <ul className="list-none absolute z-10 mt-1 w-full bg-black border border-gray-500 rounded-md shadow-lg">
                  {filteredAuthors.map((author) => (
                    <li
                      key={author.id}
                      className="list-none cursor-pointer px-4 py-2 text-sm hover:bg-adminForeground"
                      onClick={() => handleSelect(author.github)}
                    >
                      {author.github}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ErrorMessages id="authorGithub-error" errors={githubState.errors.authorGithub} />
          </div>


          <div aria-live="polite" aria-atomic="true">
            {state?.message &&
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            }
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/admin/dashboard/posts"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Confirm Edit</Button>
        </div>
      </form>
    </>
  );
}