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
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { bookingsAction } from "../redux/firebase.slice";
import Spinner from "./elements/Spinner";

function Home() {
  const dispatch = useDispatch();
  const [search_query, setSearchQuery] = React.useState("");
  const bookingsFound = useSelector(
    (state) => state.firebaseSlice.bookingsFound
  );
  // const keys = ["first_name", "last_name", "email"];
  const keys = ["parkingSlot", "userName", "userEmail", "timeString"];
  const [bookingsArray, setBookingsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [bookingFound, setBookingFound] = useState(true);
  // const search = (data) => {
  //   // console.log(data)
  //   return data.filter((item) => {
  //     // console.log(item)
  //     // keys.some((key) => console.log(`Our key:${item[key]}`))
  //     return keys.some((key) => item[key].toLowerCase().includes(search_query));
  //   });
  // };
  const search = (data) => {
    // console.log(data)
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search_query))
    );
  };
  const selectedParkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  useEffect(() => {
    setLoading(true);
    getDataBookings();
  }, [selectedParkingLotID]);

  const getDataBookings = async () => {
    var unixTimestamp_2 = Date.now();
    unixTimestamp_2 = unixTimestamp_2;
    var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString("en-US", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });

    const slitStringArray = localDate_fromUnix.split(" ");

    // const dateInString = localDate_fromUnix.slice(0, 10);
    const dateInString = slitStringArray[0];
    var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();

    const q = query(
      collection(db, `reservations-${selectedParkingLotID}`),
      where("timeStamp", ">=", timeStamp - 86400 * 3)
    );

    // const tempBookingsHolderArray = [];
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   tempBookingsHolderArray.push(doc.data());
    // });
    // dispatch(bookingsAction(tempBookingsHolderArray));
    // setBookingsArray(tempBookingsHolderArray);
    // setLoading(false);

    // REAL TIME
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempBookingsHolderArray = [];
      querySnapshot.forEach((doc) => {
        var documentID = doc.id;
        tempBookingsHolderArray.push({ documentID, ...doc.data() });
        // console.log(doc.data());
      });
      console.log(tempBookingsHolderArray);
      setBookingsArray(tempBookingsHolderArray);
      setLoading(false);
    });
    // REAL TIME
  };

  useEffect(() => {
    console.log(`re-render table ${bookingsFound}`);
    document.addEventListener("keydown", detectKeyboard, true);
  }, [bookingsFound]);

  const detectKeyboard = (e) => {
    console.log(`This is pressed: ${e.key}`);
  };

  return (
    <div className="bookings">
      <input
        style={{ alignSelf: "flex-start" }}
        className="search"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
      {loading && bookingsArray.length == 0 ? (
        <Spinner></Spinner>
      ) : (
        <Table data={search(bookingsArray)}></Table>
      )}
    </div>
  );
}

export default Home;
