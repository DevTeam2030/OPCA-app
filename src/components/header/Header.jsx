import React from "react";
import "./header.css";

function Header({ brand_logo, brand_color }) {
  return (
    <header style={{ backgroundColor: brand_color }}>
      <img src={brand_logo} alt="brand-logo" className="brand-logo" />
      <p className="header-text">OPCA</p>
    </header>
  );
}

export default Header;
