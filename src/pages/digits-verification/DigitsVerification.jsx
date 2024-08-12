import React, { useState, useEffect } from "react";
import HeadingText from "../../components/heading/HeadingText";
import "./digits-verification.css";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DigitsVerification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [inputs, setInputs] = useState(Array(4).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo } = location.state || {};

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      if (value !== "" && index < 3) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleNumberClick = (number) => {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === "") {
        const newInputs = [...inputs];
        newInputs[i] = number;
        setInputs(newInputs);
        document.getElementById(`input-${i}`).focus();
        break;
      }
    }
  };

  const handleSubmit = async () => {
    const orderNo = inputs.join("");
    try {
      const response = await axios.get(
        `https://opca-system.faratcards.com/api/get-order-id?order_no=${orderNo}`
      );
      if (response.data.status === 200) {
        const { full_order_no } = response.data.data;
        navigate("/confirm-order", {
          state: { name, color, logo, fullOrderNo: full_order_no },
        });
      } else {
        toast.error("Order number not found. Please try again.");
      }
    } catch (err) {
      toast.error("Error verifying order number. Please try again later.");
    }
  };

  return (
    <div className="digits-verification-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="digits-verification-content content">
        <HeadingText text="Enter the last digits of the order number" />
        <div className="number-container">
          {inputs.map((value, index) => (
            <div className="input-container" key={index}>
              <input
                id={`input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
              />
            </div>
          ))}
        </div>
        <div className="number">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <span
              key={number}
              className="number-text"
              onClick={() => handleNumberClick(number.toString())}
            >
              {number}
            </span>
          ))}
        </div>
        <Btn text="Enter" type="button" onClick={handleSubmit} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DigitsVerification;
