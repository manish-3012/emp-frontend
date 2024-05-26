// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/NavBar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import EmployeeProfile from './components/employee/EmployeeProfile';
import EmployeeListPage from './components/employee/EmployeeListPage';
import UpdateEmployee from './components/employee/UpdateEmployee';
import ProjectManagementPage from './components/projects/ProjectManagementPage';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/all-employees" element={<EmployeeListPage />} />
            <Route path="/employee-profile/:employeeId" element={<EmployeeProfile/>} />


            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/update-employee/:empId" element={<UpdateEmployee />} />
                <Route path="/admin/project-management" element={<ProjectManagementPage />} />
              </>
            )}

            {UserService.userManagerAny() && (
              <>
                <Route path="/employee-profile/:employeeId" element={<EmployeeProfile/>} />
              </>
            )}
{/* 
            {UserService.managerOnly() && (
              <>
                <Route path="/project-detail" element={<ProjectDetailPage />} />
                <Route path="/admin/project-management" element={<ProjectManagementPage />} />
                <Route path="/update-
                /:projectId" element={<ProjectUpdate />} />
              </>
            )}

            {UserService.adminManagerAny() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )} */}

            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;