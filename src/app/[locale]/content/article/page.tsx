import { fetchPosts, fetchPostsPages } from "@/services/data";
import { Post } from "@/models/post";
import ClientArticlesComponent from "@/components/client/articles";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({
  searchParams
}: PageProps) {
  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;

  const currentPage = Number(pageParam) || 1;
  const [totalPages, articles]: [number, Post[]] = await Promise.all([
    fetchPostsPages("artigo"),
    fetchPosts(currentPage, "artigo", true),
  ]);

  return (
    <ClientArticlesComponent
      articles={articles}
      totalPages={totalPages}
    />
  );
}