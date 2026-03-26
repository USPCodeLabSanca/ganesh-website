import Link from 'next/link';
import NavLinks from '../nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { handleSignOut } from '@/services/auth';

export default function SideNav() {
  return (
    <div className="flex md:h-screen flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-fit items-end justify-start rounded-md bg-adminForeground p-2 xl:h-40"
        href="/" >
        <Image
          className='w-8'
          src="/images/logo/ganesh-logo-coloured.png"
          height={60}
          width={60}
          alt="Ganesh Logo" />
      </Link>
      <div className="flex flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 h-fit md:w-fit xl:w-full">
        <NavLinks />
        <div className="hidden md:block h-auto w-full grow rounded-md bg-adminBackground"></div>
        <form
          action={handleSignOut}>
          <button className="cursor-pointer flex w-full grow items-center justify-center gap-2 rounded-md bg-adminForeground p-3 text-sm font-medium text-gray-300 hover:bg-red-900 hover:text-white md:flex-none md:justify-start md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden xl:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
