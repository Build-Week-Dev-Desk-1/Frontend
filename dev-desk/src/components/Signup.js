import React, { useState } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const formSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("this is req"),
  username: yup
    .string()
    .min(5, "*a username is required")
    .required("this is req"),
  password: yup
    .string()
    .min(5, "*a password is required")
    .required("this is req"),

  role: yup.string().required("this is required"),
});

const initialFormValues = {
  email: "",
  username: "",
  password: "",
  role: "",
};

const initialFormErrors = {
  email: "",
  username: "",
  password: "",
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
          [name]: "",
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
  console.log(formValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://devdeskapi.herokuapp.com/auth/register", formValues)
      .then((res) => {
        // console.log(res);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCheckboxChange = (evt) => {
    setFormValues({
      ...formValues,

      ...formValues.role,
      [evt.target.name]: evt.target.checked,
    });
  };

  return (
    <div className='login-splash'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='splash-h2s'>Sign Up</h2>
        <br></br>
        <div className='errors'>
          {formErrors.email}
          {formErrors.username}
          {formErrors.password}
        </div>
        <div className='email'>
          <label>
            <input
              className='input-style'
              value={formValues.email}
              onChange={onInputChange}
              name='email'
              type='text'
              placeholder='email'
            ></input>
          </label>
        </div>
        <div className='username'>
          <label>
            <input
              className='input-style'
              value={formValues.username}
              onChange={onInputChange}
              name='username'
              type='text'
              placeholder='username'
            ></input>
          </label>
        </div>

        <div className='passwordd'>
          <label>
            <input
              className='input-style'
              value={formValues.password}
              onChange={onInputChange}
              name='password'
              type='password'
              placeholder='password'
            ></input>
          </label>
        </div>

        <div className='choice'>
          <label>
            <h5></h5>
            <select
              value={formValues.role}
              onChange={onInputChange}
              name='role'
            >
              <option defaultValue='Student'>Student</option>
              <option value='Tech'>Tech</option>
            </select>
          </label>
        </div>

        <div className='submit-button'>
          <label>
            <button className='login-button'>Sign Up</button>
          </label>
        </div>
      </form>
    </div>
  );
}
