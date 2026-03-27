interface TitleProps {
  text: string;
}

export default function Title({
  text,
}: TitleProps) {
  return (
    <div className="flex w-full items-center justify-between mb-4">
        <h1 className='w-full text-center md:text-left mx-5 text-xl md:text-2xl text-neutral-100'>{text}</h1>
    </div>
  );
}