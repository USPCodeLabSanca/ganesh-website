import '@/app/[locale]/global.css';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import MatrixRainingLetters from '@/components/matrix';
import { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: '%s | Ganesh',
    default: 'Ganesh',
  },
  description: 'Information Security Group',
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  if (!routing.locales.includes(locale as 'br' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
      <html lang={locale}>
        <head>
          <link rel="icon" href="/icon.ico" />
          <meta name="google-site-verification" content="BF2o1z2zFV-S2rdOG6buktm7Vd_RdXAKwsfBM-KAaqw" />
        </head>
        <body className='bg-black overflow-hidden'>
          <NextIntlClientProvider messages={messages}>
            <div className='fixed h-screen w-screen bg-gradient-to-br from-transparent to-green-900 -z-10' />
            <MatrixRainingLetters key={"hallo"} />
            <main className="h-dvh w-full overflow-y-auto flex flex-col">
              <Navbar />
              {children}
              <Footer />
            </main>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  );
}
