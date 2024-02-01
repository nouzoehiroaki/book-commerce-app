'use client';

import { SessionProvider } from 'next-auth/react';
import type { FC, PropsWithChildren } from 'react';

export const NextAuthPrivider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider >{children}</SessionProvider>;
};