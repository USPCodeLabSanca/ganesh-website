import { fetchPosts, fetchVideos } from "@/services/data";
import { Post } from "@/models/post";
import { Video } from "@/models/video";
import Contents from "@/components/client/contents";

interface ContentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ContentPage({
}: ContentPageProps) {

  const [activities, articles, tips, videos]: [Post[], Post[], Post[], Video[]] = await Promise.all([
    fetchPosts(1, "atividade", true),
    fetchPosts(1, "artigo", true),
    fetchPosts(1, "dica"),
    fetchVideos(),
  ]);

  return (
    <Contents
      activities={activities}
      articles={articles}
      tips={tips}
      videos={videos}
    />
  );
}