// components/routes/Home.js
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar";

function Home() {
  /*=================== useState ========================*/
  const [button, setButton] = useState(false);
  const [myTodo, setTodo] = useState([
    { title: "Grocery", desc: "Bring Grocery Items." },
    { title: "Tech", desc: "Bring Tech Items." },
    { title: "Eating", desc: "Bring Eating Items." },
  ]);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("btn-secondary");
  const [form, setForm] = useState({
    email: "",
    phone: "",
  });
  /*=================== End useState ========================*/

  /*=================== useEffect ========================*/
  useEffect(() => {
    // Any side-effects related to count changes can be added here
  }, [count]);
  /*=================== End useEffect ========================*/

  /*=================== useRef ========================*/
  const clickCountRef = useRef(0);
  const buttonRef = useRef(null);
  /*=================== End useRef ========================*/

  /*=================== Functions ========================*/
  const Todo = ({ todos }) => {
    return (
      <div
        className="m-4 border-primary-subtle border d-block"
        onMouseEnter={handleOnMouseOver}
        onMouseLeave={handleOnMouseLeave}
      >
        <h2>{todos.title}</h2>
        <p>{todos.desc}</p>
      </div>
    );
  };

  const clearButton = () => {
    if (buttonRef.current) {
      buttonRef.current.style.display =
        buttonRef.current.style.display === "none" ? "block" : "none";
    }
  };

  const handleOnMouseOver = (e) => {
    const element = e.target;
    element.style.backgroundColor = "red";
  };

  const handleOnMouseLeave = (e) => {
    const element = e.target;
    element.style.backgroundColor = "white";
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const Btn = () => {
    return (
      <button
        className="btn btn-lg btn-outline-secondary mx-4"
        onClick={clearButton}
      >
        Clear
      </button>
    );
  };

  const logClickCount = () => {
    clickCountRef.current += 1;
    console.log(`Button clicked ${clickCountRef.current} times`);
  };

  const btnCount = () => {
    setButton((prevButton) => !prevButton);
    setCount((prevCount) => prevCount + 1);
    logClickCount();
  };
  /*=================== End Functions ========================*/

  return (
    <>
      <Navbar />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <button
          onClick={btnCount}
          className="btn btn-lg btn-outline-danger mx-4"
          ref={buttonRef}
          style={{ width: "70%" }}
        >
          <strong>Count:</strong> {count}
        </button>
        {button && <Btn />}
        {myTodo.map((item, index) => (
          <Todo key={index} todos={item} />
        ))}
      </div>
      <div className="container">
        <div className="input-group">
          <span className="input-group-text">Email and Phone</span>
          <input
            type="text"
            aria-label="Email"
            name="email"
            value={form.email}
            onChange={handleOnChange}
            className="form-control"
          />
          <input
            type="text"
            aria-label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
