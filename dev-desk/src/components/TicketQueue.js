import React from "react";
import { useHistory } from "react-router-dom";

export default function TicketQue() {
  let history = useHistory();

  const createTicket = (e) => {
    e.preventDefault();
    history.push("/createTicket");
  };

  return (
    <>
      <h1>Hi from the Ticket Que</h1>
      <button onClick={createTicket}>Form</button>
    </>
  );
}
