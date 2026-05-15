import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteEmployee(deleteId);
        setEmployees(employees.filter(emp => emp._id !== deleteId));
        setDeleteId(null);
      } catch (error) {
        console.error('Failed to delete employee', error);
      }
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <div className="page-header">
        <h1 className="page-title">Employee Directory</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="search-bar">
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>
                  <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>{emp.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{emp.email}</div>
                </td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>${emp.salary.toLocaleString()}</td>
                <td>
                  <div className="action-btns">
                    <button className="btn btn-edit" onClick={() => navigate(`/edit/${emp._id}`)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-danger" onClick={() => setDeleteId(emp._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this employee record? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
