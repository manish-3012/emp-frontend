import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { useUserContext } from '../auth/UserContext';

function EmployeeProfile() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [newSkill, setNewSkill] = useState('');
    const [error, setError] = useState(null);
    const { profileInfo, employee: currentUserEmployee } = useUserContext();

    useEffect(() => {
        fetchEmployee(employeeId);
    }, [employeeId]);

    const fetchEmployee = async (employeeId) => {
        try {
            const token = localStorage.getItem('token');
            const data = await EmployeeService.getEmployeeById(employeeId, token);
            console.log(data);
            console.log(profileInfo);
            setEmployee(data);
        } catch (error) {
            console.error('Error fetching employee:', error);
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
            {profileInfo.role === 'ADMIN' && (
                <p>Project ID: {employee.projectId}</p>
            )}
            <p>Skills: {employee.skills ? employee.skills.join(', ') : 'No skills listed'}</p>
            {employee.userType === 'MANAGER' && (
                <p>Managed Project IDs: {employee.managedProjectIds ? employee.managedProjectIds.join(', ') : 'No project IDs listed'}</p>
            )}
            {profileInfo.userId && profileInfo.userId === employee.userId && (
                <div>
                    <p>
                        Project ID: {employee.projectId}  
                        {employee.projectId ? (
                            <Link className='green-button' to={`/project-detail/${employee.projectId}`}>See Project Details</Link>
                        ) : (
                            'No project assigned'
                        )}
                    </p>
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
            {profileInfo && profileInfo.role === 'ADMIN' && (
                <button>
                    <Link to={`/update-employee/${employeeId}`}>Update Employee Detail</Link>
                </button>
            )}
        </div>
    );
}

export default EmployeeProfile;
