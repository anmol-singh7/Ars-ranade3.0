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
  const [description, setdec] = useState({ clientid: "", systems: "", manufacturer: "", datebegin: "", timebegin: "", dateend: "", timeend: "", databasename: "", table1: "", formtype: "", status1: "", prechandler: "", nexthandler: "", count: "", reportname: "" });
  const [clientname, setclientname] = useState("");
  const [data, FillSetPointData] = useState([[]]);
  const { state } = useLocation();
  const [atList, setAtlist] = useState([]);
  const [options, setOptions] = useState([[]]);
  const [nextversion, setversion] = useState("");
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

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
      // push the (i+1)th element of each row in data array
      for (let j = 0; j < data.length; j++) {
        dd.push(data[j][i]);
      }
      // create the json and push it to actuallyselected array
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
      //  console.log("result1",result1)
      setdec(result1.result[0]);
      
      // setBody(filterbody(bodydata, result1.result[0].datebegin, result1.result[0].dateend, result1.result[0].timebegin, result1.result[0].timeend));
      setclientname(result1.clientname);
      setversion(result1.nextversion);
    }
    // const res=await fetch6(API6,{reportid:state.alfa,version:result1.result[0].version})
  };

  const fetch3 = async (API, data2, leng) => {
    const resultsetdataapi = await fetchPostApi(API, data2);

    FillSetPointData(resultsetdataapi[0].setdata);
  };
  const fetch7 = async (API, data2) => {
    //  const data2={databasename: "bz2vx6b6k3kn9nlapzd9", tablename: "cLIENT_2_table_1"}
    const result = await fetchPostApi(API, data2);
    setAtlist([...result]);


    // let obj = {};
    //     for (let i = 0; i < result.length; i++) {
    //         if (i === 0) {
    //             obj['firstelement'] = { minval: "", maxval: "" };
    //         }
    //         else {
    //             obj[result[i]] = { minval: "", maxval: "" };
    //         }
    //     }
    //     setFilters(obj);


  };
  const fetch1=async(API,id)=>{
    console.log(API,id)
    const filtersss = await fetchPostApi(API, {reportid:state.alfa});
    console.log("fffffffffffffffiiiiiiiiiiiiiiiitttttttttttttt",filtersss)
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
    console.log("tttttttttttttttttttttttttttttt",response3);
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
        arr.splice(i, 1);
        i--;
        break;
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
            <div>Created By:User1</div>
            <div>Status:{description.status1}</div>
          </div>
          <div style={{margin:"20px"}}>Checked By:Checker1</div>           
          <div style={{ margin: "20px" }}>Approved By:Approver1</div>
        </div>
        
      </div>

    </>
  );
}
export default ViewBoard2;



// import React, { useState, useEffect } from 'react';
// import { fetchPostApi } from "../api/singlecall";
// import { useLocation } from "react-router-dom";
// import "../components/admincomponents/componentscss/FormCreate.css";
// import "../components/admincomponents/componentscss/ThreeButton.css";


// function ViewBoard2() {

//   const URL = process.env.REACT_APP_URL;
//   const API1 = URL + "advancesearch";
//   const API2 = URL + "description/reportid";
//   const API3 = URL + "getsetdata/reportid";
//   const API8 = URL + "sensors";
//   const API9 = URL + "attributes";
//   const [description, setdec] = useState({ clientid: "", systems: "", manufacturer: "", datebegin: "", timebegin: "", dateend: "", timeend: "", databasename: "", table1: "", formtype: "", status1: "", prechandler: "", nexthandler: "", count: "", reportname: "" });
//   const [clientname, setclientname] = useState("");
//   const [data, FillSetPointData] = useState([[]]);
//   const { state } = useLocation();
//   const [atList, setAtlist] = useState([]);
//   const [options, setOptions] = useState([[]]);
//   const [nextversion, setversion] = useState("");
//   const [list, setList] = useState([]);
//   const [list2, setList2] = useState([]);

//   const [body, setBody] = useState([]);
//   const [bodydata, setBodyData] = useState([]);
//   const [xx, setxx] = useState({ reportid: state.alfa });
//   const [headi2, setHeadi2] = useState([]);
//   const [prevheadingjson, setPrevHeadingJson] = useState([]);
//   const [heading, setHeading] = useState([]);
//   const [allheading, setAllHeading] = useState([]);
//   const [filters, setFilters] = useState({});

//   const generateSelectedArray = (prevaddedjsons, data, list) => {
//     // console.log("prev", prevheadingjson, "2-D", data, "allhead", list);

//     let actuallyselected = [];

//     // iterate over prevaddedjsons
//     for (let i = 0; i < prevaddedjsons.length; i++) {
//       let dd = [];
//       // push the (i+1)th element of each row in data array
//       for (let j = 0; j < data.length; j++) {
//         dd.push(data[j][i]);
//       }
//       // create the json and push it to actuallyselected array
//       actuallyselected.push({
//         jso: prevaddedjsons[i],
//         dat: dd
//       });
//     }

//     // iterate over list
//     // const actuallyselected = actuallyselectedAll;
//     let Alll = []
//     for (let i = 0; i < list.length; i++) {
//       // check if the element is not present in prevaddedjsons
//       let isPresent = false;
//       for (let j = 0; j < prevaddedjsons.length; j++) {
//         if (prevaddedjsons[j].head1 === list[i].head1 && prevaddedjsons[j].head2 === list[i].head2 && prevaddedjsons[j].unit === list[i].unit) {
//           isPresent = true;
//           break;
//         }
//       }
//       // if element is not present, create a new json and push it to actuallyselected array
//       if (!isPresent) {
//         let tt = new Array(data.length).fill("-");
//         Alll.push({
//           jso: list[i],
//           dat: tt
//         });
//       }
//     }
//     var actuallyselectedAll = actuallyselected.concat(Alll);
//     return { actuallyselected, actuallyselectedAll };
//   };

//   const fetch2 = async (AP, data2, clientname, nextversion, desc) => {
//     if (clientname === "" || nextversion === "" || desc === "") {
//       const result1 = await fetchPostApi(AP, data2);
//       //  console.log("result1",result1)
//       setdec(result1.result[0]);

//       // setBody(filterbody(bodydata, result1.result[0].datebegin, result1.result[0].dateend, result1.result[0].timebegin, result1.result[0].timeend));
//       setclientname(result1.clientname);
//       setversion(result1.nextversion);
//     }
//     // const res=await fetch6(API6,{reportid:state.alfa,version:result1.result[0].version})
//   };

//   const fetch3 = async (API, data2, leng) => {
//     const resultsetdataapi = await fetchPostApi(API, data2);

//     FillSetPointData(resultsetdataapi[0].setdata);
//   };
//   const fetch7 = async (API, data2) => {
//     //  const data2={databasename: "bz2vx6b6k3kn9nlapzd9", tablename: "cLIENT_2_table_1"}
//     const result = await fetchPostApi(API, data2);

//     setAtlist([...result]);
//     // var temp=[];
//     // for(let i=0;i<result.length;i++){
//     //   if(i===0){
//     //     temp.push({ attribute:"", val:""});
//     //   }
//     //   else{
//     //   temp.push({attribute:result[i],val:""});
//     //   }
//     // }

//     let obj = {};
//     for (let i = 0; i < result.length; i++) {
//       if (i === 0) {
//         obj['firstelement'] = { minval: "", maxval: "" };
//       }
//       else {
//         obj[result[i]] = { minval: "", maxval: "" };
//       }
//     }
//     setFilters(obj);
//   };

//   const xat = async (data, list) => {
//     const delta = { reportid: state.alfa };

//     const response3 = await fetchPostApi(API1, delta);
//     const arr = {
//       sensorname: "S0",
//       head1: "Set Points",
//       head2: "Date and Time",
//       unit: "",
//       attribute: "firstelement",
//       formtype: "",
//     };
//     setPrevHeadingJson([arr, ...response3.firstheader]);
//     const x = [arr, ...response3.firstheader];
//     setTable(x, data, list)
//     const pan = response3.body;
//     var te = [[]];
//     for (var i = 0; i < pan.length - 1; i++) {
//       te[i] = Object.values(pan[i]);
//     }


//     setHeadi2([arr, ...response3.secondheader]);
//     // console.log("teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",te)
//     setBodyData(te);
//     setBody([...te]);
//     const trial = Object.entries(response3.attributelist);
//     delete trial.CurDT;
//     delete trial.CurT;
//     setOptions(trial);

//   };

//   const setTable = (prevheadingjson, data, list) => {
//     const jso = generateSelectedArray(prevheadingjson, data, list);
//     setAllHeading(jso.actuallyselectedAll);
//     setHeading(jso.actuallyselected);
//   };

//   useEffect(() => {
//     fetch2(API2, xx, clientname, nextversion, description);
//     xat(data, list);
//     fetch3(API3, xx, data.length);
//   }, [filters]);


//   const showSelect = (options, val) => {
//     const arr = options;
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i][0] === val) {
//         return arr[i][1];
//         arr.splice(i, 1);
//         i--;
//         break;
//       }
//     }
//     return "-";
//   };

//   const fetch6 = async (a, b, c) => {

//     const gama = { databasename: a, tablename: b, formtype: c };
//     const sensorlist = await fetchPostApi(API8, gama);

//     //  console.log("jjjjjjjjjjjjjjjjj",sensorlist)
//     setList(sensorlist);
//     setList2(sensorlist);
//     // setData(result1.setdata)

//     //  FillSetPointData(result1.setdata);
//   };

//   if (description.databasename !== "" && description.table1 !== "" && description.formtype !== "" && (list.length === 0)) {
//     fetch6(description.databasename, description.table1, description.formtype);
//     fetch7(API9, { databasename: description.databasename, tablename: description.table1 });
//   };

//   const headerRow = (heading) => {
//     return (
//       <tr>
//         {heading.map((jj) => {
//           return <th key={jj.jso.sensorname}>
//             <div>{jj.jso.head1}</div>
//             <div>{jj.jso.head2}</div>
//             <div>{jj.jso.unit}</div>
//           </th>;
//         })}
//       </tr>
//     );
//   };

//   const dataRows = (heading, data, prevheadingjson) => {
//     let temp = [];
//     if (heading.length > 0) {
//       temp = heading[0].dat;
//     }
//     return (
//       temp.map((row, rowIndex) => {
//         return (
//           <tr key={rowIndex}>
//             {heading.map((col, colIndex) => {
//               return (
//                 <>
//                   <td>  {colIndex === 0 ?
//                     (
//                       col.dat[rowIndex]
//                     ) :
//                     showSelect(options, col.dat[rowIndex])
//                   }
//                   </td>
//                 </>)
//             })}
//           </tr>
//         );
//       }));
//   };



//   const Bodytable = (body, headi2, atList) => {

//     const filteredAtList = atList.filter(bValue => headi2.some(aValue => aValue.attribute === bValue));
//     filteredAtList.unshift("firstelement");

//     // console.log("ffffffffffffff",filteredAtList);
//     const indexarray = [];

//     for (let i = 0; i < headi2.length; i++) {
//       indexarray.push(filteredAtList.indexOf(headi2[i].attribute));
//     }
//     console.log(headi2);
//     console.log(filteredAtList);
//     console.log(indexarray);

//     return (<>
//       {body.map((row, index) =>
//         <tr>
//           {headi2.map((header, index) =>
//             <td key={index}>{row[indexarray[index]]}</td>)}
//         </tr>
//       )
//       }</>)
//   }

//   return (
//     <>
//       <div className="finalformcreate-container"  >
//         <table
//           className="finalformcreate-table "
//           htmlFor="#table"
//           style={{ borderWidth: "3px", borderColor: "black", marginTop: "40px", marginBottom: "40px" }}
//         >
//           <thead className="finalformcreate-thead">
//             <tr className="finalformcreate-tr">
//               <th>Report Name </th>
//               <th colSpan={heading.length - 1}>
//                 <td className="mapmodule-th">
//                   {description.reportname}
//                 </td></th>
//             </tr>
//             <tr className="finalformcreate-tr">
//               <th>Client </th>
//               <th colSpan={heading.length - 1}>{clientname}</th>
//             </tr>
//             <tr className="finalformcreate-tr">
//               <th>System Name</th>
//               <th colSpan={heading.length - 1}>
//                 <td>{description.systems}</td>
//               </th>
//             </tr>
//             <tr className="finalformcreate-tr">
//               <th>Manufactured By </th>
//               <th colSpan={heading.length - 1}>
//                 <td>{description.manufacturer}</td>
//               </th>
//             </tr>
//             <tr className="finalformcreate-tr">
//               <th>From Date and Time</th>
//               <th colSpan={heading.length - 1}>
//                 {description.datebegin} {description.timebegin}
//               </th>
//             </tr>

//             <tr className="finalformcreate-tr">
//               <th>To Date and Time </th>
//               <th colSpan={heading.length - 1}>
//                 {description.dateend} {description.timeend}
//               </th>
//             </tr>

//             <tr className="finalformcreate-tr">
//               {" "}
//               <th colSpan={heading.length}></th>
//             </tr>
//           </thead>
//         </table>
//         <table className="finalformcreate-table "
//           htmlFor="#table2"
//           style={{ borderWidth: "3px", borderColor: "black", marginTop: "40px", marginBottom: "40px" }}>
//           <thead className="finalformcreate-thead">
//             {headerRow(heading)}
//           </thead>

//           <tbody className="finalformcreate-tbody">
//             {dataRows(heading, data, prevheadingjson)}
//             <tr>
//             </tr>
//           </tbody>
//         </table>
//         {/* <div style={{ display: "flex" }}>
//          <button className="add-button" onClick={() => setTable(prevheadingjson, data, list)}>Reset</button>
         
//         </div>- */}
//         <table className="finalformcreate-table "
//           htmlFor="#table3"
//           style={{ borderWidth: "3px", borderColor: "black", marginTop: "40px", marginBottom: "10px" }}>
//           <tbody className="finalformcreate-tbody">
//             <tr className="finalformcreate-tr">
//               {headi2.map((header, col) => (
//                 <th className="finalformcreate-th" key={col}>
//                   {col > 0 ? (
//                     <th>
//                       <tr>{header.head1}</tr>
//                       <tr>{header.head2}</tr>
//                       <tr>{header.unit}</tr>
//                     </th>
//                   ) : (
//                     (<th>
//                       <tr>{header.head2}</tr>
//                     </th>)
//                   )}
//                 </th>
//               ))}
//             </tr>

//             {Bodytable(body, headi2, atList)}
//           </tbody>



//         </table>

//         <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
//             <div>Created By:User1</div>
//             <div>Status:{description.status1}</div>
//           </div>
//           <div style={{ margin: "20px" }}>Checked By:Checker1</div>
//           <div style={{ margin: "20px" }}>Approved By:Approver1</div>
//         </div>

//       </div>

//     </>
//   );
// }
// export default ViewBoard2;
