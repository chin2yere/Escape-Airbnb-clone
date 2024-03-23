import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext, ListingsContext } from "./UserContext.js";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userContext, setUserContext] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userContext");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });
  const [listingsContext, setListingsContext] = useState(() => {
    try {
      const storedListing = localStorage.getItem("listingsContext");
      return storedListing ? JSON.parse(storedListing) : null;
    } catch (error) {
      console.error("Error parsing stored listing:", error);
      return null;
    }
  });
  useEffect(() => {
    // Save the user data to storage whenever the user state changes
    if (userContext) {
      localStorage.setItem("userContext", JSON.stringify(userContext));
    } else {
      localStorage.removeItem("userContext");
    }

    if (listingsContext) {
      localStorage.setItem("listingContext", JSON.stringify(listingsContext));
    } else {
      localStorage.removeItem("listingsContext");
    }
  }, [userContext, listingsContext]);
  //console.log(userContext)
  return (
    <div className="app">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <ListingsContext.Provider
          value={{ listingsContext, setListingsContext }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={userContext ? <Home /> : <Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ListingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
