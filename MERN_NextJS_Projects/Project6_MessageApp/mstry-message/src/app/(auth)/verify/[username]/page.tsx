"use client";

import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";

const VerifyAccount = () => {
  const [verificationMessage, setVerificationMessage] = useState({
    message: "",
    class: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    const payload = {
      username: params.username,
      code: data.code,
    };
    try {
      const response = await axios.post("/api/verify-code", payload);

      if (response.status < 500) {
        setVerificationMessage({
          message: response.data.message,
          class:
            response.data.message == "User verified."
              ? "text-red-500" // Use green for success
              : "text-green-500", // Use red for failure
        });
        router.replace(`/sign-in`);
      }
    } catch (error) {
      console.log("Error: ", error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as ApiResponse).message;
      toast({
        title: errorMessage,
        description: "Error while verifying code",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-black rounded-xl p-5">
        <h1 className="font-black text-5xl my-4">Verify Your Code</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="ex: 000000" />
                  </FormControl>
                  <FormMessage className={`${verificationMessage.class}`}>
                    {verificationMessage.message}
                  </FormMessage>
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
    </div>
  );
};

export default VerifyAccount;
