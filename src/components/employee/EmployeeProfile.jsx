import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService'
import UserService from '../service/UserService'

function EmployeeDetailPage() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [newSkill, setNewSkill] = useState('');
    const [currentEmpId, setCurrentEmpId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployee(employeeId);
    }, [employeeId]);

    useEffect(() => {
        if (employee && employee.userType !== 'ADMIN') {
            fetchCurrentEmpId();
        }
    }, [employee]);

    const fetchEmployee = async (employeeId) => {
        try {
            const token = localStorage.getItem('token');
            const data = await EmployeeService.getEmployeeById(employeeId, token);
            setEmployee(data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const fetchCurrentEmpId = async () => {
        try {
            const token = localStorage.getItem('token');
            const empId = await EmployeeService.getEmpIdForCurrentUser(token);
            setCurrentEmpId(empId);
        } catch (error) {
            console.error('Error fetching current employee ID:', error);
        }
    };

    const handleAddSkill = async () => {
        try {
            const token = localStorage.getItem('token');
            await EmployeeService.addSkills(employeeId, [newSkill], token);
            setNewSkill('');
            fetchEmployee(employeeId); // Refresh employee details after adding skill
        } catch (error) {
            setError('Error adding skill: ' + error.message);
        }
    };

    if (!employee) return <div>Loading...</div>;

    return (
        <div className='profile-page-container'>
            <h2>Employee Detail</h2>
            <p>Name: {employee.name}</p>
            <p>Email: {employee.email}</p>
            <p>Role: {employee.userType}</p>
            <p>Username: {employee.username}</p>
            <p>Manager's ID: {employee.managerId}</p>
            <p>Project ID: {employee.projectId}</p>
            <p>Skills: {employee.skills.join(', ')}</p>
            {currentEmpId === employee.empId && (
                <div>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                Add Skill
                <input 
                    type="text" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)} 
                    placeholder="Enter new skill"
                    style={{ marginLeft: '8px' }} 
                />
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handleAddSkill}>Add Skill</button>
                </div>
            )}
            {/* other employee details */}
            {UserService.isAdmin() && (
                <button>
                    <Link to={`/update-employee/${employeeId}`}>Update Employee Detail</Link>
                </button>
            )}
        </div>
    );
}

export default EmployeeDetailPage;
