import Form from '@/components/authors/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { fetchAuthorById } from '@/services/data';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
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
          { label: 'Authors', href: '/dashboard/authors' },
          {
            label: 'Edit Author Info',
            href: `/dashboard/authors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form author={author} />
    </main>
  );
}