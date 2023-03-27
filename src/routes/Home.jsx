import "./Home.css";
// import "./Table.css";
import fakeData from "../MOCK_DATA.json";
import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import Table from "./elements/Table";
import { Users } from "./users";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.utils";
import { useSelector } from "react-redux";

function Home() {
  const [search_query, setSearchQuery] = React.useState("");
  // const keys = ["first_name", "last_name", "email"];
  const keys = ["parkingID"];
  const [bookingsArray, setBookingsArray] = useState([])
  const search = (data) => {
    console.log(data)
    return data.filter((item) =>{
      console.log(item)
      keys.some((key) => console.log(`Our key:${item[key]}`))
      return keys.some((key) => item[key].toLowerCase().includes(search_query))
    }
    );
  };
  const selectedParkingLotID = useSelector((state) => state.firebaseSlice.selectedParkingLot)

  useEffect(() => {
    getDataBookings()
  },[selectedParkingLotID])

  const getDataBookings = async () => {
    const q = query(collection(db, `reservations-${selectedParkingLotID}`), where("timeInt", ">=", 0));

    const tempBookingsHolderArray = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempBookingsHolderArray.push(doc.data())
    });
    setBookingsArray(tempBookingsHolderArray)
  };

  return (
    <div className="bookings">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
        { bookingsArray.length != 0 && 
          <Table data={search(bookingsArray)}></Table>
        }
    </div>
  );
}

export default Home;
