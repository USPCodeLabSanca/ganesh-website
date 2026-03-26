import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export interface ContentProps {
  id: string;
  image: string;
  title: string;
  summary: string | undefined;
  author: string;
  date: string;
  type: string;
}

export default function Content({ id, image, title, summary, author, date, type }: ContentProps) {
  const locale = useLocale();
  return (
    <div className="w-5/6 flex flex-col lg:flex-row gap-10 items-center">
      <Link
        href={`/content/${type}/${id}`}
        className="relative w-72 h-48 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          className="object-cover"
          src={image}
          alt={title}
          fill
          sizes="300px"
        />
      </Link>

      <div className="flex flex-col justify-center gap-3 text-neutral-50">
        <Link
          href={`/content/${type}/${id}`}
          className="cursor-pointer text-xl md:text-2xl font-mono font-bold hover:text-terminal">
          {title}
        </Link>
        {summary && (
          <div className="text-sm md:text-base font-mono">
            {summary}
          </div>
        )}
        <div className="text-xs md:text-sm font-mono text-neutral-400">
          {locale === "en" ? "By" : "Por"} {author}, {locale === "en" ? "on" : "em"} {date}
        </div>

        <Link
          href={`/content/${type}/${id}`}
          className="cursor-pointer text-sm font-mono text-light hover:text-terminal">
          {locale === "en" ? "Read more" : "Leia mais"}
          <ArrowRightCircleIcon className="w-5 h-5 inline-block ml-1" />
        </Link>
      </div>
    </div>
  )
}