import { Video } from "@/models/video";
import { DeleteVideo, UpdateVideo } from "./buttons";
import Image from "next/image";

export default function Card({ id, title, title_en, description, description_en, url, thumbnail }: Video) {
  return (
    <>
      <div className="relative flex items-center justify-center text-white text-3xl rounded-md text-mono w-48 h-96 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white">
        <Image src={thumbnail} alt={title} layout="fill" objectFit="cover" />
        <UpdateVideo
          id={id}
          title={title}
          title_en={title_en}
          description={description}
          description_en={description_en}
          url={url}
          thumbnail={thumbnail}
        />
        <DeleteVideo id={id} />
      </div>
    </>
  )
}