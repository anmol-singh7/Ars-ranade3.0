import React, { useEffect, useState } from "react";
import { Form} from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import {fetchGetApi, fetchPostApi } from "../../api/singlecall";
import { useLocation } from "react-router-dom";
import "../../design.css/FormCreate.css";

function FormCreate({creatorID,usertype}) {
  const URL=process.env.REACT_APP_URL;
  const API1 = URL+"client/databases";
  const API2 = URL+"systems";
  const API3 = URL+"manufacturers";
  const API4 = URL+"tables";
  const API5 = "https://automatic-reporting-system.onrender.com/api/" +"uniqueformtypes";
  const API6 = "https://automatic-reporting-system.onrender.com/api/"+"description";
  const navigate = useNavigate();
  const [showComponentOne, setShowComponentOne] = useState(true);
  const [showComponentTwo, setShowComponentTwo] = useState(false);
  const [Rname,setRname] = useState("")
  

  const [clientList, setClientList] = useState([]);
  const [systemList, setSystemList] = useState([]);
  const [selectedDB,setSelectedDB] = useState("");
  const [manufacturerList,setManufacturerList]=useState([]);
  const [table1,setTable1]=useState([]);
  const [formList,setFormList]=useState([]);
  const [min_date,setmin_date]=useState("");
  const [max_date,setmax_date]=useState("");

  const [formValues, setFormValues] = useState({
    creatorid: creatorID,
    clientid: "",
    formtype: "",
    systems: "",
    manufacturer: "",
    datebegin: "",
    timebegin: "",
    dateend: "",
    timeend: "",
    status1: "Draft",
    timetype: "",
    table1:'',
    databasename:'',
    version:'',
    reportid:null,
    utilityid:null,
    checkerid:0,
    approverid:0,
    count:1,
    reportname:"",

  });

function getClientIdByDatabaseName(jsonArray, databasename) {
    const obj = jsonArray.find(item => item.databasename === databasename);
    return obj ? obj.clientid : null;
  };

  const Cid=getClientIdByDatabaseName(clientList,selectedDB);

  const getUniqueSystems = [
    ...new Set(systemList.map((item) => item.systemname)),
  ];

  const getUniqueManu = [
    ...new Set(manufacturerList.map((item) => item.manufacturername)),
  ];

  
  const fetch1 = async (API) => {
    
    const result = await fetchGetApi (API);

    setClientList(result); 
  };

  const fetch2 = async (API) => {
    
    const result = await fetchGetApi (API);
 
    setSystemList(result); 
  };

  const fetch3 = async (API) => {
    
    const result = await fetchGetApi (API);

    setManufacturerList(result); 
  };

  useEffect(() => {
  fetch1(API1);
  fetch2(API2);
  fetch3(API3);
  
  }, []);

  function ComponentOne() {
    return (<div className="formcreate-div">
    <label  htmlFor="dbSelect">
      <h1 className="formcreate-h1">Database Select:</h1>
      </label>
    <select className="formcreate-select" id="dbSelect" onChange={(e)=>handleDBSelection(e.target.value)}>
      <option className="formcreate-option" value="">Select a database</option>
      {clientList.map((cur,key)=>(
        <option key={key} value={cur.databasename}>{cur.databasename}</option>
      ))}
      
    </select>
  </div>);
  }
  
  function ComponentTwo() {
    
    return (<div className="formcreate-divselecteddb">
      <label>
     <h1> <p>Selected database: {selectedDB}</p>
      </h1>
      </label>
      <div className="formcreate-div2">
<label>
    <h1 className="formcreate-h1">Create New Report</h1>
  </label>
  
<form className="formcreate-" onSubmit={(e)=>handleSubmit(e)}>
  <Form.Field>
 <div className="formcreate-div2">
  <label className="formcreate-label2" htmlFor="creatorid">Creator ID</label>
  <div class="error-message">*This field is mandatory</div>
  <input
   className="formcreate-select"
    type="text"
    id="creatorid"
    name="creatorid"
    value={formValues.creatorid}
    onChange={handleChange}
    placeholder={formValues.creatorid}
    disabled
  />
  
  </div>
  </Form.Field>

  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="clientid">Client ID</label>
  <div class="error-message">*This field is mandatory</div>
  <input
  className="formcreate-select"
    type="text"
    id="clientid"
    name="clientid"
    value={Cid}
    // onChange={handleChange}
    placeholder={Cid}
    disabled
  />

  </div>

   <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="systems">Systems</label>
  <div class="error-message">*This field is mandatory</div>
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
  <label className="formcreate-label-2" htmlFor="table1">Table</label>
  <div class="error-message">*This field is mandatory</div>
  <select
    className="formcreate-select"
    type="text"
    id="table1"
    name="table1"
    value={formValues.table1}
    onChange={(e)=>handleChangeTable1(e)}
  >
    <option value="" disabled >Select an option</option>
    {table1.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select>
  </div>  
  
 {/* <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="reportname">Report Name:</label>
  <input
   className="formcreate-input"
    // type="text"
    id="reportname"
    name="reportname"
    value={formValues.reportname}
    onChange={handleChange}
   
  />
  </div> */}
 
    <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="manufacturer">Manufacturer</label>
  <div class="error-message">*This field is mandatory</div>
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
   <div className="formcreate-div3">
            <label className="formcreate-label2" htmlFor="datebegin">Date Begin</label>
            <input
              className="formcreate-select"
              type="date"
              id="datebegin"
              placeholder="dd-mm-yyyy"
              name="datebegin"
              value={formValues.datebegin}
              min={min_date}
              max={max_date}
              // disabled={!min_date}
              onChange={handleChange}
            />
          </div>
  
      <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timebegin">Time Begin</label>
  <div class="error-message">*This field is mandatory</div>
  <input
  className="formcreate-select"
    type="time"
    id="timebegin"
    name="timebegin"
    value={formValues.timebegin}
    onChange={handleChange}

  />

  </div>
  <div className="formcreate-div3">
            <label className="formcreate-label2" htmlFor="datebegin">Date End</label>
            <input
              className="formcreate-select"
              type="date"
              id="dateend"
              name="dateend"
              placeholder="dd-mm-yyyy"
              value={formValues.dateend}
              min={formValues.datebegin}
              max={max_date}
              // disabled={!min_date}
              onChange={handleChange}
            />
          </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timeend">Time End</label>
  <div class="error-message">*This field is mandatory</div>
  <input
    className="formcreate-select"
    type="time"
    id="timeend"
    name="timeend"
    value={formValues.timeend}
    onChange={handleChange}
    disabled={!formValues.datebegin}
  />
  </div>
  <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="timetype">Time Type</label>
  <div class="error-message">*This field is mandatory</div>
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
  <button className="formcreate-button" >{"<<"}Previous  </button>
  <button className="formcreate-button"onClick={()=>sendData()}>Save</button>
  <button className="formcreate-button" type="submit">Continue {">>"} </button>
  {isDateEndBeforeDateBegin() && (
        <p>Date End cannot be before Date Begin</p>
      )}
  
  </div>
</form>


</div>
</div>
);
  }
  
  const handleDBSelection =async (event) => {
    setSelectedDB(event);
    setShowComponentOne(false);
    setShowComponentTwo(true);
  
    const dat = await fetchPostApi(API4, { databasename:event });
    console.log("rrrrrrrrrrrrrr",dat);
    setTable1(dat);
   };


  const handleChange = (event) => {
   
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

  const handleChangeTable1 =async (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });

      const body={databasename:selectedDB, tablename: event.target.value};
      const formslist= await fetchPostApi(API5,body);
      setFormList(formslist.formtypes);
      setmin_date(formslist.mindate.substring(0,10));
      setmax_date(formslist.maxdate.substring(0,10));
      console.log(formslist.mindate.substring(0,10),formslist.maxdate.substring(0,10))

  };

  const isDateEndBeforeDateBegin = () => {
    const startDateString = `${formValues.datebegin}T${formValues.timebegin}`;
    const endDateString = `${formValues.dateend}T${formValues.timeend}`;
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return endDate < startDate;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const repid = await fetchPostApi(API6,formValues);
    alert('Data submitted successfully!');
    const alfa = repid.reportid;
    navigate('/Createfinalreport', { state: { alfa } }); 
  };

  const sendData = async ()=>{
    console.log("tttttttttttttttttt",formList);
    setFormValues({
      ...formValues,
      databasename: selectedDB,
      clientid:Cid,
      prechandler:'Creator',
      nexthandler:'Creator',
      version:'0',
      formtype:(formList.length===0?'F1'+selectedDB:formList[0]),
    
    });
    console.log(formValues,"before send");
    console.log("tttttttttttttttttt", formList);

  };

  return (
    <div>
      {showComponentOne && <ComponentOne />}
      {showComponentTwo && <ComponentTwo />}
        </div>
  );
};
export default FormCreate;