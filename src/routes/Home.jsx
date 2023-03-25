import "./Home.css";
// import "./Table.css";
import fakeData from "../MOCK_DATA.json";
import * as React from "react";
import { useTable } from "react-table";
import Table from "./elements/Table";
import { Users } from "./users";

function Home() {
  const [query, setQuery] = React.useState("");
  const keys = ["first_name", "last_name", "email"];
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const getData = async () => {
    const docRef = doc(db, "parkingLots", "DggU5M3HtESO4PLVSGTz");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  };

  return (
    <div className="bookings">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
        <Table data={search(Users)}></Table>
    </div>
  );
}

export default Home;
