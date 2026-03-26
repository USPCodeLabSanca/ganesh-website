import Form from '@/components/admin/posts/edit-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
import { fetchAuthors, fetchPostById } from '@/services/data';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, authors] = await Promise.all([
    fetchPostById(id),
    fetchAuthors(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Content', href: '/admin/dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/admin/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} authors={authors} />
    </main>
  );
}