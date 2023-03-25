import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const options = [
    'Mall Of Dahran', 'Ithra', 'Other Place'
  ];
  const defaultOption = options[0];

  const onSelect = () => {
    console.log(`Option selected...`)
  }

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
          <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option" />
          {/* <dev id="allign-bottom">Hello There</dev> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navba;
