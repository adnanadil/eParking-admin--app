// This is the third page of the application and we use this page in order to edit the details of the parking lots 

// here we are importing the needed libraries and files.
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Edit.css";
import { db } from "../firebase.utils";
import { collection, query, where, getDocs,  doc, updateDoc } from "firebase/firestore";
import Spinner from "./elements/Spinner";


// This is the main function of the edit component (or page)
function Edit() {

  // We are defining a few state variables which will be used by the Edit component (Page)
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

  // We are also making use of the redux state value to know the parking lot which is currently selected. 
  const selectedParkingLot = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  // This function is run with the edit page is mounted and when the selectedParkingLot value changes in the 
  // redux that is when we select a new parking lot from the navbar then we re-render or update this page to show 
  // the new parking lot details to be edited.
  useEffect(() => {
    getDetailsOfParkingLot();
  }, [selectedParkingLot]);

  // Function to get the details of the parking lot which is chosen from the side bar on the Navbar
  const getDetailsOfParkingLot = async () => {
    const q = query(
      collection(db, "parkingLots"),
      where("uID", "==", selectedParkingLot)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
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

  // This function is run anytime the url field is updated in the edit page.
  // As a safety feature to show the admin that the url links to an image the display image is set to
  // the image in the URl entered or pasted 
  const imageURLentered = (e) => {
    if (e.target.value.toLowerCase() == "") {
      setParkingLotImage(selectedParkingLotDetails.imageURL);
      setParkingLotEditedImage(selectedParkingLotDetails.imageURL);
    } else {
      setParkingLotImage(e.target.value);
      setParkingLotEditedImage(e.target.value);
    }
  };

  // This function is called when the + button is pressed to increase the number of parking lots
  // Here we update the parking lots local state to a number higher than the previous value
  // but the data in the database is only updated when we press the update button
  const upButtonPressed = () => {
    if ((numberOfParkingSlots => 0) && (numberOfParkingSlots < 10)) {
      setNumberOfParkingSlots(numberOfParkingSlots + 1);
    }
  };

  // Same logic but to reduce the number when the - button is pressed
  const downButtonPressed = () => {
    if ((numberOfParkingSlots > 0) && (numberOfParkingSlots <= 10)) {
      setNumberOfParkingSlots(numberOfParkingSlots - 1);
    }
  };

  // This function is to update the parking lot details and is run when the update button is pressed
  // we take a confirmation from the user and then we will update the data
  const updateDetails = () => {
    if (window.confirm("Are you sure you wish to make the changes?")) {
      console.log(`Carry out edit for item ${selectedParkingLot}`);
      makeChanges(selectedParkingLot);
    }
  };

  // our function to update the details of the parking and update the value in the database
  const makeChanges = async (selectedParkingLot) => {
    setLoading(true);
    var pakingLots = []
    for (let i = 1; i <= numberOfParkingSlots; i++){
      pakingLots.push(`P${i}`)
    }
    console.log(`No of lots ${pakingLots}`);

    const docRef = doc(db, "parkingLots", selectedParkingLot);

    await updateDoc(docRef, {
      
      name: parkingLotEditedName,
      label: parkingLotEditedName,
      parkingSlots: pakingLots,
      imageURL: parkingLotEditedImage,
      costPerHour: parseInt(editedCostPerHour),
    });
    location.reload()
  };

  // Here we define the elements and components which we want to show or display in the 
  // the edit page ... we can see we have a lot of elements such as image, input fields, 
  // buttons and much more. Some of these elements call functions that we have defined above. 
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
