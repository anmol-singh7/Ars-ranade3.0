import React from 'react'
import { useNavigate } from 'react-router-dom'

const Default = () => {
  const navigate=useNavigate()
  const goto =()=>{
navigate('/login')
  };
  return (
    <div style={{
      backgroundImage:
        "url('https://previews.123rf.com/images/prakobkit/prakobkit1901/prakobkit190100062/117779220-aerial-view-of-container-cargo-ship-in-sea.jpg')",width:'100vw',height:'100vh'}}>

      <button  style={{position:'absolute',padding:'8px 20px',border:'1px solid black',borderRadius:'5px',backgroundColor:'green',color:'white',right:'1.5vw',top:'2vh'}} onClick={goto}>Login</button>
    </div>
    
  )
}

export default Default