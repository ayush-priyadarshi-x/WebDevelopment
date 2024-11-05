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
import { Message } from "models/User";
import { useToast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

interface MessageCardProp {
  message: Message;
  onMessageDelete: (messageId: string) => void;
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
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{message.content}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleOnDeleteConfirm}
                  ></AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default MessageCard;
