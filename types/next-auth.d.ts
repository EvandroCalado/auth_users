import {} from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    jwt: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    expiration: number;
  }
}
