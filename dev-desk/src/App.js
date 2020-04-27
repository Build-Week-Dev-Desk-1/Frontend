import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

import { axiosWithAuth } from "./utils/axiosWithAuth";

import "./App.css";

export default function App() {
  // Keep all initial state here
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    type: "",
  });

  useEffect(() => {
    axiosWithAuth()
      .get("https://devdeskapi.herokuapp.com/api/users")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <h1>Hi from App.js</h1>;
}
