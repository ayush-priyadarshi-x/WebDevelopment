// ourFamily.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { User } from "models/User";

export default function OurFamily() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/get-users");
      const data = response.data;
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="ourFamily flex w-full justify-center items-center flex-col space-y-8 mt-8">
      <div>
        <h1 className="text-3xl text-center">Our Family</h1>
        <p className="text-base">
          Click on username to message them privately.
        </p>
      </div>
      <div className="w-full lg:w-[60%]  grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-y-2 gap-x-2 md:gap-x-0 ">
        {loading ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <Link key={index} href={`/u/${user.username}`}>
              <button className="bg-red-500 rounded-full w-full lg:w-[180px] md:w-[100px] text-white px-4 py-2 hover:bg-white border border-red-500 hover:text-red-500 duration-200 lg:text-lg md:text-sm sm:text-xs ">
                {user.username}
              </button>
            </Link>
          ))
        ) : (
          <>No one is here in our family.</>
        )}
      </div>
    </section>
  );
}
