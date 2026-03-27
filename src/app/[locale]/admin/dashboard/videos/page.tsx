import { CreateVideo } from "@/components/admin/video/buttons";
import { Video } from "@/models/video";
import { fetchVideos } from "@/services/data";
import { Metadata } from "next";
import Card from "@/components/admin/video/card";
import Title from "@/components/admin/title";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: 'Videos',
};

export default async function Page() {
  const Videos: Video[] = await fetchVideos();
  const translations = await getTranslations('Admin');
  return (
    <>
      <div className="w-full md:mb-16">
        <Title text={translations('videos')} />
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-2 md:mt-8'>
          <CreateVideo />
          {Videos.map((video) => (
            <Card
              key={video.id}
              id={video.id}
              title={video.title}
              title_en={video.title_en}
              description={video.description}
              description_en={video.description_en}
              url={video.url}
              thumbnail={video.thumbnail}
              createdAt={video.createdAt}
              updatedAt={video.updatedAt}
            />
          ))}
        </div>
      </div>
    </>
  )
}
