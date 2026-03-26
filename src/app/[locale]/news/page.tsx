import { fetchPosts, fetchPostsPages } from "@/services/data";
import ClientNewsComponent from "@/components/client/news";

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;
  const currentPage = Number(pageParam) || 1;

  const [totalPages, newsList] = await Promise.all([
    fetchPostsPages("notícia"),
    fetchPosts(currentPage, "notícia", true),
  ]);

  return (
    <ClientNewsComponent
      newsList={newsList}
      totalPages={totalPages}
    />
  );
}
