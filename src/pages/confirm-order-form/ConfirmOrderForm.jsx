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
import { FiCheckCircle } from "react-icons/fi";

function ConfirmOrderForm() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    name = "",
    color = "",
    logo = "",
    delivery_company_id = "",
    orderData = {},
    fullOrderNo = "",
  } = location.state || {};

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
  const getCurrentTime = () => formatTime(new Date().toTimeString());

  const getTimePlus15Minutes = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    return formatTime(now.toTimeString());
  };

  const branchData = JSON.parse(localStorage.getItem("selectedBranch")) || {};
  const branchName = branchData.name || "";

  const [formData, setFormData] = useState({
    order_id: fullOrderNo || "",
    receive_time: formatTime(orderData.receive_time) || getCurrentTime(),
    ready_time: formatTime(orderData.ready_time) || getTimePlus15Minutes(),
    pickup_time: formatTime(orderData.pickup_time) || getCurrentTime(),
    order_food_item: orderData.order_food_item || "",
    order_drink_item: orderData.order_drink_item || "",
    branch_name: branchName,
    delivery_company_id: delivery_company_id || "",
  });

  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sigCanvas = useRef(null);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignatureBegin = () => {
    document.activeElement.blur();
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

    try {
      const orderCheckResponse = await axios.get(
        `https://opcaapi.anan.sa/Opca/public/api/order-details?OrderId=${fullOrderNo}`
      );

      if (!orderCheckResponse.data || !orderCheckResponse.data.data) {
        setIsLoading(false);
        toast.error("Order not found.");
        return;
      }

      const signatureImage = sigCanvas.current.toDataURL();
      const data = {
        ...formData,
        signature: signatureImage,
      };

      const saveResponse = await axios.post(
        "https://opca-system.faratcards.com/api/confirm-order",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsLoading(false);
      toast.success("Order confirmed successfully!");
      navigate("/order-complete", { state: { name, color, logo } });
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching order data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        toast.error(
          `Error: ${
            error.response.data.message ||
            "Error occurred while fetching order details."
          }`
        );
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="confirm-order-form-container">
      <Header brand_logo={logo} brand_color={color} />
      <div className="confirm-order-form-content content">
        <Btn
          text="go to Restaurants"
          className="back-btn"
          type="button"
          onClick={() => navigate("/show-restaurent")}
        />
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
                type="time"
                name="receive_time"
                className="input-field"
                value={formData.receive_time}
                readOnly
              />
            </div>
          </div>
          <div className="flex">
            <div className="input-wrapper">
              <label className="input-label">Ready Time</label>
              <input
                type="time"
                name="ready_time"
                className="input-field"
                value={formData.ready_time}
                readOnly
              />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Pickup Time</label>
              <input
                type="time"
                name="pickup_time"
                className="input-field"
                value={formData.pickup_time}
                readOnly
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
                onChange={handleInputChange}
                onBlur={() => document.activeElement.blur()}
                value={formData.order_drink_item}
              />
            </div>
          </div>
          <input
            type="hidden"
            name="branch_name"
            value={formData.branch_name}
          />
          <input
            type="hidden"
            name="delivery_company_id"
            value={formData.delivery_company_id}
          />
          <div className="checkbox-wrapper" onClick={toggleChecked}>
            <div className={`checkbox-icon ${checked ? "checked" : ""}`}>
              <FiCheckCircle />
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
              onBegin={handleSignatureBegin}
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
