import React, { useEffect, useState } from "react";

import { axiosWithAuth } from "./utils/axiosWithAuth";

import "./App.css";

//importing components
import Login from "./components/Login";

export default function App() {
  // const [credentials, setCredentials] = (e) =>
  //   useState({
  //     username: "",
  //     password: "",
  //     email: "",
  //   });

  const initialFormValues = {
    name: "",
    password: ""
  };

  return (
    <>
      <h1>Hi from App.js</h1>
      <Login
        values={formValues}
        onInputChange={onInputChange}
        onCheckboxChange={onCheckboxChange}
        onSubmit={onSubmit}
        errors={formErrors}
      />
      ;
    </>
  );
}
