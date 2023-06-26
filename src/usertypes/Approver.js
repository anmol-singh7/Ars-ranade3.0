import React, { useState } from "react";
// import "../components/admincomponents/componentscss/FormList.css";
import { useLocation } from "react-router-dom";
import FormList from '../components/creatorcomponents/FormList';

function Creator({creator}) {
  const {state}=useLocation();
  return(
    <FormList  creatorID={state.userid} usertype={state.usertype}/>
  )
}

export default Creator;
