/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useDebounceValue } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [IsUserNameChecking, setIsUserNameChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const debouncedUsername = useDebounceValue(userName, 3000)[0];

  // Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const checkUsernameUnique = async () => {
    if (debouncedUsername) {
      setIsUserNameChecking(true);
      setUserNameMessage("");
      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`
        );
        console.log(response);
        await setUserNameMessage(response.data.message);
        console.log("User name message: ", userNameMessage);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUserNameMessage((axiosError.response?.data as ApiResponse).message);
        console.log("Frontend error (auth)/sign-in : ", error);
      } finally {
        setIsUserNameChecking(false);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const payload = {
      username: data.userName,
      email: data.email,
      password: data.password,
    };
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", payload);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${userName}`);
    } catch (error) {
      console.log("onSubmit (auth)/sign-in error: ", error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as ApiResponse).message;
      toast({
        title: "SignUp failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    checkUsernameUnique();
  }, [debouncedUsername]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-grey-100 ">
        <div className="w-full max-w-md p-0 space-y-8 bg-white rounded-lg shadow-md px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-light lg:text--5xl mb-6">
              John mystry message
            </h1>
            <p className="mb-4">Sign UP to start your anonyms adventure</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                name="userName" // Ensure this matches your schema
                control={form.control} // Correctly pass control here
                render={(
                  { field } // Use field for input registration
                ) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field} // Register input field
                        type="text"
                        placeholder="Enter your username"
                        onChange={(e) => {
                          field.onChange(e);
                          setUserName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email" // Ensure this matches your schema
                control={form.control} // Correctly pass control here
                render={(
                  { field } // Use field for input registration
                ) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field} // Register input field
                        type="email"
                        placeholder="something@gmail.com"
                      />
                    </FormControl>
                    <FormMessage>{userNameMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <p className="text-black">{userNameMessage}</p>
              <FormField
                name="password" // Ensure this matches your schema
                control={form.control} // Correctly pass control here
                render={(
                  { field } // Use field for input registration
                ) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field} // Register input field
                        type="password"
                        placeholder="Enter your password "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-class"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 " />
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </Form>
          <div className="text-center mt-4 w-full flex justify-center items-center space-x-4">
            <p>Already a member? </p>
            <span className="text-indigo-600 font-bold">
              <Link href={"/sign-in"}>Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
