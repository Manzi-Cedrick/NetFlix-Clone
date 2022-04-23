import React,{ useState} from 'react'
import {FaEye} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Home from "../HomePage";
import Login from './Login';
import './signup.css'
function SignUp() {
    const [newuserEmail, setnewuserEmail] = useState("");
    const [newPass, setnewPass] = useState("");
    const [validate, setValidate] = useState(false);
    const [showpass, setShowPass] = useState(false);
    const [newusername,setnewusername] = useState("");
    const getnewuserEmail = (event) => {
        setnewuserEmail(event.target.value);
      };
      const getnewPass = (event) => {
        setnewPass(event.target.value);
      };
      const getnewusername = (event) => {
          setnewusername(event.target.value);
      }
      const handleForm = (event) => {
        event.preventDefault();
        if (
          newPass.trim().length == 0 ||
          (newuserEmail.trim().length == 0 &&
            newuserEmail.trim() != newuserEmail.includes(`${"@" || "gmail.com"}`))
        ) {
          setValidate(true);
        } else {
          setValidate(false);
          setnewusername("")
          setnewuserEmail("");
          setnewPass("");
        }
        async function registerUser () {
          console.log("Sending the data")
          const response = await fetch('http://localhost:5500/api/register',{
            method : 'POST',
            headers: {
              'Content-Type': 'application/json'
            },body: JSON.stringify({
              newusername,
              newuserEmail,
              newPass
            })
          })
          const data= await response.json()
          if(data.status == 'ok'){
            <Link to='/login' element={<Login />}/>
          }
        }
        registerUser()
      };
      const toogleShow = () => {
        if (showpass) {
          setShowPass(false);
        }
        if (!showpass) {
          setShowPass(true);
        }
      };
      let errorMessage = "Enter Valid Username"
      let errorMessage1 = "Enter Valid Email";
      let errorMessage2 = "Enter Valid Password";
      
  return (
    <div className="Login">
      <div className="login-form">
        <span className="login-title">Sign Up</span>
        <form onSubmit={handleForm}>
        <input
            type="text"
            className={`input ${validate && " invalid"}`}
            placeholder="Username"
            value={newusername}
            onChange={getnewusername}
          />
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage}
          </small>
          <input
            type="email"
            className={`input ${validate && " invalid"}`}
            placeholder="Email"
            value={newuserEmail}
            onChange={getnewuserEmail}
          />
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage1}
          </small>
          <div className="login-password">
            <input
              type={`${showpass ? "text" : "password"}`}
              className={`input ${validate && " invalid"}`}
              placeholder="Password"
              value={newPass}
              onChange={getnewPass}
              min="4"
              max="12"
            />
            <FaEye className="fa-eye" onClick={toogleShow} />
          </div>
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage2}
          </small>
          <button
            className={`button-sign-in ${validate && " invalid"}`}
            type={`${validate && "button" || "submit"}`}
            disabled={validate}
          >
          {
            validate || newPass.length==0 || newuserEmail.length==0 || newusername.length==0 ? (
            "Enter Info "
             ) : (<Link to="/home" element={<Home />}>
              Sign In
            </Link>)
          }
            
          </button>
        </form>
        <div className="note-footer">
          <span>Already have an account</span>
          <span>
            <Link to="/" element={<Login />} >Sign In</Link>
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
  )
}

export default SignUp