import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {setLogin} from "../actions/index";

import { useDispatch } from "react-redux";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    sessionStorage.removeItem('token');
    dispatch(setLogin(sessionStorage.getItem('token') !== null));
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ChatApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/eager' ? 'active' : ''}`} to="/eager">Eager</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/lazy' ? 'active' : ''}`} to="/lazy">Lazy</Link>
            </li> */}
          </ul>
          <div className="d-flex" role="search">
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar