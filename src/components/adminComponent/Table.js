import React, { useEffect, useState } from 'react'
import { fetchGetApi, updatetables } from '../../api/singlecall';
import { useNavigate } from "react-router-dom";
import "../../design.css/table.css";
import "../../design.css/modal.css";
import "../../design.css/button.css";

const Table = (props) => {
  // console.log("iiiiiiiiiiiiiii",props);
  const [heads, setHeads] = useState([]);
  const [tableBody, setTableBody] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const navigate = useNavigate();
  const isButtonDisabled = selectedRow === null;


  const fetchTableData = async (endpoint) => {
    const data = await fetchGetApi(`https://automatic-reporting-system.onrender.com/api/${endpoint}`);
    setTableBody(data);
    setSelectedRow(null);
  }

  const handleClick = (index) => {
    if (index === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const handleDeactivate = async (id, endpoint, key) => {
    const BODY = {};
    BODY[key] = id;
    const response = await updatetables("https://automatic-reporting-system.onrender.com/api/" + endpoint, BODY);
    console.log("resssssssssss", response)
    if (response.status === 200) {
      // Deactivation was successful
      setIsDeactivated(!isDeactivated);
    } else {
      // Deactivation failed
      console.error('Deactivation failed:', response.statusText);
    }
    setIsModalOpen(false);
    setSelectedRow(null);
    setIsDeleting(false);
  };

  const handleaddnew = (path) => {
    console.log('addnew path', path)
    navigate("/addemploy", { state: path });
  }

  useEffect(() => {
    if (props.tableHollow && props.tableHollow.tableHeads !== undefined) {
      setHeads(props.tableHollow.tableHeads);
      fetchTableData(props.tableHollow.endpoint)
    }
  }, [props.tableHollow, isDeactivated]);

  return (
    <div className='tablecontainer' >
      <table className='systemmaster-table'>
        <thead className='systemmaster-thead'>
          <tr className='systemmaster-tr'>
            <th className='systemmaster-th' key={'Sr No.'}>Sr No.</th>
            {heads.map((heading) => (
              <th className='systemmaster-th' key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className='systemmaster-tbody'>
          {tableBody.map((field, index) => (
            <tr
              style={
                selectedRow === field[props.tableHollow.displayFields[0]]
                  ? { backgroundColor: 'lightgreen' }
                  : { backgroundColor: 'white' }
              }
              onClick={() => handleClick(field[props.tableHollow.displayFields[0]])}
              className='systemmaster-tr'
              key={index}
            >
              <td style={{ border: "solid 2px black" }}>{index + 1}</td>
              {props.tableHollow.displayFields.map((cell, index) => (
                <td style={{ border: "solid 2px black" }} key={index}>{field[cell]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button className={selectedRow ? "edit" : "edited"} disabled={isButtonDisabled}>Edit</button>
        <button className={selectedRow ? "delete" : "deleted"} disabled={isButtonDisabled} onClick={() => setIsModalOpen(true)}>Delete</button>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button className='adduser' onClick={() => handleaddnew(props.tableHollow.addnew)}>Add User</button>
      </div>

      {isModalOpen && (
        <div className="modal-container" onClick={() => setIsModalOpen(false)}>
          <div className={`modal-content ${isDeleting ? 'deleting' : ''}`} onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure you want to delete this user?</h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button style={{ backgroundColor: "blue" }} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className='delete' onClick={() => {
                setIsDeleting(true);
                handleDeactivate(selectedRow, props.tableHollow.deleteendpoint, props.tableHollow.displayFields[0]);
              }} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </div>
            <p className="delete-msg">This action cannot be undone.</p>
            <p className="deleting-msg">Deleting...</p>
          </div>
        </div>
      )}
    </div>
  )
};

export default Table;