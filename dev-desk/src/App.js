import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//importing components
import CreateTicket from "./components/CreateTicket";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import TicketQue from "./components/TicketQueue";
import "./App.css";

//import contexts
import { TicketContext } from "./contexts/TicketContext";

export default function App() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    admin: false,
  });

  return (
    <div className='page-container'>
      <TicketContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          {/* <CreateTicket /> */}

          <Switch>
            <Route exact path='/' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/protected' component={TicketQue} />
            <Route exact path='/createTicket' component={CreateTicket} />
          </Switch>
        </Router>
      </TicketContext.Provider>
    </div>
  );
}

// HTTP - Path - Desc -	Data

// POST	/api/auth/register	Registers new user.	Expects {"username":"", "password":"", "email":""}

// Returns { "id":##, "username":""}

// POST	/api/auth/login	Logs in a user.	Expects {"username":"", "password":""}
