import React, { useEffect, useState } from "react";
import {fetchGetApi, fetchPostApi } from "../../api/singlecall";
import "../admincomponents/componentscss/FormCreate.css";

function FormCreate() {
  const URL=process.env.REACT_APP_URL;
  const API1 =URL+"client/databases";
  const API2=URL+"systems"
  const API3=URL+"manufacturers"
  const API4 = URL+"tables";
  const API5 = URL+"uniqueformtypes";
  const [showComponentOne, setShowComponentOne] = useState(true);
  const [showComponentTwo, setShowComponentTwo] = useState(false);
  const [showComponentThree, setShowComponentThree] = useState(false);
  const [showComponentFour, setShowComponentFour] = useState(false);
  const [showComponentFive, setShowComponentFive] = useState(false);

  const [clientList, setClientList] = useState([]);
  const [systemList, setSystemList] = useState([]);
  const [selectedDB,setSelectedDB] = useState("");
  const [manufacturerList,setManufacturerList]=useState([]);
  const [tables,setTables]=useState([]);
  const [selectedclient,setselectedclient]=useState("");
  const [selectedTable,setSelectedTable]=useState("");
  const [formValues, setFormValues] = useState({
    userid: "ABS-896645467/Creator",
    clientid: "",
    formtype: "",
    systems: "",
    manufacturer: "",
    datebegin: "",
    timebegin: "",
    dateend: "",
    timeend: "",
    status: "cre",
    timetype: "",
    table:'',
    databasename:'',
  });

  function getUniqueClientIds(data) {
  let uniqueClientIds = [];

  data.forEach(item => {
    if (!uniqueClientIds.includes(item.clientid)) {
      
      uniqueClientIds.push(item.clientid);
    }
  });

  return uniqueClientIds;
}

function getDatabaseNamesByClientId(clientid, data) {
  let databaseNames = data.filter(item => item.clientid === clientid)
                          .map(item => item.databasename);
  return databaseNames;
}
const databases=getDatabaseNamesByClientId(selectedclient,clientList);
console.log("ddddd",databases);

const setDBandcallTableapi = async (event)=>{
setSelectedDB(event);
const tablelist = await fetchPostApi(API4, { databasename:event });
    setTables(tablelist);
}

  // function getClientIdByDatabaseName(jsonArray, databasename) {
  //   const obj = jsonArray.find(item => item.databasename === databasename);
  //   return obj ? obj.clientid : null;
  // };
  // const Cid=getClientIdByDatabaseName(clientList,selectedDB);
  // console.log(Cid,selectedDB);
  const clients=getUniqueClientIds(clientList);

  const getUniqueSystems = [
    ...new Set(systemList.map((item) => item.systemname)),
  ];
  const getUniqueManu = [
    ...new Set(manufacturerList.map((item) => item.manufacturername)),
  ];


  const fetch1 = async (API) => {
    
    const result = await fetchGetApi (API);
    console.log("result1",result);
    setClientList(result); 
  };
  const fetch2 = async (API) => {
    
    const result = await fetchGetApi (API);
    console.log("result2",result);
    setSystemList(result); 
  };

  const fetch3 = async (API) => {
    
    const result = await fetchGetApi (API);
    console.log("result3",result);
    setManufacturerList(result); 
  };
 
  useEffect(() => {
  fetch1(API1);
  fetch2(API2);
  fetch3(API3);

  }, []);
  if(selectedDB!==null)
console.log("sec",selectedclient)
console.log("anmol",selectedDB)
  function ComponentOne() {
    return (<div className="formcreate-div">
    <label  className="formcreate-label" htmlFor="clientSelect">
      <h1 className="formcreate-h1">SELECT CLIENT:</h1>
      </label>
    <select className="formcreate-select" id="clientSelect" onChange={(e)=>setselectedclient(e.target.value)}>
      <option className="formcreate-option" value="">Select a client</option>
      {clients.map((cur,key)=>(
        <option key={key} value={cur}>{cur}</option>
      ))}
      
    </select>
    <label  className="formcreate-label" htmlFor="dbSelect">
      <h1 className="formcreate-h1">SELECT Database:</h1>
      </label>
    <select className="formcreate-select" id="dbSelect" onChange={(e)=>setDBandcallTableapi(e.target.value)}>
      <option className="formcreate-option" value="">Select a database</option>
      {databases.map((cur,key)=>(
        <option key={key} value={cur}>{cur}</option>
      ))}
      
    </select>

    <label  className="formcreate-label" htmlFor="tableSelect">
      <h1 className="formcreate-h1">SELECT Table:</h1>
      </label>
    <select className="formcreate-select" id="tableSelect" onChange={(e)=>handleDBSelection(e.target.value)}>
      <option className="formcreate-option" value="">Select a table</option>
      {tables.map((cur,key)=>(
        <option key={key} value={cur}>{cur}</option>
      ))}
      
    </select>
  </div>);
  }
  
  function ComponentTwo() {
    
    return (<div className="formcreate-div">
      <label className="formcreate-label">
        <h1 className="formcreate-h1db">
      <p>Selected database: {selectedDB}</p>
      </h1>
      </label>
      <div className="formcreate-div">
<label>
    <h1 className="formcreate-h1">Create New Report</h1>
  </label>
  
<form className="formcreate-form" onSubmit={(e)=>handleSubmit(e)}>
 <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="userid">User ID</label>
  <input
  className="formcreate-select"
    type="text"
    id="userid"
    name="userid"
    value={formValues.userid}
    onChange={handleChange}
    placeholder={formValues.userid}
    disabled
  />
  </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="clientid">Client ID</label>
  <input
  className="formcreate-select"
    type="text"
    id="clientid"
    name="clientid"
    value={selectedclient}
    // onChange={handleChange}
    placeholder={selectedclient}
    disabled
  />
  {/* <select
  className="createreport-select"
    type="text"
    id="clientid"
    name="clientid"
    value={formValues.clientid}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    {getUniqueClients.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select> */}
  </div>
  {/* <div className="createreport-div2">
  <label  className="createreport-label-2" htmlFor="reporttype">Report Type</label>
  <select
  className="createreport-select"
    type="text"
    id="reporttype"
    name="reporttype"
    value={formValues.reporttype}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    {getUniqueFormTypes.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select>
  </div> */}
   <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="systems">Systems</label>
  <select
    className="formcreate-select"
    type="text"
    id="systems"
    name="systems"
    value={formValues.systems}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    {getUniqueSystems.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select>
  </div>   
    <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="manufacturer">Manufacturer</label>
  <select
    className="formcreate-select"
    type="text"
    id="manufacturer"
    name="manufacturer"
    value={formValues.manufacturer}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    {getUniqueManu.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select>
  </div>
   <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="datebegin">Date Begin</label>
  <input
  className="formcreate-input"
    type="date"
    id="datebegin"
    name="datebegin"
    value={formValues.datebegin}
    onChange={handleChange}
    />
  </div>
      <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timebegin">Time Begin</label>
  <input
  className="formcreate-input"
    type="time"
    id="timebegin"
    name="timebegin"
    value={formValues.timebegin}
    onChange={handleChange}
  />
  {console.log("hii",formValues.datebegin)}
 { console.log(formValues.timebegin)}
  </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="dateend">Date End</label>
  <input
    className="formcreate-input"
    type="date"
    id="dateend"
    name="dateend"
    value={formValues.dateend}
    onChange={handleChange}
   />
  </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timeend">Time End</label>
  <input
    className="formcreate-input"
    type="time"
    id="timeend"
    name="timeend"
    value={formValues.timeend}
    onChange={handleChange}
  />
  </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timetype">Time Type</label>
  <select
  className="formcreate-select"
    type="text"
    id="timetype"
    name="timetype"
    value={formValues.timetype}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    <option value="1">Date And Time Separate</option>
    <option value="2">Date And Time Joined</option>
  </select>
  </div>
  
  <div>
  <button className="formcreate-button" type="submit">Next {">>"}</button>
  
  
  </div>
</form>


</div>
</div>);
  }
  
  function ComponentThree() {
    return (
      <div>hi</div>
    );
  }
  
  function ComponentFour() {
    return <h1>Component Four</h1>;
  }
  
  function ComponentFive() {
    return <h1>Component Five</h1>;
  }
 

  const handleClickOne = () => {
    console.log(tables, formValues);
  };

  
  const handleDBSelection =(event) => {
    console.log('selectedtableevent',event)
    setSelectedTable(event);
    setShowComponentOne(false);
    setShowComponentTwo(true);
    setShowComponentThree(false);
    setShowComponentFour(false);
    setShowComponentFive(false);
  
    
   console.log("selectedtable",selectedTable)
    
  };
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = () => {
    setShowComponentOne(false);
    setShowComponentTwo(false);
    setShowComponentThree(true);
    setShowComponentFour(false);
    setShowComponentFive(false);
    // setSelectedDB(event.target.value);
    setFormValues({
      ...formValues,
      databasename: selectedDB,
      clientid:selectedclient,
      table:selectedTable

    });
  };

  const handleClickFour = () => {
    setShowComponentOne(false);
    setShowComponentTwo(false);
    setShowComponentThree(false);
    setShowComponentFour(true);
    setShowComponentFive(false);
  };

  const handleClickFive = () => {
    setShowComponentOne(false);
    setShowComponentTwo(false);
    setShowComponentThree(false);
    setShowComponentFour(false);
    setShowComponentFive(true);
  };

  return (
    <div>
      <button onClick={handleClickOne}>Component One</button>
    
     
      <button onClick={handleClickFour}>Component Four</button>
      <button onClick={handleClickFive}>Component Five</button>
      <br />
      <br />
      {showComponentOne && <ComponentOne />}
      {showComponentTwo && <ComponentTwo />}
      {showComponentThree && <ComponentThree />}
      {showComponentFour && <ComponentFour />}
      {showComponentFive && <ComponentFive />}
    </div>
  );
};

export default FormCreate;


// @import url("https://use.fontawesome.com/releases/v5.15.2/css/all.css");
// @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
// @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
// @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
// .finalformcreate-container {
//   max-width: 80vw;
//   margin: 0 auto;
//   font-family: Arial, sans-serif;
//   font-size: 16px;
// }

// .finalformcreate-label{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     font-family: 'Roboto', sans-serif;
//     font-size: 2.5rem;
//     font-weight: 600;
//     margin-bottom: 20px;
//     color: #2134ad;
// }

// .finalformcreate-table {
//   border-collapse: collapse;
//   width: 100%;
// }

// .finalformcreate-table th,
// .finalformcreate-table td {
//   padding: 8px;
//   text-align: left;
//   vertical-align: middle;
//   border: 1px solid #ddd;
// }

// .finalformcreate-table th {
//   background-color: #f2f2f2;
//   font-weight: bold;
//   block-size: 120%;
// }

// .finalformcreate-table tr:nth-child(even) {
//   background-color: #f2f2f2;
// }

// .finalformcreate-table tr:hover {
//   background-color: #ddd;
// }

// .finalformcreate-table input[type="text"],
// .finalformcreate-table select {
//   padding: 8px;
//   font-size: 16px;
//   border-radius: 4px;
//   border: 1px solid #ddd;
//   width: 100%;
//   box-sizing: border-box;
// }

// .finalformcreate-table button {
//   padding: 4px;
//   margin: 1px;
//   font-size: 8px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
// }

// .finalformcreate-table button:disabled {
//   opacity: 0.5;
//   cursor: not-allowed;
// }

// .finalformcreate-table .finalformcreate-add-button {
//     width: 50%;
//     height: 40px;
//     background-color: #4CAF50;
//     color: white;
//     font-size: 1.2rem;
//     font-weight: 500;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.5s ease-in-out;
// }

// .finalformcreate-table .finalformcreate-submit-button {
//     width: 50%;
//     height: 40px;
//     background-color: #4CAF50;
//     color: white;
//     font-size: 1.2rem;
//     font-weight: 500;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.5s ease-in-out;
// }

// .finalformcreate-table button:hover {
//   background-color: #3e8e41;

// }

// .finalformcreate-table button:active {
//   background-color: #e7e7e7;
//   color: #000;
// }


// .formcreate-div {
 
//   width: 100%;
//   margin-bottom: 0rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height:20vh;
//   background-color:  #f1f1f3;

  
// }

// .formcreate-label {
//   text-align: center;
//   font-size: 1.2rem;
//   margin-bottom: 1rem;
//   display: block;
//   color: #2134ad;

//   font-family: "Material Icons";
//   margin-right: 5px;
// }


// .formcreate-h1 {
//   display: flex;
//   background-color: #eaeeea;

//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   font-size: 32px;
//   font-weight: 700;
//   color: #2134ad;
//   text-align: center;
// }

// .formcreate-h1::before {
//   content: "\f007";
//   font-family: "Font Awesome 5 Free";
//   margin-right: 10px;
// }

// .formcreate-form {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   max-width: 500px;
//   padding: 2rem;
//   border-radius: 10px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
//   background-color: #ffffff;
//   font-family: Arial, sans-serif;
//   margin-top: 20px;
//   margin-bottom: 10px;
// }

//  .formcreate-div2 {

//   display:flex;
//   flex-direction: column;
//   width: 80%;
//   margin-bottom: 1.5rem;
//   margin-left: 1rem;
//   align-items: left;
//   text-align: left;
//   justify-content: center;
// }

// .formcreate-div3 {


//   width: 80%;
//   margin-bottom: 1.5rem;
//   margin-left: 1rem;
//   align-items: left;
//   text-align: left;
//   justify-content: left;
// }

//  .formcreate-label2 {
//   text-align: left;
//   display:flex;
//   font-size: 16px;
//   font-weight: 700;
//   color: #333;
//   margin-bottom: 8px;
// }
// .formcreate-input {
//   border: 1px solid #090909;
//   border-radius: 5px;
//   padding: 0.75rem;
//   font-size: 1rem;
//   font-weight: 400;
//   background-color: #f5f5f5;
//   color: #1e1e1e;
//   transition: all 0.5s ease-in-out;
//   border-bottom: 1px solid #ccc;
//   width: 100%;
//   margin-bottom: 2rem;
// }

// .formcreate-select {
//   border: none;
//   border-radius: 5px;
//   padding: 0.75rem;
//   font-size: 1rem;
//   font-weight: 400;
//   background-color: #f5f5f5;
//   color: #1e1e1e;
//   transition: all 0.5s ease-in-out;
//   width: 100%;


//   border-bottom: 1px solid #ccc;
//   width: 70%;
//   margin-bottom: 2rem;

// }

// /* .formcreate-input:focus{
//   outline: none;
//   border-bottom: 1px solid #007bff;
// }


// .formcreate-select:focus{
//   outline: none;
//   border-bottom: 1px solid #007bff;
// } */

// .add-button{
//   border: none;
//   border-radius: 5px;
//   padding: 0.75rem 1rem;
//   font-size: 1rem;
//   font-weight: 600;
//   background-color: #4CAF50;
//   color: #ecedec;
//  margin-right: 50px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// }

// .add-button:hover {
// color: #2c4df2;
// }
// .add-button::before {
//   background-color: #555;
//   font-family: "Font Awesome 5 Free";
//   margin-right: 10px;
// }

// .formcreate-button {
//   border: none;
//   border-radius: 5px;
//   padding: 0.75rem 1rem;
//   font-size: 1rem;
//   font-weight: 600;
//   background-color: #4CAF50;
//   color: #ecedec;
//  margin-right: 50px;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// }

// .formcreate-button:hover {
// color: #2c4df2;
// }
// .formcreate-button::before {
//   background-color: #555;
//   font-family: "Font Awesome 5 Free";
//   margin-right: 10px;
// }




// @media screen and (max-width: 768px) {
//   .formcreate-h1 {
//     font-size: 28px;
//   }

//   .formcreate-form {
//     max-width: 400px;
//   }
// }



  
// .formcreate-h1{
//   display: block;
//   background-color: #eaeeea;

//   align-items: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   font-size: 32px;
//   font-weight: 700;
//   color: #2134ad;
//   text-align: center;
// }

// .formcreate-table {
//   border-collapse: collapse;
//   width: 100%;
//   border: 1px solid #070707;

// }

// .formcreate-th,
// .formcreate-td {
//   padding: 8px;
//   text-align: left;
//   vertical-align: middle;
//   border: 1px solid #090909;
  
// }

// .formcreate-table th {
//   background-color: #f2f2f2;
//   font-weight: bold;
//   block-size: 120%;
//   border: 1px solid #070707;

// }

// .formcreate-tr:hover {
//   background-color: #ddd;
// }

// .formcreate-input[type="text"],




// .formcreate-button:disabled {
//   opacity: 0.5;
//   cursor: not-allowed;
// }
// .f1111{
//   color: #3e8e41;
// }

// /* 
// .formcreate-button {
//     width: 50%;
//     height: 40px;
//     background-color:#f3f4f6;
//     color: white;
//     font-size: 1.2rem;
//     font-weight: 500;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     transition: background-color 0.5s ease-in-out;
// }

// .formcreate-table button:hover {
//   background-color: #acb5ee;

// }

// .formcreate-table button:active {
//   background-color: #e7e7e7;
//   color: #000;
// }

//  */
