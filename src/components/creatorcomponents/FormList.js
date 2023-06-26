import React, {useState ,useEffect } from "react";
import "../../design.css/FormList.css";
import {useNavigate } from "react-router-dom";
import { fetchGetApi,fetchPostApi } from "../../api/singlecall";

function Creator({creatorID,usertype}) {
  const [reportTypeSearchTerm, setReportTypeSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [reportSearchTerm, setReportSearchTerm] = useState("");
  const navigate=useNavigate();
  const URL=process.env.REACT_APP_URL;
  const API10 = URL+'reports';
  const API11 =URL +"allreports";
  const [reportData,setReportData] =useState ([]);

  const handleReportTypeSearchTermChange = (event) => {
    setReportTypeSearchTerm(event.target.value);
  };

  const handleDateSearchTermChange = (event) => {
    setDateSearchTerm(event.target.value);
  };

  const handleStatusSearchTermChange = (event) => {
    setStatusSearchTerm(event.target.value);
  };
  const handleReportSearchTermChange = (event) => {
    setReportSearchTerm(event.target.value);
  };
  const fetch = async (API) => {
    // console.log("tttttt",creaID)
    const result = await fetchGetApi (API);
    console.log("result11111111",result);
    setReportData(result);
 
  };
  const fetch2 = async (API, creaID) => {
    console.log("tttttt", creaID)
    const result = await fetchPostApi(API, { creatorid: creaID });
    console.log("result11111111", result);
    setReportData(result);

  };
    useEffect(() => {
      if(usertype==="creator"){
         fetch2(API10,creatorID);
      }
      else{
        fetch(API11);
      }
    
    }, [creatorID,usertype]);

  const filteredData = reportData.filter((report) => {
    const reportTypeFieldValue = report.reportname;
    const dateFieldValue = report.datebegin;
    const statusFieldValue = report.status1;
    const reportFeildValue = report.reportid;

    return (
      reportTypeFieldValue
        .toLowerCase()
        .includes(reportTypeSearchTerm.toLowerCase()) &&
      dateFieldValue.toLowerCase().includes(dateSearchTerm.toLowerCase()) &&
      statusFieldValue.toLowerCase().includes(statusSearchTerm.toLowerCase()) &&
      reportFeildValue.toLowerCase().includes(reportSearchTerm.toLowerCase())
    );
  });

const setid =(event,cre,type)=>{
  event.preventDefault();
  const alfa=event.target.value;
  const res = {alfa:alfa,userid:cre,usertype:type}
  
  navigate('/creator/view', { state: res });
};
const setid2 =(event)=>{
  event.preventDefault();
  const alfa=event.target.value;
  console.log(event,"alfaaaaaaaaaaaaa",alfa,"eeeeeee",event.target.value)
  navigate('/creator/edit2', { state: { alfa} });
};


  return (
    <div className="formlist-div">
    
        <label className="formlist-label" >
          <h1 className="formlist-h1">Created Reports</h1>
        </label>
      
       
            <table className="formlist-table">
              <thead className="formlist-thead">
                <tr className="formlist-thead-tr">
                  <th className="formlist-th">
                    <label
                      className="formlist-label"
                      htmlFor="reportTypeSearchTerm"
                    >
                      Report ID{" "}
                    </label>
                    <input
                      type="text"
                      id="statusSearchTerm"
                      value={reportSearchTerm}
                      onChange={handleReportSearchTermChange}
                    />
                  </th>
            <th className="formlist-th">
                    <label
                      className="formlist-label"
                      htmlFor="reportTypeSearchTerm"
                    >
                      Report Type:
                    </label>
                    <select
                      id="reportTypeSearchTerm"
                      value={reportTypeSearchTerm}
                      onChange={handleReportTypeSearchTermChange}
                    >
                      <option value={""}>ALL</option>
                      {reportData.map((cur, index) => (
                        <option key={index} value={cur.reportname}>
                          {cur.reportname}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th className="formlist-th">
                    <label className="formlist-label" htmlFor="dateSearchTerm">
                      Date:
                    </label>
                    <input
                      type="text"
                      id="dateSearchTerm"
                      value={dateSearchTerm}
                      onChange={handleDateSearchTermChange}
                    />
                  </th>
                  {usertype==="creator"?<th className="formlist-th">
                    <label
                      className="formlist-label"
                      htmlFor="statusSearchTerm"
                    >
                      Status:
                    </label>
                    <input
                      type="text"
                      id="statusSearchTerm"
                      value={statusSearchTerm}
                      onChange={handleStatusSearchTermChange}
                    />
                  </th>:<></>}
                  <th className="formlist-th"></th>
                </tr>

                <tr className="formlist-thead-tr">
                  <th className="formlist-th">Report ID</th>
                  <th className="formlist-th">Report Type</th>
                  <th className="formlist-th">Date</th>
                  {usertype==="creator"?<th className="formlist-th">Status</th>:<></>}
                  <th className="formlist-th">View {usertype==="creator"?"Edit":""}</th>
                  
                </tr>
              </thead>
              <tbody className="formlist-tbody">
                {filteredData.map((report) => (
               <> { usertype==="creator" || (usertype==="checker"&&report.status1==="Creeated") ||(usertype==="approver"&&report.status1==="Checked")  ?<tr className="formlist-tr" key={report.reportid}>
                    <td className="formlist-td">{report.reportid}</td>
                    <td className="formlist-td">{report.reportname}</td>
                    <td className="formlist-td">{report.datebegin}</td>
                    {usertype === "creator" ?<td className="formlist-td">{report.status1}</td>:<></>}
                    <td className="formlist-td">
                      <button value={report.reportid} onClick={(e) => setid(e,creatorID,usertype)}>View</button>
                      {usertype==="creator" ? <button value={report.reportid} onClick={(e) => setid2(e)}>Edit</button> :<></>}
                    </td>
                  </tr>
                   :<></>
                }</>
                ))}
              </tbody>
            </table>
          </div>
        ) 

}

export default Creator;
