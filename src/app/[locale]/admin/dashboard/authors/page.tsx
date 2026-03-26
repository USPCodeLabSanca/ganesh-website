import Pagination from '@/components/admin/pagination';
import Table from '@/components/admin/authors/table';
import { Suspense } from 'react';
import { fetchAuthorsPages } from '@/services/data';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Authors',
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
  const totalPages = await fetchAuthorsPages();

  return (
    <div className="w-full md:mb-16">
      <div className="flex w-full items-center justify-between">
        <h1 className={`mx-5 text-xl md:text-2xl text-neutral-100`}>Authors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
      </div>
      <Suspense key={currentPage} fallback={<div />}>
        <Table currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}