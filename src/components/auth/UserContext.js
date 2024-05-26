
import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../service/UserService';
import EmployeeService from '../service/EmployeeService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profileInfo, setProfileInfo] = useState({});
    const [empId, setEmpId] = useState(null);

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
            const token = localStorage.getItem('token'); 
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
            setEmpId(response.empId);
        } catch (error) {
            console.error('Error fetching Employee information from UserId:', error);
        }
    };

    return (
        <UserContext.Provider value={{ profileInfo, empId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
