import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link } from 'react-router-dom';

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await EmployeeService.listEmployees(token);
            console.log(data);
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    return (
        <div className="user-management-container">
        <h2>Employee List</h2>
        {/* <button className='reg-button'> <Link to="/register">Add User</Link></button> */}
        <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.empId}>
                            <td>{employee.empId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button><Link to={`/employee-profile/${employee.empId}`}>
                                    See Profile
                                </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeListPage;
