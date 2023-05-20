// This is an element or a custom component which we have in order to show each violation
// Basically from the violation page we call this component and pass the details of the violation as props 
// Based on the violations each card is displayed for a violation.  


// Importing the needed files and libraries 
import React from "react";
import "./Basiccard.css";
import * as AiIcons from "react-icons/ai";
import { db } from "../../firebase.utils";
import { doc, deleteDoc } from "firebase/firestore";


// Main function the Basiccard function. 
function Basiccard({details}) {

  // Details which are sent as props contains a lot of information about the violations like the data
  // ID of the violations and other details we extract and use this information. 
    var dateArray = details.date.split(",")
    var date = dateArray[0]
  
    // This function is called when we press the delete icon on the card
    const deleteVioloation = () => {
      // Add the violation ID while you add the booking ... 
      if (window.confirm('Are you sure you wish to delete this item?')) {
        console.log(`Carry out delete for item ${details.documentID}`)
        deleteViolations(details.documentID)
      }
    };

    // Function delete the violation
    const deleteViolations = async(docID) => {
      await deleteDoc(doc(db, "violations", docID));
    }

  // Here were rendering the needed card component... it has a div that is the main holder 
  // inside it we have the p tag to hold the details and we making use of the delete icon
  // to have the UI to show the delete option.
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
