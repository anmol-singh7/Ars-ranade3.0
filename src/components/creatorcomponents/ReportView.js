import React, { useState, useEffect } from 'react';
import {fetchPostApi } from "../../api/singlecall";
import { useLocation } from "react-router-dom";
import Bodytable from './BodyDisplay';
import "../../design.css/FormCreate.css";
import "../../design.css/ThreeButton.css";


function ViewBoard2() {
//104
  const URL = process.env.REACT_APP_URL;
  const API1 = URL + "advancesearch";
  const API2 = URL + "description/reportid";
  const API3 = URL + "getsetdata/reportid";
  const API4 = URL + "getfilter";
  const API8 = URL + "sensors";
  const API9 = URL + "attributes";
  const [description, setdec] = useState({creatorid:0, clientid: "", systems: "", manufacturer: "", datebegin: "", timebegin: "", dateend: "", timeend: "", databasename: "", table1: "", formtype: "", status1: "", checkerid: 0, approverid: 0, count: "", reportname: "" });
  const [clientname, setclientname] = useState("");
  const [data, FillSetPointData] = useState([[]]);
  const { state } = useLocation();
  const [atList, setAtlist] = useState([]);
  const [options, setOptions] = useState([[]]);
  const [nextversion, setversion] = useState("");
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [reportHandlers, setReportHnadlers] = useState({Creator: { creatorname: "", creatorid: 0 },Checker: { checkername: "", checkerid: 0 }, Approver: { approvername: "", approverid:0 } });

   const [body, setBody] = useState([]);
  const [bodydata, setBodyData] = useState([]);
  const [xx, setxx] = useState({ reportid: state.alfa });
  const [headi2, setHeadi2] = useState([]);
  const [prevheadingjson, setPrevHeadingJson] = useState([]);
  const [heading, setHeading] = useState([]);
  // const [allheading, setAllHeading] = useState([]);
  const [filters, setFilters] = useState({});

  const generateSelectedArray = (prevaddedjsons, data) => {
    // console.log("prev", prevheadingjson, "2-D", data, "allhead", list);

    let actuallyselected = [];

    // iterate over prevaddedjsons
    for (let i = 0; i < prevaddedjsons.length; i++) {
      let dd = [];
      for (let j = 0; j < data.length; j++) {
        dd.push(data[j][i]);
      }
      actuallyselected.push({
        jso: prevaddedjsons[i],
        dat: dd
      });
    }
   
    return actuallyselected;
  };

  const fetch2 = async (AP, data2, clientname, nextversion, desc) => {
    if (clientname === "" || nextversion === "" || desc === "") {
      const result1 = await fetchPostApi(AP, data2);
      setdec(result1.result[0]);
      setclientname(result1.clientname);
      setversion(result1.nextversion);
      setReportHnadlers(result1.handlers);
    }
  };

  const fetch3 = async (API, data2, leng) => {
    const resultsetdataapi = await fetchPostApi(API, data2);

    FillSetPointData(resultsetdataapi[0].setdata);
  };
  const fetch7 = async (API, data2) => {
   const result = await fetchPostApi(API, data2);
    setAtlist([...result]);
  };
  const fetch1=async(API,id)=>{
    console.log(API,id)
    const filtersss = await fetchPostApi(API, {reportid:state.alfa});
    setFilters(filtersss);
  }

  const xat = async (data, list) => {
    const delta = { reportid: state.alfa };

    const response3 = await fetchPostApi(API1, delta);
    const arr = {
      sensorname: "S0",
      head1: "Set Points",
      head2: "Date and Time",
      unit: "",
      attribute: "firstelement",
      formtype: "",
    };
    setPrevHeadingJson([arr, ...response3.firstheader]);
    const x = [arr, ...response3.firstheader];
    setTable(x, response3.setdata[0].setdata);
    const pan = response3.body;
    var te = [[]];
    for (var i = 0; i < pan.length - 1; i++) {
      te[i] = Object.values(pan[i]);
    }
    

    setHeadi2([arr, ...response3.secondheader]);
    // console.log("teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",te)
    setBodyData(te);
    setBody([...te]);
    
    const trial = Object.entries(response3.attributelist);
    delete trial.CurDT;
    delete trial.CurT;
    setOptions(trial);

  };

  const setTable = (prevheadingjson, data) => {
    const jso = generateSelectedArray(prevheadingjson, data);
    // setAllHeading(jso.actuallyselectedAll);
    setHeading(jso);
  };
  

  useEffect(() => {
    fetch1(API4, xx)
    fetch2(API2, xx, clientname, nextversion, description);
    xat(data,list);
    fetch3(API3, xx, data.length);
  
  }, []);

  
  const showSelect = (options, val) => {
    const arr = options;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === val) {
        return arr[i][1];

      }
    }
    return "-";
  };

  const fetch6 = async (a, b, c) => {

    const gama = { databasename: a, tablename: b, formtype: c };
    const sensorlist = await fetchPostApi(API8, gama);

    //  console.log("jjjjjjjjjjjjjjjjj",sensorlist)
    setList(sensorlist);
    setList2(sensorlist);
    // setData(result1.setdata)

    //  FillSetPointData(result1.setdata);
  };

  if (description.databasename !== "" && description.table1 !== "" && description.formtype !== "" && (list.length === 0)) {
    fetch6(description.databasename, description.table1, description.formtype);
    fetch7(API9, { databasename: description.databasename, tablename: description.table1 });
  };

  const headerRow = (heading) => {
    return (
      <tr>
        {heading.map((jj) => {
          return <th key={jj.jso.sensorname}>
            <div>{jj.jso.head1}</div>
            <div>{jj.jso.head2}</div>
            <div>{jj.jso.unit}</div>
          </th>;
        })}
      </tr>
    );
  };

  const dataRows = (heading) => {
    let temp = [];
    if (heading.length > 0) {
      temp = heading[0].dat;
    }
    return (
      temp.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {heading.map((col, colIndex) => {
              return (
                <>
                  <td>  {colIndex === 0 ? 
                  (            
                      col.dat[rowIndex]
                    ) :
                      showSelect(options, col.dat[rowIndex])
                      }
                  </td>
                </>)
            })}
          </tr>
        );
      }));
  };

  const Bodytable1=(body,headi2,atList)=>{
    
    const filteredAtList = atList.filter(bValue => headi2.some(aValue => aValue.attribute === bValue));
    filteredAtList.unshift("firstelement");
   
    // console.log("ffffffffffffff",filteredAtList);
    const indexarray=[];

    for (let i = 0; i < headi2.length;i++){
       indexarray.push(filteredAtList.indexOf(headi2[i].attribute));
    }
    console.log(headi2);
    console.log(filteredAtList);
    console.log(indexarray);
    
   return ( <>
    {body.map((row, index) => 
      <tr>
        {headi2.map((header, index) =>
          <td key={index}>{row[indexarray[index]]}</td>)}
      </tr>
      )
    }</>)
  }
  
  return (
    <>
      <div className="finalformcreate-container"  >
        <table
          className="finalformcreate-table "
          htmlFor="#table"
          style={{ borderWidth: "3px", borderColor: "black" ,marginTop:"40px",marginBottom:"40px"}}
        >
          <thead className="finalformcreate-thead">
            <tr className="finalformcreate-tr">
              <th>Report Name </th>
              <th colSpan={heading.length - 1}>
                <td className="mapmodule-th">                 
                    {description.reportname}                   
                </td></th>
            </tr>
            <tr className="finalformcreate-tr">
              <th>Client </th>
              <th colSpan={heading.length - 1}>{clientname}</th>
            </tr>
            <tr className="finalformcreate-tr">
              <th>System Name</th>
              <th colSpan={heading.length - 1}>              
                   <td>{description.systems}</td>                 
              </th>
            </tr>
            <tr className="finalformcreate-tr">
              <th>Manufactured By </th>
              <th colSpan={heading.length - 1}>       
                   <td>{description.manufacturer}</td>
               </th>
            </tr>
            <tr className="finalformcreate-tr">
              <th>From Date and Time</th>
              <th colSpan={heading.length - 1}>               
                    {description.datebegin} {description.timebegin}
              </th>
            </tr>

            <tr className="finalformcreate-tr">
              <th>To Date and Time </th>
              <th colSpan={heading.length - 1}>
                {description.dateend} {description.timeend}    
              </th>
            </tr>

            <tr className="finalformcreate-tr">
              {" "}
              <th colSpan={heading.length}></th>
            </tr>
          </thead>
        </table>
        <table className="finalformcreate-table "
          htmlFor="#table2"
          style={{ borderWidth: "3px", borderColor: "black", marginTop: "40px", marginBottom: "40px" }}>
          <thead className="finalformcreate-thead">
            {headerRow(heading)}
          </thead>

          <tbody className="finalformcreate-tbody">
            {dataRows(heading, data, prevheadingjson)}
            <tr>
            </tr>
          </tbody>
        </table>
        {/* <div style={{ display: "flex" }}>
         <button className="add-button" onClick={() => setTable(prevheadingjson, data, list)}>Reset</button>
         
        </div>- */}
        <table className="finalformcreate-table "
          htmlFor="#table3"
          style={{ borderWidth: "3px", borderColor: "black", marginTop: "40px", marginBottom: "10px" }}>
          <tbody className="finalformcreate-tbody">
            <tr className="finalformcreate-tr">
              {headi2.map((header, col) => (
                <th className="finalformcreate-th" key={col}>
                  {col > 0 ?(
                    <th>
                      <tr>{header.head1}</tr>
                      <tr>{header.head2}</tr>
                      <tr>{header.unit}</tr>
                    </th>
                  ) : (
                    (<th>
                        <tr>{header.head2}</tr>
                     </th>)
                    )}
                </th>
              ))}
             </tr>
           
           {/* {Bodytable1(body,headi2,atList)} */}
          </tbody>
          {atList.length > 0 ? <Bodytable headi2={headi2} bodydata={bodydata} body={body} atList={atList} filt={filters} mindateandtime={description.datebegin + 'T' + description.timebegin + ':00.000Z'} maxdateandtime={description.dateend + 'T' + description.timeend + ':59.000Z'} visib={"VIEW"} /> : ""}

         
          
        </table>

        <div style={{ display: "flex", flexDirection:"column", justifyContent: "space-between" }}>
          <div style={{display:"flex",justifyContent:"space-between",margin:"20px"}}>
            <div>
              {/* Created By : {reportHandlers.Creator.creatorid !== 0 ? `${reportHandlers.Creator.creatorname}` + `(ID:${reportHandlers.Creator.creatorid})` : ""} */}
              {(state.usertype === "approver" || state.usertype === "checker") && description.status1 ==="Created" ? `Created By : ${reportHandlers.Creator.creatorid !== 0 ? `${reportHandlers.Creator.creatorname}` + `(ID:${reportHandlers.Creator.creatorid})` : ""}`:""}
              </div>
            <div>Status : {description.status1}</div>
          </div>
          <div style={{ margin: "20px" }}>
            {/* Checked By : `${reportHandlers.Checker.checkerid !== 0 ? `${reportHandlers.Checker.checkername}` + `(ID:${reportHandlers.Checker.checkerid})`:""} */}
            {(state.usertype === "approver" || state.usertype==="creator") && description.status1 ==="Checked"?`Checked By : ${reportHandlers.Checker.checkerid!==0?`${reportHandlers.Checker.checkername}`+`(ID:${reportHandlers.Checker.checkerid})`:""}`:""}
            </div>
          <div style={{ margin: "20px" }}>
            {(state.usertype === "checker" || state.usertype === "creator") && description.status1 === "Approved" ?`Approved By : ${reportHandlers.Approver.approverid !== 0 ?`${reportHandlers.Approver.approvername}` + `(ID:${reportHandlers.Approver.approverid})`:""}`:""}
            </div>
        </div>
        <div></div>


      </div>

    </>
  );
}
export default ViewBoard2;