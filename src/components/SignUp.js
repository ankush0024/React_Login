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
  const [loading, setLoading] = useState(false);
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
    if (userData.name.trim() === "") {
      alert("Name is required!");
    } else if (userData.email.trim() === "") {
      alert("Email is required!");
    } else if (
      !userData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      alert("Email must be in correct format!");
    } else if (userData.password.trim() === "") {
      alert("Password is required!");
    } else if (
      !userData.password.match(
        /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/
      )
    ) {
      alert(
        "Password must be of at least 8 characters and must contain a capital alphabet, a small alphabet, a number and a special character!"
      );
    } else {
      setLoading(true);
      try {
        const k = await signup(userData.name, userData.email, userData.password);
        setLoading(false);
        //console.log(k);
        if (k[0]) {
          setConfirm(true);
          setUserData({
            ...userData,
            name: "",
            password: "",
          });
        } else {
          setConfirm(false);
          alert(k[1]);
        }
      } catch (err) {
        setLoading(false);
        alert(err[1]);
      }
    }
  };
  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.trim() === "" || code.length !== 6) {
      alert("Verification code is required and must be of 6 characters!");
    } else {
      setLoading(true);
      const k = await confirmUser(userData.email, code);
      setLoading(false);
      if (k) {
        setConfirm(false);
        //   console.log(k);
        setCode("");
        navigate("/login");
      } else {
        setConfirm(true);
        alert("The code you have entered is wrong");
      }
    }
  };
  return (
    <div className="form">
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
              {loading ? (
                <button className="mt-1" onClick={e => e.preventDefault()}>
                  <i className="fas fa-spinner fa-spin-pulse"></i>
                </button>
              ) : (
                <button onClick={handleVerify} className="mt-1">
                  Verify
                </button>
              )}
            </form>
          ) : (
            <form>
              <h1>Sign up</h1>
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
              {loading ? (
                <button onClick={e => e.preventDefault()}>
                  <i className="fas fa-spinner fa-spin-pulse mt-2"></i>
                </button>
              ) : (
                <button onClick={handleSignup} className="mt-2">SIGN UP</button>
              )}
            </form>
          )}
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome to ChatApp!</h1>
              <p>
                To keep connected with us please login with your personal info!
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
