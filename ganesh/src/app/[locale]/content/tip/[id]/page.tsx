import { fetchPostById } from '@/services/data';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Preview from '@/components/preview/preview';
import Container from '@/components/container';
export const metadata: Metadata = {
  title: '',
};

export default async function Page({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  setRequestLocale(locale);
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
          title={locale === 'en' ? post.title_en : post.title}
          authorName={post.authorName}
          authorAvatar={post.authorAvatar}
          date={post.createdAt}
          txtContent={locale === 'en' ? post.content_en : post.content}
        />
      </Container>
    </main>
  );
}