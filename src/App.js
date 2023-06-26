import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './components/LoginPage';

import Admin from './usertypes/admin';
import Creator from './usertypes/creator';
import Checker from './usertypes/Checker';
import Approver from './usertypes/Approver';
// import EditComponents from './components/creatorcomponents/EditComponents';
import Edit2Components from './components/creatorcomponents/ReportEdit';
import ViewBoard from './components/creatorcomponents/ReportCreation';
import Testing from './components/creatorcomponents/ButtonWithModal';
import Modal2 from './components/creatorcomponents/Modal2';
import Default from './components/Default';
import DashBoardPage from './components/adminComponent/DashBoardPage';
import AddEmploy from './components/adminComponent/input';
import ViewBoard2 from './components/creatorcomponents/ReportView';
// import ProfilePage from './6';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Default />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/creator" element={<Creator />} />
          <Route exaxt path="/creator/view" element={<ViewBoard2 />} />
          <Route exaxt path="/creator/edit2" element={<Edit2Components />} />
          <Route path="/approver" element={<Approver />} />
          <Route path="/checker" element={<Checker />} />
          <Route path="/testpage" element={<Testing />} />
          <Route path="/testpage2" element={<Modal2 />} />
          <Route path="/Createfinalreport" element={<ViewBoard />} />
          <Route path="/addemploy" element={<AddEmploy/>}/>
          {/* <Route path ="/pp" element ={<ProfilePage/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
