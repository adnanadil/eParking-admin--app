import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Edit.css";
import { db } from "../firebase.utils";
import { collection, query, where, getDocs,  doc, updateDoc } from "firebase/firestore";
import Spinner from "./elements/Spinner";


function Edit() {
  const [parkingLotEditedName, setParkingLotEditedName] = useState("");
  const [parkingLotEditedImage, setParkingLotEditedImage] = useState("");
  const [editedCostPerHour, setEditedCostPerHour] = useState(0);

  const [parkingLotName, setParkingLotName] = useState("");
  const [parkingLotImage, setParkingLotImage] = useState("");
  const [costPerHour, setCostPerHour] = useState(0);
  const [numberOfParkingSlots, setNumberOfParkingSlots] = useState(0);

  const [selectedParkingLotDetails, setSelectedParkingLotDetails] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const selectedParkingLot = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  useEffect(() => {
    getDetailsOfParkingLot();
  }, [selectedParkingLot]);

  const getDetailsOfParkingLot = async () => {
    const q = query(
      collection(db, "parkingLots"),
      where("uID", "==", selectedParkingLot)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setSelectedParkingLotDetails(doc.data());
      setParkingLotName(doc.data().name);
      setParkingLotEditedName(doc.data().name);
      setParkingLotImage(doc.data().imageURL);
      setParkingLotEditedImage(doc.data().imageURL);
      setCostPerHour(doc.data().costPerHour);
      setEditedCostPerHour(doc.data().costPerHour);
      setNumberOfParkingSlots(doc.data().parkingSlots.length);
    });
    setLoading(false);
    setTimeout(() => {
      setShow(true);
    }, 1000);
  };

  const imageURLentered = (e) => {
    if (e.target.value.toLowerCase() == "") {
      setParkingLotImage(selectedParkingLotDetails.imageURL);
      setParkingLotEditedImage(selectedParkingLotDetails.imageURL);
    } else {
      setParkingLotImage(e.target.value);
      setParkingLotEditedImage(e.target.value);
    }
  };

  const upButtonPressed = () => {
    if ((numberOfParkingSlots => 0) && (numberOfParkingSlots < 10)) {
      setNumberOfParkingSlots(numberOfParkingSlots + 1);
    }
  };

  const downButtonPressed = () => {
    if ((numberOfParkingSlots > 0) && (numberOfParkingSlots <= 10)) {
      setNumberOfParkingSlots(numberOfParkingSlots - 1);
    }
  };

  const updateDetails = () => {
    if (window.confirm("Are you sure you wish to make the changes?")) {
      console.log(`Carry out edit for item ${selectedParkingLot}`);
      makeChanges(selectedParkingLot);
    }
  };

  const makeChanges = async (selectedParkingLot) => {
    setLoading(true);
    var pakingLots = []
    for (let i = 1; i <= numberOfParkingSlots; i++){
      pakingLots.push(`P${i}`)
    }
    console.log(`No of lots ${pakingLots}`);

    const docRef = doc(db, "parkingLots", selectedParkingLot);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      
      name: parkingLotEditedName,
      label: parkingLotEditedName,
      parkingSlots: pakingLots,
      imageURL: parkingLotEditedImage,
      costPerHour: parseInt(editedCostPerHour),
    });
    // setLoading(false);
    location.reload()
  };

  return (
    <div className="edits">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        show && (
          <>
            <img
              src={parkingLotImage}
              alt="Parking Lot Image"
              width="300"
              height="200"
            ></img>
            <p>Change image</p>
            <input
              className="edit-parking-lot-image-label"
              placeholder="Paste the new image url"
              // onChange={imageURLentered}
              onKeyUp={imageURLentered}
            />
            <p>Edit Parking Lot Name</p>
            <input
              className="edit-parking-lot-name-label"
              placeholder={parkingLotName}
              onChange={(e) => setParkingLotEditedName(e.target.value)}
            />
            <p className="edit-parking-lot-cost-p">Edit Cost per hour</p>
            <input
              type="number"
              className="edit-parking-lot-cost-label"
              placeholder={`${costPerHour} SAR`}
              onChange={(e) =>
                setEditedCostPerHour(e.target.value.toLowerCase())
              }
            />
            <p className="p-holder-parking-lot-number">
              Change the number of parking slots
            </p>
            <div className="holder-parking-lot-number">
              <button
                className="button-value-change"
                onClick={downButtonPressed}
              >
                -
              </button>
              <p className="costPerHour">{numberOfParkingSlots}</p>
              <button className="button-value-change" onClick={upButtonPressed}>
                +
              </button>
            </div>
          </>
        )
      )}
      <div className="submit-button-holder">
        <button className="submit-button" onClick={updateDetails}>
          Make Changes
        </button>
      </div>
    </div>
  );
}

export default Edit;
