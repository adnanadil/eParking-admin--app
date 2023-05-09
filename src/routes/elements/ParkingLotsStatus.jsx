// this is the component which we have in the NavBar and it shows the status of each parking lot 
// That is based on the parking spot status we show red or green dots to represent the availability 
// of each parking spot. 
// The data is update from directly from socket io based on the data the information the server sends 
// from the NodeMCU.

// Importing the files and libraries
import React, { useEffect, useState } from 'react';
import './ParkingLotsStatus.css'
import io from "socket.io-client";
const socket = io.connect("dry-brushlands-40059.herokuapp.com");
// const socket = io.connect("http://localhost:3001");

// Our main function which we define our logic and elements and export
function ParkingLotsStatus(props) {

    const [timeUpdated, setTimeUpdated] = useState("-")
    const [parkingSlotsStatus, setParkingSlotsStatus] = useState([])
  
    useEffect(() => {
      socket.on("receive_parkings", (data) => {
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
  
          // Working on the data received to manuplate and display it  
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


    // for each parking will be create the dor and use ternary operation to give it the color of
    // red or green based on the status of the parking spot
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

    // we have our elements defined here and are making use of CSS to get the right shape elements 
    // like circles to show the status also we are making use of ternary operation to show the right element 
    // based on the logic like only if we get data from the nodemcu we will display the the status component. 
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