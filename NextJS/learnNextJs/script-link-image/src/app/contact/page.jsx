import Script from "next/script";

export const metadata = {
  title: "NextJs ⋅ Contact",
  metadata: "This is contact. ",
};

const page = () => {
  return (
    <>
      <Script>{`alert("Welcome to contact. ")`}</Script>
      <h1 className="text-5xl sm:text-6xl md:text-7xl ">This is contact. </h1>
    </>
  );
};

export default page;
