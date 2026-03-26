import SideNav from "@/components/admin/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen">
      <div className="fixed w-full md:w-fit xl:w-64">
        <SideNav />
      </div>
      <div className="overflow-y-auto my-32 md:my-0 md:ml-12 xl:ml-60 flex-grow p-3 md:p-12">{children}</div>
    </div>
  );
}