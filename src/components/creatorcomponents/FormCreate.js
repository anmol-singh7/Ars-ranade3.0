import React, { useMemo, useEffect, useState } from "react";
import { Card, Form, Input, Label, Select } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import {fetchGetApi, fetchPostApi } from "../../api/singlecall";
import "../admincomponents/componentscss/FormCreate.css";

function FormCreate() {
  const URL=process.env.REACT_APP_URL;
  const API1 =URL+"client/databases";
  const API2=URL+"systems";
  const API3=URL+"manufacturers";
  const API4 = URL+"tables";
  const API5 = URL+"uniqueformtypes";
  const API6 =URL+"description";
  const API7 = URL+"sensors";
  const API8 = URL+'setpoints';
  const API9 = URL+"normalpoints";
  const API10 = URL+"advancesearch";
  const API13=URL+"setPointData";
  const [atList, setAtlist] = useState([]);

  const API41 = URL+"attributes";
  const navigate = useNavigate();
  const [showComponentOne, setShowComponentOne] = useState(true);
  const [showComponentTwo, setShowComponentTwo] = useState(false);
  const [showComponentThree, setShowComponentThree] = useState(false);
  const [showComponentFour, setShowComponentFour] = useState(false);
  const [showComponentFive, setShowComponentFive] = useState(false);

  const [clientList, setClientList] = useState([]);
  const [systemList, setSystemList] = useState([]);
  const [selectedDB,setSelectedDB] = useState("");
  const [manufacturerList,setManufacturerList]=useState([]);
  const [table1,setTable1]=useState([]);
  const [formList,setFormList]=useState([]);
  const[sel,setSel]=useState(null);
  const [min_date,setmin_date]=useState("");
  const [max_date,setmax_date]=useState("");

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
    status1: "Draft",
    timetype: "",
    table1:'',
    databasename:'',
    version:'',
    reportid:null,
    utilityid:null,
    prechandler:'',
    nexthandler:'',
    count:1,
    reportname:"",

  });

  const [list, setList] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const[repId,setRepId]=useState("");

  const [isSelected, setIsselected] = useState(true);
  const [data, setData] = useState([[]]);
  const [body, setBody] = useState([]);
  const [headi2, setHeadi2] = useState([[]]);


  const [heading, setHeading] = useState([]);
  const [options, setOptions] = useState([[]]);
  const [Arrayofselectedattributes,setarr]=useState([]);
  const handleInputChange = (e, row, col) => {
    const newData = [...data];
    newData[row][col] = e.target.value;
    setData(newData);
  };

  const handleSelectChange = (e, row, col) => {
    const newData = [...data];
    // newData[row][col] = e.target.value;
    // setData(newData);
    const arr=options;
     for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === e.target.value) {
      // console.log("Removing row:", arr[i]);
     newData[row][col] = arr[i][1];
     setData(newData);
      arr.splice(i, 1);
      i--; // Decrement i to account for the removed element
      break;
    }
   }

    isSelected === false? setIsselected(true):setIsselected(false);
};

  // const addRow = () => {
  //  if (data.length-1 === 0)
  //   {const len = heading.length;
  //   const bet = data.length + 1;
  // const t = [[]];
  // for (var i = 0; i < bet; i++) {
  //   var tt = [len];
  //   for (var j = 0; j < len; j++) {
  //     if (j !== 0) {
  //       tt[j] = "-";
  //     } else {
  //       tt[j] = "";
  //     }
  //   }
  //   console.log(tt);
  //   t[i] = tt;
  // }
  // setData(t);}
  // else {const newData = [...data];
  //   newData.push(Array(data[0].length).fill(""));
  //   setData(newData);};
  // };

const addRow = () => {
    console.log("addrow",data.length)
   if (data.length-1 === 0)
    {
        const len = heading.length;
    const bet = data.length + 1;
  const t = [[]];
  for (var i = 0; i < bet; i++) {
    var tt = [len];
    for (var j = 0; j < len; j++) {
      if (j !== 0) {
        tt[j] = "-";
      } else {
        tt[j] = "";
      }
    }
    console.log("addrow",data.length,tt);
    t[i] = tt;
    console.log("2d",t)
  }
  setData(t);
}
  else {
    const newData = [...data];
    console.log("one",newData)
    newData.push(Array(data[0].length).fill("-"));
    newData[newData.length-1][0]=""
    console.log("two",newData)
    setData(newData);
  };
};

  const shiftLeft = (col) => {
    var newdata = [...heading];
    console.log("newdata", newdata);
    if (col < headi2.length && col !== 0) {
      var temp = newdata[col];
      newdata[col] = newdata[col - 1];
      newdata[col - 1] = temp;
      var tempdata = [...data];
      for (var j = 0; j < data.length; j++) {
        if (col < heading.length && col !== 0) {
          var temp2 = tempdata[j][col];
          tempdata[j][col] = tempdata[j][col - 1];
          tempdata[j][col - 1] = temp2;
        }
      }
      var tempzzz = [...body];
      for (var n = 0; n < body.length; n++) {
        if (col < headi2.length && col !== 0) {
          var temp10= tempzzz[n][col];
          tempzzz[n][col] = tempzzz[n][col - 1];
          tempzzz[n][col - 1] = temp10;
        }
      }
      var tempzz = [...headi2];
      for (var o = 0; o < headi2.length; o++) {
        if (col < headi2.length && col !== 0) {
          var temp4 = tempzz[o][col];
          tempzz[o][col] = tempzz[o][col - 1];
          tempzz[o][col - 1] = temp4;
        }
      }
      setHeadi2(tempzz);
      setBody(tempzzz);
      setHeading(newdata);
      setData(tempdata);
    }
  };

  const shiftRight = (col) => {
    var newdata = [...heading];

    if (col < headi2.length - 1) {
      var temp = newdata[col];
      newdata[col] = newdata[col + 1];
      newdata[col + 1] = temp;
      var tempdata = [...data];
      for (var j = 0; j < data.length; j++) {
        if (col < heading.length && col !== 0) {
          var temp2 = tempdata[j][col];
          tempdata[j][col] = tempdata[j][col + 1];
          tempdata[j][col + 1] = temp2;
        }
      }
      var tempo = [...body];
      for (var k = 0; k < body.length; k++) {
        if (col < headi2.length && col !== 0) {
          var temp9 = tempo[k][col];
          tempo[k][col] = tempo[k][col + 1];
          tempo[k][col + 1] = temp9;
        }
      }
      var tempo2 = [...headi2];
      for (var l = 0; l < headi2.length; l++) {
        if (col < headi2.length && col !== 0) {
          var temp10 = tempo2[l][col];
          tempo2[l][col] = tempo2[l][col + 1];
          tempo2[l][col + 1] = temp10;
        }
      }
      setHeadi2(tempo2);
      setBody(tempo);
      setHeading(newdata);
      setData(tempdata);
    }
  };

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

  const toggleSelected1 = (index) => {
    const selectedIndex = selected1.indexOf(index);
    if (selectedIndex >= 0) {
      setSelected1(selected1.filter((i) => i !== index));
    } else {
      setSelected1([...selected1, index]);
    }
  };

  const toggleSelected2 = (index) => {
    const selectedIndex = selected2.indexOf(index);
    if (selectedIndex >= 0) {
      setSelected2(selected2.filter((i) => i !== index));
    } else {
      setSelected2([...selected2, index]);
    }
  };
  const selectedData1 = selected1.map((i) => list[i]);
  const selectedData2 = selected2.map((i) => list[i]);
  
  function findIndexBySensorName(sensorname, A1, A2) {
  const index = A1.findIndex((element) => element.sensorname === sensorname);
  return index !== -1 ? A2[index] : undefined;
}


  const newData1 = selectedData1.map(({ sensorname}) => ({
    reportid:repId.reportid,
    sensorname,
    order1:0,

  }));
  
  const newData2 = selectedData2.map(({ sensorname}) => ({
    reportid:repId.reportid,
    sensorname,
    order1:0,
    attribute:findIndexBySensorName(sensorname,list,Arrayofselectedattributes)
    
  }));
  console.log("newdata2",newData2)

  const fetch5 = async (APi,data2) => {
    
    const result1 = await fetchPostApi(APi,data2);
   setAtlist(result1);
    //  FillSetPointData(result1.setdata);
  };

  useEffect(() => {
  fetch1(API1);
  fetch2(API2);
  fetch3(API3);
  
  }, []);


  const hanldeattributes=(e,index)=>{
    let ar=Arrayofselectedattributes;
    ar[index]=e.target.value;
    setarr(ar);
     console.log("arrrrrrry",Arrayofselectedattributes,ar)
  }
  // console.log("arrrrrrry",Arrayofselectedattributes,ar)

const fetch4 = async (APi,data2) => {
    
    const result1 = await fetchPostApi(APi,data2);
    console.log("result1",result1);
    //  FillSetPointData(result1.setdata);
    return result1;
  };

const handleaddsetdata= async ()=>{
    const blue ={reportid:repId.reportid,setdata:data};
      const result= await fetch4(API13,blue);
      console.log("addsetdata",result);
      setSel(result);
      alert('Report Created Successfully!');
  }

  function ComponentOne() {
    return (<div className="formcreate-div">
      {/* <label className="formcreate-h1"> Creator Profile
        </label> */}
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
  <label className="formcreate-label2" htmlFor="userid">User ID</label>
  <div class="error-message">*This field is mandatory</div>
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
  
 <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="reportname">Report Name:</label>
  {/* <div class="error-message">*This field is mandatory</div> */}
  <input
   className="formcreate-input"
    type="text"
    id="reportname"
    name="reportname"
    // placeholder="Enter the Report Name"
    value={formValues.reportname}
    onChange={handleChange}
   
  />
  
  </div>

  {/* <div className="formcreate-div2">
  <label className="formcreate-label-2" htmlFor="formtype">Form</label>
  <div class="error-message">*This field is mandatory</div>
  <select
    className="formcreate-select"
    type="text"
    id="formtype"
    name="formtype"
    value={formValues.formtype}
    onChange={handleChange}
  >
    <option value="" disabled >
      Select an option
    </option>
    {formList.map((cur, index) => (
      <option key={index}>{cur}</option>
    ))}
  </select>
  </div>   */}
  
 
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
  
  function ComponentThree() {
    if(atList.length===0){
    fetch5(API41,{databasename:selectedDB,tablename:formValues.table1})  
    }
    return (
      <div className="formcreate-container">
      <div className="formcreate-heading">
        <h1 className="formcreate-h1">Select The Columns For Setpoints Table and Columns Table</h1>
 
        <h4 >Client Id:{Cid}</h4>   
        <h4>Report ID:{repId.reportid}</h4>
      </div>
      <table className="formcreate-table">
        <thead className="formcreate-thead">
          <tr>
            <th className="formcreate-th">Head1</th>
            <th className="formcreate-th">Head2</th>
            <th className="formcreate-th">Unit</th>
            <th className="formcreate-th">Attributes for Final Report Table</th>
            <th className="formcreate-th">Include Columns for Set Point Table</th>
            <th className="formcreate-th">Columns for Final Report Table</th>
          </tr>
        </thead>
        <tbody className="formcreate-tbody">
          {list.map((item, index) => (
            <tr key={index}>
              <td className="formcreate-td">{item.head1}</td>
              <td className="formcreate-td">{item.head2}</td>

              <td className="formcreate-td">{item.unit}</td>
              <td  className="formcreate-td">
                    <select  className="formcreate-select"
                      type="text"
                      name="attribute"
                      value={Arrayofselectedattributes[index]}
                      placeholder="Select attribute type "
                      onChange={(e)=>hanldeattributes(e,index)}
                      required
                    >
                      <option className="formcreate-option" disabled>Select option </option>
                      {atList.map((option, key) => (
                        <option key={key} value={option}>
                          {option}
                        </option> 
                      ))}
                    </select>
                  </td>


              <td className="formcreate-td">
                <input 
                  type="checkbox"
                  checked={selected1.indexOf(index) >= 0}
                  onChange={() => toggleSelected1(index)}
                />
              </td>
              <td className="formcreate-td">
                <input
                  type="checkbox"
                  checked={selected2.indexOf(index) >= 0}
                  onChange={() => toggleSelected2(index)}
                /> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="formcreate-button" >{"<<"}Previous  </button>
      <button className="formcreate-button" onClick={submitList}>Save and Continue</button>
      
    
    </div>
    );
  }
  
  function ComponentFour() {
    return (
      <div className="finalformcreate-container">
        <label className="finalformcreate-label">
          Reorder Columns for Final Report
        </label>
       <table className="finalformcreate-table " htmlFor="#table">
          <thead className="finalformcreate-thead">
            <tr className="finalformcreate-tr">
              {heading.map((header, col) => (
                <th className="finalformcreate-th" key={col}>
                  {col === 0 ? (
                    <div>
                      <th>
                        <tr>{header.head1}</tr>
                        <tr>{}</tr>
                        <tr>{header.unit}</tr>
                      </th>
                    </div>
                  ) : (
                    <div>
                      <th>
                        <tr>{header.head1}</tr>
                        <tr>{header.head2}</tr>
                        <tr>{header.unit}</tr>
                      </th>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
  
          <tbody className="finalformcreate-tbody">
            {data.map((row, rowIndex) => (
              <tr className="finalformcreate-tr" key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td className="finalformcreate-td" key={colIndex}>
                    {colIndex === 0 && rowIndex > 0 ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      />
                    ) : rowIndex > 0 ? (
                      <select
                        value={cell}
                        onChange={(e) =>handleSelectChange(e, rowIndex, colIndex)
}
                      >
                        <option value="-">{data[rowIndex][colIndex]}</option>
                        {options.map((cur,index) => (
                          <option key={index} value={cur[0]} >
                            {cur[0]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <></>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          <tr>  
          <button className="finalformcreate-add-button" onClick={addRow}>
            Add Row
          </button>

          </tr>



        
            <tr className="finalformcreate-tr">
              {headi2.map((header, col) => (
                <th className="finalformcreate-th" key={col}>
                  {col > 1 ? (
                    <div >
                      
                      <button onClick={() => shiftLeft(col)}>&lt;</button>
                      <div >
                      <th>
                      
                        <tr>{header.head1}</tr>
                        <tr>{header.head2}</tr>
                        <tr>{header.unit}</tr>
                      </th>
                      </div>
  
                      <button onClick={() => shiftRight(col)}>&gt;</button>
                    </div>
                  ) : (
                    <>
                      {col === 1 ? (
                        <div>
                          <button onClick={() => shiftLeft(col)} disabled>
                            &lt;
                          </button>
                          <th>
                            <tr>{header.head1}</tr>
                            <tr>{header.head2}</tr>
                            <tr>{header.unit}</tr>
                          </th>
                          <button onClick={() => shiftRight(col)}>&gt;</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => shiftLeft(col)} disabled>
                            &lt;
                          </button>
                          <th>
                            <tr>{}</tr>
                            <tr>{header.head2}</tr>
                            <tr>{header.unit}</tr>
                          </th>
                          <button onClick={() => shiftRight(col)} disabled>
                            &gt;
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr> 
            {body.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <button
            className="finalformcreate-submit-button"
            onClick={handleaddsetdata}
          >
            Final Report Create
          </button>
          <button
            className="finalformcreate-submit-button"
            onClick={handlePrintClick}
          >
            Print
          </button>
        </table>
      </div>
    );
  }
  
  function ComponentFive() {
    return <h1>Component Five</h1>;
  }
 
const submitList= async ()=>{

console.log(newData1,newData2);
const response1 = await fetchPostApi(API8,newData1);
const response2 = await fetchPostApi(API9,newData2);
console.log(response1,response2);
setShowComponentOne(false);
setShowComponentTwo(false);
setShowComponentThree(false);
setShowComponentFour(true);
setShowComponentFive(false);

const delta = { reportid:repId.reportid};

const response3 =await fetchPostApi(API10,delta);
alert('Columns selected successfully!');
console.log(response3);

setHeading(response3.firstheader);
const arr = {
  sensorname: "S5",
  head1: "Set Points",
  head2: "Date and Time",
  unit: "",
  attributetype: "",
  reporttype: "",
};
  // setOptions(response3.attributelist);

setHeading([arr, ...response3.firstheader]);
const pan=response3.body;
var te = [[]];
for (var i = 0; i < pan.length - 1; i++) {
  te[i] = Object.values(pan[i]);
}
setHeadi2([arr,...response3.secondheader]);

setBody(te);


const trial = Object.entries(response3.attributelist);
delete trial.CurDT;
delete trial.CurT;
 
console.log('=====',trial);
setOptions(trial);

};

  
  const handleDBSelection =async (event) => {
    setSelectedDB(event);
    setShowComponentOne(false);
    setShowComponentTwo(true);
    setShowComponentThree(false);
    setShowComponentFour(false);
    setShowComponentFive(false);
  
    const dat = await fetchPostApi(API4, { databasename:event });
    setTable1(dat);
 
    
  };

  // const handleChange = (event) => {
  //   setFormValues({
  //     ...formValues,
  //     [event.target.name]: event.target.value,
  //   });
  //  console.log(formValues);

  //  if (event.type === 'blur') {
  //   setFormValues({
  //     ...formValues,
  //     [event.target.name]: event.target.value,
  //   });
  // }
  // };

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

    // if(formValues.table){
      const body={databasename:selectedDB, tablename: event.target.value};
      const formslist= await fetchPostApi(API5,body);
      console.log("dddddddddddddddddddd",formslist)
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
    setRepId(repid);
    const alfa = repid.reportid;
    // console.log(event, "alfaaaaaaaaaaaaa", alfa, "eeeeeee", event.target.value)
    navigate('/Createfinalreport', { state: { alfa } });


    // const gama = { databasename: formValues.databasename, tablename: formValues.table1, formtype: formValues.formtype };
    // const sensorlist = await fetchPostApi(API7,gama);
  //  setList(sensorlist);
  //   setShowComponentOne(false);
  //   setShowComponentTwo(false);
  //   setShowComponentThree(true);
  //   setShowComponentFour(false);
  //   setShowComponentFive(false);
  
  };

  const sendData = async ()=>{
    setFormValues({
      ...formValues,
      databasename: selectedDB,
      clientid:Cid,
      prechandler:'Creator',
      nexthandler:'Creator',
      version:'0',
      formtype:formList[0],
    
    });
    console.log(formValues,"before send");
   
  };


  const handlePrintClick= async() => {

    if (sel !== null){
      window.location.reload();
    };

  };

  return (
    <div>
      {showComponentOne && <ComponentOne />}
      {showComponentTwo && <ComponentTwo />}
      {showComponentThree && <ComponentThree />}
      {showComponentFour && <ComponentFour />}
      {showComponentFive && <ComponentFive />}
    </div>
  );
};
export default FormCreate;