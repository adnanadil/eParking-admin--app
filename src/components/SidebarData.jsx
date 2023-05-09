// Importing the needed libraries of react and the icons
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

// we are exporting the details of the three links so that we can loop through them and
// display them on the side of the NavBar.
export const SidebarData = [
  {
    title: "Bookings",
    path: "/",
    icon: <RiIcons.RiParkingFill />,
    cName: "nav-text",
  },
  {
    title: "violations",
    path: "/violations",
    icon: <BiIcons.BiErrorAlt />,
    cName: "nav-text",
  },
  {
    title: "Edit",
    path: "/edit",
    icon: <FaIcons.FaEdit />,
    cName: "nav-text",
  },
];
