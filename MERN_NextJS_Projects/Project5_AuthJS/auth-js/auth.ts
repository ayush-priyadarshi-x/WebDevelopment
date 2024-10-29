import { user } from "@/models/User";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { error } from "console";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_SECRET_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "pasword", type: "pasword" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide email and password. ");
        }

        await connectDB();
        const User = await user.findOne({ email }).select("+password +role");

        if (!User) {
          throw error("Invalid Email");
        }

        if (!User.password) {
          throw error("Provide Password. ");
        }

        const isMatch = bcrypt.compare(password, User.password);
        if (!isMatch) {
          throw error("Password did not match. ");
        }

        const userData = {
          firstName: User.firstName,
          lastName: User.lastName,
          email: User.email,
          password: User.password,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
