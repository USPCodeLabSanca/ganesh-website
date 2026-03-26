import { fetchPostById } from '@/services/data';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';
import Preview from '@/components/preview/preview';
import Container from '@/components/container';
export const metadata: Metadata = {
  title: '',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post] = await Promise.all([
    fetchPostById(id),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className='flex flex-col items-center pt-32 pb-12'>
      <Container>
        <Preview
          title={post.title}
          authorName={post.authorName}
          authorAvatar={post.authorAvatar}
          date={post.createdAt}
          txtContent={post.content}
        />
      </Container>
    </main>
  );
}