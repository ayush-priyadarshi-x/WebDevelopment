/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";

import React from "react";
import { Input } from "@/components/ui/input";

const Page = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    setIsSubmitting(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        return toast({
          title: "Login failed",
          description: "Incorrect email/username or password.",
        });
      }
      return toast({
        title: "Error",
        description: result.error,
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="rounded-xl border border-[2px] p-8">
        <div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-light lg:text-5xl mb-6">
              Welcome Back!
            </h1>
            <p className="mb-4">Sign in to start your anonymous adventure</p>
          </div>
        </div>
        <div className="mt-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="border border-black rounded-xl w-full px-3 py-1 text-white hover:text-black bg-black hover:bg-white duration-200 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </Form>
        </div>
        <div className="flex justify-center items-center space-x-2 my-3">
          <p>{`Don't have an account?`}</p>
          <span className="text-blue-600 font-bold">
            <Link href="/sign-up">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
