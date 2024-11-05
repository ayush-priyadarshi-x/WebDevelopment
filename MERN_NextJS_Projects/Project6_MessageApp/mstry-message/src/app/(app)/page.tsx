"use client";
import { Fugaz_One } from "next/font/google";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import axios from "axios";
import { User } from "models/User";

const messages = [
  {
    title: "Alice Johnson",
    content: "Hey, have you seen the latest updates on the project?",
    timeSince: "2 hours ago",
  },
  {
    title: "Bob Smith",
    content:
      "I finished the report you requested. Let me know if you need anything else!",
    timeSince: "1 day ago",
  },
  {
    title: "Charlie Brown",
    content: "Looking forward to our meeting tomorrow. Let's prepare well!",
    timeSince: "3 days ago",
  },
  {
    title: "Diana Prince",
    content: "Can you send me the documents we discussed earlier?",
    timeSince: "5 hours ago",
  },
  {
    title: "Ethan Hunt",
    content:
      "The deadline for the assignment is approaching. Let's wrap it up!",
    timeSince: "1 week ago",
  },
  {
    title: "Fiona Green",
    content: "Don't forget about the team lunch this Friday!",
    timeSince: "2 weeks ago",
  },
];

const fugaz_one_init = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/get-users");
      const data = response.data;
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    users.map((user) => {
      console.log("Users : ", user.username);
    });
  }, [users]);

  return (
    <>
      <main className="space-y-9">
        <section className="w-full text-center">
          <h1 className="font-extrabold text-7xl">
            Dive into the world of anonymous conversation.
          </h1>
          <p className={`font-bold text-xl ${fugaz_one_init.className}`}>
            Explore mstry message where your identity remains secret.
          </p>
        </section>
        <div className="w-full flex justify-center items-center">
          <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full max-w-xs"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <Card className="p-5">
                    <CardHeader className="text-2xl">
                      {message.title}
                    </CardHeader>
                    <div className="">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {message.content}
                        </span>
                      </CardContent>
                    </div>
                    <CardDescription className="font-bold text-right">
                      {message.timeSince}
                    </CardDescription>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <section className="ourFamily flex w-full justify-center items-center flex-col space-y-8">
          <div>
            <h1 className="text-3xl ">Our Family</h1>
            <p className="text-base">
              Click on username to message them privately.{" "}
            </p>
          </div>
          <div className="w-[60%] grid grid-cols-5 gap-y-2 gap-x-0">
            {loading ? (
              <p>Loading users...</p>
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <Link key={index} href={`/u/${user.username}`}>
                  <button className="bg-red-500 rounded-full text-white px-4 py-2 hover:bg-white border border-red-500 hover:text-red-500 duration-200">
                    {user.username}
                  </button>
                </Link>
              ))
            ) : (
              <>No one is here in our family.</>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
