import React, { useState,useEffect } from 'react';
import "./componentscss/ClientMaster.css";
import {fetchGetApi} from "../../api/singlecall";
import {Link} from "react-router-dom";



function ClientMaster() {

  const buttonStyle1 = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
  };
  const buttonStyle2 = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
  };
  const buttonStyle3 = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
  };
  const URL=process.env.REACT_APP_URL
  // console.log("NSJKDC",URL+"clients")
  
  const [clients, setClients] = useState([]);
  const fetch = async () => {
  const API=URL+"clients"
  const result = await fetchGetApi ("https://automatic-reporting-system.onrender.com/api/clients");
  console.log("result",result);
  setClients(result);
   console.log("clients",clients);
};
useEffect(() => {
    fetch();
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);
  const handleClick = (index) => {
    console.log("index",index)
    if (index === selectedRow) {
      console.log("selected",selectedRow)
      setSelectedRow(null);
    } else {
      console.log("other",selectedRow)
      setSelectedRow(index);
    }
  };

  const handleEditClient = (clientid) => {
    // handle edit client logic
    console.log(`Editing client with ID ${clientid}`);
  };
 

  const handleDeleteClient = (clientid) => {
    // handle delete client logic
    setClients(clients.filter((client) => client.clientid !== clientid));
  };
  console.log("url",process.env.REACT_APP_URL)

  const isButtonDisabled = selectedRow === null;
  return (
    <div>
    <label >
    <h1 className="clientmaster-h1">Client Master</h1>
  </label>
    <table className='clientmaster-table' >
      <thead className='clientmaster-thead'>
        <tr className='clientmaster-tr'>
          <th className='clientmaster-th'>No.</th>
          <th className='clientmaster-th'>Client ID</th>
          <th className='clientmaster-th'>Client Name</th>
          <th className='clientmaster-th'>Database Number</th>
          
        </tr>
      </thead>
      <tbody className='clientmaster-tbody'>
        {clients.map((client,key) => (
            <tr  style={
            selectedRow === key
              ? { backgroundColor: 'lightgreen' }
              : { backgroundColor: 'white' }
          }
          onClick={() => handleClick(key)} className="clientmaster-tr" key={key}>
              <td style={{border:"solid 1px black"}}>{key+1}</td>
              <td style={{border:"solid 1px black"}}>{client.clientid}</td>
              <td style={{border:"solid 1px black"}}>{client.clientname}</td>
              <td style={{border:"solid 1px black"}}>{client.databaseNum}</td>
           </tr>
          ))}
      </tbody>
    </table>

     <div style={{display:"flex",justifyContent:"end"}}>
              <button className='edit' disabled={isButtonDisabled} onClick={() => handleEditClient()}>Edit</button>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
              <button  className='delete' onClick={() => handleDeleteClient()}>Delete</button>
      </div>
       <div style={{display:"flex",justifyContent:"end"}}>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
             <Link to="/admin/clientdb"> <button  style={buttonStyle3} >Add Client</button></Link>
      </div>
    </div>
  );
}

export default ClientMaster;