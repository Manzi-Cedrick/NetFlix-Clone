import React,{ useState} from 'react'
import { FaEye } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Login from './Login'
import './update.css'
function Update() {
  const [OTP,setOTP]=useState('');
  const [showstyles,setshow]=useState(false);
  const handleOTP= e =>{
    setOTP(e.target.value)
  }
  const [newuserEmail, setnewuserEmail] = useState("");
  const [newPass, setnewPass] = useState("");
  const [validate, setValidate] = useState(false);
  const [showpass, setShowPass] = useState(false);
    const getnewuserEmail = (event) => {
        setnewuserEmail(event.target.value);
      };
      const getnewPass = (event) => {
        setnewPass(event.target.value);
      };
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
          setnewuserEmail("");
          setOTP("");
          setnewPass("");
        }
        async function OtpCheck () {
          console.log("Sending the data")
          const response = await fetch('http://localhost:5500/api/reset',{
            method : 'POST',
            headers: {
              'Content-Type': 'application/json'
            },body: JSON.stringify({
              newuserEmail:newuserEmail
            })
          })
          const data= await response.json()
          if(data.status == 'ok'){
            console.log(data);
            <Link to='/login' element={<Login />}/>
          }
          // if(data.newEmail){
          //   setValidate(true)
          // }
        }
        OtpCheck()
      };
      const toogleShow = () => {
        if (showpass) {
          setShowPass(false);
        }
        if (!showpass) {
          setShowPass(true);
        }
      };
      let errorMessage1 = "Enter Valid Email";
      let errorMessage2= "Enter Valid OTP"
      let errorMessage3 = "Enter Valid Password";
      
  return (
    <div className="Update">
        <span className="update-title">Reset Password</span>
        
          {
            showstyles  ? (
              <div className="update-form">
              <input
              type={"number"}
              className={`input ${validate && " invalid"}`}
              placeholder="OTP"
              value={OTP}
              onChange={handleOTP}
            />
              <small style={{ color: validate && "red" }}>
              {validate && errorMessage2}
              </small>
              <div className="password-check">
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
            {validate && errorMessage3}
          </small>
          {validate || newPass.length == 0 || OTP.length == 0 ? (
            <button
              className={`button-sign-in-not ${validate && " invalid"}`}
              type="submit"
              disabled={validate}
            > Sign In
            </button>
          ) : (
            <button
              className={`button-sign-in ${validate && " invalid"}`}
              type="submit"
              disabled={validate}
            >
              <Link to="/home" element={<Home />}>
                Sign In
              </Link>
            </button>
          )}
              </div>
            ):(
              <form onSubmit={handleForm}>
              <div className="update-first">
            <p>This Page is protected by the Google reCAPTCHA to ensure you are not
            a robot. <a href="#">Learn More</a></p>
            <input
            type="email"
            className={`input ${validate && " invalid"}`}
            placeholder="Enter your email"
            value={newuserEmail}
            onChange={getnewuserEmail}
          />
          <small style={{ color: validate && "red" }}>
            {validate && errorMessage1}
          </small>
          {!validate && newuserEmail.length != 0 ? (<button type="submit" className="submit-btn" onClick={()=>setshow(true)}>Submit</button>) : (<button type="submit" className="submit-btn">Submit Valid</button>)}
          </div>
          </form>)
          }
      
    </div>
  )
}

export default Update