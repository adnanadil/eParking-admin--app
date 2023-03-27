import React from "react";
import './Table.css'

function Table({ data }) {
  return (
    <div className="table-holder">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Parking Slot</th>
            <th>Start Time</th>
            <th>Duration</th>
          </tr>
          {data.map((item) => (
            <tr key={item.timeString}>
              <td>{item.parkingSlot}</td>
              <td>{item.parkingSlot}</td>
              <td>{item.timeString}</td>
              <td>{item.timeString}</td>
              <td>{item.timeString}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
