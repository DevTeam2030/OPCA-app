import React, { useRef, useState, useEffect } from "react";
import HeadingText from "../../components/heading/HeadingText";
import "./confirm-order-form.css";
import Header from "../../components/header/Header";
import Btn from "../../components/btn/Btn";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmOrderForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { name = '', color = '', logo = '', orderData = {} } = location.state || {};

  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    order_id: orderData.order_id || "",
    receive_time: orderData.receive_time || "",
    ready_time: orderData.ready_time || "",
    pickup_time: orderData.pickup_time || "",
    order_food_item: orderData.order_food_item || "",
    order_drink_item: orderData.order_drink_item || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const sigCanvas = useRef(null);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (sigCanvas.current && sigCanvas.current.isEmpty()) {
      setIsLoading(false);
      toast.error("Signature is required.");
      return;
    }

    if (!checked) {
      setIsLoading(false);
      toast.error("You must confirm the order is complete.");
      return;
    }

    const signatureImage = sigCanvas.current.toDataURL();
    const data = {
      ...formData,
      signature: signatureImage,
    };

    try {
      const response = await axios.post(
        "https://opca-system.faratcards.com/api/confirm-order",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Response:", response.data);
      setIsLoading(false);
      toast.success("Order confirmed successfully!");
      navigate("/order-complete", { state: { name, color, logo } });
    } catch (error) {
      setIsLoading(false);
      console.error(
        "Error saving order:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error occurred while saving the order.");
    }
  };

  return (
    <div className="confirm-order-form-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="confirm-order-form-content content">
        <HeadingText text="Confirm Your Order Details" />
        <form onSubmit={handleSave} className="form-container">
          <div className="flex">
            <div className="input-wrapper">
              <label className="input-label">Order ID</label>
              <input
                type="text"
                name="order_id"
                className="input-field"
                readOnly
                value={formData.order_id}
              />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Receive Time</label>
              <input
                type="text"
                name="receive_time"
                className="input-field"
                readOnly
                value={formData.receive_time}
              />
            </div>
          </div>
          <div className="flex">
            <div className="input-wrapper">
              <label className="input-label">Ready Time</label>
              <input
                type="text"
                name="ready_time"
                className="input-field"
                readOnly
                value={formData.ready_time}
              />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Pickup Time</label>
              <input
                type="text"
                name="pickup_time"
                className="input-field"
                readOnly
                value={formData.pickup_time}
              />
            </div>
          </div>
          <div className="flex">
            <div className="input-wrapper">
              <label className="input-label">Order Food Item</label>
              <input
                type="text"
                name="order_food_item"
                className="input-field"
                readOnly
                value={formData.order_food_item}
              />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Order Drink Item</label>
              <input
                type="text"
                name="order_drink_item"
                className="input-field"
                readOnly
                value={formData.order_drink_item}
              />
            </div>
          </div>
          <div className="circular-checkbox-wrapper" onClick={toggleChecked}>
            <div className={`circular-checkbox ${checked ? "checked" : ""}`}>
              {checked && <div className="checkmark">✓</div>}
            </div>
            <span className="input-label">
              Confirm order complete and in good condition
            </span>
          </div>
          <div className="signature-container">
            <label className="input-label">Signature</label>
            <SignatureCanvas
              ref={sigCanvas}
              backgroundColor="#EFEFEF"
              penColor="#000000"
              canvasProps={{ className: "signature-canvas" }}
            />
          </div>
          <div className="flex">
            <Btn text="Submit" type="submit" isLoading={isLoading} />
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default ConfirmOrderForm;
