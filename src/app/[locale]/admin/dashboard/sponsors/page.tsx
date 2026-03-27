import { CreateSponsor } from "@/components/admin/sponsors/buttons";
import { Sponsor } from "@/models/sponsor";
import { fetchSponsors } from "@/services/data";
import { Metadata } from "next";
import Card from "@/components/admin/sponsors/card";
import Title from "@/components/admin/title";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: 'Sponsors',
};

export default async function Page() {
  const sponsors: Sponsor[] = await fetchSponsors();
  const translations = await getTranslations('Admin');
  return (
    <>
      <div className="w-full md:mb-16">
        <Title text={translations('sponsors')} />
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-2 md:mt-8'>
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
