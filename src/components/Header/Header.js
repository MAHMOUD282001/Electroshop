import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
const Header = () => {
  return (
    <header>
        <div className="container">
          <div className="logo">
            <Link to="/"><h2><span>Electro</span>shop</h2>.</Link>
          </div>
        </div>
    </header>
  );
};

export default Header;
