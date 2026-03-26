"use client";

import Terminal from "@/components/cards/terminal";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <main>
      <div className="flex flex-col gap-6 items-center pt-32 pb-12">
        {/* Our Values Section */}
        <div className="w-15/16 md:w-2/3">
          <Terminal>
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-shrink-0">
                <Image
                  className="w-full h-auto object-cover rounded-lg"
                  alt="ganesh image"
                  src="/images/pages/aboutus_ganesh.jpg"
                  width={300}
                  height={200}
                />
              </div>
              <div>
                <div className="text-2xl font-mono font-bold pb-4">
                  {t("goals_title")}
                </div>
                <div dangerouslySetInnerHTML={{ __html: t.raw('goals') }} />
              </div>
            </div>
          </Terminal>
        </div>

        {/* Group Organization and Capture the Flags Section */}
        <div className="w-15/16 md:w-2/3 flex flex-col md:flex-row gap-6">
          <Terminal>
            <div className="text-2xl font-mono font-bold pb-4">
              {t("organization_title")}
            </div>
            <div dangerouslySetInnerHTML={{ __html: t.raw('organization') }} />
          </Terminal>

          <Terminal>
            <div className="text-2xl font-mono font-bold pb-4 flex items-center gap-5">
              {t("ctf_title")}
              <a href="https://ctf-br.org/" target="_blank">
                <Image
                  className="w-8"
                  src="/images/pages/aboutus_ctfbr_256x256.gif"
                  alt="CTF.br Website Logo"
                  width={32}
                  height={32}
                  unoptimized
                />
              </a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: t.raw('ctf') }} />
          </Terminal>
        </div>

        {/* I want to join Ganesh Section */}
        <div className="w-15/16 md:w-2/3">
          <Terminal>
            <div className="text-2xl font-mono font-bold pb-4">
              {t("ping_title")}
            </div>
            <div dangerouslySetInnerHTML={{ __html: t.raw('ping') }} />
          </Terminal>
        </div>
      </div>
    </main>
  );
}
