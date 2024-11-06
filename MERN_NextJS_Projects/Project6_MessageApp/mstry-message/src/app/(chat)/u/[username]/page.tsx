"use client";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import { Input } from "@/components/ui/input";

const Page = () => {
  const params = useParams();
  const { toast } = useToast();
  const username = decodeURIComponent(params.username as string); // No need to decode

  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track submission state

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const userNotAcceptingMessage = (set: boolean = false) => {
    return set ? (
      <p className="text-red-500 text-sm text-center text-xl">
        User is not accepting messages.{" "}
      </p>
    ) : (
      ""
    );
  };

  // Use async function inside useEffect
  const isUserAcceptingMessage = async () => {
    const payload = { username };
    try {
      const response = await axios.post(
        "/api/check-receiver-acceptingState",
        payload
      );
      setIsAcceptingMessage(response.data.isAcceptingMessages);
    } catch (error) {
      console.log("Error in u/[username]:", error);
      toast({
        title: "There was an error checking the user's accepting state.",
        description: "An unknown error occurred.",
      });
    } finally {
      setIsPageLoading(false); // Stop loading after fetching data
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true); // Set submitting state
    const payload = { username: username, content: data.content };
    if (!isAcceptingMessage) {
      userNotAcceptingMessage(true);
      return toast({
        title: "User is not accepting messages. ",
        description: "Please try again later. ",
      });
    }
    try {
      const response = await axios.post("/api/send-message", payload);
      console.log("Response : ", response.data);
      toast({
        title: "Message sent successfully!",
        description: response.data.message,
      });

      form.reset(); // Optionally reset form after successful submit
    } catch (error) {
      toast({
        title: "Error sending message.",
        description: "An error occurred while sending your message.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  useEffect(() => {
    isUserAcceptingMessage();
  }, [params.username]); // Depend on username for re-checking

  return (
    <div className="mt-[5vh] sm:mt-[10vh] md:mt-[20vh]">
      {isPageLoading ? (
        <div>...</div> // Show loading state or spinner
      ) : (
        <>
          <div className="flex flex-col justify-center items-center space-y-8">
            <h1 className="text-7xl text-center">Message to {username}</h1>
            <div className="w-2/3 flex justify-center items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full"
                >
                  <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Please type your message here."
                            className=" focus:border-black focus:border-2"
                          />
                          {/* Render validation error */}
                          {form.formState.errors.content && (
                            <p className="ms-2 text-red-500 text-sm">
                              {form.formState.errors.content.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black hover:bg-white text-white hover:text-black border border-black rounded-md duration-200 px-3 py-1"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </button>
                </form>
              </Form>
            </div>
          </div>
          {userNotAcceptingMessage()}
        </>
      )}
    </div>
  );
};

export default Page;
