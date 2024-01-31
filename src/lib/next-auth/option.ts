import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Prisma } from '@prisma/client';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import prisma from '../prisma';

export const nextAuthOptions : NextAuthOptions = {
  debug:false,
  providers:[
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({session,user}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        }
      };
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
