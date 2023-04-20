import React from 'react'
import './LoginPage.css'
import { useState } from 'react'
import { users } from './stubdata/users'
import {useNavigate} from 'react-router-dom';


const LoginPage = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const clickHanler = (a,b) => {
  
    const user = users.find((user) => user.username === a && user.password === b);
    if (!user){
      alert('Incorrect Username or Password')
      return
    }
    else if (user.role === "Admin" )
    navigate("/admin");
    else if (user.role === "Checker" )
    navigate("/checker");
    else if (user.role === "Approver" )
    navigate("/approver");
    else if (user.role === "Creator" )
    navigate("/creator");

    
  }
 
  const handleUsername = (e) => {
    setUserName(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  } 
  return (
    <div className='login-div'>
      <div className='login-div2'>
        <h1 className="login-h1">Login</h1>
        <h3 className="login-h3">Username</h3>
        <input className="login-input"
          type='text'
          value={userName}
          onChange={(e) => handleUsername(e)}
       
        /> 
        <h3 className="login-h3">Password</h3>
        <input className="login-input"
          type='password'
          value={password}
          onChange={(e) => handlePassword(e)}
        />
        <br/>
        <br/>
        <button className ="login-button" onClick={() => clickHanler(userName,password)}>Enter</button>
      </div>
    </div>
  )
}

export default LoginPage