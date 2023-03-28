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
      setSettingTrue(true)
    }, 1000);
  }, []);

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
