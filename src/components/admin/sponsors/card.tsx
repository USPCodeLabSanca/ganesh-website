import { Sponsor } from "@/models/sponsor";
import { DeleteSponsor, UpdateSponsor } from "./buttons";
import Image from "next/image";

export default function Card({ id, name, logo, link, description, description_en }: Sponsor) {
  return (
    <>
      <div className="relative flex items-center justify-center text-white text-3xl rounded-md text-mono w-48 h-48 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white">
        <Image
          className="w-2/3 h-full object-cover"
          src={logo}
          alt={name}
          width={100}
          height={100}
        />
        <UpdateSponsor
          id={id}
          name={name}
          logo={logo}
          link={link}
          description={description}
          description_en={description_en}
        />
        <DeleteSponsor id={id} />
      </div>
    </>
  )
}