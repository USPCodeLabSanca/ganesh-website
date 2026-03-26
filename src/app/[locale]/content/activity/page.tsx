import { fetchPosts, fetchPostsPages } from "@/services/data";
import { Post } from "@/models/post";
import ClientActivitiesComponent from "@/components/client/activities";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({
  searchParams
}: PageProps) {
  const currSearchParams = await searchParams;
  const pageParam = currSearchParams.page;

  const currentPage = Number(pageParam) || 1;
  const [totalPages, activities]: [number, Post[]] = await Promise.all([
    fetchPostsPages("atividade"),
    fetchPosts(currentPage, "atividade", true),
  ]);

  return (
    <ClientActivitiesComponent
      activities={activities}
      totalPages={totalPages}
    />
  );
}