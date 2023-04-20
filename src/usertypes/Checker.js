import React, { useState } from "react";
import "../components/admincomponents/componentscss/FormList.css";
const reportData = [

];

function Creator(props) {
  const [reportTypeSearchTerm, setReportTypeSearchTerm] = useState("");
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [statusSearchTerm, setStatusSearchTerm] = useState("");
  const [reportSearchTerm, setReportSearchTerm] = useState("");
  const [isSelected, setIsSelected] = useState(true);

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

  const filteredData = reportData.filter((report) => {
    const reportTypeFieldValue = report.reporttype;
    const dateFieldValue = report.date;
    const statusFieldValue = report.status;
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

  const [data, setData] = useState([
    ["HHSP", "500", "-", "-"],
    ["HSP", "", "1000", ""],
    ["SCSP", "5800", "", "1.3"],
    ["CSP", "", "13.5", ""],
  ]);
  const [body, setBody] = useState([]);
  const [headi2, setHeadi2] = useState([[]]);

  const [heading, setHeading] = useState([]);

  const handlePrintClick = () => {
    props.modalsel();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="formlist-div">
      <>
        <label className="formlist-label" >
          <h1 className="formlist-h1">Checker Dashboard</h1>
        </label>
        {isSelected === true ? (
          <>
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
                        <option key={index} value={cur.reporttype}>
                          {cur.reporttype}
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
                    <td className="formlist-tbody-td">{report.reporttype}</td>
                    <td className="formlist-tbody-td">{report.date}</td>
                    <td className="formlist-tbody-td">{report.status}</td>
                    <td className="formlist-tbody-td">
                      <button onClick={() => setIsSelected(false)}>View</button>
                    </td>
                    <td className="formlist-tbody-td">
                      <button>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="formlist-container">
              <table
                className="formlist-table "
                htmlFor="#table"
                style={{ borderWidth: "0.5px", borderColor: "black" }}
              >
                <thead className="formlist-thead">
                  <tr className="formlist-tr">
                    <th
                      colSpan={heading.length}
                      style={{ textAlign: "center" }}
                    >
                      PW DISTRIIBUTION SYSYTEM <br />
                      {"(LIQUID BLOCK) - OPERATION REPORT"}
                    </th>
                  </tr>
                  <tr className="formlist-tr">
                    <th>Client </th>
                    <th colSpan={heading.length - 1}>
                      M/s ALFA BIOMED INDIA PVT.LTD,PUNE
                    </th>
                  </tr>
                  <tr className="formlist-tr">
                    <th>System Name</th>
                    <th colSpan={heading.length - 1}>
                      PW DISTRIBUTION SYSTEM(LIQUID BLOCK){" "}
                    </th>
                  </tr>
                  <tr className="formlist-tr">
                    <th>Manufactured By </th>
                    <th colSpan={heading.length - 1}>
                      M/s.PRAJ HIPURITY SYSTEMS LTD.,MUMBAI
                    </th>
                  </tr>
                  <tr className="formlist-tr">
                    <th>From Date and Time</th>
                    <th colSpan={heading.length - 1}>06/01/2023 10:26:11</th>
                  </tr>
                  <tr className="formlist-tr">
                    <th>To Date and Time </th>
                    <th colSpan={heading.length - 1}>
                      06/01/2023 12:35:11.000
                    </th>
                  </tr>
                  <tr className="formlist-tr">
                    {" "}
                    <th colSpan={heading.length}></th>
                  </tr>

                  <tr className="formlist-tr">
                    {heading.map((header, col) => (
                      <th className="formlist-th" key={col}>
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

                <tbody className="formlist-tbody">
                  {data.map((row, rowIndex) => (
                    <tr className="formlist-tr" key={rowIndex}>
                      {row.map((cell, colIndex) => (
                        <td className="formlist-td" key={colIndex}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr className="formlist-tr">
                    {headi2.map((header, col) => (
                      <th className="formlist-th" key={col}>
                        {col > 1 ? (
                          <div>
                            <div>
                              <th>
                                <tr>{header.head1}</tr>
                                <tr>{header.head2}</tr>
                                <tr>{header.unit}</tr>
                              </th>
                            </div>
                          </div>
                        ) : (
                          <>
                            {col === 1 ? (
                              <div>
                                <th>
                                  <tr>{header.head1}</tr>
                                  <tr>{header.head2}</tr>
                                  <tr>{header.unit}</tr>
                                </th>
                              </div>
                            ) : (
                              <div>
                                <th>
                                  <tr>{}</tr>
                                  <tr>{header.head2}</tr>
                                  <tr>{header.unit}</tr>
                                </th>
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
                  className="formlist-submit-button"
                  onClick={handlePrintClick}
                >
                  Submit
                </button>
                <button
                  className="formlist-submit-button"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </table>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default Creator;
