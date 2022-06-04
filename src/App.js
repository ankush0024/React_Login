import React, { useState, useEffect } from 'react';
import {setLogin} from "./actions/index";

import { useSelector, useDispatch } from "react-redux";
// import Comp1 from './components/Comp1';
// import Comp2 from './components/Comp2';
// import Comp3 from './components/Comp3';
import Navbar from './components/Navbar';
import InputContextProvider from './context/InputContextProvider';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Eager from './components/Eager';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  const Lazy = React.lazy(() => import('./components/Lazy'));
  const login =  useSelector(state => state.login);
  const dispatch = useDispatch();
  /*   const location = useLocation(); */

//  const [login, setLogin] = useState(false);
  useEffect(() => {
    dispatch(setLogin(sessionStorage.getItem('token') !== null));
  }, [])
  
  return (
    <>
      <BrowserRouter>

        <div>

          <InputContextProvider>
            {login?<Navbar />:''}
            {/*    {location.pathname!=='/login'&&location.pathname!=='/signup'?<Navbar />:''} */}
            <Routes>
              <Route path="/" element={login?<Home />:<Navigate to="/login" />}></Route>
              <Route path="/login" element={!login?<Login />:<Navigate to="/" />}></Route>
              <Route path="/signup" element={!login?<SignUp />:<Navigate to="/" />}></Route>
              {/* <Route path="/eager" element={<Eager />}></Route>
      <Route path="/lazy" element={<Suspense fallback={<div>Loading...</div>}>
        <Lazy />
      </Suspense>}></Route> */}
            </Routes>
            {/* <Comp1/>
      <Comp2/>
      <Comp3/> */}

          </InputContextProvider>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
