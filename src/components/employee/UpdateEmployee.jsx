import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

function UpdateEmployeePage() {
    const { empId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: '',
        username: '',
        managerId: '',
        projectId: '',
        skills: '',
        managedProjectIds: []
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('employeeId from useParams:', empId);
        if (empId) {
            fetchEmployee(empId);
        }
    }, [empId]);

    const fetchEmployee = async (empId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            // console.log('Fetching employee with ID:', empId);
            const data = await EmployeeService.getEmployeeById(empId, token);
            // console.log(data);
            setEmployee(data);
            setFormData({
                name: data.name || '',
                email: data.email || '',
                userType: data.userType || '',
                username: data.username || '',
                managerId: data.managerId || '',
                projectId: data.projectId || '',
                skills: (data.skills || []).join(', '),
                managedProjectIds: data.managedProjectIds || []
            });
        } catch (error) {
            // console.error('Error fetching employee:', error);
            setError('Error fetching employee: ' + error.message);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'managedProjectIds') {
            setFormData((prevState) => ({
                ...prevState,
                managedProjectIds: value.split(',').map(id => parseInt(id.trim()))
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const updatedData = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim()),
                managedProjectIds: formData.managedProjectIds
            };
            await EmployeeService.partialUpdateEmployee(empId, updatedData, token);
            navigate(`/employee-profile/${empId}`);
        } catch (error) {
            console.error('Error updating employee:', error);
            setError('Error updating employee: ' + error.message);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className='profile-page-container'>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input
                        type="text"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manager ID:</label>
                    <input
                        type="text"
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Managed Project IDs:</label>
                    <input
                        type="text"
                        name="managedProjectIds"
                        value={formData.managedProjectIds.join(', ')}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Skills:</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default UpdateEmployeePage;
