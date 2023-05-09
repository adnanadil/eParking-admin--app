// This is the bookings page where we are able to see the table of bookings and the search field at the top
// In this component we are making use of the search element which is Text in put field and another component
// which is the table component to show the bookings

// Here we are importing the libraries and files needed for the component
import "./Home.css";
import React, { useEffect, useState } from "react";
import Table from "./elements/Table";
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

// This is the main function which houses all the logic and elements which will be part of this component.
function Home() {
  // defining our state variables.
  const [search_query, setSearchQuery] = React.useState("");
  const keys = ["parkingSlot", "userName", "userEmail", "timeString"];
  const [bookingsArray, setBookingsArray] = useState([]);
  const [loading, setLoading] = useState(true);

  // Making use of the redux state variables hence we are using the useSelector function of the redux library
  const bookingsFound = useSelector(
    (state) => state.firebaseSlice.bookingsFound
  );
  const selectedParkingLotID = useSelector(
    (state) => state.firebaseSlice.selectedParkingLot
  );

  // The function which is called to filter the table when we enter values in the search field
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(search_query))
    );
  };

  // UseEffect is used to get the data every time the component mounts and it sets the state loading to be true
  // to show the spinner.
  useEffect(() => {
    setLoading(true);
    getDataBookings();
  }, [selectedParkingLotID]);

  // Function to get the bookings of the past three days from the firestore database for the selected parking lot.
  const getDataBookings = async () => {
    // Making use of the unix timestamp in order to get the date range from the current data to the data of the three days from today.
    var unixTimestamp_2 = Date.now();
    unixTimestamp_2 = unixTimestamp_2;
    var localDate_fromUnix = new Date(unixTimestamp_2).toLocaleString("en-US", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });

    // We manuplate the local time and data that we get from the unix time stamp.
    // that is we divide the string based on a space so we have an array that contains the
    // the data, time and other values separately.
    const slitStringArray = localDate_fromUnix.split(" ");

    const dateInString = slitStringArray[0];
    var timeStamp = moment(dateInString, "MM/DD/YYYY").unix();

    const q = query(
      collection(db, `reservations-${selectedParkingLotID}`),
      where("timeStamp", ">=", timeStamp - 86400 * 3)
    );

    // Getting real time update of the bookings from the firestore database
    // the firestore docs helps us to get this code so we just modified it
    // based on the structure of our database.
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
  };

  // The useEffect will help in re-rendering the booking component whenever the value is changed in the database hence allowing us to
  // implement real time functionality.
  useEffect(() => {}, [bookingsFound]);

  // This return function helps us see the elements and components which will be rendered by the Home components (which is the bookings component)
  // The elements and components also make use of a few functions that we have defined above.
  // Note: We are sending refined data to the tables components based on the search filed as props to it
  // As we learned from react docs props are values which we can send to child to display or use and re-renders the child
  // the props value change and hence we are able to implement the logic of search functionality.
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
