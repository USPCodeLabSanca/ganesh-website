"use client";

import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  HandThumbUpIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { usePathname, Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'content', href: '/admin/dashboard/posts', icon: DocumentDuplicateIcon },
  { name: 'videos', href: '/admin/dashboard/videos', icon: PlayIcon },
  { name: 'sponsors', href: '/admin/dashboard/sponsors', icon: HandThumbUpIcon },
  { name: 'authors', href: '/admin/dashboard/authors', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const translations = useTranslations('Admin');
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-adminBackground text-gray-400 p-3 text-sm font-medium hover:bg-adminForeground hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-adminForeground text-primary': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden xl:block">{translations(link.name)}</p>
          </Link>
        );
      })}
    </>
  );
}
