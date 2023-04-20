import React, { useState,useEffect } from "react";
import "./componentscss/UserMaster.css";
import {fetchGetApi} from "../../api/singlecall";
import { Link } from "react-router-dom";

function UserMaster() {
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
  const [users, setUsers] = useState([

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

  const fetch = async () => {
    const API=URL+"/users"
    const result = await fetchGetApi ("https://automatic-reporting-system.onrender.com/api/users");
    console.log("result",result);
    setUsers(result);
     console.log("clients",users);
  };
  
    useEffect(() => {
      fetch();
    
    }, []);
  const handleEdituser = (userid) => {
    // handle edit user logic
    console.log(`Editing user with ID ${userid}`);
  };

  const handleDeleteuser = (userid) => {
    // handle delete user logic
    setUsers(users.filter((user) => user.userid !== userid));
  };
const isButtonDisabled = selectedRow === null;
 
  return (
    <div>
      <label className="usermaster-label">
        <h1 className="usermaster-h1">User Master</h1>
      </label>
      <table className="usermaster-table">
        <thead className="usermaster-thead">
          <tr className="usermaster-tr">
             <th className="usermaster-th">No.</th>
            <th className="usermaster-th">User ID</th>
            <th className="usermaster-th">User Name</th>

          </tr>
        </thead>
        <tbody className="usermaster-tbody">
          {users.map((user,key) => (
            <tr  style={
            selectedRow === key
              ? { backgroundColor: 'lightgreen' }
              : { backgroundColor: 'white' }
          }
          onClick={() => handleClick(key)} className="usermaster-tr" key={key}>
              <td style={{border:"solid 1px black"}}>{key+1}</td>
              <td style={{border:"solid 1px black"}}>{user.userid}</td>
              <td style={{border:"solid 1px black"}}>{user.username}</td>

            </tr>
          ))}
        </tbody>
      </table>
       <div style={{display:"flex",justifyContent:"end"}}>
              <button className="edited" disabled={isButtonDisabled}>Edit</button>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
              <button  className="deleted" >Delete</button>
      </div>
       <div style={{display:"flex",justifyContent:"end"}}>
            {/* </div> */}
            {/* <div className='clientmaster-td'> */}
             <Link to="/admin/usercreation"> <button  style={buttonStyle3} >Add User</button></Link>
      </div>
    </div>
  );
}

export default UserMaster;
