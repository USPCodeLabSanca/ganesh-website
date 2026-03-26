import Pagination from '@/components/admin/pagination';
import Table from '@/components/admin/posts/table';
import { CreatePost } from '@/components/admin/posts/buttons';
import { Suspense } from 'react';
import { fetchPostsPages } from '@/services/data';

import type { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/admin/posts/tabs';
import { PostType, postTypes } from '@/models/post';
export const metadata: Metadata = {
  title: 'Content',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({
  searchParams,
}: PageProps) {

  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;

  const currentPage = Number(pageParam) || 1;
  const totalPages = await Promise.all(
    postTypes.map((type) => fetchPostsPages(type))
  )
  const absoluteTotalPages = await fetchPostsPages();

  return (
    <div className="w-full md:mb-16 overflow-y-hidden">
      <div className="flex w-full items-center justify-between">
        <h1 className={`mx-5 text-xl md:text-2xl text-neutral-100`}>Content</h1>
      </div>
      <Tabs defaultValue="Todos">
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-2 md:mt-8">
          {/* <Search placeholder="Search invoices..." /> */}
          <TabsList>
            <TabsTrigger value="Todos">
              Todos
            </TabsTrigger>
            {postTypes.map((type) => (
              <TabsTrigger key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <CreatePost />
        </div>
        <TabsContent value="Todos">
          <Suspense key={currentPage} fallback={<div />}>
            <Table currentPage={currentPage} />
          </Suspense>
          <div className="my-5 flex w-full justify-center">
            <Pagination totalPages={absoluteTotalPages} />
          </div>
        </TabsContent>
        {postTypes.map((type, index) => {
          return (
            <TabsContent key={type} value={type}>
              <Suspense key={currentPage} fallback={<div />}>
                <Table currentPage={currentPage} type={type as PostType} />
              </Suspense>
              <div className="my-5 flex w-full justify-center">
                <Pagination totalPages={totalPages[index]} />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}