import ClientHomeComponent from "@/components/client/home";
import { Sponsor } from "@/models/sponsor";
import { fetchSponsors } from "@/services/data";

export default async function Page() {
  const sponsors: Sponsor[] = await fetchSponsors();
  return (
    <ClientHomeComponent
      sponsors={sponsors}
    />
  );
}
