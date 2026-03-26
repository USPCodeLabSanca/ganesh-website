"use client"

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deletePost } from '@/services/post';
import Modal from '@/components/modal';
import { useState } from 'react';

export function CreatePost() {
  return (
    <Link
      href="/br/admin/dashboard/posts/create"
      className="flex h-10 w-11/12 md:w-fit justify-center items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Create Post</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePost({ id }: { id: string }) {
  return (
    <Link
      href={`/br/admin/dashboard/posts/${id}/edit`}
      className="rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onRequestClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-bold">Você tem certeza de que quer deletar o post?</h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground hover:text-white">
                Cancelar
              </button>
              <form action={deletePostWithId}>
                <button className="rounded-md border p-2 bg-red-600 text-white hover:bg-red-700 ">Deletar</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      <button onClick={() => setIsModalOpen(true)} className="cursor-pointer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
