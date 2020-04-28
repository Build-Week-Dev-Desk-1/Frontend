import React, { useState} from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const formSchema = yup.object().shape({
  email: yup.string().min(5, 'a valid email is req').required('this is req'),
  name: yup.string().min(5, '*a username is required').required('this is req'),
  password: yup.string().min(5, '*a password is required').required('this is req'),
});

const initialFormValues = {
  email: '',
  name: '',
  password: '',
};

const initialFormErrors = {
  email: '',
  name: '',
  password: '',
};

export default function Signup() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  let history = useHistory();

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/auth/login', formValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/protected');
      });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="splash-h2s">Sign Up</h2>
      <br></br>
      <div className="errors">
        {formErrors.email}
        {formErrors.name}
        {formErrors.password}
      </div>

      <div className="email">
        <label>
          <h3 className="splash-h3s">Email</h3>
          <input value={formValues.email} onChange={onInputChange} name="email" type="text"></input>
        </label>
      </div>

      <div className="username">
        <label>
          <h3 className="splash-h3s">Username</h3>
          <input value={formValues.name} onChange={onInputChange} name="name" type="text"></input>
        </label>
      </div>

      <div className="password">
        <label>
          <h3 className="splash-h3s">Password</h3>
          <input value={formValues.password} onChange={onInputChange} name="password" type="text"></input>
        </label>
      </div>

      <div className="submit-button">
        <label>
          <button className="login-button">Sign Up</button>
        </label>
      </div>
    </form>
  );
}
