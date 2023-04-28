import React from "react";
import "./Basiccard.css";
import * as AiIcons from "react-icons/ai";
import { db } from "../../firebase.utils";
import { doc, deleteDoc } from "firebase/firestore";


function Basiccard({details}) {

    var dateArray = details.date.split(",")
    var date = dateArray[0]
  
    const deleteVioloation = () => {
      // Add the violation ID while you add the booking ... 
      if (window.confirm('Are you sure you wish to delete this item?')) {
        console.log(`Carry out delete for item ${details.documentID}`)
        deleteVioloations(details.documentID)
      }
    };

    const deleteVioloations = async(docID) => {
      await deleteDoc(doc(db, "violations", docID));
      // location.reload();
    }

  return (
    <div className="card-holder">
      <p className="violoation-card-header">{`Parking: ${details.parkingSlotName}`}</p>
      <p className="violoation-card-details">{`Violation found at ${details.timeInt}:${details.minute} on ${date}`}</p>
      <AiIcons.AiFillDelete className="delete-icon" onClick={deleteVioloation}/>
      <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } />
    </div>
  );
}


export default Basiccard;
