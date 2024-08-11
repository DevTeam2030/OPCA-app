import React from "react";
import "./btn.css";
import { Link } from "react-router-dom";
function Btn({ type, className, text, to, onClick }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      <Link to={to}>{text}</Link>
    </button>
  );
}

export default Btn;
