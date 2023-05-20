import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ChangeParkingLot.css";
import { useSelector } from "react-redux";
import { db } from "../../firebase.utils";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function ChangeParkingLot(props) {
  var allParkingLots = useSelector(
    (state) => state.firebaseSlice.allParkingLots
  );

  var parkingLotSelected  = ""
  var parkingLotSelectedID = ""

  var changeParkingLotPressed = (value) => {
    const valueReturned = allParkingLots.find((eachItem) => {
      return eachItem.name === value;
    });
    parkingLotSelected = value
    parkingLotSelectedID = valueReturned.uID
    console.log(value);
    updateParkingLot()
  };

  const updateParkingLot = async () => {
    const docRef = doc(db, "selected", "jCeKiQgdMsh8BAMTgRlr");

    await updateDoc(docRef, {
      selectedLot: parkingLotSelected,
      selectedLotID: parkingLotSelectedID,
    });
  };

  return (
    <div className="buttonHolder">
      <Button
        className="changeButton"
        onClick={() => changeParkingLotPressed("Ithra")}
      >
        L1
      </Button>
      <Button
        className="changeButton"
        onClick={() =>
          changeParkingLotPressed("Prince Mohammed Bin Fahd University")
        }
      >
        L2
      </Button>
      <Button
        className="changeButton"
        onClick={() => changeParkingLotPressed("Othaim Mall")}
      >
        L3
      </Button>
      <Button
        className="changeButton"
        onClick={() => changeParkingLotPressed("Mall Of Dhahran")}
      >
        L4
      </Button>
    </div>
  );
}

export default ChangeParkingLot;
