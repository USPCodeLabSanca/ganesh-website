import Breadcrumbs from '@/components/admin/breadcrumbs';
import Form from '@/components/admin/posts/create-form';
import { fetchAuthors } from '@/services/data';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const authors = await fetchAuthors();
  const translations = await getTranslations('Admin');
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: translations('content'), href: '/admin/dashboard/posts' },
          {
            label: translations('createPost'),
            href: '/admin/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <Form authors={authors} />
    </main>
  );
}
