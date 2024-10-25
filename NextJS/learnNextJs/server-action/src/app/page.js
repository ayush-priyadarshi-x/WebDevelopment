import { submitAction } from "../../actions/form";
export default function Home() {
  return (
    <>
      <div>
        <form
          action={submitAction}
          className="flex flex-col space-y-5 justify-center items-center"
        >
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              name="email"
              className="rounded-lg border border-black p-4"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              className="rounded-lg border border-black p-4"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center items-center">
            <button className="rounded-full py-1 px-5 border border-indigo-600 text-white hover:text-indigo-600 hover:bg-white bg-indigo-600 font-black ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
