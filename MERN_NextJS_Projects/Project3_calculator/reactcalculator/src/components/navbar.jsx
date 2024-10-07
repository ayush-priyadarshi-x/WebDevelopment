import { defineElement } from "lord-icon-element";
import lottie from "lottie-web";

// Register the lord-icon custom element
defineElement(lottie.loadAnimation);

const Navbar = () => {
  return (
    <>
      <nav className="navbar  heliotrope">
        <div className="container d-flex justify-content-center gap-2">
          <lord-icon
            src="https://cdn.lordicon.com/ayjfxoly.json"
            colors="primary:#ffffff,secondary:#0A0A0A"
            trigger="in"
            style={{ width: "40px", height: "40px" }}
          ></lord-icon>
          <a
            className="navbar-brand fw-bold text-decoration-none fs-3 text-dark"
            href="#"
          >
            Calculator
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
