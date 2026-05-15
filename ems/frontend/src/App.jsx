import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
