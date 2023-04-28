import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './cssmain/creator.css'
import './cssmain/admin.css'

import FormCreate from '../components/creatorcomponents/FormCreate';
import FormList from '../components/creatorcomponents/FormList';
import ProfileDropdown from '../components/adminComponent/Profile';

function Creator() {
   
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
  
    const renderComponent = () => {
      switch(selected) {
        case 'user-creation':
          return <FormCreate />;
        case 'client-db-create':
          return <FormList />;
          case 'logout':
            return (
              <NavLink to="./login">
                <button>logout</button>
                </NavLink>
            );

        default:
          return <FormList />;
      }
    };
  
    return (
      <div className="admin">
              <div
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
        <h1>Creator Profile</h1>
          <ul>
            <li className={selected === 'user-creation' ? 'active' : ''}>
              <div onClick={() => handleClick('user-creation')}>Create Report</div>
            </li>
            <li className={selected === 'client-db-create' ? 'active' : ''}>
              <div onClick={() => handleClick('client-db-create')}>Report List</div>
            </li>
          </ul>
        </div>
        <div className="admin-main" style={isSidebarVisible === true ? { marginLeft: "20vw", marginRight: "3vw" } : { marginLeft: "3vw", marginRight: "3vw" }}>
          {renderComponent()}
        </div>
       <ProfileDropdown/>
      </div>
    );
  }
  
  export default Creator;