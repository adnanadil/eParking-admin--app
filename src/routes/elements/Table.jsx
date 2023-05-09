// This is the table that we have in the Home.jsx file (the booking page)
// It is a component and hence the code below is like the code for any component where we import
// use the useEffect hook, and then finally return a table element to be printed in the bookings page
// the data to be displayed is received from the bookings page (Home.js) based on the filtered data of the
// search field.

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoBookings from "./NoBookings";
import "./Table.css";

function Table({ data }) {
  const bookingsFound = useSelector(
    (state) => state.firebaseSlice.bookingsFound
  );
  const [settingTrue, setSettingTrue] = useState(false);

  useEffect(() => {
    console.log(`Table: Booking Found ${bookingsFound}`);
    setTimeout(() => {
      setSettingTrue(true);
    }, 1000);
  }, []);

  // We will show a table based on the data that we get from the Home.js as props, these
  // props are filtered by the search field
  return (
    <div className="table-holder">
      {data != 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Parking</th>
              <th>Time</th>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {data.map((item) => (
              <tr key={item.parkingID}>
                <td>{item.parkingSlot}</td>
                <td>{item.timeString}</td>
                <td>{item.date}</td>
                <td>{item.userName}</td>
                <td>{item.userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        settingTrue && <NoBookings></NoBookings>
      )}
    </div>
  );
}

export default Table;
