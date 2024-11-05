"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ username: string }>();

  return (
    <>
      <div>Welcome to U/[username]</div>
    </>
  );
};

export default Page;
