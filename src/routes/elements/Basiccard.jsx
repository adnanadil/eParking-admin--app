import React from "react";
import "./Basiccard.css";
import * as AiIcons from "react-icons/ai";


function Basiccard(props) {
  
    const deletVioloation = () => {};

  return (
    <div className="card-holder">
      <p className="violoation-card-header">Parking: P1</p>
      <p className="violoation-card-details">Violation found at 3:00PM</p>
      <AiIcons.AiFillDelete className="delete-icon" />
    </div>
  );
}


export default Basiccard;
