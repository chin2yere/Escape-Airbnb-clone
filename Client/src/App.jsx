import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./UserContext.js";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  useEffect(() => {
    
    // Save the user data to storage whenever the user state changes
    if (userContext) {
      localStorage.setItem("userContext", JSON.stringify(userContext));
    } else {
      localStorage.removeItem("userContext");
    }
    
  }, [userContext]);
  //console.log(userContext)
  return (
    <div className="app">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        
            <BrowserRouter>
              <Routes>
                <Route path="/" element={userContext ? <Home /> : <Login />} />
                <Route path="/login" element={<Login />} />
                
                
              </Routes>
            </BrowserRouter>
          
      </UserContext.Provider>
    </div>
  );
}

export default App;