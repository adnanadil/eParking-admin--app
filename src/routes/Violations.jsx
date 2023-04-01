import React, { useEffect, useState } from "react";
import Basiccard from "./elements/Basiccard";
import { db } from "../firebase.utils";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import Spinner from "./elements/Spinner";

function Violations() {
  const parkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  const [isLoading, setIsLoading] = useState(true);
  const [showNoViolations, setShowNoViolations] = useState(false);
  const [violoations, setViolations] = useState([]);

  useEffect(() => {
    getViolations();
  }, [parkingLotID]);

  const getViolations = async () => {
    const q = query(
      collection(db, `violations`),
      where("parkingLotID", "==", parkingLotID)
    );

    const tempHolderArray = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      var documentID = doc.id;
      tempHolderArray.push({ documentID, ...doc.data() });
    });
    console.log(`These are the violoations array:`);
    console.log(tempHolderArray);
    setViolations(tempHolderArray);
    setIsLoading(false);
    setTimeout(() => {
      setShowNoViolations(true);
    }, 1000);
  };

  return (
    <div className="violations">
      {
        // Add a loader
        isLoading ? (
          <Spinner></Spinner>
        ) : (
          violoations.length !=0 ?
          violoations.map((eachViolation, index) => (
            <Basiccard key={index} details={eachViolation} />
          )) : showNoViolations && <div>No Violotions Found </div>
        )
      }
    </div>
  );
}

export default Violations;
