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
import { Button } from '@/components/button';
import { useActionState } from '@/lib/utils';
import { PostForm, postTypes } from '@/models/post';
import { State, updatePost } from '@/services/post';
import { Author } from '@/models/author';
import { useState } from 'react';

export default function Form({ post, authors }: { post: PostForm; authors: Author[] }) {

  const initialState: State = { message: null, errors: {} };
  const updatePostWithId = (state: State, formData: FormData) => updatePost(state, formData, post.id);
  const [state, formAction] = useActionState(updatePostWithId, initialState);

  // to filter the github usernames
  const [githubState, setGithubState] = useState({
    authorGithub: post.authorGithub,
    errors: { authorGithub: [] },
  });
  const [filteredAuthors, setFilteredAuthors] = useState(authors);
  const handleInputChange = (e: any) => {
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
    <form className='mb-16' action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Post Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Dê um título para o post
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Título"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                defaultValue={post.title}
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Post Summary */}
        <div className="mb-4">
          <label htmlFor="summary" className="mb-2 block text-sm font-medium">
            Escreva um sumário
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="summary"
                name="summary"
                type="text"
                placeholder="Sumário"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={post.summary}
              />
              <Bars4Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Escreva o conteúdo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="content"
                name="content"
                placeholder="Conteúdo"
                rows={20}  // Adjust the number of rows to make it larger
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="content-error"
                defaultValue={post.content}
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-5 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="content-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.content &&
                state.errors.content.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Insert post images */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Insira imagens para o post (URLs)
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
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        </div>

        {/* Choose the type */}
        <div className="mb-4">
          <label htmlFor="type" className="mb-2 block text-sm font-medium">
            Choose type
          </label>
          <div className="relative">
            <select
              id="type"
              name="typeId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
            <DocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.type &&
              state.errors.type.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Post Status */}
        <fieldset className='mb-4'>
          <legend className="mb-2 block text-sm font-medium">
            Selecione o status do post
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
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
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
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
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

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
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={githubState.authorGithub} // Assuming `state.authorGithub` holds the input value
              onChange={(e) => handleInputChange(e)} // Handle input change
              aria-describedby="authorGithub-error"
              placeholder="Escreva ou selecione o username"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
    
            {filteredAuthors.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                {filteredAuthors.map((author) => (
                  <li
                    key={author.id}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleSelect(author.github)}
                  >
                    {author.github}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div id="authorGithub-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.authorGithub &&
              state.errors.authorGithub.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
          href="/dashboard/posts"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Post</Button>
      </div>
    </form>
  );
}
