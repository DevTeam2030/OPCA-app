import React, { useEffect } from "react";
import HeadingText from "../../components/heading/HeadingText";
import "./confirm-order.css";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo, fullOrderNo, delivery_company_id } =
    location.state || {};
  console.log(fullOrderNo);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://opcaapi.anan.sa/Opca/public/api/order-details?OrderId=${fullOrderNo}`
      );
      if (response.data.status === 200) {
        const orderData = response.data.data;
        navigate("/confirm-order-form", {
          state: {
            name,
            color,
            logo,
            delivery_company_id,
            orderData,
            fullOrderNo,
          },
        });
      } else {
        toast.error("Order not found. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Error fetching order data:", errorMessage);
      toast.error("An error occurred while retrieving the order information.");
    }
  };

  return (
    <div className="confirm-order-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="confirm-order-content content">
        <Btn
          text="go to Restaurants"
          className="back-btn"
          type="button"
          onClick={() => navigate("/show-restaurent")}
        />
        <HeadingText text="Confirm Your Order Number" />
        <div className="all-number">
          {fullOrderNo ? (
            <h4 className="all-number-text">{fullOrderNo}</h4>
          ) : (
            <h4 className="all-number-text">Order number not available</h4>
          )}
        </div>
        <div className="btns">
          {fullOrderNo ? (
            <>
              <Btn text="Yes" type="button" onClick={handleSubmit} />
              <Btn
                text="No"
                type="button"
                onClick={() =>
                  navigate("/digits-verification", {
                    state: { name, color, logo },
                  })
                }
                className="cancle-btn"
              />
            </>
          ) : (
            <Btn
              text="Back"
              type="button"
              onClick={() =>
                navigate("/digits-verification", {
                  state: { name, color, logo },
                })
              }
              className="cancle-btn"
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ConfirmOrder;
