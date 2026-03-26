import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";

interface DisplayProps {
  id: string;
  image: string;
  title: string;
  summary: string | undefined;
  author: string;
  date: string;
  type: string;
}

export default function Display({ id, image, title, summary, author, date, type }: DisplayProps) {
  const locale = useLocale();
  return (
    <div className="bg-black/25 shadow-md rounded-lg flex flex-col justify-center items-center backdrop-blur-[6px]">
      <Link
        href={`/content/${type}/${id}`}
        className="relative w-full h-52 flex-shrink-0 overflow-hidden rounded-t-lg">
        <Image
          className="object-cover"
          src={image}
          alt={title}
          fill
          sizes="300px"
        />
      </Link>
      <div className="flex flex-col w-full justify-center gap-2 text-neutral-50 p-5 text-start">
        <div className="text-xs font-mono text-neutral-400">
          {date}, {locale === "en" ? "by" : "por"} {author}
        </div>
        <div className="text-xl font-mono font-bold overflow-hidden text-ellipsis line-clamp-2 h-14">
          {title}
        </div>
        {summary && (
          <div className="text-xs font-mono overflow-hidden text-ellipsis line-clamp-3 h-12">
            {summary}
          </div>
        )}
        <Link
          href={`/content/${type}/${id}`}
          className="cursor-pointer text-sm font-mono text-light hover:text-terminal flex flex-row items-center justify-start">
          {locale === "en" ? "Read more" : "Leia mais"}
          <ArrowRightCircleIcon className="w-5 h-5 inline-block ml-1" />
        </Link>
      </div>
    </div>
  );
}
