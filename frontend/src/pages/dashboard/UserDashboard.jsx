import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Home from "../home/home";
import Cart from "../cart/cart";
import PlaceOrder from "../placeorder/placeorder";

const UserDashboard = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default UserDashboard; 