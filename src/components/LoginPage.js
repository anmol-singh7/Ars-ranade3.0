import React from 'react'
import '../design.css/LoginPage.css'
import { useState } from 'react'
import { users } from '../stubdata/users'
import { useNavigate } from 'react-router-dom';
import { fetchPostApi } from '../api/singlecall';


const LoginPage = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [bgc,setbgc] = useState("white");
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;
  const API = URL + "/login";
  

  const clickHandler = async(a, b,API) => {
    const cred ={email:a,password:b};
    const res = await fetchPostApi(API,cred);
    if(!res.userid){
        setbgc("red");
    }
    if (res.userid===-1) {
      alert('Incorrect Username or Password')
      return;
    }
    else if (res.usertype === "admin")
      navigate("/dashboard",{state:res});
    else if (res.usertype === "checker")
      navigate("/checker", { state: res });
    else if (res.usertype === "approver")
      navigate("/approver", { state: res });
    else if (res.usertype === "creator")
      navigate("/creator", { state: res });


  }

  const handleUsername = (e) => {
    setUserName(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div className='login-div' style={{backgroundColor: bgc}}>
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
        <br />
        <br />
        <button className="login-button" onClick={() => clickHandler(userName, password,API)}>Enter</button>
      </div>
    </div>
  )
}

export default LoginPage