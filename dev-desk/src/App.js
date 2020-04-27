import React, { useEffect, useState } from "react";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import * as yup from "yup";

import "./App.css";

//importing components
import Login from "./components/Login";

const initialFormValues = {
  name: "",
  password: ""
};

const initialFormErrors = {
  name: "",
  password: ""
};

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "*a username is required")
    .required("this is req"),
  password: yup
    .string()
    .min(5, "*a password is required")
    .required("this is req")
});

export default function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  // const [credentials, setCredentials] = (e) =>
  //   useState({
  //     username: "",
  //     password: "",
  //     email: "",
  //   });

  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0]
        });
      });
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <>
      <h1>Hi from App.js</h1>
      <Login
        values={formValues}
        onInputChange={onInputChange}
        errors={formErrors}
      />
    </>
  );
}
