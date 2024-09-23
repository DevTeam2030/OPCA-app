import React, { useState, useEffect } from "react";
import HeadingText from "../../components/heading/HeadingText";
import "./digits-verification.css";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";

const DigitsVerification = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [inputs, setInputs] = useState(Array(4).fill(""));
  const location = useLocation();
  const navigate = useNavigate();
  const { name, color, logo, delivery_company_id } = location.state || {};

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

  const handleSubmit = async () => {
    const orderNo = inputs.join("");
    const selectedBrand = JSON.parse(localStorage.getItem("selectedBrand"));
    const { code } = selectedBrand || {};
  
    try {
      const response = await axios.get(
        `https://opcaapi.anan.sa/Opca/public/api/aggregator-order?OrderIdlast4dijits=${orderNo}&AggrType=${code}`
      );
  
      if (response.data && response.data.status === 200) {
        if (response.data.data) {
          const { full_order_no } = response.data.data;
          navigate("/confirm-order", {
            state: {
              name,
              color,
              logo,
              delivery_company_id,
              fullOrderNo: full_order_no,
            },
          });
        } else {
          toast.warning("Order number not found.");
        }
      } else {
        toast.error("Order number not found. Please check and try again.");
      }
    } catch (err) {
      toast.error("Error verifying order number. Please try again later.");
    }
  };
  
  
  

  return (
    <div className="digits-verification-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="digits-verification-content content">
        <Btn
          text="go to Restaurants"
          className="back-btn"
          type="button"
          onClick={() => navigate("/show-restaurent")}
        />
        <HeadingText text="Enter the last digits of the order number" />
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
        <Btn text="Enter" type="button" onClick={handleSubmit} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DigitsVerification;
