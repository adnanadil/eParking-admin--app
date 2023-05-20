// Importing the libraries and the files needed for this component
import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Edit from "./routes/Edit";
import Home from "./routes/Home";
import Violations from "./routes/Violations";
import Navbar from "./components/Navbar";
import "./App.css";

import store from "./redux/store";
import { Provider } from "react-redux";

// We create a function called AppLayout to have a structure such that we have the NavBar at the top and below it we will show each of the three pages
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// This is the router element which defines the structure of the web app and the various pages that we will have in it 
// Basically we have the navbar and below it are the children which are the three pages of the admin app
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "violations",
        element: <Violations />,
      },
      {
        path: "edit",
        element: <Edit />,
      },
    ],
  },
]);

// Note: We can see above that we have three pages and the NavBar these are components that we will define and code separately. So next we will look at each of these components in details
// Tip: We can find each of the components on the left panel and the imports will help in seeing their locations.

// Index.html is the main html page that we start from and it adds this page as the main page that we start from
// Here we are creating a router structure so that we can have multiple pages in the admin app 
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
