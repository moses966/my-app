import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GetString from './components/GetString';
import UpdateString from './components/UpdateString';
import ApproveTokenComponent from './components/Approve';
import ApproveTokenWithABIComponent from './components/Approve2';
import ApprovesTokenWithABIComponent from './components/arbitrum-one/Approve';
import ApprovessTokenWithABIComponent from './components/arbitrum-one/Approves';
import WalletConnect from './components/walletConnect';

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-string" element={<GetString />} />
        <Route path="/update-string" element={<UpdateString />} />
        <Route path="/approve" element={<ApproveTokenComponent />} />
        <Route path="/approve2" element={<ApproveTokenWithABIComponent />} />
        <Route path="/approve3" element={<ApprovesTokenWithABIComponent />} />
        <Route path="/approve4" element={<ApprovessTokenWithABIComponent />} />
        <Route path="/connect" element={<WalletConnect />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
