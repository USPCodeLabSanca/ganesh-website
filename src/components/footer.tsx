"use client";

import Image from "next/image";
import { usePathname } from "@/i18n/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes('/admin') && (<>
        <footer className="w-full mt-auto bg-black text-white font-mono bg-opacity-50 min-h-24 flex items-center justify-around">
          <div className="flex gap-4">
            <a target="_blank" href="https://twitter.com/GaneshICMC" rel="noopener noreferrer">
              <Image
                className="w-6 h-6 invert"
                src="/images/icons/twitter-logo.svg"
                alt="Twitter Logo"
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://www.instagram.com/ganeshicmc/" rel="noopener noreferrer">
              <Image
                className="w-6 h-6 invert"
                src="/images/icons/instagram-sign.svg"
                alt="Instagram Logo"
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://www.facebook.com/ganeshICMC/" rel="noopener noreferrer">
              <Image
                className="w-6 h-6 invert"
                src="/images/icons/facebook-sign.svg"
                alt="Facebook Logo"
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://github.com/ganesh-icmc" rel="noopener noreferrer">

              <Image
                className="w-6 h-6 invert"
                src="/images/icons/github-logo.svg"
                alt="Github Logo"
                width={24}
                height={24}
              />
            </a>
            <a target="_blank" href="https://www.youtube.com/c/ganeshicmc" rel="noopener noreferrer">
              <Image
                className="w-6 h-6 invert"
                src="/images/icons/youtube-logo.svg"
                alt="Youtube Logo"
                width={24}
                height={24}
              />
            </a>
          </div>

          <div className="text-xs md:text-base" >© 2025 Ganesh</div>
        </footer>
      </>)}
    </>
  )
}