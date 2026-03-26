"use client";

import { usePathname, Link } from "@/i18n/navigation";
import Image from 'next/image';
import clsx from 'clsx';
import { useState } from "react";
import { MenuToggle } from "./button/menu-toggle";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const languageSubLinks = [
  { name: "pt-BR", href: "" },
  { name: "en-US", href: "" },
];

// Animation variants for the mobile menu
const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const t = useTranslations('Navbar');
  const locale = useLocale();

  const links = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('content'), href: '/content' },
    { name: t('news'), href: '/news' },
    { name: t('language'), href: '/language' },
  ];

  const aboutSubLinks = [
    { name: t('us'), href: "/about" },
    { name: t('institute'), href: "/about/institute" },
    { name: t('university'), href: "/about/university" },
  ];

  const contentSubLinks = [
    { name: t('all'), href: "/content" },
    { name: t('articles'), href: "/content/article" },
    { name: t('activities'), href: "/content/activity" },
    { name: t('tips'), href: "/content/tip" },
    // { name: "Videos", href: "/content/video" },
  ];

  return (
    <>
      {!pathname.includes("/admin") && (
        <>
          <nav className="backdrop-blur fixed w-screen h-20 bg-background bg-opacity-45 transition duration-200 ease-in-out hover:bg-opacity-75 text-white font-mono flex items-center justify-center z-10">
            <div className="w-full max-w-screen-lg flex items-center justify-between px-4">
              <div className="group relative">
                <Link
                  href="/"
                  className={clsx("nav-link", {
                    "active-nav-link": pathname === "/",
                  })}
                >
                  <Image
                    className="w-40 py-2"
                    src="/images/logo/ganesh-logo-white.svg"
                    height={33}
                    width={200}
                    alt="Ganesh Logo"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex w-3/5 lg:w-1/2 flex-row justify-between items-center gap-20">
                {/* Desktop links and flyout menus here */}

                <div className="hidden md:flex flex-row justify-around w-full gap-5">
                  <div className="group relative">
                    <Link href="/about" className={clsx("nav-link", {
                      'active-nav-link': pathname.startsWith('/about'),
                    })}>
                      {t('about')}
                    </Link>

                    {/* Flyout menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 invisible transition-all duration-250 ease-in-out group-hover:opacity-100 group-hover:visible transform">
                      <Link href="/about" className="block px-4 py-2 hover:bg-gray-200">
                        {t('us')}
                      </Link>
                      <Link href="/about/institute" className="block px-4 py-2 hover:bg-gray-200">
                        {t('institute')}
                      </Link>
                      <Link href="/about/university" className="block px-4 py-2 hover:bg-gray-200">
                        {t('university')}
                      </Link>
                    </div>
                  </div>

                  <div className="group relative">
                    <Link href="/content" className={clsx("nav-link", {
                      'active-nav-link': pathname.startsWith('/content'),
                    })}>
                      {t('content')}
                    </Link>

                    {/* Flyout menu */}
                    <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 invisible transition-all duration-250 ease-in-out group-hover:opacity-100 group-hover:visible transform">
                      <Link href="/content/article" className="block px-4 py-2 hover:bg-gray-200">
                        {t('articles')}
                      </Link>
                      <Link href="/content/activity" className="block px-4 py-2 hover:bg-gray-200">
                        {t('activities')}
                      </Link>
                      <Link href="/content/tip" className="block px-4 py-2 hover:bg-gray-200">
                        {t('tips')}
                      </Link>
                      {/* <Link href="/content/video" className="block px-4 py-2 hover:bg-gray-200">
                        {t('videos')}
                      </Link> */}
                    </div>
                  </div>

                  <div className="group relative">
                    <Link href="/news" className={clsx("nav-link", {
                      'active-nav-link': pathname.startsWith('/news'),
                    })}>
                      {t('news')}
                    </Link>
                  </div>
                </div>

                <div className="group md:relative w-1/3">
                  <Link href="/content" className="nav-link">
                    {locale === 'br' ?
                      <div className="flex gap-3 items-center">
                        <Image
                          className="w-8 py-2"
                          src="/images/icons/BR.svg"
                          height={33}
                          width={200}
                          alt="Ganesh Logo"
                        />
                        pt-BR
                      </div>
                      : <div className="flex gap-3 items-center">
                        <Image
                          className="w-8 py-2"
                          src="/images/icons/US.svg"
                          height={33}
                          width={200}
                          alt="Ganesh Logo"
                        />
                        en-US
                      </div>
                    }
                  </Link>

                  {/* Flyout menu */}
                  <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-sm shadow-lg opacity-0 invisible transition-all duration-250 ease-in-out group-hover:opacity-100 group-hover:visible transform">
                    {languageSubLinks.map((sublink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={pathname}
                        locale={sublink.name === "pt-BR" ? "br" : "en"}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <MenuToggle
                toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                isOpen={mobileMenuOpen}
              />
            </div>
          </nav>


          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobileMenu"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed top-20 left-0 w-full bg-background bg-opacity-95 text-white font-mono z-10"
              >
                <div className="flex flex-col space-y-4 p-4">
                  {links.map((link, index) => {
                    // For About Us, render a collapsible submenu.
                    if (link.href === "/about") {
                      return (
                        <motion.div
                          key={link.href}
                          initial="hidden"
                          animate="visible"
                          variants={mobileMenuVariants}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div
                            onClick={() => setAboutOpen(!aboutOpen)}
                            className="cursor-pointer nav-link flex justify-between items-center"
                          >
                            <span>{link.name}</span>
                            <span>{aboutOpen ? "-" : "+"}</span>
                          </div>
                          <AnimatePresence>
                            {aboutOpen && (
                              <motion.div
                                key="aboutSubMenu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mb-2 flex flex-col overflow-hidden"
                              >
                                {aboutSubLinks.map((sublink, subIndex) => (
                                  <motion.div
                                    key={sublink.href}
                                    initial="hidden"
                                    animate="visible"
                                    variants={mobileMenuVariants}
                                    transition={{ delay: 0.1 * subIndex }}
                                  >
                                    <Link
                                      href={sublink.href}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setAboutOpen(false);
                                      }}
                                      className={clsx("block nav-link", {
                                        "active-nav-link": pathname === sublink.href,
                                      })}
                                    >
                                      {sublink.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    // For Content, render a collapsible submenu.
                    else if (link.href === "/content") {
                      return (
                        <motion.div
                          key={link.href}
                          initial="hidden"
                          animate="visible"
                          variants={mobileMenuVariants}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div
                            onClick={() => setContentOpen(!contentOpen)}
                            className="cursor-pointer nav-link flex justify-between items-center"
                          >
                            <span>{link.name}</span>
                            <span>{contentOpen ? "-" : "+"}</span>
                          </div>
                          <AnimatePresence>
                            {contentOpen && (
                              <motion.div
                                key="contentSubMenu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 flex flex-col overflow-hidden"
                              >
                                {contentSubLinks.map((sublink, subIndex) => (
                                  <motion.div
                                    key={sublink.href}
                                    initial="hidden"
                                    animate="visible"
                                    variants={mobileMenuVariants}
                                    transition={{ delay: 0.1 * subIndex }}
                                  >
                                    <Link
                                      href={sublink.href}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setContentOpen(false);
                                      }}
                                      className={clsx("block nav-link", {
                                        "active-nav-link": pathname === sublink.href,
                                      })}
                                    >
                                      {sublink.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    // For Content, render a collapsible submenu.
                    else if (link.href === "/language") {
                      return (
                        <motion.div
                          key={link.href}
                          initial="hidden"
                          animate="visible"
                          variants={mobileMenuVariants}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div
                            onClick={() => setLanguageOpen(!languageOpen)}
                            className="cursor-pointer nav-link flex justify-between items-center"
                          >
                            <span>{link.name}</span>
                            <span>{languageOpen ? "-" : "+"}</span>
                          </div>
                          <AnimatePresence>
                            {languageOpen && (
                              <motion.div
                                key="contentSubMenu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 flex flex-col overflow-hidden"
                              >
                                {languageSubLinks.map((sublink, subIndex) => (
                                  <motion.div
                                    key={subIndex}
                                    initial="hidden"
                                    animate="visible"
                                    variants={mobileMenuVariants}
                                    transition={{ delay: 0.1 * subIndex }}
                                  >
                                    <Link
                                      href={pathname} locale={sublink.name === "pt-BR" ? "br" : "en"}
                                      className="block px-4 py-2 hover:bg-gray-200"
                                    >
                                      {sublink.name}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    // For other links, render a standard menu item.
                    else {
                      return (
                        <motion.div
                          key={link.href}
                          initial="hidden"
                          animate="visible"
                          variants={mobileMenuVariants}
                          transition={{ delay: 0.1 * index }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={clsx("block nav-link", {
                              "active-nav-link": pathname === link.href,
                            })}
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      );
                    }
                  })}
                  {/* Additional options (e.g. language toggle) can be added here */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
