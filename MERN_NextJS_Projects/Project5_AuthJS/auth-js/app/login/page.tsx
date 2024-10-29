"use client";
import { login } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="w-full flex justify-center items-center p-10">
        <div className="w-[35%] border border-[#121212] rounded-2xl p-5">
          <div className="flex flex-col space-y-1 mb-7">
            <h2 className="text-[#121212] font-bold text-xl">
              Welcome Back to My Shop
            </h2>
            <p>Please log in to continue</p>
          </div>
          <form action={login}>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" placeholder="Email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <Button className="w-full my-5" type="submit">
              Log In
            </Button>
          </form>

          {/* GitHub Login Button */}

          <p>
            {`Don't have an account?`}{" "}
            <Link href="/register" className="font-bold text-blue-400">
              Sign Up
            </Link>
          </p>
          <hr />
          <div className="mt-5 flex flex-col space-y-3">
            <button className="w-full  flex justify-start gap-3 bg-neutral-100 rounded-lg  p-2  ">
              GitHub
            </button>
            <button className="w-full flex justify-start gap-3 bg-neutral-100 rounded-lg  p-2 ">
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
