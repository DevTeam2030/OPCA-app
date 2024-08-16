import React from "react";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import ChooseBrand from "./pages/choose-brand/ChooseBrand";
import OrderVerification from "./pages/order-verification/OrderVerification";
import DigitsVerification from "./pages/digits-verification/DigitsVerification";
import ConfirmOrder from "./pages/confirm-order/ConfirmOrder";
import ConfirmOrderForm from "./pages/confirm-order-form/ConfirmOrderForm";
import OrderComplete from "./pages/order-complete/OrderComplete";
import ShowRestaurent from "./pages/show-restaurent/ShowRestaurent";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/choose-brand" element={<ChooseBrand />} />
      <Route exact path="/verify-order" element={<OrderVerification />} />
      <Route
        exact
        path="/digits-verification"
        element={<DigitsVerification />}
      />
      <Route exact path="/confirm-order" element={<ConfirmOrder />} />
      <Route exact path="/confirm-order-form" element={<ConfirmOrderForm />} />
      <Route exact path="/order-complete" element={<OrderComplete />} />
      <Route exact path="/show-restaurent" element={<ShowRestaurent />} />
    </Routes>
  );
}

export default App;
