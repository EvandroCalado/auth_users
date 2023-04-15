import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { endpoints } from '../../../config/endpoints';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoints.login}`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const login = await res.json();

        const { jwt, user } = login;
        const { id, username: name, email } = user;

        if (login) {
          return {
            jwt,
            id,
            name,
            email,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

      if (isSignIn) {
        if (!user || !user.name || !user.email || !user.jwt || !user.id) {
          return null;
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        token.expiration = Math.floor(
          actualDateInSeconds + tokenExpirationInSeconds,
        );
      } else {
        if (!token?.expiration) return null;

        if (actualDateInSeconds > token.expiration) return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.expiration ||
        !token?.email ||
        !token?.name
      )
        return null;

      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        jwt: token.jwt,
      };

      return session;
    },
  },
});
