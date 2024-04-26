import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./components/StarRating";
// import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating defaultRating={4} />
    <StarRating maxRating={5} color="red" message={["bad", "normal", "good"]} />
  </React.StrictMode>
);
