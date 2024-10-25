"use client";
import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const handleOnDataFetch = async (formData) => {
    const response = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(handleOnDataFetch)}>
          <div className="flex flex-col space-y-4 ">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="rounded-lg border border-black py-2 px-5"
            />
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              className="rounded-lg border border-black py-2 px-5"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="rounded-lg border border-black py-2 px-5"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-indigo-600 text-white font-black py-2 px-6 border border-indigo-600 duration-200 text-sm my-5
             hover:translate-y-[-3px] hover:bg-white hover:text-indigo-600 transform transition shadow-indigo-500/50"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
