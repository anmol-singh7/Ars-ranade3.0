import React, { useState,useEffect } from 'react';
import {fetchGetApi} from "../../api/singlecall"
import "./componentscss/SystemMaster.css";
import { Link } from 'react-router-dom';

function SystemMaster() {
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
  const URL=process.env.REACT_APP_URL;
  const [systems, setSystems] = useState([]);
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
  const handleEditsystem = (systemid) => {
    // handle edit system logic
    console.log(`Editing system with ID ${systemid}`);
  };

  const handleDeletesystem = (systemid) => {
    // handle delete system logic
    setSystems(systems.filter((system) => system.systemid !== systemid));
  }; 
  const fetch = async () => {
    const API=URL+"systems"
    const result = await fetchGetApi ("https://automatic-reporting-system.onrender.com/api/systems");
    console.log("result",result);
    setSystems(result);
     console.log("clients",systems);
  };
  
    useEffect(() => {
      fetch();
    }, []);
  const isButtonDisabled = selectedRow === null;
 
  return (
    <div>
    <label >
    <h1 className="clientmaster-h1">System Master</h1>
  </label>
    <table className='systemmaster-table'>
      <thead className='systemmaster-thead'>
        <tr className='systemmaster-tr'>
          <th className='systemmaster-th'>No.</th>
          <th className='systemmaster-th'>System ID</th>
          <th className='systemmaster-th'>System Name</th>
          
        </tr>
      </thead>
      <tbody className='systemmaster-tbody'>
        {systems.map((system,key) => (
            <tr  style={
            selectedRow === key
              ? { backgroundColor: 'lightgreen' }
              : { backgroundColor: 'white' }
          }
          onClick={() => handleClick(key)} className="systemmaster-tr" key={key}>
              <td style={{border:"solid 1px black"}}>{key+1}</td>
              <td style={{border:"solid 1px black"}}>{system.systemid}</td>
              <td style={{border:"solid 1px black"}}>{system.systemname}</td>

            </tr>
          ))}
      </tbody>
    </table>
       <div style={{display:"flex",justifyContent:"end"}}>
              <button className='edited' disabled={isButtonDisabled}>Edit</button>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
              <button  className='deleted'>Delete</button>
      </div>
       <div style={{display:"flex",justifyContent:"end"}}>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
             <Link to="/admin/systemcreate"> <button  style={buttonStyle3} >Add System</button></Link>
      </div>
    </div>
  );
}

export default SystemMaster;