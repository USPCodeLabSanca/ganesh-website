import { fetchPosts, fetchPostsPages } from "@/services/data";
import { Post } from "@/models/post";
import ClientTipsComponent from "@/components/client/tips";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({
  searchParams
}: PageProps) {
  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;

  const currentPage = Number(pageParam) || 1;
  const [totalPages, tips]: [number, Post[]] = await Promise.all([
    fetchPostsPages("dica"),
    fetchPosts(currentPage, "dica", true),
  ]);

  return (
    <ClientTipsComponent
      tips={tips}
      totalPages={totalPages}
    />
  );
}