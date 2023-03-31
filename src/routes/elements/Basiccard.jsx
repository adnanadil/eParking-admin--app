import React from "react";
import "./Basiccard.css";
import * as AiIcons from "react-icons/ai";


function Basiccard({details}) {
  
    const deletVioloation = () => {
      // Add the violation ID while you add the booking ... 
      // console.log(`Carry out delete for item ${details.violationsID}`)
    };

  return (
    <div className="card-holder">
      <p className="violoation-card-header">{`Parking: ${details.parkingSlotName}`}</p>
      <p className="violoation-card-details">{`Violation found at ${details.timeInt}:00`}</p>
      <AiIcons.AiFillDelete className="delete-icon" />
    </div>
  );
}


export default Basiccard;
