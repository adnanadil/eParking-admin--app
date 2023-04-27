import React, { useEffect, useState } from 'react';
import './ParkingLotsStatus.css'
import io from "socket.io-client";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");

function ParkingLotsStatus(props) {


    const [timeUpdated, setTimeUpdated] = useState("-")
    const [parkingSlotsStatus, setParkingSlotsStatus] = useState([])
  
    useEffect(() => {
      socket.on("receive_parkings", (data) => {
        // setMessageReceived(data.message);
        let recievedDataFromSocketio = data.message
        if(recievedDataFromSocketio !== "O"){
          // This means we got data from the board
          // Get the time and save it in redux and get the status of each and save in redux
          console.log(`Recived data ${data.message}`)
          var unixTimestamp = Date.now();
          var localDate_fromUnix = new Date(unixTimestamp).toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short",
          });
          const slitStringArray = localDate_fromUnix.split(" ")
          let timeUpdatedLocal = `${slitStringArray[1]} ${slitStringArray[2]}`
          console.log(`This is the time: ${slitStringArray[1]} ${slitStringArray[2]}`)
  
          // Working on the data recived 
          let arr = recievedDataFromSocketio.split(", ");
          let parkingLotID = arr.shift();
          let parkingsStatusArr = [];
          let i;
          for (i = 0; i < arr.length; i++) {
            parkingsStatusArr.push(arr[i])
          }
          console.log(parkingsStatusArr)
          setTimeUpdated(timeUpdatedLocal)
          setParkingSlotsStatus(parkingsStatusArr)
        }
      });
    }, [socket]);


    function EachParking({details, index}) {
        return (
        <div>
            <div className='name-dot-holder'>
                {`P${index + 1}`}
                {
                    details === "T" ? 
                    <span class="dot-red"></span> :
                    <span class="dot-green"></span>
                }  
            </div>
        </div>
        );
    } 

    return (
        <div className='mainStausHolder'>
            <div>{`Parking Slots Status`}</div>
            {parkingSlotsStatus.length !== 0 ?
            <div className='statusHolder'>
            {parkingSlotsStatus.map((eachViolation, index) => (
                <div>
                <EachParking key={index} details={eachViolation} index= {index} />
            </div>
            ))}
            <div>{`Last Updated  ${timeUpdated}`}</div>
            </div> : 
            <div></div>
            }
        </div>
    );
}

export default ParkingLotsStatus;