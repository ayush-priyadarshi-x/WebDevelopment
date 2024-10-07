import React from "react";
import Button from "./Button";

export default function Navbar() {
  return (
    <>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </div>
        <Button />
      </nav>
    </>
  );
}
