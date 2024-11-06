"use client";
import { useSession } from "next-auth/react";
import { User } from "models/User";
import Switch from "@/components/Switch";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import MessageCard from "@/components/MessageCard";

export interface messageInterface {
  content: string;
  createdAt: Date;
  messageId: string;
  _id: string;
}

const Page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [Session, setSession] = useState<User | null>(null);
  const [ProfileUrl, setProfileUrl] = useState<string>("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isFetchAcceptMessages, setIsFetchAcceptMessages] =
    useState<boolean>(false);
  const [message, setMessage] = useState<messageInterface[]>([]);
  const [isFetchingMessage, setIsFetchingMessage] = useState<boolean>(true);

  const getMessages = async () => {
    try {
      const response = await axios.get("/api/get-messages");
      console.log("Messages : ", response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.log("There was some error , ", error);
      toast({
        title: "Error while fetching messages, ",
        variant: "destructive",
      });
    } finally {
      setIsFetchingMessage(false);
    }
  };

  const fetchIsAcceptMessage = async () => {
    setIsFetchAcceptMessages(true);
    try {
      const response = await axios("/api/accept-messages");
      const { isAcceptingMessages } = response.data;
      setIsSwitchOn(isAcceptingMessages);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsFetchAcceptMessages(false);
    }
  };

  useEffect(() => {
    getMessages();
    fetchIsAcceptMessage();
  }, []);

  const changeAcceptMessage = async () => {
    try {
      const response = await axios.post("/api/accept-messages/", {
        acceptingMessages: isSwitchOn,
      });
      toast({
        title: response.data.message,
        description: response.data.message,
      });
    } catch (error) {
      toast({
        title: "Error while changing the state",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  const onMessageDelete = (id: string) => {
    setMessage(message.filter((msg) => msg.messageId !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text copied to clipboard.",
      description: `${text} copied!`,
    });
  };

  useEffect(() => {
    if (session) {
      setSession(session.user as User);
    }
  }, [session]);

  useEffect(() => {
    if (Session) {
      const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
      const profileUrl = `${baseUrl}/u/${Session.username}`;
      setProfileUrl(profileUrl);
    }
  }, [Session]);

  useEffect(() => {
    changeAcceptMessage();
  }, [isSwitchOn]);

  if (!Session) {
    return <>Please Log In</>;
  }

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <Switch
          checked={isSwitchOn}
          disabled={isFetchAcceptMessages}
          text={isSwitchOn ? "Accept Messages: On" : "Accept Messages: Off"}
          onChange={() => setIsSwitchOn(!isSwitchOn)}
        />
        <div className="border border-black  rounded-md w-2/3 flex justify-between items-center h-[50px] p-0">
          <Input
            name="profileUrl"
            value={ProfileUrl}
            readOnly
            className="border border-0 text-xl font-bold"
          />
          <button
            className="border border-black  rounded-md px-3 h-full bg-black text-white hover:bg-white hover:text-black duration-200 text-xl"
            onClick={() => copyToClipboard(ProfileUrl)}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 truncate my-[10vh] grid-y-2">
        {!isFetchingMessage ? (
          message.length > 0 ? (
            message.map((msg) => (
              <MessageCard
                key={msg.messageId || msg._id}
                message={msg}
                onMessageDelete={onMessageDelete}
              />
            ))
          ) : (
            <div>No messages to display</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Page;
