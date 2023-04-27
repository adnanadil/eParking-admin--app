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
} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { selectedParkingLotAction } from "../redux/firebase.slice";
import ParkingLotsStatus from "../routes/elements/ParkingLotsStatus";
import io from "socket.io-client";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");

const Navbar = () => {
  const valueFromRedux = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  const dispatch = useDispatch();

  const [parkingLotsArray, setParkingLotsArray] = useState([]);
  const [parkingLotsCompleteArray, setParkingLotsCompleteArray] = useState([]);
  const [parkingLotOnBoard, setParkingLotOnBoard] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "selected", "jCeKiQgdMsh8BAMTgRlr"), (doc) => {
      console.log("Current data: ", doc.data());
      setParkingLotOnBoard(doc.data().selectedLot)
    });
    socket.emit("join_room", "16");
    // console.log(`this is the value that we have to show ${valueFromRedux}`)
    getData();
  }, []);

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
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const options = ["Mall Of Dahran", "Ithra", "Other Place"];
  const options = parkingLotsArray;
  const defaultOption = options[0];

  const onSelect = (e) => {
    const valueReturned = parkingLotsCompleteArray.find((eachItem) => {
      return eachItem.name === e.value;
    });
    dispatch(selectedParkingLotAction(valueReturned.uID));
  };

  const emitGateOpen = () => {
    // Open Gate
    socket.emit("send_this", { message: "O", room: "16" });
    // socket.emit("send_this", { message: "DggU5M3HtESO4PLVSGTz, T, T, F, F, F, F", room: "16" });
  };

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
              <div id="holder-board-parking-lot">{parkingLotOnBoard}</div>
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
