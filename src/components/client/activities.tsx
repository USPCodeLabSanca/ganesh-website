"use client";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import { useLocale, useTranslations } from "next-intl";
import { Post } from "@/models/post";
import Content from "../cards/content";

interface ClientActivitiesComponentProps {
  activities: Post[];
  totalPages: number;
}

export default function ClientActivitiesComponent({ activities, totalPages }: ClientActivitiesComponentProps) {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-12 items-center pt-32 pb-12">
      <Container>
        <div className="text-2xl md:text-4xl font-mono font-bold text-title mb-6">
          {t('activities')}
        </div>
        {activities.map((activity, index) => (
          <div key={index} className="flex flex-col items-center w-full gap-10">
            <Content
              id={activity.id}
              title={locale === 'en' ? activity.title_en : activity.title}
              summary={locale === 'en' ? activity.summary_en : activity.summary}
              image={activity.images[0]}
              author={activity.authorGithub}
              date={new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', { timeZone: 'America/Sao_Paulo' }).format(activity.createdAt)}
              type={"activity"}
            />
            {index !== activities.length - 1 && (
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
