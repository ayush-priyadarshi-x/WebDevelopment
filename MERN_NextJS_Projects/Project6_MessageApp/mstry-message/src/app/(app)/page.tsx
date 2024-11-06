// page.tsx
"use client";
import { Fugaz_One } from "next/font/google";
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
  return (
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
                  <CardHeader className="text-2xl">{message.title}</CardHeader>
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
    </main>
  );
}
