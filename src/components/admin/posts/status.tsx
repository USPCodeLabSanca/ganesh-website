import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PostStatus({ published }: { published: boolean }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': !published,
          'bg-green-500 text-black': published,
        },
      )}
    >
      {!published ? (
        <>
          <p className='hidden md:block'>Draft</p>
          <ClockIcon className="md:ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {published ? (
        <>
          <p className='hidden md:block'>Published</p>
          <CheckIcon className="md:ml-1 w-4 text-black" />
        </>
      ) : null}
    </span>
  );
}
