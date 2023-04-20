import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './LoginPage';



import UserCreation from './components/admincomponents/UserCreation';
import ClientDBCreate from './components/admincomponents/ClientDBCreate';
import ClientMaster from './components/admincomponents/ClientMaster';
import UserMaster from './components/admincomponents/UserMaster';
import SystemCreate from './components/admincomponents/SystemCreate';
import SystemMaster from './components/admincomponents/SystemMaster';
import ManufacturerMaster from './components/admincomponents/ManufacturerMaster';
import ManufacturerCreate from './components/admincomponents/ManufacturerCreate';
import MapModule from './components/admincomponents/MapModule';


import Admin from './usertypes/admin';
import Creator from './usertypes/creator';
import Checker from './usertypes/Checker';
import Approver from './usertypes/Approver';
import EditComponents from './components/EditComponents';
import Edit2Components from './components/Edit2Components';
import ViewBoard from './components/Edit';
import Testing from './Testing';
import Testing2 from './Testing2';





// import TableWithFilter from './3';
import ViewBoard2 from './components/EditComponents';
const App = () => {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<Admin />} />
            <Route exact path="/admin/usercreation" element={<UserCreation />}/>
            <Route exact path="/admin/usermaster" element={<UserMaster />}/>
            <Route exact path="/admin/clientdb" element={<ClientDBCreate />}/>
            <Route exact path="/admin/clientmaster" element={<ClientMaster />}/>
            <Route exact path="/admin/systemmaster" element={<SystemMaster />}/>
            <Route exact path="/admin/systemcreate" element={<SystemCreate />}/>
            <Route exact path="/admin/manufacturermaster" element={<ManufacturerMaster />}/>
            <Route exact path="/admin/manufacturercreate" element={<ManufacturerCreate />}/>
            <Route exact path="/admin/mapmodule" element={<MapModule />}/>
          <Route path="/creator" element={<Creator />} />
          <Route exaxt path="/creator/view" element={<ViewBoard2 />} />
           <Route exaxt path="/creator/edit2" element={<Edit2Components />} />

          <Route path="/approver" element={<Approver />} />
          <Route path="/checker" element={<Checker />} />
          <Route path="/testpage" element={<Testing />} />
          <Route path="/testpage2" element={<Testing2 />} />
          <Route path="/Createfinalreport" element={<ViewBoard/>} />
          {/* <Route path="/www" element={<TableWithFilter />} /> */}
          {/*
          <Route path="/creator" element={<Creator />} />
            <Route exact path="/creator/createreport" element={<CreateReport />}/>
             <Route exact path="/creator/createreport/datetimeoptionality" element={<DateTimeOptionality />}/>
              <Route exact path="/creator/createreport/datetimeoptionality/finalformcreate" element={<FinalFormCreate/>}/>       */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
