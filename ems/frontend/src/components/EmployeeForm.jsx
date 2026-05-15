import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../api';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    dateOfJoining: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchEmployeeData();
    }
  }, [id]);

  const fetchEmployeeData = async () => {
    try {
      const data = await getEmployee(id);
      setFormData({
        employeeId: data.employeeId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        salary: data.salary,
        dateOfJoining: new Date(data.dateOfJoining).toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to fetch employee', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.name) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    
    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary)) {
      newErrors.salary = 'Salary must be a number';
    }

    if (!formData.dateOfJoining) newErrors.dateOfJoining = 'Date of joining is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="page-title">{isEdit ? 'Edit Employee' : 'Add New Employee'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Employee ID</label>
            <input 
              type="text" 
              name="employeeId" 
              className="form-control" 
              value={formData.employeeId} 
              onChange={handleChange} 
              disabled={isEdit}
            />
            {errors.employeeId && <span className="error-text">{errors.employeeId}</span>}
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              value={formData.name} 
              onChange={handleChange} 
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              className="form-control" 
              value={formData.phone} 
              onChange={handleChange} 
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select 
              name="department" 
              className="form-control" 
              value={formData.department} 
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label>Designation</label>
            <input 
              type="text" 
              name="designation" 
              className="form-control" 
              value={formData.designation} 
              onChange={handleChange} 
            />
            {errors.designation && <span className="error-text">{errors.designation}</span>}
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input 
              type="number" 
              name="salary" 
              className="form-control" 
              value={formData.salary} 
              onChange={handleChange} 
            />
            {errors.salary && <span className="error-text">{errors.salary}</span>}
          </div>

          <div className="form-group">
            <label>Date of Joining</label>
            <input 
              type="date" 
              name="dateOfJoining" 
              className="form-control" 
              value={formData.dateOfJoining} 
              onChange={handleChange} 
            />
            {errors.dateOfJoining && <span className="error-text">{errors.dateOfJoining}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Record' : 'Save Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
