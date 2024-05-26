// components/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { useUserContext } from '../auth/UserContext';

function ProfilePage() {
    const { profileInfo } = useUserContext();  // Get profileInfo from context
    const [empId, setEmpId] = useState({});

    useEffect(() => {
        if (profileInfo.userId) {
            getEmployeeByUserId(profileInfo.userId);
        }
    }, [profileInfo.userId]);

    const getEmployeeByUserId = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await EmployeeService.getEmployeeByUserId(userId, token);
            console.log(response);
            setEmpId(response.empId);
        } catch (error) {
            console.error('Error fetching Employee information from UserId:', error);
            setEmpId(null);
        }
    };

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.userId}`}>Update This Profile</Link></button>
            )}
            {profileInfo.role !== "ADMIN" && empId && (
                <button>
                    <Link to={`/employee-profile/${empId}`}>See Complete Profile</Link>
                </button>
            )}
        </div>
    );
}

export default ProfilePage;
