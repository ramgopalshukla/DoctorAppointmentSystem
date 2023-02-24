import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Publicrouter({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
