import EncryptButton from "@/components/button/encrypt-button";
import Terminal from "@/components/cards/terminal";
import { Sponsor } from "@/models/sponsor";
import { fetchSponsors } from "@/services/data";
import Image from "next/image";

export default async function Page() {
  const sponsors: Sponsor[] = await fetchSponsors();
  return (
    <div className="py-12">
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Image
          className="md:w-72"
          alt="ganesh logo"
          src="/images/logo/ganesh-logo-coloured.png"
          width={150}
          height={150}
        />
        <div className="text-3xl md:text-6xl text-white font-mono font-bold">GANESH</div>
        <div className="text-sm md:text-xl text-white font-mono">USP Information Security Group</div>
      </div>

      <div className="flex flex-col gap-12 items-center">
        <div className="w-15/16 md:w-2/3">
          <Terminal>
            <div className="text-2xl font-mono font-bold pb-4">
              About Us
            </div>

            <span className="text-terminal">Ganesh</span> is an extracurricular group based at USP São Carlos, dedicated to advancing knowledge in <span className="text-terminal">Information Security</span> among undergraduates and the wider community. We pursue this mission by developing classroom materials, specialized courses, and workshops, and by creating educational projects for public and private schools. Organized into five key study areas — <span className="text-terminal">Cryptography</span>, <span className="text-terminal">Reverse Engineering</span>, <span className="text-terminal">Networks</span>, <span className="text-terminal">Hardware Hacking</span>, and <span className="text-terminal">Web Security</span> — our members produce valuable educational content independently and collaboratively.
            <br /><br />
            We connect with the public through various outreach initiatives, including our YouTube channel, an annual recruitment process, and participation in <span className="text-terminal">Capture the Flag (CTF)</span> competitions. Our consistent high rankings in these competitions position us among Brazil’s top teams and the country's leading university team. Each study area holds weekly meetings focused on developing mini-courses, tools, and study materials, with most of these resources publicly accessible on GitHub. Through these efforts, we continually contribute to and expand the field of information security in Brazil.
            <br /><br />
            <EncryptButton targetText="Learn More" />
          </Terminal>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Terminal>
            <div className="text-2xl font-mono font-bold pb-4 text-center">
              Our Sponsors
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col gap-2">
                  <img src={sponsor.logo} alt={sponsor.name} className="w-64 object-cover" />
                  <p className="text-gray-500">{sponsor.description}</p>
                </div>
              ))}
            </div>
          </Terminal>
        </div>

      </div>

    </div>
  );
}
