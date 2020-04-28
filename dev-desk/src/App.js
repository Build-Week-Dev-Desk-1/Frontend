import React, { useEffect, useState, createContext } from "react";

//importing components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import CreateTicket from "./components/CreateTicket";
import "./App.css";



export default function App() {
 
  return (
    <div>
      <Header />
      <div className="login-splash">
        <Login />
        <Signup />
      </div>
      <CreateTicket />
    </div>
  );
}

// HTTP - Path - Desc -	Data

// POST	/api/auth/register	Registers new user.	Expects {"username":"", "password":"", "email":""}

// Returns { "id":##, "username":""}

// POST	/api/auth/login	Logs in a user.	Expects {"username":"", "password":""}
