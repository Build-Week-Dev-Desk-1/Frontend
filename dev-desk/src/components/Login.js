import React, { useState} from "react";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "*a username is required")
    .required("this is req"),
  password: yup
    .string()
    .min(5, "*a password is required")
    .required("this is req")
});

const initialFormValues = {
  name: "",
  password: ""
};

const initialFormErrors = {
  name: "",
  password: ""
};

export default function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onInputChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(error => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0]
        });
      });

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <form className="login-form">
      <h2 className="splash-h2s">Login</h2>
      <br></br>
      <div className="errors">
        {formErrors.name}
        {formErrors.password}
      </div>

      <div className="username">
        <label>
          <h3 className="splash-h3s">Username</h3>
          <input
            value={formValues.name}
            onChange={onInputChange}
            name="name"
            type="text"
          ></input>
        </label>
      </div>

      <div className="password">
        <label>
          <h3 className="splash-h3s">Password</h3>
          <input
            value={formValues.password}
            onChange={onInputChange}
            name="password"
            type="text"
          ></input>
        </label>
      </div>

      <div className="submit-button">
        <label>
          <button className="login-button">Login</button>
        </label>
      </div>
    </form>
  );
}
