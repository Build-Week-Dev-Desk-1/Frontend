import React, { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';
import Ticket from "./Ticket"
const TicketList = () => {
  const { dummyData } = useContext(TicketContext);
  const { toggleItem } = useContext(TicketContext);
  return (
    <>
      {dummyData.map((ticket) => {
        return (
            <>
          <div className="cardContainer" key={Math.random()}>
            <div
              className="littleCard"
              onClick={() => {
                toggleItem(ticket.id);
              }}>
              <div>{ticket.category}</div>
              <div> {ticket.title}</div>
              <div>assigned to: {ticket.assigned}</div>
            </div>
            <div></div>
          </div>
          <Ticket ticket = {ticket}/>
          </>
        );
        
      })}
    </>
  );
};

export default TicketList;
