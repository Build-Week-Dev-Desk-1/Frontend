import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';

import { dummyUser } from './dummydata';

const Ticket = ({ ticket }) => {
  const { deleteTicket } = useContext(TicketContext);

  const { assignHelper } = useContext(TicketContext);

  return (
    <div className={`bigCard${ticket.clicked ? 'On' : ''}`}>
      <div>userId: {ticket.userId}</div>
      <div>title: {ticket.title}</div>
      <div>category: {ticket.category}</div>
      <div>tried: {ticket.tried}</div>
      <div>description: {ticket.description}</div>
      <div>assigned: {ticket.assigned}</div>
      <button onClick={() => assignHelper(ticket.id, dummyUser.username)}>Help Student</button>
      <button onClick={() => deleteTicket(ticket.id)}>resolved</button>
      <button>Reassign</button>
    </div>
  );
};

export default Ticket;
