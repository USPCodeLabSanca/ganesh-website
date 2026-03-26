
import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from '@/services/prisma';
import { authConfig } from './auth.config';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
}
)