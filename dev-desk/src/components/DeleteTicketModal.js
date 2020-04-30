import React from 'react';
import {Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteTicketModal = ({ modalState, setModalState }) => {
  const toggle = () => setModalState(!modalState);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggle}>
        <ModalHeader toggle={toggle}>This will delete the ticket.</ModalHeader>
        <ModalBody>It cannot be undone.</ModalBody>
        <ModalFooter>
        <Link to="/protected">
          <Button color="danger" onClick={toggle}>
            Delete
          </Button>
          </Link>
          <Button color="primary" onClick={toggle}>
            Go Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { DeleteTicketModal };
