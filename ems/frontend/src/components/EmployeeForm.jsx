import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, DollarSign, Calendar, Hash, Building } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '2rem', maxWidth: '900px', margin: '0 auto', animation: 'slideDown 0.5s ease' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '2.2rem' }}>{isEdit ? 'Edit Profile' : 'Onboard Employee'}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {isEdit ? 'Update the details of the existing employee record.' : 'Fill in the information below to add a new member to the team.'}
          </p>
        </div>
      </div>
      
      <div className="glass-panel" style={{ padding: '3rem 2.5rem' }}>
        <form onSubmit={handleSubmit}>
          
          <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="var(--primary)" /> Personal Information
          </h3>
          <div className="form-grid" style={{ marginBottom: '2.5rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="text" name="name" className="form-control" style={{ paddingLeft: '2.75rem' }} placeholder="John Doe" value={formData.name} onChange={handleChange} />
              </div>
              {errors.name && <span className="error-text"><AlertCircle size={14}/> {errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="email" name="email" className="form-control" style={{ paddingLeft: '2.75rem' }} placeholder="john@example.com" value={formData.email} onChange={handleChange} />
              </div>
              {errors.email && <span className="error-text"><AlertCircle size={14}/> {errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="text" name="phone" className="form-control" style={{ paddingLeft: '2.75rem' }} placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
              </div>
              {errors.phone && <span className="error-text"><AlertCircle size={14}/> {errors.phone}</span>}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)', margin: '2rem 0' }}></div>

          <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={20} color="var(--primary)" /> Employment Details
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <div style={{ position: 'relative' }}>
                <Hash size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="text" name="employeeId" className="form-control" style={{ paddingLeft: '2.75rem', opacity: isEdit ? 0.7 : 1 }} placeholder="EMP-001" value={formData.employeeId} onChange={handleChange} disabled={isEdit} />
              </div>
              {errors.employeeId && <span className="error-text"><AlertCircle size={14}/> {errors.employeeId}</span>}
            </div>

            <div className="form-group">
              <label>Department</label>
              <div style={{ position: 'relative' }}>
                <Building size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <select name="department" className="form-control" style={{ paddingLeft: '2.75rem', appearance: 'none' }} value={formData.department} onChange={handleChange}>
                  <option value="" disabled>Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              {errors.department && <span className="error-text"><AlertCircle size={14}/> {errors.department}</span>}
            </div>

            <div className="form-group">
              <label>Designation</label>
              <div style={{ position: 'relative' }}>
                <Briefcase size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="text" name="designation" className="form-control" style={{ paddingLeft: '2.75rem' }} placeholder="Software Engineer" value={formData.designation} onChange={handleChange} />
              </div>
              {errors.designation && <span className="error-text"><AlertCircle size={14}/> {errors.designation}</span>}
            </div>

            <div className="form-group">
              <label>Annual Salary ($)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="number" name="salary" className="form-control" style={{ paddingLeft: '2.75rem' }} placeholder="85000" value={formData.salary} onChange={handleChange} />
              </div>
              {errors.salary && <span className="error-text"><AlertCircle size={14}/> {errors.salary}</span>}
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--text-muted)' }} />
                <input type="date" name="dateOfJoining" className="form-control" style={{ paddingLeft: '2.75rem' }} value={formData.dateOfJoining} onChange={handleChange} />
              </div>
              {errors.dateOfJoining && <span className="error-text"><AlertCircle size={14}/> {errors.dateOfJoining}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ minWidth: '150px' }}>
              {isSubmitting ? 'Saving...' : (isEdit ? 'Update Profile' : 'Save Employee')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
