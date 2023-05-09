// Importing the needed libraries and files needed for the violations component (the violations page)
import React, { useEffect, useState } from "react";
import Basiccard from "./elements/Basiccard";
import { db } from "../firebase.utils";
import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { useSelector } from "react-redux";
import Spinner from "./elements/Spinner";
import io from "socket.io-client";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");


// The main function of the violations page which has all the functions and the return 
// function to return the needed components and elements to be displayed.
function Violations() {
  const parkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  // Defining a few state elements which will be used in the component 
  const [isLoading, setIsLoading] = useState(true);
  const [showNoViolations, setShowNoViolations] = useState(false);
  const [violoations, setViolations] = useState([]);


  // Using the useEffect function to get the violations 
  useEffect(() => {
    getViolations();
  }, [parkingLotID]);

  // The function to get the violations in real time and it updates as the data in the database update or changes
  const getViolations = async () => {
    const q = query(
      collection(db, `violations`),
      where("parkingLotID", "==", parkingLotID)
    );

    // Implementing real time update (we got help from the firestore documentation)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempHolderArray_2 = [];
      querySnapshot.forEach((doc) => {
        var documentID = doc.id;
        tempHolderArray_2.push({ documentID, ...doc.data() });
        // console.log(doc.data());
      });
      console.log(tempHolderArray_2);
      setViolations(tempHolderArray_2);
      setIsLoading(false);
    });

    // making use of the JavaScript timeout function to be used in the logic of showing the spinner 
    // 1 second after the data is loaded for making the app look and feel better in terms of the UX.
    setTimeout(() => {
      setShowNoViolations(true);
    }, 1000);
  };

  // This is the return command which returns the elements and components which are part of the violations component.
  // We are importing a new element called the basic card which is the card used to display each violation
  // the .map() as we learned is a form of for loop function of JavaScript which is used a lot in React.
  // we are also making use of ternary operation of JavaScript to show the right element at the right time 
  // that is when the data is being loaded from the data we show the spinner and once that is done we then show the 
  // cards of the violations and if there are no violations then we show the message of no violations.   
  return (
    <div className="violations">
      {
        // Add a loader
        isLoading ? (
          <Spinner></Spinner>
        ) : (
          violoations.length !=0 ?
          violoations.map((eachViolation, index) => (
            <div>
            <Basiccard key={index} details={eachViolation} />
            </div>
          )) : showNoViolations && 
          <div>
          No Violotions Found 
          </div>
        )
      }
    </div>
  );
}

export default Violations;
