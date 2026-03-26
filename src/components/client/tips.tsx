"use client";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import { useLocale, useTranslations } from "next-intl";
import { Post } from "@/models/post";
import Content from "../cards/content";

interface ClientTipsComponentProps {
  tips: Post[];
  totalPages: number;
}

export default function ClientTipsComponent({ tips, totalPages }: ClientTipsComponentProps) {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-12 items-center pt-32 pb-12">
      <Container>
        <div className="text-2xl md:text-4xl font-mono font-bold text-title mb-6">
          {t('tips')}
        </div>
        {tips.map((tip, index) => (
          <div key={index} className="flex flex-col items-center w-full gap-10">
            <Content
              id={tip.id}
              title={locale === 'en' ? tip.title_en : tip.title}
              summary={locale === 'en' ? tip.summary_en : tip.summary}
              image={tip.images[0]}
              author={tip.authorGithub}
              date={new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', { timeZone: 'America/Sao_Paulo' }).format(tip.createdAt)}
              type={"tip"}
            />
            {index !== tips.length - 1 && (
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
