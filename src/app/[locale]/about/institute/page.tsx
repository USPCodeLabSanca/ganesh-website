import Terminal from "@/components/cards/terminal";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Institute() {
  const t = useTranslations("Icmc");
  return (
    <>
      <main>
        <div className="flex flex-col items-center pt-32 pb-12">
          <div className="w-15/16 lg:w-2/3 flex flex-col gap-6">
            <Terminal>
              <div className="text-2xl font-mono font-bold pb-4">
                {t("topTitle")}
              </div>
              <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <div dangerouslySetInnerHTML={{ __html: t.raw('introduction1') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('introduction2') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('introduction3') }} />
                </div>
                <div className="flex">
                  <Image
                    className="w-full md:w-96 h-auto object-cover"
                    alt="ICMC Image"
                    src="/images/pages/aboutus_icmc_original.png"
                    width={300}
                    height={100}
                  />
                </div>
              </div>
            </Terminal>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="flex flex-col gap-6 justify-center">
                <Terminal>
                  <Image
                    className="w-full md:w-102 h-auto object-cover"
                    alt="ICMC Campus"
                    src="/images/pages/aboutus_jardim.png"
                    width={200}
                    height={150}
                  />
                </Terminal>

                <Terminal>
                  <div className="text-2xl font-mono font-bold pb-4">
                    {t("videoTitle")}
                  </div>
                  <iframe
                    className="w-full"
                    height={300}
                    src="https://www.youtube.com/embed/_7aU2zcof34"
                    allowFullScreen
                  />
                </Terminal>
              </div>

              <div className="w-full md:w-1/2">
                <Terminal>
                  <div className="text-2xl font-mono font-bold pb-4">
                    {t("historyTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('history1') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('history2') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('history3') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('history4') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('history5') }} />
                </Terminal>
              </div>
            </div>

            <Terminal>
              <div className="text-2xl font-mono font-bold pb-10">
                {t("areasOfActivity")}
              </div>

              {/* Teaching Section */}
              <div className="flex flex-col md:flex-row gap-6 pb-10 items-center">
                <Image
                  className="w-full md:w-64 rounded-md"
                  alt="Teaching"
                  src="/images/pages/aboutus_ensino.jpg"
                  width={200}
                  height={200}
                />
                <div>
                  <div className="text-2xl font-mono font-bold pb-4">
                    {t("teachingTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('teaching1') }} />
                </div>
              </div>

              {/* Research Section */}
              <div className="flex flex-col md:flex-row-reverse gap-6 pb-10 items-center">
                <Image
                  className="w-full md:w-64 rounded-md h-auto"
                  alt="Research"
                  src="/images/pages/aboutus_pesquisa.jpg"
                  width={300}
                  height={200}
                />
                <div>
                  <div className="text-2xl font-mono font-bold pb-4">
                    {t("researchTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('research1') }} />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: t.raw('research2') }} />
                </div>
              </div>

              {/* Culture Section */}
              <div className="flex flex-col md:flex-row gap-6 pb-10 items-center">
                <Image
                  className="w-full md:w-64 rounded-md"
                  alt="Culture"
                  src="/images/pages/aboutus_cultura.jpg"
                  width={300}
                  height={200}
                />
                <div>
                  <div className="text-2xl font-mono font-bold pb-4">
                    {t("cultureTitle")}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: t.raw('culture1') }} />
                </div>
              </div>
            </Terminal>
          </div>
        </div>
      </main>
    </>
  );
}
