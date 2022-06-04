import React, { useRef, useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import {setLogin} from "../actions/index";

import { useDispatch } from "react-redux";
import {
  getTimeDifference,
  signup,
  confirmUser,
  login,
} from "../utils/cognito_authentication";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eyeState, setEyeState] = useState("fa-eye");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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

  const handleEmailInput = (e) => {
    let user = { ...userData, email: e.target.value };
    setUserData(user);
  };
  const handlePasswordInput = (e) => {
    let user = { ...userData, password: e.target.value };
    setUserData(user);
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (userData.email.trim() === "") {
      alert("Email is required!");
    } else if (userData.password.trim() === "") {
      alert("Password is required!");
    } else {
      setLoading(true);
      try {
        const res = await login(userData.email, userData.password);
        setLoading(false);
        sessionStorage.setItem("token", res.idToken.jwtToken);
        setUserData({
          email: "",
          password: "",
        });
        //alert("Logged in successfully");
        dispatch(setLogin(sessionStorage.getItem('token') !== null));
        navigate("/");
      } catch (err) {
        setLoading(false);
        alert(err);
        //console.log("failed");
        //  console.log(err);
      }
    }
  };

  return (
    <div className="form">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form>
            <h1>Log in</h1>
            {/* <div className="social-container">
              <a href="/" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-google"></i>
              </a>
              <a href="/" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span> */}
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onInput={handleEmailInput}
            />
            <div className="passbox">
              <input
                type="password"
                placeholder="Password"
                ref={inputRef}
                onInput={handlePasswordInput}
                value={userData.password}
              />
              <i
                onClick={handleEyeClick}
                className={`fas ${eyeState} passeye`}
              ></i>
            </div>
            <a href="/">Forgot your password?</a>
            {loading ? (
              <button onClick={e=>e.preventDefault()}>
                <i className="fas fa-spinner fa-spin-pulse"></i>
              </button>
            ) : (
              <button onClick={handleLoginClick}>Log in</button>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>New to ChatApp?</h1>
              <p>Enter your personal details and start journey with us!</p>
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
