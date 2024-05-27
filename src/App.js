// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/NavBar';
import { UserProvider } from '../src/components/auth/UserContext';
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
import ProjectDetailPage from './components/projects/ProjectDetailPage';
import ProjectCreatePage from './components/projects/ProjectCreatePage';
import ProjectUpdate from './components/projects/ProjectUpdate';
import RequestCreatePage from './components/requests/RequestCreatePage';
import RequestDetailPage from './components/requests/RequestDetailPage';
import RequestUpdatePage from './components/requests/RequestUpdatePage';
import RequestManagementPage from './components/requests/RequestManagementPage';

function App() {

  return (
    <UserProvider>
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
              <Route path="/project-detail/:projectId" element={<ProjectDetailPage/>} />

              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {UserService.adminOnly() && (
                <>
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/create-project" element={<ProjectCreatePage />} />
                  <Route path="/admin/user-management" element={<UserManagementPage />} />
                  <Route path="/update-user/:userId" element={<UpdateUser />} />
                  <Route path="/update-employee/:empId" element={<UpdateEmployee />} />
                  <Route path="/update-project/:projectId" element={<ProjectUpdate />} />
                </>
              )}

              {UserService.managerOnly() && (
                <>
                  <Route path="/create-request" element={<RequestCreatePage/>} />
                  <Route path="/update-request/:requestId" element={<RequestUpdatePage/>} />
                </>
              )}

              {UserService.adminManagerAny() && (
                <>
                  <Route path="/admin/project-management" element={<ProjectManagementPage />} />
                  <Route path="/request-management" element={<RequestManagementPage />} />
                  <Route path="/request-detail/:reqId" element={<RequestDetailPage />} />
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
    </UserProvider>
  );
}

export default App;