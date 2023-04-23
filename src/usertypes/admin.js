import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './cssmain/admin.css'

// import UserCreation from '../components/admincomponents/UserCreation';
// import ClientDBCreate from '../components/admincomponents/ClientDBCreate';
// import ClientMaster from '../components/admincomponents/ClientMaster';
// import UserMaster from '../components/admincomponents/UserMaster';
// import SystemCreate from '../components/admincomponents/SystemCreate';
// import SystemMaster from '../components/admincomponents/SystemMaster';
// import ManufacturerMaster from '../components/admincomponents/ManufacturerMaster';
// import ManufacturerCreate from '../components/admincomponents/ManufacturerCreate';
// import MapModule from '../components/admincomponents/MapModule';
// import LoginPage from '../../src/LoginPage';

function Admin() {
   
    const [selected, setSelected] = useState('client-master');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
  
    function handleDragStart(e) {
      setIsDragging(true);
    }
  
    function handleDragEnd(e) {
      setIsDragging(false);
    }
  
    function handleToggleSidebar() {
      setIsSidebarVisible(!isSidebarVisible);
    }
  

    
  
    const handleClick = (link) => {
      setSelected(link);
      console.log(link,selected);
    };
  
    // const renderComponent = () => {
    //   switch(selected) {
    //     case 'client-master':
    //       return <ClientMaster />;
    //     case 'user-master':
    //       return <UserMaster />;
    //     case 'system-master':
    //       return <SystemMaster />;
    //     case 'manufacturer-master':
    //       return <ManufacturerMaster />;
    //     case 'map-module':
    //       return <MapModule />;
    //       case'logout':
    //       return (
    //         <NavLink to="./login">
    //           <button>logout</button>
    //           </NavLink>
    //       );
    //     default:
    //       return <ClientDBCreate />;
    //   }
    // };
  
    return (
      <div className="admin">
              {/* <div
        className={`admin-sidebar${isSidebarVisible ? " visible" : ""}${
          isDragging ? " dragging" : ""
        }`}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <button className="admin-sidebar-toggle" onClick={handleToggleSidebar}>
          {isSidebarVisible ? "<<" : ">>"}
        </button>
        <h1>Admin Profile</h1>
          <ul>
            <li className={selected === 'client-master' ? 'active' : ''}>
              <div onClick={() => handleClick('client-master')}>Clients</div>
            </li>
            <li className={selected === 'user-master' ? 'active' : ''}>
              <div onClick={() => handleClick('user-master')}>Users</div>
            </li>
            <li className={selected === 'system-master' ? 'active' : ''}>
              <div onClick={() => handleClick('system-master')}>Systems</div>
            </li>
            <li className={selected === 'manufacturer-master' ? 'active' : ''}>
              <div onClick={() => handleClick('manufacturer-master')}>Manufacturers</div>
            </li>
            <li className={selected === 'map-module' ? 'active' : ''}>
              <div onClick={() => handleClick('map-module')}>Report Headings</div>
            </li>
            <li>
              <NavLink to ="/login">
              <button className= "admin-button">Logout</button>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="admin-main">
         
          {renderComponent()}
        </div> */}
        hii
      </div>
    );
  }
  
  export default Admin;