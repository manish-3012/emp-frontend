import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const isManager = UserService.isManager();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout this user?');
        if (confirmLogout) {
            UserService.logout();
        }
    };

    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">NucleusTeq</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAuthenticated && <li><Link to="/all-employees">All Employees</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {(isAdmin || isManager) && <li><Link to="/admin/project-management">Project Management</Link></li>}
                {(isAdmin || isManager) && <li><Link to="/request-management">Request Management</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;