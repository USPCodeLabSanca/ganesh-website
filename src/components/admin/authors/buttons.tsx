import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteAuthor } from '@/services/author';

export function UpdateAuthor({ id }: { id: string }) {
  return (
    <Link
      href={`/br/admin/dashboard/authors/${id}/edit`}
      className="peer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAuthor({ id }: { id: string }) {
  const deleteAuthorWithId = deleteAuthor.bind(null, id);
  return (
    <>
      <form action={deleteAuthorWithId}>
        <button className="cursor-pointer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
