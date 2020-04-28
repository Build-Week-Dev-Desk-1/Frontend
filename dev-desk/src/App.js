import React, { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import * as yup from "yup";


import CreateTicket from "./components/CreateTicket";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

//importing components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import "./App.css";



export default function App() {
 
  return (
    <Router>
      <Header />
      <Switch>
        <div className='login-splash'>
          <Route exact path='/' component={Signup} />
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
