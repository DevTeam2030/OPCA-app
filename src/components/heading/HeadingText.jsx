import React from "react";
import { useLocation } from "react-router-dom";
import "./heading-text.css";

export default function HeadingText({ text }) {
  const location = useLocation();
  const branchData = JSON.parse(localStorage.getItem("selectedBranch")) || {};
  const branchName = branchData.name || "";

  return (
    <div className="heading-wrapper">
      {location.pathname !== "/order-complete" && <h4>{branchName}</h4>}
      <h3 className="heading-text">{text}</h3>
    </div>
  );
}
