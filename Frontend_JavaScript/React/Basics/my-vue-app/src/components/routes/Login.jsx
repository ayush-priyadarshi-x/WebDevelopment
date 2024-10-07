import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1>Welcome to LogIn Page!</h1>
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
          to="/about"
          className="text-decoration-none text-dark fs-4"
        >
          About
        </Link>
      </div>
    </>
  );
}
