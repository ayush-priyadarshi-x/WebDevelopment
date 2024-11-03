/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

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
import { signUpSchema } from "@/schemas/signUpSchema";

import React from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const [userNameMessage, setUserNameMessage] = useState({
    message: "",
    class: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  const debouncedUsername = useDebounceValue(userName, 300)[0];

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    const payload = {
      username: data.userName,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post("/api/sign-up", payload);
      toast({
        title: "Successfully signed up",
        description: response.data.message,
      });
      router.replace(`/verify/${userName}`);
    } catch (error) {
      console.log("Error : ", error);
      toast({
        title: "Error while signing up",
        description: "(auth)/sign-up/page.tsx",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const checkUsernameUnique = async (name: string) => {
    setIsCheckingUsername(true);
    setUserNameMessage({ message: "", class: "" });
    console.log(name);
    try {
      const response = await axios.get(
        `/api/check-username-unique?username=${name}`
      );
      await setUserNameMessage({
        message: response.data.message,
        class:
          response.data.message === "User name is unique"
            ? "text-green-600"
            : "text-red-300",
      });
    } catch (error) {
      console.log("Error : ", error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as ApiResponse).message;
      toast({
        title: "Error while checking username",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkUsernameUnique(debouncedUsername);
  }, [debouncedUsername]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="rounded-xl border border-[2px] p-8">
        <div>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-light lg:text--5xl mb-6">
              John mystry message
            </h1>
            <p className="mb-4">Sign UP to start your anonyms adventure</p>
          </div>
        </div>
        <div className=" mt-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="userName"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => {
                            field.onChange(e);
                            setUserName(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage className={`${userNameMessage.class}`}>
                        {userNameMessage.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <button
                type="submit"
                className="border border-black rounded-xl w-full px-3 py-1 text-white hover:text-black bg-black hover:bg-white duration-200 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 " />
                  </>
                ) : (
                  `Submit`
                )}
              </button>
            </form>
          </Form>
        </div>
        <div className="flex justify-center items-center space-x-2 my-3 ">
          <p>Already Signed Up? </p>
          <span className="text-blue-600 font-bold ">
            <Link href={"/sign-in"}>Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
