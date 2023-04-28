import React, { useState } from "react";
import { fetchPostApi } from '../../api/singlecall';
import { inputdata } from "../people/tabletypes";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../design.css/user.css";

const AddEmploy = () => {
    const URL = process.env.REACT_APP_URL;

    const [values, setValues] = useState(inputdata["user"].fields);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        console.log(name,value,values);
        setValues({ ...values, [name]: value });
        console.log(values);
    };

    const handleSubmit =async(event,endpoint,Body)=>{
        event.preventDefault();
        console.log(endpoint, Body);
         const response = await fetchPostApi("https://automatic-reporting-system.onrender.com/api/"+endpoint,Body);
        //  if(response.status===200){

        //  }
        console.log("handlesubmit",response);
    }

    const backToDashboard=(tab)=>{
        const bck = inputdata[state].backpoint
        navigate(bck, { state: tab });
    }
    const isValidEmail=(email)=> {
        return /\S+@\S+\.\S+/.test(email);
    }
 
    const changeHandlerEmail = (e) => {
            if (!isValidEmail(e.target.value)) {
            if(e.target.value===""){
                setError(null);
            }
            else{
            setError('Email must of abc@exabyte.com');
            }
        } else {
            setError(null);
        }
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };
   
//  in this changeHandlerPassword function now i only implement th functionality to display messages 
//  this approach is very dumb it implement it just to chech how it look i will make new code which 
//  just of 35 Lines

    const changeHandlerPassword = (e) => {
       
        const str=e.target.value;
        if(str!==""){
            if(str.length<8){
            if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                 setError2(
                    <div>
                         <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                         <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                         <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                         <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                         <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                 );
              }
           else if (!/[A-Z]/.test(str) && /[a-z]/.test(str)  && !/[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
              setError2(
                  <div>
                      <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                      <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                      <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                      <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                      <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                  </div>
              );
            }
            else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }

            else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }

            else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[0-9]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
            else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                setError2(
                    <div>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                        <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                        <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                    </div>
                );
            }
                else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                    setError2(
                        <div>
                            <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                            <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                            <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                            <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                            <span style={{ color: 'red' }}> Passowrd must have 8 character</span>
                        </div>
                    );
                } 
        }
            else{
               
                    if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }

                    else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && !/[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }

                    else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && !/[-+_!@#$%^&*., ?]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && !/[0-9]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && /[a-z]/.test(str) && /[0-9]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (!/[A-Z]/.test(str) && !/[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'red' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                    else if (/[A-Z]/.test(str) && /[a-z]/.test(str) && /[-+_!@#$%^&*., ?]/.test(str) && /[0-9]/.test(str)) {
                        setError2(
                            <div>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one uppercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one lowercase letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one symbol</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must contain atlest one numeric letter</span><br></br>
                                <span style={{ color: 'lightgreen' }}> Passowrd must have 8 character</span>
                            </div>
                        );
                    }
                }
            
            }                 
        else{
            setError2(null);
        }

        const { name, value } = e.target;
        setValues({ ...values, [name]: value });

    };
    
   const mandatoryfiled=(name)=>{
    if(name[0]==="Email"){
        return <div className="usercreation-div2">

            <label className="usercreation-label-2">{name[0]}< span style={{color:'red'}}>*</span></label>
            <input
                className="usercreation-input"
                type={name[2]}
                id={name[1]}
                name={name[1]}
                value={values[name[1]]}
                onChange={changeHandlerEmail}
                placeholder={`Enter your ${name[0]}`}
                required
            />
            {error && <span style={{ color: 'red',fontSize:'13px' }}>{error}</span>}

        </div>
    }
    else if(name[0]==="Password" && state==='user'){
       
            return <div className="usercreation-div2">

                <label className="usercreation-label-2">{name[0]}< span style={{ color: 'red' }}>*</span></label>
                <input
                    className="usercreation-input"
                    type={name[2]}
                    id={name[1]}
                    name={name[1]}
                    value={values[name[1]]}
                    onChange={changeHandlerPassword}
                    placeholder={`Enter your ${name[0]}`}
                    required
                />
                {error2 && <span style={{ fontSize: '13px' }}>{error2}</span>}

            </div>
        
    }
       
    else if (name[0] === "Password"||name[0] === "User Type" || name[0] === "Database Name" || name[0] === "Host" || name[0] === "User") {
        return <div className="usercreation-div2">

            <label className="usercreation-label-2">{name[0]}< span style={{ color: 'red' }}>*</span></label>
            <input
                className="usercreation-input"
                type={name[2]}
                id={name[1]}

                name={name[1]}
                value={values[name[1]]}
                onChange={changeHandler}
                placeholder={`Enter your ${name[0]}`}
                required
            />

        </div>
    }
    else {
        return <div className="usercreation-div2">

            <label className="usercreation-label-2">{name[0]}</label>
            <input
                className="usercreation-input"
                type={name[2]}
                id={name[1]}
                name={name[1]}
                value={values[name[1]]}
                onChange={changeHandler}
                placeholder={`Enter your ${name[0]}`}
            />

        </div>
    }
   }
    return (
        <div className="usercreation-div">
            <label>
                <h1 className="usercreation-h1">{`Create New ${state}`}</h1>
            </label>
            <div className="formcenter">
                <form className="usercreation-form" onSubmit={(e) => handleSubmit(e, inputdata[state].endpoint, values)}>
                    {inputdata[state].fieldnames.map((name,index)=> name[3]==="input" ?
                        mandatoryfiled(name)
                        : 
                        <div className="usercreation-div2">
                            <label className="usercreation-label-2">{name[0]}<span style={{color:"red"}}>*</span></label>

                        <select
                        
                            className="usercreation-input"
                            type={name[2]}
                            id={name[1]}
                            name={name[1]}
                            value={values[name[1]]}
                            onChange={changeHandler}
                            placeholder={`Enter your ${name[0]}`}
                            required
                            
                        >
                            <option value="" disabled >
                                Select an option
                            </option>
                            {/* <option key={1}>Admin</option> */}
                            <option key={2}>Creator</option>
                            <option key={3}>Checker</option>
                            <option key={4}>Approver</option>

                        </select>
                        </div>
)}
                    <div>
                       
                        <button className="usercreation-button" type="submit" onClick={()=>backToDashboard(state)}>
                            Back                 
                        </button>

                        <button className="usercreation-button" >
                            enter
                        </button>
                        {/* <button type="button" onClick={(()=>console.log(values))}> </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmploy;
