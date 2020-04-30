import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';
import Ticket from './Ticket';
const TicketList = () => {
  const { dummyData } = useContext(TicketContext);
  const { toggleItem } = useContext(TicketContext);
  return (
    <>
      {dummyData.map((ticket) => {
        return (
          <>
            <div
              className="littleCard"
              onClick={() => {
                toggleItem(ticket.id);
              }}>
              <div className="little-content">
                <h4>{ticket.category}</h4>
                <p> {ticket.title}</p>
              </div>

              <div>
                <div className="assigned">assigned to: {ticket.assigned}</div>
              </div>
            </div>
            <Ticket ticket={ticket}  />
          </>
        );
      })}
    </>
  );
};

export default TicketList;
