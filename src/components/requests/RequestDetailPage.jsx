import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RequestService from '../service/RequestService';
import { useUserContext } from '../auth/UserContext';

function RequestDetailPage() {
    const { reqId } = useParams();
    const { profileInfo } = useUserContext();
    const [requestInfo, setRequestInfo] = useState({
        status: '',
        projectId: '',
        managerId: '',
        employeeIds: [] // Initialize skills as an empty array
    });

    useEffect(() => {
        fetchRequestInfo(reqId);
    }, [reqId]);

    const fetchRequestInfo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            let response;
            if (profileInfo.role === 'ADMIN') {
                response = await RequestService.adminGetRequestById(id, token);
            } else if (profileInfo.role === 'MANAGER') {
                response = await RequestService.managerGetRequestById(id, token);
            }
            setRequestInfo(response);
        } catch (error) {
            console.error('Error fetching request:', error);
        }
    };

    if (!requestInfo) return <div>Loading...</div>;

    return (
        <div className='profile-page-container'>
            <h2>Request Detail</h2>
            <p>ID: {requestInfo.reqId}</p>
            <p>Status: {requestInfo.status}</p>
            <p>Project ID: {requestInfo.projectId}</p>
            <p>Manager ID: {requestInfo.managerId}</p>
            <p>Employee IDs: {requestInfo.employeeIds.join(', ')}</p>
            {(profileInfo.role === 'MANAGER') && (
                <button><Link to={`/update-request/${requestInfo.reqId}`}>Update Request</Link></button>
            )}
        </div>
    );
}

export default RequestDetailPage;
