import React, {useState ,useEffect } from "react";
import "../admincomponents/componentscss/FormList.css";
import {useNavigate } from "react-router-dom";
import { fetchGetApi } from "../../api/singlecall";

function Creator() {
  const [reportTypeSearchTerm, setReportTypeSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [reportSearchTerm, setReportSearchTerm] = useState("");
  const navigate=useNavigate();
  const URL=process.env.REACT_APP_URL;
  const API10 = URL+'reports';
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
    
    const result = await fetchGetApi (API);
    console.log("result",result);
    setReportData(result);
 
  };
  
    useEffect(() => {
      fetch(API10);
    
    }, []);

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

const setid =(event)=>{
  event.preventDefault();
  const alfa=event.target.value;
  
  navigate('/creator/view', { state: { alfa} });
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
                  <th className="formlist-thead-th">
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
                  <th>
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
                  <th className="formlist-thead-th">
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
                  <th className="formlist-thead-th">
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
                  </th>
                </tr>

                <tr className="formlist-thead-tr">
                  <th className="formlist-thead-th">Report ID</th>
                  <th className="formlist-thead-th">Report Type</th>
                  <th className="formlist-thead-th">Date</th>
                  <th className="formlist-thead-th">Status</th>
                  <th className="formlist-thead-th">Edit</th>
                  <th className="formlist-thead-th">View</th>
                </tr>
              </thead>
              <tbody className="formlist-tbody">
                {filteredData.map((report) => (
                  <tr className="formlist-tbody-tr" key={report.reportid}>
                    <td className="formlist-tbody-td">{report.reportid}</td>
                    <td className="formlist-tbody-td">{report.reportname}</td>
                    <td className="formlist-tbody-td">{report.datebegin}</td>
                    <td className="formlist-tbody-td">{report.status1}</td>
                    <td className="formlist-tbody-td">
                      <button value={report.reportid} onClick={(e) => setid(e)}>View</button>
                    </td>
                    <td className="formlist-tbody-td">
                      <button value={report.reportid} onClick={(e) => setid2(e)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) 

}

export default Creator;
