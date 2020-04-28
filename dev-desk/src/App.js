import React, { useEffect, useState, createContext } from "react";
import {
  useHistory,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import * as yup from "yup";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import CreateTicket from "./components/CreateTicket";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

//importing components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";

const initialFormValues = {
  name: "",
  password: "",
};

export default function App() {
  // Keep all initial state here
  const [formValues, setFormValues] = useState(initialFormValues);

  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", formValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        history.push("/protected");
      });
  };
  return (
    <Router>
      <Header />
      <Switch>
        <div className='login-splash'>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </div>
        <PrivateRoute exact path='/protected' component={CreateTicket} />
      </Switch>
    </Router>
  );
}

// HTTP - Path - Desc -	Data

// POST	/api/auth/register	Registers new user.	Expects {"username":"", "password":"", "email":""}

// Returns { "id":##, "username":""}

// POST	/api/auth/login	Logs in a user.	Expects {"username":"", "password":""}
