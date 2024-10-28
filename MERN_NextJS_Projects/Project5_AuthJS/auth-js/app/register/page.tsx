"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/action/user";

export default function Register() {
  return (
    <>
      <div className="w-full flex justify-center items-center p-10">
        <div className="w-[35%] border border-[#121212] rounded-2xl p-5">
          <div className="flex flex-col space-y-1 mb-7">
            <h2 className="text-[#121212] font-bold text-xl">
              Welcome to my shop
            </h2>
            <p>Please provide all the necessary information</p>
          </div>
          <form action={register}>
            <div id="name" className="flex justify-between">
              <div className="flex flex-col gap-2 w-[45%]">
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" name="firstname" placeholder="First Name" />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" name="lastname" placeholder="Last Name" />
              </div>
            </div>
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

            <Button type="submit" className="w-full my-5">
              Sign Up
            </Button>
          </form>
          <p>
            Already have an account?{" "}
            <Link href={"/login"} className="font-bold text-blue-400">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
