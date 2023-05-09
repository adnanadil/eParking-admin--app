// We have made a spinner component so that we can use it everywhere we need a spinner instead of 
// coding a spinner very time 

import React from "react";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
  );
}