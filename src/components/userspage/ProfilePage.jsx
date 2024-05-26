import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService'

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});
    const [empId, setEmpId] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    useEffect(() => {
        if (profileInfo.userId) {
            getEmployeeByUserId(profileInfo.userId);
        }
    }, [profileInfo.userId]);


    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const getEmployeeByUserId = async (userId) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await EmployeeService.getEmployeeByUserId(userId, token);
            console.log(response);
            setEmpId(response.empId);
        } catch(error) {
            console.error('Error fetching Employee information from UserId:', error);
        }
    }

    return (
        <div className="profile-page-container">
            <h2>Profile Information</h2>
            <p>Name: {profileInfo.name}</p>
            <p>Email: {profileInfo.email}</p>
            {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.userId}`}>Update This Profile</Link></button>
            )}
            {profileInfo.role !== "ADMIN" && (
                <button>
                    <Link to={`/employee-profile/${empId}`}>See Complete Profile</Link>
                </button>
            )}
        </div>
    );
}

export default ProfilePage;