import { Sponsor } from "@/models/sponsor";
import { useTranslations } from "next-intl";
import Terminal from "../cards/terminal";
import EncryptButton from "../button/encrypt-button";
import Image from "next/image";

interface HomeProps {
  sponsors: Sponsor[];
}

export default function ClientHomeComponent({ sponsors }: HomeProps) {
  const t = useTranslations('Home');
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
        <div className="text-3xl md:text-6xl text-white font-bold font-mono">GANESH</div>
        <div className="text-sm md:text-xl text-white font-mono w-1/2 md:w-1/3 text-center">{t('description')}</div>
      </div>

      <div className="flex flex-col gap-12 items-center">
        <div className="w-15/16 md:w-2/3">
          <Terminal>
            <div className="text-2xl font-bold font-mono pb-4">
              {t('about')}
            </div>

            <div dangerouslySetInnerHTML={{ __html: t.raw('about1') }} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: t.raw('about2') }} />
            <br />
            <EncryptButton targetText={t('learnmore')} />
          </Terminal>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Terminal>
            <div className="text-2xl font-bold pb-4 font-mono text-center">
              {t('sponsors')}
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="flex flex-col gap-2">
                  <Image
                    className="w-64 object-cover"
                    alt={sponsor.name}
                    src={sponsor.logo}
                    width={200}
                    height={200}
                  />
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