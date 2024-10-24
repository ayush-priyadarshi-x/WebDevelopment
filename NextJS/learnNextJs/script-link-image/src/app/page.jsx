import Main from "@/components/Main";
import Image from "next/image";

export const metadata = {
  title: "NextJs ⋅ Home",
  metadata: "This is contact. ",
};

export default function Home() {
  return (
    <Main>
      <div className="w-full flex justify-center items-center">
        <Image
          className="rounded-md hover:opacity-95 duration-300 transform hover:bg-blue-600 hover:scale-105"
          src={`https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg`}
          width={"500"}
          height={"500"}
        ></Image>{" "}
      </div>
      {/* Centered text */}
    </Main>
  );
}
