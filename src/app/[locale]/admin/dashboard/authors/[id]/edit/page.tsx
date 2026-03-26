import Form from '@/components/admin/authors/edit-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
import { fetchAuthorById } from '@/services/data';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [author] = await Promise.all([
    fetchAuthorById(id),
  ]);

  if (!author) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Authors', href: '/admin/dashboard/authors' },
          {
            label: 'Edit Author Info',
            href: `/admin/dashboard/authors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form author={author} />
    </main>
  );
}