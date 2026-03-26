import Image from 'next/image';
import LoginForm from '@/components/admin/login/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center md:items-end justify-center rounded-lg bg-adminForeground p-3 md:h-36">
          <div className="w-32 text-white md:w-40 flex justify-center">
            <Image
              className='md:w-16'
              src="/images/logo/ganesh-logo-coloured.png"
              height={50}
              width={50}
              alt="Ganesh Logo" />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}