"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function page() {
  const handleOnHomeNavigation = () => {
    setTimeout(() => {
      router.push("/");
    }, 2 * 1000);
  };

  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <h1 className="text-3xl sm:text-5xl md:text-7xl text-center">
        This is params : {params.slug}
      </h1>
      <button
        className="bg-lime-700 duration-200 transform hover:-translate-y-1 text-white rounded-full px-7 py-3 border border-lime-700 hover:text-lime-700 hover:bg-white text-3xl font-black "
        onClick={handleOnHomeNavigation}
      >
        Home
      </button>
    </div>
  );
}
