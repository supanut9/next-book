import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    id: string;
  }

  interface JWT {
    id: string;
  }
}
