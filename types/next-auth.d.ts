import {} from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    jwt: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      jwt: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    expiration: number;
    id: string;
    name: string;
    email: string;
    jwt: string;
  }
}
