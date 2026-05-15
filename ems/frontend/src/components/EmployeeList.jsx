import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, Search, Plus, AlertCircle, Users } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
    } finally {
      setIsLoading(false);
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
    <div style={{ paddingBottom: '2rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Roster</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Manage your workforce efficiently</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="search-bar">
            <Search size={20} color="var(--primary)" />
            <input 
              type="text" 
              placeholder="Search by name, ID or Dept..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/add')}>
            <Plus size={20} strokeWidth={3} /> Add Employee
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>
                      Loading team data...
                    </div>
                  </td>
                </tr>
              ) : filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '40px', height: '40px', borderRadius: '10px', 
                          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)'
                        }}>
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'white', fontSize: '1.05rem' }}>{emp.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>ID: {emp.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.95rem' }}>{emp.email}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{emp.phone}</div>
                    </td>
                    <td>
                      <span className={`badge badge-${emp.department.replace(/\s+/g, '')}`}>
                        {emp.department}
                      </span>
                    </td>
                    <td style={{ fontWeight: '500', color: 'rgba(255,255,255,0.9)' }}>{emp.designation}</td>
                    <td style={{ fontWeight: '600', color: 'var(--success)' }}>
                      ${emp.salary.toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
                      <div className="action-btns" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn btn-edit" style={{ padding: '0.5rem' }} onClick={() => navigate(`/edit/${emp._id}`)} title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => setDeleteId(emp._id)} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state">
                      <Users className="empty-icon" />
                      <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>No employees found</h3>
                      <p>Try adjusting your search terms or add a new employee.</p>
                      {search && (
                        <button className="btn" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => setSearch('')}>
                          Clear Search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-icon">
              <AlertCircle size={32} />
            </div>
            <h3>Remove Employee?</h3>
            <p>This action cannot be undone. All data associated with this employee will be permanently deleted from the system.</p>
            <div className="modal-actions">
              <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
