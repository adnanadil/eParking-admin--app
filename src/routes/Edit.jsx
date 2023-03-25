import React, { useState } from "react";
import "./Edit.css";

function Edit() {
  const [parkingLotEditedName, setParkingLotEditedName] = useState("");
  const [editedCostPerHour, setEditedCostPerHour] = useState(0);

  return (
    <div className="edits">
      <p>Edit Parking Lot Name</p>
      <input
        className="edit-parking-lot-name-label"
        placeholder="Parking Lot Name"
        onChange={(e) => setParkingLotEditedName(e.target.value.toLowerCase())}
      />
      <p className="edit-parking-lot-cost-p">Edit Cost per hour</p>
      <input
        className="edit-parking-lot-cost-label"
        placeholder="10 SAR"
        onChange={(e) => setEditedCostPerHour(e.target.value.toLowerCase())}
      />
      <p className="p-holder-parking-lot-number">
        Change the number of parking slots
      </p>
      <div className="holder-parking-lot-number">
        <button className="button-value-change">+</button>
        <p className="costPerHour">10</p>
        <button className="button-value-change">-</button>
      </div>
      <div className="submit-button-holder">
        <button className="submit-button">Open Gate</button>
      </div>
    </div>
  );
}

export default Edit;
