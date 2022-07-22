import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className="logo">Holo</div>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
