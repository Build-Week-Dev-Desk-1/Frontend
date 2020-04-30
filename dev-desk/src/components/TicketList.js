import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';
import Ticket from './Ticket';
const TicketList = () => {
  const { dummyData } = useContext(TicketContext);
  const { toggleItem } = useContext(TicketContext);

  console.log(dummyData)

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
                <h5 className="assigned"> { ticket.assigned}</h5>
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
