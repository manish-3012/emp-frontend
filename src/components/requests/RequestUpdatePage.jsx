import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestService from '../service/RequestService';

function RequestUpdatePage() {
  const navigate = useNavigate();
  const { requestId } = useParams();

  const [requestData, setRequestData] = useState({
    projectId: '',
    employeeIds: ''
  });

  useEffect(() => {
    fetchRequestDataById(requestId);
  }, [requestId]);

  const fetchRequestDataById = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await RequestService.getRequestById(requestId, token);
      const { projectId, employeeIds } = response;
      setRequestData({ projectId, employeeIds: employeeIds.join(', ') });
    } catch (error) {
      console.error('Error fetching request data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevRequestData) => ({
      ...prevRequestData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this request?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const updatedRequestData = {
          ...requestData,
          employeeIds: requestData.employeeIds.split(',').map(id => parseInt(id.trim()))
        };
        await RequestService.updateRequest(requestId, updatedRequestData, token);
        navigate("/manager/all-requests");
      }
    } catch (error) {
      console.error('Error updating request:', error);
      alert(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project ID:</label>
          <input type="text" name="projectId" value={requestData.projectId} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Employee IDs (comma separated):</label>
          <input type="text" name="employeeIds" value={requestData.employeeIds} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default RequestUpdatePage;
