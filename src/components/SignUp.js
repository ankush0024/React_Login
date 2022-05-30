import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTimeDifference,
  signup,
  confirmUser,
} from "../utils/cognito_authentication";
function SignUp() {
  const navigate = useNavigate();
  const [eyeState, setEyeState] = useState("fa-eye");
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputRef = useRef(null);
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleEyeClick = () => {
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text";
      setEyeState("fa-eye-slash");
    } else {
      inputRef.current.type = "password";
      setEyeState("fa-eye");
    }
  };
  const handleNameInput = (e) => {
    let user = { ...userData, name: e.target.value };
    setUserData(user);
  };
  const handleEmailInput = (e) => {
    let user = { ...userData, email: e.target.value };
    setUserData(user);
  };
  const handlePasswordInput = (e) => {
    let user = { ...userData, password: e.target.value };
    setUserData(user);
  };
  const handleCodeInput = (e) => {
    setCode(e.target.value);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const k = await signup(userData.name, userData.email, userData.password);
    console.log(k);
    if (k) {
      setConfirm(true);
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setConfirm(false);
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    const k = await confirmUser(code);
    if (k) {
      setConfirm(false);
      console.log(k);
      setCode('');
      navigate('/login');
    } else {
      setConfirm(true);
    }
  };
  return (
    <div id="login">
      <div className="container right-panel-active" id="container">
        <div className="form-container sign-up-container">
          {confirm ? (
            <form>
              <h1>Confirm Email</h1>
              {/* <div className="social-container">
                <a href="/" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="/" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
              <span className="my-2">
                Verification code has been sent to your email, please enter the
                code here!
              </span>
              <input
                type="text"
                onInput={handleCodeInput}
                value={code}
                placeholder="Code"
              />
              <button onClick={handleVerify} className="mt-1">
                Verify
              </button>
            </form>
          ) : (
            <form>
              <h1>Create Account</h1>
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
              <span>or use your email for registration</span>
              <input
                type="text"
                onInput={handleNameInput}
                value={userData.name}
                placeholder="Name"
              />
              <input
                type="email"
                onInput={handleEmailInput}
                value={userData.email}
                placeholder="Email"
              />
              <div className="passbox">
                <input
                  type="password"
                  onInput={handlePasswordInput}
                  value={userData.password}
                  placeholder="Password"
                  ref={inputRef}
                />
                <i
                  onClick={handleEyeClick}
                  className={`fas ${eyeState} passeye`}
                ></i>
              </div>
              <button onClick={handleSignup}>Sign Up</button>
            </form>
          )}
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleLoginClick} className="ghost" id="signIn">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
