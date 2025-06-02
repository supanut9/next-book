import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_PROVIDER_ACCOUNT_ID_QUERY } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user: { name, email, image }, profile, account }) {
      const id = account?.providerAccountId;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_PROVIDER_ACCOUNT_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.withConfig({ useCdn: false }).create({
          _type: 'author',
          id,
          name,
          username: profile?.login || '',
          email,
          image,
          bio: profile?.bio || '',
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_PROVIDER_ACCOUNT_ID_QUERY, {
          id: account.providerAccountId,
        });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });

      return session;
    },
  },
});
