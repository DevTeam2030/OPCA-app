import React from "react";
import "./heading-text.css";
export default function HeadingText({ text }) {
  const branchData = JSON.parse(localStorage.getItem("selectedBranch")) || {};
  const branchName = branchData.name || "";
  return (
    <div className="heading-wrapper">
      <h4>{branchName}</h4>
      <h3 className="heading-text">{text}</h3>
    </div>
  );
}
