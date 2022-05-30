import React, {useState, useEffect} from 'react'
import { Navigate, useNavigate } from "react-router-dom"
import Navbar from './Navbar'
function Home() {
  const [login, setLogin] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setLogin(true);
    } else{
      setLogin(false);
      navigator('/login');
    }
  
    return () => {
      
    }
  }, [])
  
  return (
    <div>
      Home    </div>
  )
}

export default Home