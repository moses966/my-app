import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import GetString from './components/GetString';
import UpdateString from './components/UpdateString';
import ApproveTokenComponent from './components/Approve';

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-string" element={<GetString />} />
        <Route path="/update-string" element={<UpdateString />} />
        <Route path="/approve" element={<ApproveTokenComponent />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
