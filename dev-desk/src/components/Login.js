import React, { useState, useContext } from "react";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { TicketContext } from "../contexts/TicketContext";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "*a username is required")
    .required("this is req"),
  password: yup
    .string()
    .min(5, "*a password is required")
    .required("this is req"),
});

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

export default function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const { setUser } = useContext(TicketContext);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://devdeskapi.herokuapp.com/api/auth/login", formValues)
      .then((res) => {
        console.log(res);
        setUser({
          id: res.data.id,
          username: res.data.username,
          admin: res.data.admin,
        });
        localStorage.setItem("token", res.data.token);
        history.push("/protected");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(formValues);

  return (
    <div className='login-splash'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h2 className='splash-h2s'>Login</h2>
        <br></br>
        <div className='errors'>
          {formErrors.username}
          {formErrors.password}
        </div>

        <div className='username'>
          <label>
            <h3 className='splash-h3s'>Username</h3>
            <input
              value={formValues.username}
              onChange={onInputChange}
              name='username'
              type='text'
            ></input>
          </label>
        </div>

        <div className='password'>
          <label>
            <h3 className='splash-h3s'>Password</h3>
            <input
              value={formValues.password}
              onChange={onInputChange}
              name='password'
              type='password'
              // className='blurry-text'
            ></input>
          </label>
        </div>

        <div className='submit-button'>
          <label>
            <button className='login-button'>Login</button>
          </label>
        </div>
      </form>
    </div>
  );
}
