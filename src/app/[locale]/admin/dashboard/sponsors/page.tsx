import { CreateSponsor } from "@/components/admin/sponsors/buttons";
import { Sponsor } from "@/models/sponsor";
import { fetchSponsors } from "@/services/data";
import { Metadata } from "next";
import Card from "@/components/admin/sponsors/card";

export const metadata: Metadata = {
  title: 'Sponsors',
};

export default async function Page() {
  const sponsors: Sponsor[] = await fetchSponsors();

  return (
    <>
      <div className="w-full md:mb-16">
        <div className="flex w-full items-center justify-between">
          <h1 className={`mx-5 text-xl md:text-2xl text-neutral-100`}>Sponsors</h1>
        </div>
        <div className='mt-4 flex flex-col items-center md:flex-row md:flex-wrap gap-2 md:mt-8'>
          <CreateSponsor />
          {sponsors.map((sponsor) => (
            <Card
              key={sponsor.id}
              id={sponsor.id}
              name={sponsor.name}
              logo={sponsor.logo}
              link={sponsor.link}
              description={sponsor.description}
              createdAt={sponsor.createdAt}
              updatedAt={sponsor.updatedAt}
            />
          ))}
        </div>
      </div>
    </>
  )
}
