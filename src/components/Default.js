import React from 'react'
import { useNavigate } from 'react-router-dom'

const Default = () => {
  const navigate=useNavigate()
  const goto =()=>{
navigate('/login')
  };
  return (
    <div>Default
      <button onClick={goto}>Login</button>
    </div>
    
  )
}

export default Default