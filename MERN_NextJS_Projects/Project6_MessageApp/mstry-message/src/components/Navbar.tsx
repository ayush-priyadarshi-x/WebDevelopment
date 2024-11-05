"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <>
      <nav className="flex justify-between px-14 bg-[#222f3e] py-3">
        <div className="font-black text-xl sm:text-2xl md:text-4xl text-[#c8d6e5] flex justify-center items-center">
          <Link href={"/"}>Mstry Message </Link>
        </div>
        <div>
          {session ? (
            <div className="flex flex-col justify-around space-y-1">
              <div className="space-x-2 text-xl font-base ">
                <span className="text-[#c8d6e5]">Welcome </span>
                <span className="text-[#c8d6e5]">
                  {user?.username || user.email}
                </span>
              </div>
              <button
                className="border border-white rounded-xl w-full px-1 py-2 text-black hover:text-white bg-white hover:bg-black duration-200 hover:border-black flex justify-center items-center"
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
