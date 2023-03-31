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

function Violations() {
  const parkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

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
      tempHolderArray.push(doc.data());
    });
    // setBookingsArray(tempHolderArray);
    // setLoading(false);
    console.log(`These are the violoations array:`);
    console.log(tempHolderArray);
    setViolations(tempHolderArray);
  };

  return (
    <div className="violations">
      {
        // Add a loader
        violoations.map((eachViolation, index) => (
          <Basiccard 
            key={index}
            details = {eachViolation}
          />
        ))
      }
    </div>
  );
}

export default Violations;
