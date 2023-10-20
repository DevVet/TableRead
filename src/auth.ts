import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type {
  DefaultSession,
  NextAuthOptions as NextAuthConfig,
} from "next-auth";
import { getServerSession } from "next-auth";

import Auth0 from "next-auth/providers/auth0";
// import Facebook from "next-auth/providers/facebook"
// import Google from "next-auth/providers/google"
// import Twitter from "next-auth/providers/twitter"
// import Zoom from "next-auth/providers/zoom"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin" | "peasant";
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      userRole?: "admin" | "peasant";
    };
  }
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Auth0({
      clientId: process.env.AUTH_AUTH0_ID,
      clientSecret: process.env.AUTH_AUTH0_SECRET,
      issuer: process.env.AUTH_AUTH0_ISSUER,
    }),
    // Facebook({ clientId: process.env.AUTH_FACEBOOK_ID, clientSecret: process.env.AUTH_FACEBOOK_SECRET }),
    // Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    // Twitter({ clientId: process.env.AUTH_TWITTER_ID, clientSecret: process.env.AUTH_TWITTER_SECRET, version: "2.0" }),
    // Zoom({ clientId: process.env.AUTH_ZOOM_ID, clientSecret: process.env.AUTH_ZOOM_SECRET }),
  ],
  callbacks: {
    async jwt({ token, trigger }) {
      switch (trigger) {
        case "signIn":
          // Alter the token in some way because the JWT was generated from a signIn
          break;
        case "signUp":
          // Alter the token in some way because the JWT was generated from a signUp
          break;
        case "update":
          // Alter the token in some way because the JWT was generated from the token being updated
          break;
      }
      // Fetch user role from db and add it to the Token
      token.userRole = "admin";
      return token;
    },
    async session({ session, token }) {
      // Fetch additional data from db to send to the client
      // This will be availble in Server components with getServerSession
      // and in client components with useSession hook
      session.user!.userRole = token.userRole;
      return session;
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return await getServerSession(...args, config);
}

// We recommend doing your own environment variable validation
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_SECRET: string;

      AUTH_AUTH0_ID: string;
      AUTH_AUTH0_ISSUER: string;
      AUTH_AUTH0_SECRET: string;

      //   AUTH_FACEBOOK_ID: string
      //   AUTH_FACEBOOK_SECRET: string

      //   AUTH_GOOGLE_ID: string
      //   AUTH_GOOGLE_SECRET: string

      //   AUTH_TWITTER_ID: string
      //   AUTH_TWITTER_SECRET: string

      //   AUTH_ZOOM_ID: string
      //   AUTH_ZOOM_SECRET: string
    }
  }
}
