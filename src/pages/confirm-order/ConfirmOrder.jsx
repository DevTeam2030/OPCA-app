import React, { useEffect } from "react";
import HeadingText from "../../components/heading/HeadingText";
import "./confirm-order.css";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ConfirmOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo, fullOrderNo } = location.state || {};

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://opca-system.faratcards.com/api/get-order-info?order_no=${fullOrderNo}`
      );
      if (response.data.status === 200) {
        const orderData = response.data.data;

        navigate("/confirm-order-form", {
          state: {
            name,
            color,
            logo,
            orderData,
          },
        });
      } else {
        alert("Order not found. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error fetching order data:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while retrieving the order information.");
    }
  };

  return (
    <div className="confirm-order-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="confirm-order-content content">
      <Btn text="go to Restaurants" className="back-btn" type="button" onClick={() => navigate("/show-restaurent")} />
        <HeadingText text="Confirm Your Order Number" />
        <div className="all-number">
          <h4 className="all-number-text">{fullOrderNo}</h4>
        </div>
        <div className="btns">
          <Btn text="Yes" type="button" onClick={handleSubmit} />
          <Btn
            text="No"
            type="button"
            onClick={() => navigate("/digits-verification", { state: { name, color, logo } })}
            className="cancle-btn"
          />
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
