import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { DeleteTicketModal } from './DeleteTicketModal';
import * as yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { TicketContext } from '../contexts/TicketContext';

const formSchema = yup.object().shape({
  problem: yup.string().min(4),
  type: yup
    .string()
    .oneOf(["Equipment", "People", "Track", "Finances", "Other"])
});

const CreateTicket = () => {
  const { setDummyData } = useContext(TicketContext);
  const { dummyData } = useContext(TicketContext);
  //formstate
  const [formState, setFormState] = useState({
    id: "",
    problem: "",
    type: "",
    attempt: "",
    other: ""
  });

  // contexts
  const { user } = useContext(TicketContext);
  //modal state
  const [modalState, setModalState] = useState(false);

  //state to disable button
  const [disableButton, setDisableButton] = useState(true);

  //validation
  function validateChange(e) {
    yup
      .reach(
        formSchema.nullable(),
        e.target.type === "textarea" ? null : e.target.name
      )
      .validate(e.target.value);
  }

  //activate button
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setDisableButton(!valid);
    });
  }, [formState]);

  function handleModalState() {
    setModalState(!modalState);
  }

  function handleChange(e) {
    e.persist();
    validateChange(e);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.persist();
    e.preventDefault();

    setDummyData([...dummyData, {formState}]);
    // console.log(dummyData)

    // axiosWithAuth().post('https://devdeskapi.herokuapp.com/api/tickets/', formState);

    setFormState({
      user: user.id,
      title: "",
      category: "",
      tried: "",
      description: ""
    });
  }

  return (
    //modal 
    <div className="ticket-box">
      <DeleteTicketModal modalState={modalState} setModalState={setModalState} />
      <h1> Let's submit a help Ticket.</h1>
      <h4>
        <span className="asterisk">*</span> Required Fields
        <AiOutlineCloseCircle className="no-help" onClick={handleModalState} />
      </h4>
    
      <form onSubmit={handleSubmit}>
        <h3>
          <span className="asterisk">*</span>What's going on?
        </h3>
        <input name="problem" value={formState.problem} onChange={handleChange} />
        <h3>
          <span className="asterisk">*</span>What is this issue about?
        </h3>
        <select name="type" value={formState.type} onChange={handleChange}>
          <option>Select a topic</option>
          <option value="Equipment">Equipment</option>
          <option value="People">People</option>
          <option value="Track">Track</option>
          <option value="Finances">Finances</option>
          <option value="Other">Other</option>
        </select>
        <h3>What have you tried?</h3>
        <textarea type="textarea" name="attempt" value={formState.attempt} onChange={handleChange} />
        <h3>Anything else we should know about?</h3>
        <textarea type="textarea" name="other" value={formState.other} onChange={handleChange} />

        <Link to="/protected">
          <button disabled={disableButton}>
            Submit Ticket
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CreateTicket;
