import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteTicketModal = ({ modalState, setModalState }) => {
  const toggle = () => setModalState(!modalState);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggle}>
        <ModalHeader toggle={toggle}>This will delete the ticket.</ModalHeader>
        <ModalBody>It cannot be undone.</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Delete
          </Button>
          <Button color="primary" onClick={toggle}>
            Go Back
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export { DeleteTicketModal };
