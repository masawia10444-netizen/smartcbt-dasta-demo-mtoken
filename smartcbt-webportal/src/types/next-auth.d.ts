import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    sub: string;
    expires: string;
    user: {
      id: string;
      title: string | null;
      firstName: string | null;
      lastName: string | null;
    };
  }

  interface User {
    id: string;
    title: string | null;
    first_name: string | null;
    last_name: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    title: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    sub: string;
    exp: number;
    iat: number;
    nbf: number;
  }
}
