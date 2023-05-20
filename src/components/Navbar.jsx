// Importing all the libraries and the files needed for this component
import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { db } from "../firebase.utils";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { allParkingLotsAction, selectedParkingLotAction } from "../redux/firebase.slice";
import ParkingLotsStatus from "../routes/elements/ParkingLotsStatus";
import io from "socket.io-client";
import ChangeParkingLot from "../routes/elements/ChangeParkingLot";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");

// This is our main function which will define the component; it includes the functions which will be part of the
// component and the other components which will be included in it
const Navbar = () => {
  // importing the redux state element to be used in this component
  const selectedParkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  // defining the dispatch function which we will use to access the needed redux actions
  const dispatch = useDispatch();

  // Defining a few state variables which we will be using in the component
  const [parkingLotsArray, setParkingLotsArray] = useState([]);
  const [parkingLotsCompleteArray, setParkingLotsCompleteArray] = useState([]);
  const [parkingLotOnBoard, setParkingLotOnBoard] = useState("");

  // The useEffect function which runs when this component mounts for the first time will help in
  // get the parking lot which is selected on the board and all the parking lots for the parkingLots
  // collection in the firestore db.
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "selected", "jCeKiQgdMsh8BAMTgRlr"),
      (doc) => {
        console.log("Current data: ", doc.data());
        setParkingLotOnBoard(doc.data().selectedLot);
      }
    );
    socket.emit("join_room", "16");
    getData();

    return(
      unsub
    )
  }, []);

  // Function to get all the parkingLots in the database (we are using the Firestore documentation in order to get the code which will be used to get the needed data)
  // Firestore docs to get data: https://firebase.google.com/docs/firestore/query-data/get-data
  const getData = async () => {
    const q = query(collection(db, "parkingLots"));

    const parkingLotsArrayTemp = [];
    const parkingLotsArrayCompleteTemp = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // creating an array of parking lots
      parkingLotsArrayTemp.push(doc.data().name);
      parkingLotsArrayCompleteTemp.push(doc.data());
    });
    setParkingLotsArray(parkingLotsArrayTemp);
    setParkingLotsCompleteArray(parkingLotsArrayCompleteTemp);

    // Setting a default value for choosen parkinglot
    const valueReturned = parkingLotsArrayCompleteTemp.find((eachItem) => {
      return eachItem.name === parkingLotsArrayTemp[0];
    });
    dispatch(selectedParkingLotAction(valueReturned.uID));
    dispatch(allParkingLotsAction(parkingLotsArrayCompleteTemp))
  };

  // Defining state variable to control the navbar side panel
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // Data that we get from the database is set as the options variable which will be displayed dropdown menu
  const options = parkingLotsArray;
  const defaultOption = options[0];

  // Function which runs when we have selected a parkinglot from the dropdown on the left panel of the navbar
  const onSelect = (e) => {
    const valueReturned = parkingLotsCompleteArray.find((eachItem) => {
      return eachItem.name === e.value;
    });
    dispatch(selectedParkingLotAction(valueReturned.uID));
  };

  // This function is run when we press the open gate button and it sends the instructions to server to ask the NodeMCU to open the gate
  const emitGateOpen = () => {
    // Open Gate
    socket.emit("send_message", { message: "O", room: "16" });
    // socket.emit("send_this", { message: "DggU5M3HtESO4PLVSGTz, F, T, F, F, F, T", room: "16" });
    console.log('Open Gate')
  };

  // We make use of this function to delete all the bookings in the database
  const delAllBoookings = () => {
    delEachReservation(selectedParkingLotID);
  };

  // The above function calls this functions to carry out the delete operation 
  const delEachReservation = async (parkingLot) => {
    // Getting the code from Firestore documentation 
    const q = query(
      collection(db, `reservations-${parkingLot}`),
      where("timeStamp", "!=", 0)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id);
      carryOutDelofReservations(parkingLot, doc.id);
    });
  };

  // The above function calls this function to carry out the delete operation
  const carryOutDelofReservations = async (parkingLotID, docID) => {
    // We got the code from Firestore to carry out this operation 
    await deleteDoc(doc(db, `reservations-${parkingLotID}`, docID));
  };

  // This block of code returns the elements/components which will be displayed on the screen when the NavBar 
  // component renders (that is when it is run we show all the elements which are below).
  // Note: We have some of these elements which call functions that we have defined above like for example 
  // when a button is clicked it calls the function assigned to the onClick. 
  // UseEffect is block of code which runs as soon as the component is mounted and the data from those functions 
  // saved in the state can be used in the component. 
  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          {/* <ul className="nav-menu-items" onClick={showSidebar}> */}
          <ul className="nav-menu-items">
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <Dropdown
              options={options}
              onChange={onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
            <ParkingLotsStatus></ParkingLotsStatus>
            <div id="allign-bottom">
              {/* <ChangeParkingLot></ChangeParkingLot> */}
              <div id="holder-board-parking-lot">{parkingLotOnBoard}</div>
              <button
                id="bottom-button"
                onClick={delAllBoookings}
              >{`Delete All Bookings`}</button>
              <button
                id="bottom-button"
                onClick={emitGateOpen}
              >{`Open Gate`}</button>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
