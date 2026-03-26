"use client";
import Container from "@/components/container";
import News from "@/components/cards/news";
import Pagination from "@/components/pagination";
import { useLocale, useTranslations } from "next-intl";
import { Post } from "@/models/post";

interface ClientNewsComponentProps {
  newsList: Post[];
  totalPages: number;
}

export default function ClientNewsComponent({ newsList, totalPages }: ClientNewsComponentProps) {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-12 items-center pt-32 pb-12">
      <Container>
        <div className="text-2xl md:text-4xl font-mono font-bold text-title mb-6">
          {t('news')}
        </div>
        {newsList.map((news, index) => (
          <div key={index} className="flex flex-col items-center w-full gap-10">
            <News
              id={news.id}
              title={locale === 'en' ? news.title_en : news.title}
              summary={locale === 'en' ? news.summary_en : news.summary}
              image={news.images[0]}
              author={news.authorGithub}
              date={new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', { timeZone: 'America/Sao_Paulo' }).format(news.createdAt)}
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
  );
}
