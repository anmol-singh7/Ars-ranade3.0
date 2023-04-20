import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './cssmain/creator.css'

import FormCreate from '../components/creatorcomponents/FormCreate';
import FormList from '../components/creatorcomponents/FormList';


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
      <div className="creator">
              <div
        className={`creator-sidebar${isSidebarVisible ? " visible" : ""}${
          isDragging ? " dragging" : ""
        }`}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <button className="creator-sidebar-toggle" onClick={handleToggleSidebar}>
          {isSidebarVisible ? "<<" : ">>"}
        </button>
        <h1>Creator Profile</h1>
          <ul>
            <li className={selected === 'user-creation' ? 'active' : ''}>
              <div onClick={() => handleClick('user-creation')}>FormCreate</div>
            </li>
            <li className={selected === 'client-db-create' ? 'active' : ''}>
              <div onClick={() => handleClick('client-db-create')}>FormList</div>
            </li>
            <li>
              <NavLink to ="/login">
              <button className= "creator-button">Logout</button>
              </NavLink>
              </li>
          </ul>
        </div>
        <div className="creator-main">
          {renderComponent()}
        </div>
      </div>
    );
  }
  
  export default Creator;