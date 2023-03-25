import React from "react";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

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
