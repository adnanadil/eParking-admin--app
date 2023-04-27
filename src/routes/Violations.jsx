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
  onSnapshot
} from "firebase/firestore";
import { useSelector } from "react-redux";
import Spinner from "./elements/Spinner";
import io from "socket.io-client";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");


function Violations() {
  const parkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  const [isLoading, setIsLoading] = useState(true);
  const [showNoViolations, setShowNoViolations] = useState(false);
  const [violoations, setViolations] = useState([]);



  useEffect(() => {
    // socket.emit("send_this", { message: "DggU5M3HtESO4PLVSGTz, F, F, F, F, F, F", room: "16" });
    getViolations();
  }, [parkingLotID]);

  const getViolations = async () => {
    const q = query(
      collection(db, `violations`),
      where("parkingLotID", "==", parkingLotID)
    );

    // const tempHolderArray = [];
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   var documentID = doc.id;
    //   tempHolderArray.push({ documentID, ...doc.data() });
    // });
    // console.log(`These are the violoations array:`);
    // console.log(tempHolderArray);
    // setViolations(tempHolderArray);
    // setIsLoading(false);

    // REAL TIME
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
    // REAL TIME


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
