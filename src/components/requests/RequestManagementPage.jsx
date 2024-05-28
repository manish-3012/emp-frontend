import React, { useState, useEffect } from 'react';
import RequestService from '../service/RequestService';
import { useUserContext } from '../auth/UserContext';
import { Link } from 'react-router-dom';

function RequestManagementPage() {
    const [requests, setRequests] = useState([]);
    const { profileInfo } = useUserContext();

    useEffect(() => {
        if (profileInfo && profileInfo.userId) {
            fetchRequests();
        }
    }, [profileInfo]);

    const fetchRequests = async () => {
        if (!profileInfo || !profileInfo.userId) {
            return;
        }

        try {
            const token = localStorage.getItem('token');

            let response;
            if (profileInfo.role === 'ADMIN') {
                response = await RequestService.getAllRequests(token);
                console.log(response);
            } else if (profileInfo.role === 'MANAGER') {
                response = await RequestService.getManagerRequests(token);
            }
            setRequests(response);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await RequestService.updateRequestStatus(requestId, 'APPROVED', token);
            fetchRequests(); // Refresh the list after update
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await RequestService.updateRequestStatus(requestId, 'REJECTED', token);
            fetchRequests(); // Refresh the list after update
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const handleDelete = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            await RequestService.deleteRequest(requestId, token);
            fetchRequests(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <div className="user-management-container">
            <h2>Request Management Page</h2>
            {profileInfo.role === 'MANAGER' && (
                <button className='reg-button'><Link to="/create-request">Create New Request</Link></button>
            )}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Project ID</th>
                        <th>Manager ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.reqId}>
                            <td>{request.reqId}</td>
                            <td>{request.status}</td>
                            <td>{request.projectId}</td>
                            <td>{request.managerId}</td>
                            <td>
                                <button><Link to={`/request-detail/${request.reqId}`}>See Details</Link></button>
                                {profileInfo.role === 'ADMIN' && (
                                    <div>
                                        <button className='green-button' onClick={() => handleApprove(request.reqId)}>Approve</button>
                                        <button className='delete-button' onClick={() => handleReject(request.reqId)}>Reject</button>
                                    </div>
                                )}
                                {profileInfo.role === 'MANAGER' && (
                                    <button className='delete-button' onClick={() => handleDelete(request.reqId)}>Delete</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RequestManagementPage;
