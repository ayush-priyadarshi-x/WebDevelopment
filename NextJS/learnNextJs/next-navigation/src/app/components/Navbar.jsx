"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <header>
      <nav className="w-full flex justify-between sm:px-5 sm:py-2 bg-indigo-900">
        <div className="logo">
          <Link href={"/"} className="text-white text-2xl">
            Next JS
          </Link>
        </div>
        <div>
          <ul className="flex gap-4 ">
            <li className="text-white font-black sm:p-2">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-white font-black sm:p-2">
              <Link href={"/about"}>About</Link>
            </li>
            <li className="text-white font-black sm:p-2">
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
