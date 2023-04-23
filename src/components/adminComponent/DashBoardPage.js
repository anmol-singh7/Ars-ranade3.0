import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tableTypeMap } from '../people/tabletypes';
import { useLocation } from "react-router-dom";

import { userTypeMap } from '../people/usertypes';
import Table from './Table';
import MapModule from './heading';
import ProfileDropdown from './Profile';
import "../../design.css/admin.css";
import "../../design.css/profile.css"


const DashBoardPage = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { state } = useLocation();
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

  function handleToggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  const renderPage = (selectedpage) => {
    switch (selectedpage) {
      case 'Clients':
        return <Table tableHollow={tableTypeMap.Clients} />;
      case 'Systems':
        return <Table tableHollow={tableTypeMap.Systems} />;
      case 'Manufacturers':
        return <Table tableHollow={tableTypeMap.Manufacturers} />;
      case 'Users':
        return <Table tableHollow={tableTypeMap.Users} />;
      case 'Headings':
        return <div><MapModule /></div>;
      case 'Reports':
        return <Table tableHollow={tableTypeMap.Reports} />;
      default:
        return <div style={{
          backgroundImage:
            "url('https://previews.123rf.com/images/prakobkit/prakobkit1901/prakobkit190100062/117779220-aerial-view-of-container-cargo-ship-in-sea.jpg')", width: '100vw', height: '100vh'
        }}>

          {/* <button style={{ position: 'absolute', padding: '8px 20px', border: '1px solid black', borderRadius: '5px', backgroundColor: 'green', color: 'white', right: '1.5vw', top: '2vh' }} onClick={goto}>Login</button> */}
        </div>
    ;
    }
  };

  return (
    <div  >
      <div className={`admin-sidebar${isSidebarVisible ? ' visible' : ''}`}>
        {/* <button className="admin-sidebar-toggle" onClick={handleToggleSidebar}>
          {isSidebarVisible ? "<<" : ">>"}
        </button> */}
        <h1 className="admin-sidebar-title">Admin Profile</h1>
        <ul className="admin-sidebar-list">
          {Object.keys(tableTypeMap).map((page) => (
            <li key={page} className={activePage === page  ? 'active' : ''} >
              <div value={page} onClick={() => setActivePage(page)}>{page}</div>
            </li>
          ))}
          <li key={'Headings'}>
            <div value={'Headings'} onClick={() => setActivePage('Headings')}>
              Headings
            </div>
          </li>
        </ul>
      </div>
      <div className="admin-content" style={{ marginLeft: isSidebarVisible ? '20vw' : '0vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="admin-profile-btn" onClick={handleToggleSidebar}>
            {isSidebarVisible ? "<<" : ">>"}
          </button>
         
        </div>
        <div className="admin-page" style={activePage!==""?{ marginLeft: isSidebarVisible ? '2vw' : '5vw' }:{}}>{renderPage(activePage)}</div>
      </div  >
      {/* <div style={{ position:'fixed',right:'10px' }}>hii</div> */}

     <div> <ProfileDropdown /></div>

    </div>
  );
};

export default DashBoardPage;