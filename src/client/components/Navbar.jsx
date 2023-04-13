import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1>Ristorante Benevento</h1>
      <h3>
        <Link to="/" className="navbar-link">
          HOME
        </Link>
      </h3>
      <h3>
        <Link to="/meals" className="navbar-link">
          MENU
        </Link>
      </h3>
      <h3>
        <Link to="/reviews" className="navbar-link">
          REVIEWS
        </Link>
      </h3>
    </nav>
  );
}

export default Navbar;
