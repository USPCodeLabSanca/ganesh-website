import Image from 'next/image';
import { fetchAuthorsByPage } from '@/services/data';
import { UserIcon } from '@heroicons/react/24/outline';
import { DeleteAuthor, UpdateAuthor } from './buttons';
import { getTranslations } from 'next-intl/server';

export default async function InvoicesTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const authors = await fetchAuthorsByPage(currentPage);
  const translations = await getTranslations('Admin');
  const hasNoAuthors = !authors || authors.length === 0;
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-adminForeground p-2 md:pt-0">
          {/* MOBILE LAYOUT */}
          <div className="md:hidden">
            {hasNoAuthors ? (
              <div className="p-10 text-center text-gray-400">
                <h1 className="text-xl font-medium">{translations('noAuthorsFound')}</h1>
              </div>
            ) : (
            authors?.map((author) => (
              <div
                key={author.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {author?.avatar ? (
                        <Image
                          src={author.avatar}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${author.name}'s profile picture`}
                        />
                      ) : (
                        <UserIcon className="w-7 h-7 mr-2 rounded-full" />
                      )}
                      <p>{author.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{author.postCount} posts</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateAuthor id={author.id} />
                    <DeleteAuthor id={author.id} />
                  </div>
                </div>
              </div>
            )))}
          </div>

          {/* DESKTOP TABLE */}
          <table className="hidden min-w-full text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {translations('author')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {translations('githubUsername')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {translations('numberOfPosts')}
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-adminBackground">
              {hasNoAuthors ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-gray-400">
                    <h1 className="text-xl font-medium">{translations('noAuthorsFound')}</h1>
                  </td>
                </tr>
              ) : (
              authors?.map((author) => (
                <tr
                  key={author.id}
                  className="border-gray-700 w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {author?.avatar ? (
                        <Image
                          src={author.avatar}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${author.name}'s profile picture`}
                        />
                      ) : (
                        <UserIcon className="w-7 h-7 mr-2 rounded-full" />
                      )}
                      <p>{author.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {author.github}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {author.postCount}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateAuthor id={author.id} />
                      <DeleteAuthor id={author.id} />
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
