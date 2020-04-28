import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import * as yup from "yup";

import "./App.css";

//importing components
import Login from "./components/Login";
import Header from "./components/Header";

const initialFormValues = {
  name: "",
  password: "",
};

const initialFormErrors = {
  name: "",
  password: "",
};

const formSchema = yup.object().shape({
  name: yup.string().min(5, "*a username is required").required("this is req"),
  password: yup
    .string()
    .min(5, "*a password is required")
    .required("this is req"),
});

export default function App() {
  // Keep all initial state here
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    type: "",
  });

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <Login
        values={formValues}
        onInputChange={onInputChange}
        errors={formErrors}
      />
    </>
  );
}
