import Client from "./Client";
import fs from "fs/promises";
const Server = () => {
  let a = fs.readFile(".gitignore");
  a.then((e) => console.log(e.toString()));

  console.log("This is server site.");
  return (
    <>
      <Client />
    </>
  );
};

export default Server;
