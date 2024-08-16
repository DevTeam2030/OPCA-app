import React from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const storedBranch = localStorage.getItem("selectedBranch");
    if (storedBranch) {
      navigate("/choose-brand");
    } else {
      navigate("/show-restaurent");
    }
  };

  return (
    <div className="home">
      <div className="svg-container">
        <div className="header-title content">
          <h1>OPCA</h1>
          <h2>Order Pickup Confirmation</h2>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          aria-hidden="true"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,224L80,240C160,256,320,288,480,266.7C640,245,800,171,960,154.7C1120,139,1280,181,1360,202.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="home-content content">
        <div className="img-container">
          <img
            src={require("../../assets/man-home-img.png")}
            alt="Order Pickup"
          />
        </div>

        <button
          className="arrow-icon"
          aria-label="Go to Choose Brand Page"
          onClick={handleNavigation}
        >
          <HiOutlineArrowLongRight size={50} />
        </button>
      </div>
    </div>
  );
}

export default Home;
