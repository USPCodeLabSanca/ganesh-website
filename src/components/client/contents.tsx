"use client";

import { Post } from "@/models/post";
import { useTranslations } from "next-intl";
import Container from "../container";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Slider from "../slider/slider";
import { Video } from "@/models/video";

interface ContentsProps {
  activities: Post[];
  articles: Post[];
  tips: Post[];
  videos: Video[];
}

export default function Contents({ activities, articles, tips }: ContentsProps) {
  const t = useTranslations('Navbar');
  return (
    <div className="flex flex-col gap-12 items-center pt-32 pb-12">
      <Container>
        <div className="text-2xl md:text-4xl font-mono font-bold text-title md:mb-6">
          {t('content')}
        </div>

        <div className="w-full bg-black/25 py-6 md:p-10 rounded-md flex flex-col gap-6">
          <Link href="/content/activity" className="text-xl md:text-2xl font-mono font-bold text-light text-center hover:text-terminal flex flex-row items-center justify-center">
            {t('activities')}
            <ArrowRightCircleIcon className="w-5 h-5 inline-block ml-1" />
          </Link>
          <Slider posts={activities} type="activity" />
        </div>

        <div className="w-full bg-black/25 py-6 md:p-10 rounded-md flex flex-col gap-6">
          <Link href="/content/article" className="text-xl md:text-2xl font-mono font-bold text-light text-center hover:text-terminal flex flex-row items-center justify-center">
            {t('articles')}
            <ArrowRightCircleIcon className="w-5 h-5 inline-block ml-1" />
          </Link>
          <Slider posts={articles} type="article" />
        </div>

        <div className="w-full bg-black/25 py-6 md:p-10 rounded-md flex flex-col gap-6">
          <Link href="/content/tip" className="text-xl md:text-2xl font-mono font-bold text-light text-center hover:text-terminal flex flex-row items-center justify-center">
            {t('tips')}
            <ArrowRightCircleIcon className="w-5 h-5 inline-block ml-1" />
          </Link>
          <Slider posts={tips} type="tip" />
        </div>
      </Container>
    </div>
  )
}