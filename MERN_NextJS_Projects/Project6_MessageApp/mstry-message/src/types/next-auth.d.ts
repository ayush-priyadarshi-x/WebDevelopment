import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean; // Ideally, this should be boolean
    username?: string;
  }

  interface Session extends DefaultSession {
    // Use 'extends' to inherit properties from DefaultSession
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean; // Ideally, this should be boolean
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}
