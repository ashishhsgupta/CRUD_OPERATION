import './App.css';
//import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserData from './components/userData/userData.js';
import DataTable from './components/userData/dataTable.js';



function App() {

  return (
   
    <Routes>
      <Route path="/" element={<UserData />} />
      <Route path='/dataTable' element={<DataTable />} />
    </Routes>
 
  );
}

export default App;

