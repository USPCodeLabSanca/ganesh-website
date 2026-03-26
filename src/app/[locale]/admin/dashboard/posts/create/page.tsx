import Breadcrumbs from '@/components/admin/breadcrumbs';
import Form from '@/components/admin/posts/create-form';
import { fetchAuthors } from '@/services/data';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const authors = await fetchAuthors();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Content', href: '/admin/dashboard/posts' },
          {
            label: 'Create Post',
            href: '/admin/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <Form authors={authors} />
    </main>
  );
}