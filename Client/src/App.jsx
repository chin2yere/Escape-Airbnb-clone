import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  UserContext,
  ListingsContext,
  CategoryContext,
  TypeContext,
  BudgetContext,
  StartDateContext,
  EndDateContext,
  ChatsContext,
} from "./UserContext.js";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ListingDetails from "./Pages/ListingDetails/ListingDetails.jsx";
import ChatHome from "./Pages/ChatHome/ChatHome.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserMenu from "./Pages/UserMenu/UserMenu.jsx";
import Profile from "./Pages/Profile/Profile.jsx";
import PastTrips from "./Pages/PastTrips/PastTrips.jsx";
import FutureTrips from "./Pages/FutureTrips/FutureTrips.jsx";
import Wishlist from "./Pages/Wishlist/Wishlist.jsx";
import Map from "./Pages/Map/Map.jsx";
import Wishlisting from "./Pages/WishListing/WishListing.jsx";
import CancelListingSuccess from "./Pages/CancelListingSuccess/CancelListingSuccess.jsx";
import Payment from "./Pages/Payment/Payment.jsx";
import Roomates from "./Pages/Roomates/Roomates.jsx";

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

  const [categoryContext, setCategoryContext] = useState(() => {
    const temp = {
      Apartment: true,
      Villa: true,
      Loft: true,
      Condo: true,
      Cottage: true,
      Cabin: true,
    };
    try {
      const storedCategory = localStorage.getItem("categoryContext");
      return storedCategory ? JSON.parse(storedCategory) : temp;
    } catch (error) {
      console.error("Error parsing stored category:", error);
      return temp;
    }
  });
  const [typeContext, setTypeContext] = useState(() => {
    try {
      const storedType = localStorage.getItem("typeContext");
      return storedType ? JSON.parse(storedType) : "All";
    } catch (error) {
      console.error("Error parsing stored type:", error);
      return "All";
    }
  });
  const [startDateContext, setStartDateContext] = useState(() => {
    try {
      const storedDate = localStorage.getItem("startDateContext");
      return storedDate ? JSON.parse(storedDate) : null;
    } catch (error) {
      console.error("Error parsing stored startDate:", error);
      return null;
    }
  });
  const [endDateContext, setEndDateContext] = useState(() => {
    try {
      const storedDate = localStorage.getItem("endDateContext");
      return storedDate ? JSON.parse(storedDate) : null;
    } catch (error) {
      console.error("Error parsing stored Date:", error);
      return null;
    }
  });

  const [budgetContext, setBudgetContext] = useState(() => {
    try {
      const storedBudget = localStorage.getItem("budgetContext");
      return storedBudget ? parseInt(storedBudget) : 650;
    } catch (error) {
      console.error("Error parsing stored budget:", error);
      return 650;
    }
  });

  const [chatsContext, setChatsContext] = useState(() => {
    try {
      const storedChat = localStorage.getItem("chatsContext");
      return storedChat ? JSON.parse(storedChat) : null;
    } catch (error) {
      console.error("Error parsing stored chats:", error);
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
      localStorage.setItem("listingsContext", JSON.stringify(listingsContext));
    } else {
      localStorage.removeItem("listingsContext");
    }

    if (categoryContext) {
      localStorage.setItem("categoryContext", JSON.stringify(categoryContext));
    } else {
      localStorage.removeItem("categoryContext");
    }

    if (typeContext) {
      localStorage.setItem("typeContext", JSON.stringify(typeContext));
    } else {
      localStorage.removeItem("typeContext");
    }

    if (budgetContext) {
      localStorage.setItem("budgetContext", JSON.stringify(budgetContext));
    } else {
      localStorage.removeItem("budgetContext");
    }

    if (startDateContext) {
      localStorage.setItem(
        "startDateContext",
        JSON.stringify(startDateContext)
      );
    } else {
      localStorage.removeItem("startDateContext");
    }

    if (endDateContext) {
      localStorage.setItem("endDateContext", JSON.stringify(endDateContext));
    } else {
      localStorage.removeItem("endDateContext");
    }

    if (chatsContext) {
      localStorage.setItem("chatsContext", JSON.stringify(chatsContext));
    } else {
      localStorage.removeItem("chatsContext");
    }
  }, [
    userContext,
    listingsContext,
    typeContext,
    budgetContext,
    startDateContext,
    endDateContext,
    chatsContext,
  ]);
  //console.log(userContext)
  return (
    <div className="app">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <ListingsContext.Provider
          value={{ listingsContext, setListingsContext }}
        >
          <CategoryContext.Provider
            value={{ categoryContext, setCategoryContext }}
          >
            <TypeContext.Provider value={{ typeContext, setTypeContext }}>
              <BudgetContext.Provider
                value={{ budgetContext, setBudgetContext }}
              >
                <StartDateContext.Provider
                  value={{ startDateContext, setStartDateContext }}
                >
                  <EndDateContext.Provider
                    value={{ endDateContext, setEndDateContext }}
                  >
                    <ChatsContext.Provider
                      value={{ chatsContext, setChatsContext }}
                    >
                      <BrowserRouter>
                        <Routes>
                          <Route
                            path="/"
                            element={userContext ? <Home /> : <Login />}
                          />
                          <Route path="/login" element={<Login />} />
                          <Route
                            path="/listing/:id"
                            element={<ListingDetails />}
                          />
                          <Route path="/chat" element={<ChatHome />} />
                          <Route path="/usermenu" element={<UserMenu />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/past/trips" element={<PastTrips />} />
                          <Route
                            path="/future/trips"
                            element={<FutureTrips />}
                          />
                          <Route path="/wishlists" element={<Wishlist />} />
                          <Route path="/map" element={<Map />} />
                          <Route path="/wish/list" element={<Wishlisting />} />
                          <Route
                            path="/cancel/success"
                            element={<CancelListingSuccess />}
                          />
                          <Route path="/payment" element={<Payment />} />
                          <Route path="/roomates" element={<Roomates />} />
                        </Routes>
                      </BrowserRouter>
                    </ChatsContext.Provider>
                  </EndDateContext.Provider>
                </StartDateContext.Provider>
              </BudgetContext.Provider>
            </TypeContext.Provider>
          </CategoryContext.Provider>
        </ListingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
