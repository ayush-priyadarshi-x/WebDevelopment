"use client";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams(); // Add parentheses to invoke the function
  return (
    <div>
      <h1 className="text-3xl sm:text-5xl md:text-7xl text-center">
        The blogPost is {searchParams.get("blog")}
      </h1>
    </div>
  );
}
