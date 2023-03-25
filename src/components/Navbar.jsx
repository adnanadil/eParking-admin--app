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
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  // const valueFromRedux = useSelector((state) => state.firebaseSlice.value)

  useEffect(() => {
    // console.log(`this is the value that we have to show ${valueFromRedux}`)
    // getData()
  }, []);

  const getData = async () => {
    const docRef = doc(db, "parkingLots", "DggU5M3HtESO4PLVSGTz");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const options = ["Mall Of Dahran", "Ithra", "Other Place"];
  const defaultOption = options[0];

  const onSelect = () => {
    console.log(`Option selected...`);
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
            <button id="allign-bottom">Open Gate</button>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
