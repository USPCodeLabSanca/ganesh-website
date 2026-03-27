import { UpdatePost, DeletePost } from '@/components/admin/posts/buttons';
import PostStatus from '@/components/admin/posts/status';
import { fetchPosts } from '@/services/data';
import { PostType } from '@/models/post';
import { getTranslations } from 'next-intl/server';

export default async function PostsTable({
  currentPage,
  type,
}: {
  currentPage: number;
  type?: PostType;
}) {
  const posts = await fetchPosts(currentPage, type);
  const translations = await getTranslations('Admin');
  const hasNoPosts = !posts || posts.length === 0;

  return (
    <div className="mt-6">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-adminForeground p-2 md:pt-0">
          <div className="md:hidden">
            {hasNoPosts ? (
              <div className="p-10 text-center text-gray-400">
                <h1 className="text-xl font-medium">{translations('noPostsFound')}</h1>
                <p className="text-sm mt-1">{translations('tryAdjusting')}</p>
              </div>
            ) : (
              posts.map((post) => (
              <div
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="text-xl font-medium mb-2 flex items-center">
                      <p>{post.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.summary}</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='flex p-4'>{post.type}</div>
                    <PostStatus published={post.published} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="">
                      {post.authorGithub}
                    </p>
                    <p className="text-sm">{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(post.createdAt)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePost id={post.id} />
                    <DeletePost id={post.id} />
                  </div>
                </div>
              </div>
            )))}
          </div>
          <table className="hidden min-w-full text-gray-100 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="w-80 px-4 py-5 font-medium sm:pl-6">
                  {translations('title')}
                </th>
                <th scope="col" className="w-96 px-3 py-5 font-medium">
                  {translations('summary')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {translations('type')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {translations('author')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {translations('date')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">{translations('edit')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-adminBackground">
              {hasNoPosts ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400">
                     <h1 className="text-xl font-medium">{translations('noPostsFound')}</h1>
                     <p className="mt-2 text-sm">{translations('tryAdjusting')}</p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-gray-700 w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6">
                    <div className="flex items-center gap-3">
                      <p className="max-w-40 xl:max-w-72 truncate">{post.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p className="max-w-48 xl:max-w-80 truncate">{post.summary}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {post.authorGithub}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Intl.DateTimeFormat('pt-BR').format(post.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <PostStatus published={post.published} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePost id={post.id} />
                      <DeletePost id={post.id} />
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
