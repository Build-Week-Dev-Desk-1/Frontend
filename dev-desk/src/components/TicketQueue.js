import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Ticket from "./Ticket";
import TicketList from "./TicketList";

export default function TicketQue() {
  // const {user} = useContext(TicketContext);

  let history = useHistory();

  // console.log({user});

  const createTicket = e => {
    e.preventDefault();
    history.push("/createTicket");
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://devdeskapi.herokuapp.com/api/tickets`)
      .then(res => {
        console.log(res);
        // this returns all the tickets
        // the tickets need to be set to state
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="ticket-que-container">
        <h1>Hi from the Ticket Que</h1>
        <button onClick={createTicket}>Add Ticket</button>
        <TicketList />
      </div>
    </>
  );
}
// An if statement will need to be written to do 2 things

// First - if admin is true then map through all tickets and display them

// Second - else filter (I'm pretty sure it's filter) through all tickets where username matches current username. Username will have to be passed here through context API

// The resulting tickets should be displayed as cards.

// These cards should be displayed on the left 1/2 of the screen

// On the right half should be a single larger card that displays all the details of the smaller card that is clicked on.

// I think this card should be empty by default and populate with data upon the fist card that is clicked.
