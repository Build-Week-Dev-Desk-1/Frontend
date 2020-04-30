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
import { dummyUser, dummyTickets } from "./components/dummydata";

//import contexts
import { TicketContext } from "./contexts/TicketContext";

export default function App() {
  //functions for context

  const [dummyData, setDummyData] = useState(dummyTickets);
  console.log({ dummyData });

  const toggleItem = (itemId) => {
    setDummyData((state) =>
      state.map((ticket) => {
        return { ...ticket, clicked: false };
      })
    );

    setDummyData((state) =>
      state.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, clicked: !item.clicked };
      })
    );
  };

  function assignHelper(ticketId, helper) {
    setDummyData((state) =>
      state.map((ticket) => {
        return ticket.id === ticketId
          ? { ...ticket, assigned: helper }
          : { ...ticket };
      })
    );
  }

  function deleteTicket(ticketId) {
    setDummyData((list) => list.filter((ticket) => ticket.id !== ticketId));
  }

  function reassign(ticketId) {
    setDummyData((state) =>
      state.map((ticket) => {
        return ticket.id === ticketId
          ? { ...ticket, assigned: "Unassigned" }
          : { ...ticket };
      })
    );
  }

  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  return (
    <div className='page-container'>
      <TicketContext.Provider
        value={{
          user,
          setUser,
          dummyData,
          setDummyData,
          toggleItem,
          deleteTicket,
          assignHelper,
          reassign,
        }}
      >
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
