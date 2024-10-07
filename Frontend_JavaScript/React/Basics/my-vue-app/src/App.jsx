// App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/routes/About";
import Login from "./components/routes/Login";
import Home from "./components/routes/Home";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  /*=================== Router ========================*/
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/login", element: <Login /> },
  ]);
  /*=================== End Router ========================*/

  return (
    <>
      <RouterProvider router={router}>
        <Navbar color="bg-body-tertiary" />
      </RouterProvider>
    </>
  );
}

export default App;
