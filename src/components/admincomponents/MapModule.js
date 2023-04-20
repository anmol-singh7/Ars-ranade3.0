import React, { useState, useEffect } from "react";
import { fetchPostApi } from "../../api/singlecall";
import "../admincomponents/componentscss/MapModule.css";

function MapModule() {
  const URL=process.env.REACT_APP_URL;
  const [DBChoose, setDBChoose] = useState(null);
  const [TBChoose, setTBChoose] = useState(null);
  const [FChoose, setFChoose] = useState(null);
  const [rows, setRows] = useState([]);
  const [rowsNew, setRowsNew] = useState([]);
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [newF, setNewF] = useState(null);
  const [atList, setAtlist] = useState([]);
  const API =  "https://automatic-reporting-system.onrender.com/api/"+"client/databases";
  const API2 = "https://automatic-reporting-system.onrender.com/api/"+"tables";
  const API3 = "https://automatic-reporting-system.onrender.com/api/"+"uniqueformtypes";
  const API4 ="https://automatic-reporting-system.onrender.com/api/"+"attributes";
  const API5 = "https://automatic-reporting-system.onrender.com/api/"+"sensors";
  const API6 = "https://automatic-reporting-system.onrender.com/api/"+"addsensors";


  const getclient = async (API) => {
    // Fetch the data from your API or any source
    const response = await fetch(API);
    const data1 = await response.json();
    return data1;
  };
  
function filterAttributes(List1, List2) {
  let usedatt = [];
  
  for (let obj of List1) {
    let attribute = obj["attribute"];
    if (!usedatt.includes(attribute)) {
      usedatt.push(attribute);
    }
  }

 let result= List2.filter(x => !usedatt.includes(x))
  console.log("resulttt",result);

  return result;
}

const handleOption1Select = (e) => {
    setDBChoose(e);
    fetchPostApi(API2, { databasename: e }).then((data) => setOptions2(data));
  };

  const handleOption2Select = async (DBChoose,e) => {
    setTBChoose(e);
    const beta = { databasename: DBChoose, tablename: e };
    const data=await fetchPostApi(API3, beta);
      setOptions3(data.formtypes);
      if(data.formtypes.length>0){
      
      console.log("autoform",data.formtypes[0])
    

    const gama = { databasename: DBChoose, tablename: e, formtype: data.formtypes[0] };

    // const delta = { databasename: DBChoose, tablename: e };
        
    const data2=await fetchPostApi(API5, gama);
    const data1= await fetchPostApi(API4,beta);
    const finalattList=filterAttributes(data2,data1);
        setRows(data2);
        setNewF(data.formtypes[0]);
        // setTBChoose(e);
        setFChoose(data.formtypes[0]);
        setAtlist(finalattList);
      }
      else{
        // console.log("aaaaaaaaaaaapppppppppppppqqqqqqqqqqqqqqwwwwwwwwwwwwwwwwwwwrrrrrrrrrrrrrrrtttttttttttttttttt", data.formtypes.length,DBChoose,TBChoose,FChoose)
        // setTBChoose(e);
         setFChoose("F_"+DBChoose+e);
    setRows([]);
      }
      // setNewF(data.nextformtype);
      console.log(data);
      
    };
  
  const clickhandler4 = async () => {
    setFChoose(newF);
    setRows([]);
    const lambda = { databasename: DBChoose, tablename: TBChoose };

    const data =await fetchPostApi(API4, lambda);
     setAtlist(data);
  };
  const handleOption3Select = async (e) => {
    setFChoose(e);
    setNewF(e);

    const gama = { databasename: DBChoose, tablename: TBChoose, formtype: e };

    const delta = { databasename: DBChoose, tablename: TBChoose };

    const data2=await fetchPostApi(API5, gama);
    setRows(data2);
   
    const data1= await fetchPostApi(API4, delta);
     const finalattList=filterAttributes(data2,data1)
    setAtlist(finalattList);
   

    console.log("aaaa",atList,rows);  
  };
  
  const handleAddRow = (event) => {
    event.preventDefault();

    const head1 = event.target.elements.head1.value;
    const head2 = event.target.elements.head2.value;
    const unit = event.target.elements.unit.value;
    const attribute = '1';
    if(head1.trim()!=="" && head2.trim()!=="" && unit.trim()!==""){
    const newatt =atList.filter(item => item !== attribute)
    setAtlist(newatt)
    setRows((prevRows) => [...prevRows, { head1, head2, unit, attribute }]);
    setRowsNew((prevRowsNew) => [...prevRowsNew, { databasename:DBChoose , tablename:TBChoose, formtype:FChoose , head1, head2, unit, attribute }]);
    }
  };
  const handleLast =() =>{
    console.log(rowsNew);
  fetchPostApi(API6, rowsNew)
    .then((data) => {
      console.log(data);
      alert("Data Submitted Successfully");
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while submitting data.");
    });
  };
  useEffect(() => {
    getclient(API).then((data1) => setOptions1(data1));
    console.log(options1);
  }, [DBChoose, TBChoose, FChoose]);
  return (
    <div className="mapmodule-dv">
      <label>
        <h1 className="mapmodule-h1">Report Headings</h1>
        </label>
      {!DBChoose && (
        <select className="mapmodule-select" onChange={(e) => handleOption1Select(e.target.value)}>
          <option className="mapmodule-option">Database Select</option>
          {options1.map((option, key) => (
            <option className="mapmodule-option" key={key} value={option.databasename}>
              {option.databasename}
            </option>
          ))}
        </select>
      )}

      {DBChoose && !TBChoose && (
        <div className="mapmodule-div9">
          <label className="mapmodule-l">
            <h1 className="mapmodule-h2">
          <p>Database Selected: {DBChoose}</p>
          </h1>
          </label>
          <select className="mapmodule-select" onChange={(e) => handleOption2Select(DBChoose,e.target.value)}>
            <option >Select Table</option>
            {options2.map((option, key) => (
              <option key={key} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}


      {DBChoose && TBChoose && !FChoose && (
        <div className="mapmodule-div8">



          {/* <label className="mapmodule-l">
            <h1 className="mapmodule-h2">
          <p>Database Selected: {DBChoose}</p>
          </h1>
          <h1 className="mapmodule-h2">
          <p>Table Selected: {TBChoose}</p>
          </h1>
          </label>
          <select className="mapmodule-option" onChange={(e) => handleOption3Select(e.target.value)}>
          <button  value={options3[0]} onClick={(e) => handleOption3Select(e.target.value)}>Previous Form</button>
            <option >Select option </option>
            {options3.map((option, key) => (
              <option key={key} value={option}>
                {option}
              </option>
            ))}
          </select>
       <button  onClick={() => clickhandler4()}>Create New FormType</button>  */}


       Fetching data
        </div>
      )}

      {DBChoose && TBChoose && FChoose && (
        <div>
          <h2 className="mapmodule-h2">
          <p>Selected Database: {DBChoose}</p></h2>
          <h2 className="mapmodule-h2">
          <p>Selected Table: {TBChoose}</p></h2>
          <h2 className="mapmodule-h2">
          <p>Form ID: {FChoose}</p></h2>

          <table className="mapmodule-table">
            <thead className="mapmodule-thead">
              <tr className="mapmodule-tr">
                <th className="mapmodule-th">Head1</th>
                <th className="mapmodule-th">Head2</th>
                <th className="mapmodule-th">Unit</th>
                {/* <th className="mapmodule-th">Attribute Type</th> */}
              </tr>
            </thead>
            <tbody className="mapmodule-tbody">
              {rows.map((row, index) => (
                <tr className="mapmodule-tr" key={index}>
                  <td className="mapmodule-td">{row.head1}</td>
                  <td  className="mapmodule-td">{row.head2}</td>
                  <td  className="mapmodule-td">{row.unit}</td>
                  {/* <td  className="mapmodule-td">{row.attribute}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <form  className="mapmodule-form" onSubmit={handleAddRow}>
            <table  className="mapmodule-table">
              <thead  className="mapmodule-thead">
                <tr  className="mapmodule-tr">
                  <th  className="mapmodule-th">Head1</th>
                  <th  className="mapmodule-th">Head2</th>
                  <th  className="mapmodule-th">Unit</th>
                  {/* <th  className="mapmodule-th">Attribute Type</th> */}
                </tr>
              </thead>
              <tbody  className="mapmodule-thead">
                <tr  className="mapmodule-th">
                  <td  className="mapmodule-th">
                    <input  className="mapmodule-input"
                      type="text"
                      name="head1"
                      placeholder="Enter head1 value"
                      // required
                    />
                  </td>
                  <td  className="mapmodule-th">
                    <input  className="mapmodule-input"
                      type="text"
                      name="head2"
                      placeholder="Enter head2 value"
                      // required
                    />
                  </td>
                  <td  className="mapmodule-th">
                    <input  className="mapmodule-input"
                      type="text"
                      name="unit"
                      placeholder="Enter unit value"
                      // required
                    />
                  </td>
                  {/* <td  className="mapmodule-th">
                    <select  className="mapmodule-select"
                      type="text"
                      name="attribute"
                      placeholder="Select attribute type "
                      required
                    >
                      <option className="mapmodule-option" disabled>Select option </option>
                      {atList.map((option, key) => (
                        <option key={key} value={option}>
                          {option}
                        </option> 
                      ))}
                    </select>
                  </td> */}
                </tr>
              </tbody>
              <button  className="mapmodule-button" type="submit">Add Row</button>

            </table>
          </form>
          <button  className="mapmodule-button-submit" onClick={()=>handleLast()}> Submit</button>
        </div>
      )}
    </div>
  );
}
export default MapModule;
