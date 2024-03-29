import React, { useState , useEffect } from "react";
import { FaEye, FaFacebook ,FaEyeSlash } from "react-icons/fa";
import "./login.css";
import { Link, NavLink } from "react-router-dom";
import Home from "../HomePage";
import SignUp from "./SignUp";
import Update from "./Update";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (
      password.trim().length == 0 || email.trim().length == 0
    ) {
      setValidate(true);
    }else{
      setValidate(false);
    }
  },[password,email]);
  const navigate = useNavigate()
  const getEmail = (event) => {
    setEmail(event.target.value);

  };
  const getPassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleForm = (event) => {
    event.preventDefault();
    if(password == 0 || email == 0){
      setValidate(true);
    } else {
      setValidate(false);
      setEmail("");
      setPassword("");
    }
    async function loginUser () {
      console.log("Sending the data")
      const response = await fetch('http://localhost:5500/api/login',{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          email,
          password
        })
      })
      const data= await response.json()
      if(data.retrieved_user){
        localStorage.setItem('token',data.retrieved_user);
        navigate("/home")
      }else{
        setValidate(true)
      }
    }
    loginUser()
  };
  const toogleShow = () => {
    if (showpass) {
      setShowPass(false);
    }
    if (!showpass) {
      setShowPass(true);
    }
  };
  let errorMessage = "Enter Valid Email";
  let errorMessage2 = "Enter Valid Password";
  let inputvalue = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 10);
  const handlecheck = () => {
    if (check) {
      setCheck(false);
    }
    if (!check) {
      setCheck(true);
      setPassword(inputvalue);
    }
  };
  return (
    <div className="Login">
      <div className="login-form">
        <span className="login-title">Sign In</span>
        <form onSubmit={handleForm}>
          <input
            type="email"
            className={`input ${validate && " invalid"}`}
            placeholder="Enter your email"
            value={email}
            onChange={getEmail}
          />
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage}
          </small>
          <div className="login-password">
            <input
              type={`${showpass ? "text" : "password"}`}
              className={`input ${validate && " invalid"}`}
              placeholder="Password"
              value={password}
              onChange={getPassword}
              min="4"
              max="12"
            />
            <i>{showpass ? (<FaEye className="fa-eye" onClick={toogleShow} />):(<FaEyeSlash className="fa-eye" onClick={toogleShow} />)}</i>
          </div>
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage2}
          </small>
          {validate || password.length == 0 || email.length == 0 ? (
            <button
              className={`button-sign-in-not ${validate && " invalid"}`}
              type="submit"
              disabled={validate}
            >
              <Link to="/" element={<Login />} style={{ color: "white" }}>
                Enter Info
              </Link>
            </button>
          ) : (
            <button
              className={` ${validate && " invalid"} button-sign-in`}
              type="submit"
              disabled={validate}
            >
              <Link to="/home" element={<Home />}>
                Sign In
              </Link>
            </button>
          )}
        </form>
        <div className="remember">
          <label>
            <input type="checkbox" onChange={handlecheck} />
            Remember Me
          </label>
          <NavLink to='/update' element={<Update />}>Forgot Password?</NavLink>
        </div>
        <div className="facebook-register">
          <FaFacebook className="facebook-icon" />{" "}
          <span>Login with Facebook</span>
        </div>
        <div className="note-footer">
          <span>New to Netflix?</span>
          <span>
            <Link to="/signup" element={<SignUp />}>
              Sign Up
            </Link>
          </span>
        </div>
        <div className="footer">
          <p>
            This Page is protected by the Google reCAPTCHA to ensure you are not
            a robot. <a href="#">Learn More</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
