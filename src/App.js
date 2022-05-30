import './App.css';
import React, { Suspense } from 'react';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Comp3 from './components/Comp3';
import Navbar from './components/Navbar';
import InputContextProvider from './context/InputContextProvider';
import {
  BrowserRouter,
  Routes,
  Route,useLocation
} from "react-router-dom";
import Eager from './components/Eager';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  const Lazy = React.lazy(() => import('./components/Lazy'));
/*   const location = useLocation(); */
  return (
    <>
    <BrowserRouter>

    <div className="App">
    
      <InputContextProvider>
      <Navbar />
   {/*    {location.pathname!=='/login'&&location.pathname!=='/signup'?<Navbar />:''} */}
      <Routes>
      <Route path="/login" element={<Login />}></Route>  
      <Route path="/signup" element={<SignUp />}></Route>  
      <Route path="/" element={<Home />}></Route>  
      <Route path="/home" element={<Home />}></Route>
      <Route path="/eager" element={<Eager />}></Route>
      <Route path="/lazy" element={<Suspense fallback={<div>Loading...</div>}>
        <Lazy />
      </Suspense>}></Route>
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
