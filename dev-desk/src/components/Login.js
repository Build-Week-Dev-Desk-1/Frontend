import React from "react";

export default function Login(props) {
  const { values, onInputChange, onCheckboxChange, onSubmit, errors } = props;

  return (
    <form className="login-form">
      <h2>Login</h2>
      <div className="errors"></div>

      <div className="username">
        <label>
          <h3>Username</h3>
          <input
            value={values.name}
            onChange={onInputChange}
            name="username"
            type="text"
          ></input>
        </label>
      </div>

      <div className="password">
        <label>
          <h3>Password</h3>
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="text"
          ></input>
        </label>
      </div>

      <div className="submit-button">
        <label>
          <h4>Login</h4>
          <button onClick={onSubmit}>login</button>
        </label>
      </div>
    </form>
  );
}
