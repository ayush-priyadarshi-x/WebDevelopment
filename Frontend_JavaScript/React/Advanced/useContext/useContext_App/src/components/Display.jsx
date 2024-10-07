import React, { useContext } from "react";
import { counterContext } from "../context/context";

export default function Display() {
  const counter = useContext(counterContext);
  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => counter.setCount((count) => count + 1)}
      >
        The button count is:{counter.count}
      </button>
    </>
  );
}
