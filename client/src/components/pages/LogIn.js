import React, { useState } from "react";
import "../../styles/log_in.css";
import axios from "axios";
import { setAuthUser } from "C:/Users/Khaled/Desktop/web/Edaraa-Dashboard1/client/src/components/pages/helper/storage";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const LogIn = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });
  const navigate = useNavigate(); // Declare the navigate function

  const loginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:5000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        const errorData = errors.response?.data?.errors || [];
        setLogin({
          ...login,
          loading: false,
          err: errorData,
        });
      });
      
  };

  return (
    <div>
      <div className="container">
        <h1 id="welcome-text">Welcome, Omnia</h1>
        <div className="main-content">
          {login.err.map((error, index) => (
            <Alert key={index} variant="danger" className="p-2">
              {error.msg}
            </Alert>
          ))}
          <form onSubmit={loginFun}>
            <input
              type="email"
              id="email"
              placeholder="Please Enter Your Email"
              required
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <input
              type="password"
              id="password"
              placeholder="Please Enter Your password"
              required
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <button id="log-in-btn" disabled={login.loading === true}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
