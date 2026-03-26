export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black/25 shadow-md w-15/16 lg:w-3/4 p-6 md:p-10 rounded-md flex flex-col gap-5 justify-center items-center backdrop-blur-[6px]">
      {children}
    </div>
  )
}