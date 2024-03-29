import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  UserContext,
  ListingsContext,
  CategoryContext,
  TypeContext,
  BudgetContext,
} from "./UserContext.js";
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
      return All;
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
  }, [userContext, listingsContext, typeContext, budgetContext]);
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
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={userContext ? <Home /> : <Login />}
                    />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </BrowserRouter>
              </BudgetContext.Provider>
            </TypeContext.Provider>
          </CategoryContext.Provider>
        </ListingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
