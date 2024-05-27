import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestService from '../service/RequestService';

function RequestCreatePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectId: '',
        employeeIds: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const requestDto = {
                ...formData,
                employeeIds: formData.employeeIds.split(',').map(id => parseInt(id.trim()))
            };
            await RequestService.createRequest(requestDto, token);
            navigate('/request-management');  // Navigate to the requests list page after successful creation
        } catch (error) {
            console.error('Error creating request:', error);
            setError('Error creating request: ' + error.message);
        }
    };

    return (
        <div className='auth-container'>
            <h2>Create New Request</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project ID:</label>
                    <input
                        type="text"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Employee IDs (comma-separated):</label>
                    <input
                        type="text"
                        name="employeeIds"
                        value={formData.employeeIds}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Create Request</button>
            </form>
        </div>
    );
}

export default RequestCreatePage;
