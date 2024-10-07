import React from "react";
import { memo } from "react";

function Navbar({ name, change }) {
  console.log("Navbar is rendered");
  return (
    <div>
      <h1>Hey! {name} here</h1>
      <button className="btn" onClick={change}></button>
    </div>
  );
}
export default memo(Navbar);
