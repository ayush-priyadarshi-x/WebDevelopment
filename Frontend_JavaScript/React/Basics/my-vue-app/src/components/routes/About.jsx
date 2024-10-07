import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Welcome To About!</h1>
      <div className="d-flex justify-content-center gap-3">
        <Link
          rel="stylesheet"
          to="/"
          className="text-decoration-none text-dark fs-4"
        >
          Home
        </Link>
        <Link
          rel="stylesheet"
          to="/login"
          className="text-decoration-none text-dark fs-4"
        >
          login
        </Link>
      </div>
    </>
  );
}
