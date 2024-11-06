"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { messageInterface } from "@/app/(app)/dashboard/page";

interface MessageCardProp {
  message: messageInterface;
  onMessageDelete: (messageId: string) => void;
}

function timeAgo(dateString: Date) {
  const now: Date = new Date();
  const givenDate: Date = new Date(dateString);
  const diffInMilliseconds: number = now - givenDate;

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays > 0) {
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;
  } else {
    return "Just now"; // If the difference is less than 1 minute
  }
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProp) => {
  const { toast } = useToast();

  const handleOnDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast({
        title: "Successfullly deleted message. ",
        description: `The message : ${message.content} was deleted`,
      });
      console.log("Response MessageCard delete confirm : ", response);
      onMessageDelete(message._id as string);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: "Failed to delete message",
        description:
          (axiosError.response?.data as ApiResponse).message ||
          "Failed to set message settings",
      });
    }
  };

  return (
    <>
      <div className="mx-5">
        <Card>
          <CardHeader>
            <CardTitle>{}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant={"destructive"}
                  className="rounded-lg px-5 py-3 bg-red-500 text-white border border-red-500 hover:text-red-500 hover:bg-white duration-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will delete your message.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleOnDeleteConfirm(message._id)}
                  ></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p>{message.content}</p>
          </CardContent>
          <CardFooter>
            <p className="text-right w-full text-lg font-bold">
              -{timeAgo(message.createdAt)}
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default MessageCard;
