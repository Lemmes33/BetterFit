import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import PaymentSlip from "./components/PaymentSlip/PaymentSlip.jsx";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx";
import Membership from "./components/Membership/Membership.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Protein from "./components/Protein/Protein.jsx";
import Gluten from "./components/Gluten/Gluten.jsx";
import Vegan from "./components/Vegan/Vegan .jsx";
import Nutrition from "./components/Nutrition/Nutrition.jsx";
import Programs from "./components/Programs/Programs.jsx";
import Vegetable from "./components/Vegetable Salad/Vegetable.jsx";
import Tofu from "./components/ Tofu with Pesto/Tofu.jsx";
import Sweetpotato from "./components/SweetPotato/SweetPotato.jsx";
import Peppers from "./components/Stuffed-Peppers/Peppers.jsx";
import Steak from "./components/Spinach-Feta/Steak.jsx";
import Cauliflower from "./components/Cauliflower/Cauliflower.jsx";
import Chicken from "./components/Chicken-Cordon/Chicken.jsx";
import Bean from "./components/Bean-Salad/Bean.jsx";
import Pilates from "./components/Pilates/Pilates.jsx";
import Zumba from "./components/Zumba/Zumba.jsx";
import Cardio from "./components/Cardio/Cardio.jsx";
import MuscleToning from "./components/Muscle-Toning/Muscletoning.jsx";
import Martialarts from "./components/Martial-Arts/Martialarts.jsx";
import Teambuilding from "./components/Team-Building/Teambuilding.jsx";
import Register from "./components/Register/Register.jsx"
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
    element: <Membership />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/gluten",
    element: <Gluten />,
  },
  {
    path: "/vegan",
    element: <Vegan />,
  },
  {
    path: "/protein",
    element: <Protein />,
  },
  {
    path: "/nutrition",
    element: <Nutrition />,
  },
  {
    path: "/programs",
    element: <Programs />,
  },
  {
    path: "/chicken",
    element: <Chicken />,
  },
  {
    path: "/tofu",
    element: <Tofu />,
  },
  {
    path: "/vegetable",
    element: <Vegetable />,
  },
  {
    path: "/sweetpotato",
    element: <Sweetpotato />,
  },
  {
    path: "/peppers",
    element: <Peppers />,
  },
  {
    path: "/steak",
    elements: <Steak />,
  },
  {
    path: "/cauliflower",
    element: <Cauliflower />,
  },
  {
    path: "/bean",
    element: <Bean />,
  },
  {
    path: "/martialarts",
    element: <Martialarts />,
  },
  {
    path: "/pilates",
    element: <Pilates />,
  },
  {
    path: "/muscletoning",
    element: <MuscleToning />,  
  },
  {
    path: "/zumba",
    element: < Zumba />,
  },
  {
    path: "/cardio",
    element: < Cardio />,
  },
  {
    path: "teambuilding",
    element: < Teambuilding />,
  },
  {
    path: "/register",
    element: < Register />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />,
    </RouterProvider>
  </React.StrictMode>
);
