import React, { useState,useEffect } from 'react';
import "./componentscss/ManufacturerMaster.css";
import {fetchGetApi} from "../../api/singlecall";
import { Link } from 'react-router-dom';

function ManufacturerMaster() {

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
  const [Manufacturers, setManufacturers] = useState([   
  ]);
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

  const handleEditManufacturer = (manufacturerid) => {
    // handle edit Manufacturer logic
    console.log(`Editing Manufacturer with ID ${manufacturerid}`);
  };
  const fetch = async () => {
    const URL=process.env.REACT_APP_URL;
    const API=URL+"manufacturers"
    const result = await fetchGetApi ("https://automatic-reporting-system.onrender.com/api/manufacturers");
    console.log("result",result);
    setManufacturers(result);
     console.log("clients",Manufacturers);
  };
  
    useEffect(() => {
      fetch();
    }, []);
  const handleDeleteManufacturer = (manufacturerid) => {
    // handle delete Manufacturer logic
    setManufacturers(Manufacturers.filter((Manufacturer) => Manufacturer.manufacturerid !== manufacturerid));
  };
const isButtonDisabled = selectedRow === null;
 
  return (
    <div>
    <label >
    <h1 className="clientmaster-h1">Manufacturer Master</h1>
  </label>
    <table className='manufacturermaster-table'>
      <thead className='manufacturermaster-thead'>
        <tr className='manufacturermaster-tr'>
           <th className='manufacturermaster-th'>No.</th>
          <th className='manufacturermaster-th'>Manufacturer ID</th>
          <th className='manufacturermaster-th'>Manufacturer Name</th>
        </tr>
      </thead>
      <tbody className='manufacturermaster-tbody'>
        {Manufacturers.map((manufacturer,key) => (
            <tr  style={
            selectedRow === key
              ? { backgroundColor: 'lightgreen' }
              : { backgroundColor: 'white' }
          }
          onClick={() => handleClick(key)} className="manufacturermaster-tr" key={key}>
              <td style={{border:"solid 1px black"}}>{key+1}</td>
              <td style={{border:"solid 1px black"}}>{manufacturer.manufacturerid}</td>
              <td style={{border:"solid 1px black"}}>{manufacturer.manufacturername}</td>

            </tr>
          ))}
      </tbody>
    </table>
    <div style={{display:"flex",justifyContent:"end"}}>
              <button className='edited' disabled={isButtonDisabled}>Edit</button>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
              <button  className='deleted' >Delete</button>
      </div>
       <div style={{display:"flex",justifyContent:"end"}}>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
             <Link to="/admin/manufacturercreate"> <button  style={buttonStyle3} >Add Manufacturer</button></Link>
      </div>
    </div>
  );
}

export default ManufacturerMaster;
