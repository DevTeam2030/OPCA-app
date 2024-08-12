import React, { useState } from "react";
import Header from "../../components/header/Header";
import HeadingText from "../../components/heading/HeadingText";
import Btn from "../../components/btn/Btn";
import "./order-verification.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderVerification = () => {
  const [inputs, setInputs] = useState(["5", "","","","","","","",""]); 
  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo } = location.state || {};

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      if (value !== "" && index < 8) { // Focus on the next input only if it's within the first 8
        document.getElementById(`input-${index + 2}`).focus();
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

  const handleSubmit = () => {
    if (inputs.every((input) => input !== "")) {
      navigate("/digits-verification", {
        state: { name, color, logo },
      });
    } else {
      toast.error("Please enter the full number.");
    }
  };

  const isButtonDisabled = inputs.some((input) => input === "");

  return (
    <div className="order-verification-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="order-verification-content content">
        <HeadingText text="Enter your phone number" />
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
        <Btn
          text="Enter"
          type="button"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderVerification;
