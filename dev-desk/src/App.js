import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import * as yup from "yup";

import CreateTicket from "./components/CreateTicket";
import "./App.css";

//importing components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";

const initialFormValues = {
  name: "",
  password: ""
};

export default function App() {
  // Keep all initial state here
  const [formValues, setFormValues] = useState(initialFormValues);

  let history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", formValues)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        history.push("/protected");
      });
  };
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
