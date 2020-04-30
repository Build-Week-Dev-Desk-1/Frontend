import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';

import { dummyUser } from './dummydata';

const Ticket = ({ ticket }) => {
  const { deleteTicket } = useContext(TicketContext);

  const { assignHelper } = useContext(TicketContext);

  const { reassign } = useContext(TicketContext);

  return (
    <div className={`bigCard${ticket.clicked ? 'On' : ''}`}>
      <h2>
        <strong>{ticket.category}</strong>
      </h2>
      <p>{ticket.title}</p>
      <br />
      <h5>Description of Issue</h5>
      <p>{ticket.description}</p>
      <br />
      <div>
        <h5>What I've tried</h5>
        <p>{ticket.tried}</p>
      </div>
      <h6> {ticket.assigned}</h6>
      <div>userId: {ticket.userId}</div>
      <button onClick={() => assignHelper(ticket.id, dummyUser.username)}>Help Student</button>
      <button onClick={() => deleteTicket(ticket.id)}>resolved</button>
      <button onClick={() => reassign(ticket.id)}>Reassign</button>
    </div>
  );
};

export default Ticket;
