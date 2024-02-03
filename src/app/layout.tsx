import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Suspense } from 'react';

import Header from '@/components/layouts/Header/Header';
import { NextAuthPrivider } from '@/lib/next-auth/provider';

import LoadingSpinner from './loading';

const notoSansJP = Noto_Sans_JP({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'kge book commerce',
  description: 'kgeが書いた有料記事です',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>
        <NextAuthPrivider >
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </NextAuthPrivider>
      </body>
    </html>
  );
}
