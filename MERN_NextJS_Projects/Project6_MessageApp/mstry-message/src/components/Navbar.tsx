"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { User } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  console.log(user);

  return (
    <>
      <nav className="flex justify-between px-14 ">
        <div className="font-black text-xl sm:text-2xl md:text-4xl ">
          <Link href={"/"}>Mstry Message </Link>
        </div>
        <div>
          {session ? (
            <div className="flex flex-col justify-around ">
              <div className="space-x-2 text-xl font-base">
                <span>Welcome </span>
                <span>{user?.username || user.email}</span>
              </div>
              <button
                className="border border-black rounded-xl w-full px-1 py-2 text-white hover:text-black bg-black hover:bg-white duration-200 flex justify-center items-center"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                className="font-bold text-lg hover:transform hover:translate-y-[2px]"
                href={"/sign-in"}
              >
                Sign In{" "}
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
