import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx"
import PaymentSlip from "./components/PaymentSlip/PaymentSlip.jsx"
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx"
import Membership from "./components/Membership/Membership.jsx"
import Dashboard from "./components/Dashboard/Dashboard.jsx"
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/paymentslip",
    element: <PaymentSlip />,
  },
  {
    path: "/paymentmethod",
    element: <PaymentMethod />,
  },
  {
    path: "/membership",
    element: <Membership />
  },
  {
    path: "/dashboard",
    element:<Dashboard />
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />,
    </RouterProvider>
  </React.StrictMode>
);
