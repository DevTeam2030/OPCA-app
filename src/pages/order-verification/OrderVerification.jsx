import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import HeadingText from "../../components/heading/HeadingText";
import Btn from "../../components/btn/Btn";
import "./order-verification.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

const OrderVerification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set the initial value of the first input to "5"
  const [inputs, setInputs] = useState(["5", "", "", "", "", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo } = location.state || {};

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      if (value !== "" && index < inputs.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];
      if (newInputs[index] === "" && index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
        newInputs[index - 1] = "";
        setInputs(newInputs);
      } else if (newInputs[index] !== "") {
        newInputs[index] = "";
        setInputs(newInputs);
      }
    }
  };

  const handleNumberClick = (number) => {
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] === "") {
        const newInputs = [...inputs];
        newInputs[i] = number;
        setInputs(newInputs);
        document.getElementById(`input-${i}`).blur();
        if (i < inputs.length - 1) {
          document.getElementById(`input-${i + 1}`).focus();
        }
        break;
      }
    }
  };

  const handleDelete = () => {
    const newInputs = [...inputs];
    for (let i = inputs.length - 1; i >= 0; i--) {
      if (newInputs[i] !== "") {
        newInputs[i] = "";
        setInputs(newInputs);
        if (i > 0) {
          document.getElementById(`input-${i - 1}`).focus();
        }
        document.activeElement.blur();
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

  return (
    <div className="order-verification-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="order-verification-content content">
        <Btn
          text="go to Restaurants"
          className="back-btn"
          type="button"
          onClick={() => navigate("/show-restaurent")}
        />
        <HeadingText text="Enter your phone number" />
        <div className="number-container">
          {inputs.map((value, index) => (
            <div className="input-container" key={index}>
              <input
                id={`input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                inputMode="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
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
          <span className="number-text remove-btn" onClick={handleDelete}>
            <IoMdClose size={30} />
          </span>
        </div>
        <Btn
          text="Enter"
          type="button"
          onClick={handleSubmit}
          disabled={inputs.some((input) => input === "")}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderVerification;
