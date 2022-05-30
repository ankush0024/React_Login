import React, { useRef, useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import {getTimeDifference, signup, confirmUser, login} from '../utils/cognito_authentication'
function Login() {
  const navigate = useNavigate();
  const [eyeState, setEyeState] = useState("fa-eye");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const inputRef = useRef(null);
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleEyeClick = () => {
	/* getTimeDifference(6,7);
	var code = '517309'; */
	//console.log(signup("ankush","rajel74852@nifect.com","AAaa11@@aa"));
//console.log(confirmUser(code));
// login("rajel74852@nifect.com","AAaa11@@aa");
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
      setEyeState("fa-eye-slash");
    } else {
      inputRef.current.type = "password";
      setEyeState("fa-eye");
    }
  };

  const handleEmailInput = (e)=>{
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e)=>{
    setPassword(e.target.value);
  };
  const handleLoginClick = async(e)=>{
    e.preventDefault();
    try{
      const res = await login(email, password);
      sessionStorage.setItem('token',res.idToken.jwtToken );
      //alert("Logged in successfully");
      navigate("/");
    } catch(err) {
      alert(err);
      //console.log("failed");
    //  console.log(err);
    }
    
  
  };

  return (
    <div id="login">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Log in</h1>
            <div className="social-container">
              <a href="/" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" value={email} onInput={handleEmailInput} />
            <div className="passbox">
              <input type="password" placeholder="Password" ref={inputRef} onInput={handlePasswordInput} value={password} />
              <i
                onClick={handleEyeClick}
                className={`fas ${eyeState} passeye`}
              ></i>
            </div>
            <a href="/">Forgot your password?</a>
            <button onClick={handleLoginClick}>Log in</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleSignupClick} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
