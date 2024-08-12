import React from "react";
import "./btn.css";

function Btn({ type, className = "", text, onClick }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Btn;
