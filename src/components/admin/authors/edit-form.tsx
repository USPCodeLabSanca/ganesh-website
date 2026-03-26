'use client';

import {
  CameraIcon,
  ServerIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/components/button/button';
import { updateAuthor } from '@/services/author';
import { Author } from '@/models/author';

export default function EditInvoiceForm({
  author,
}: {
  author: Author;
}) {

  const updateAuthorWithId = updateAuthor.bind(null, author.id);

  return (
    <form action={updateAuthorWithId}>
      <div className="rounded-md text-gray-50 bg-adminForeground p-4 md:p-6">
        {/* Author Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nome que aparecerá no post
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={author.name}
                placeholder="Mude o nome caso queira"
                className="peer block w-full rounded-md border py-2 pl-10 text-sm font-mono outline-2 placeholder:text-gray-300 bg-black border-gray-500"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="mb-4">
          <label htmlFor="avatar" className="mb-2 block text-sm font-medium">
            Foto que aparecerá no post
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="avatar"
                name="avatar"
                type="text"
                defaultValue={author.avatar}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm font-mono outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                readOnly={true}
              />
              <CameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Github Username */}
        <div className="mb-4">
          <label htmlFor="github" className="mb-2 block text-sm font-medium">
            Github Username
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="github"
                name="github"
                type="text"
                defaultValue={author.github}
                className="peer block w-full rounded-md border py-2 pl-10 text-sm font-mono outline-2 placeholder:text-gray-300 bg-black border-gray-500"
                readOnly={true}
              />
              <ServerIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/dashboard/authors"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Author Info</Button>
      </div>
    </form>
  );
}
