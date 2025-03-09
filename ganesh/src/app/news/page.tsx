import Terminal from "@/components/cards/terminal";
import Container from "@/components/container";
import News from "@/components/cards/news";
import { fetchPosts, fetchPostsPages } from "@/services/data";
import { Post, postTypes } from "@/models/post";
import { Suspense } from "react";
import Pagination from "@/components/pagination";

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({
  searchParams
}: NewsPageProps) {
  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;

  const currentPage = Number(pageParam) || 1;
  const [totalPages, newsList]: [number, Post[]] = await Promise.all([
    fetchPostsPages("notícia"),
    fetchPosts(currentPage, "notícia", true),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-12 items-center pt-32 pb-12">
        <Container>
          <div className="text-2xl md:text-4xl font-mono font-bold text-title mb-6">
            News
          </div>
          {newsList.map((news, index) => (
            <div key={index} className="flex flex-col items-center w-full gap-10">
              <News
                id={news.id}
                title={news.title}
                summary={news.summary}
                image={news.images[0]}
                author={news.authorGithub}
                date={new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(news.createdAt)}
              />
              {index !== newsList.length - 1 && (
                <div className="w-full md:w-5/6 h-[1px] bg-neutral-500 mb-5" />
              )}
            </div>
          ))}
          <div className="my-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </Container>
      </div>
    </div>
  );
}