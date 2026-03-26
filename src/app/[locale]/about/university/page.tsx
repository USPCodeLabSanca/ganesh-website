import Terminal from "@/components/cards/terminal";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function University() {
  const t = useTranslations("Usp");
  return (
    <>
      <main>
        <div className="flex flex-col gap-12 items-center pt-32 pb-12">
          <div className="w-15/16 lg:w-2/3 flex flex-col gap-6">
            <Terminal>
              <div className="text-2xl font-mono font-bold pb-4 lg:pb-0">
                {t("topTitle")}
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex-1">
                  <div dangerouslySetInnerHTML={{ __html: t.raw('introduction1') }} />
                </div>
                <div className="flex justify-center md:justify-end">
                  <Image
                    className="w-full h-auto invert p-10"
                    alt="USP logo"
                    src="/images/pages/aboutus_usp.png"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
              <div>
                <div dangerouslySetInnerHTML={{ __html: t.raw('introduction2') }} />
              </div>
            </Terminal>

            <Terminal>
              <div className="text-2xl font-mono font-bold pb-10">
                {t("curiosityTitle")}
              </div>

              {/* Statistics Section */}
              <div className="flex flex-col md:flex-row gap-6 pb-10 items-center">
                <div className="flex">
                  <Image
                    className="w-full md:w-72 rounded-md"
                    alt="USP campus"
                    src="/images/pages/aboutus_usp_sanca.jpg"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xl md:text-2xl font-mono font-bold pb-4">
                    {t("statsTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('stats') }} />
                </div>
              </div>

              {/* International Cooperation Section */}
              <div className="flex flex-col md:flex-row-reverse gap-6 pb-10 items-center">
                <div className="flex">
                  <Image
                    className="w-full md:w-72 rounded-md"
                    alt="International Cooperation"
                    src="/images/pages/aboutus_international.jpg"
                    width={300}
                    height={200}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xl md:text-2xl font-mono font-bold pb-4">
                    {t("intlTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('intl') }} />
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </main>
    </>
  );
}
