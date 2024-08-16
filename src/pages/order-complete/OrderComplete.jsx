import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import "./order-complete.css";
import HeadingText from "../../components/heading/HeadingText";
import { useLocation, useNavigate } from "react-router-dom";
function OrderComplete() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const { color, logo } = location.state || {};
  return (
    <div className="order-complete-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="order-complete-content content">
        <img
          className="responsive-img"
          src={require("../../assets/man.png")}
          alt=""
        />
        <HeadingText text="thank you" />
        <Btn text="Home" type="button" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default OrderComplete;
