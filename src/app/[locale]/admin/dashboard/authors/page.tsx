import Pagination from '@/components/admin/pagination';
import Table from '@/components/admin/authors/table';
import { Suspense } from 'react';
import { fetchAuthorsPages } from '@/services/data';

import type { Metadata } from 'next';
import Title from '@/components/admin/title';
import { getTranslations } from 'next-intl/server';
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
  const translations = await getTranslations('Admin');
  return (
    <div className="w-full md:mb-16">
      <Title text={translations('authors')} />
      <div className="flex items-center justify-between gap-2">
        {/* <Search placeholder="Search invoices..." /> */}
      </div>
      <Suspense key={currentPage} fallback={<div />}>
        <Table currentPage={currentPage} />
      </Suspense>
      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}