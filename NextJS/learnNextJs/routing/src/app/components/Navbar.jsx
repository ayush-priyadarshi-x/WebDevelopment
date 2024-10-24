import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex gap-5 p-2">
          <Link
            href={"/contact"}
            className="text-indigo-600 font-black"
            replace
          >
            ABOUT
          </Link>
          <Link href={"/about"} className="text-indigo-600 font-black" replace>
            CONTACT
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
