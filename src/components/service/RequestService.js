import axios from 'axios';

class RequestService {
    static BASE_URL = "http://localhost:8080";

    static async getAllRequests(token) {
        try {
            const response = await axios.get(`${RequestService.BASE_URL}/admin/all-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getManagerRequests(token) {
        try {
            const response = await axios.get(`${RequestService.BASE_URL}/manager/all-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createRequest(requestDto, token) {
        try {
            const response = await axios.post(`${RequestService.BASE_URL}/manager/create-request`, requestDto, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getRequestsByStatus(status, token, isAdmin = false) {
        try {
            const endpoint = isAdmin ? `/admin/status/${status}` : `/manager/status/${status}`;
            const response = await axios.get(`${RequestService.BASE_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async adminGetRequestById(requestId, token) {
        try {
            const endpoint = `/admin/get-request/${requestId}`;
            const response = await axios.get(`${RequestService.BASE_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
    
    static async managerGetRequestById(requestId, token) {
        try {
            const endpoint = `/manager/get-request/${requestId}`;
            const response = await axios.get(`${RequestService.BASE_URL}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateRequestStatus(requestId, status, token) {
        try {
            const response = await axios.put(`${RequestService.BASE_URL}/admin/request/${requestId}/status/${status}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getRequestsByManager(managerId, token) {
        try {
            const response = await axios.get(`${RequestService.BASE_URL}/admin/managerId/${managerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteRequest(requestId, token) {
        try {
            const response = await axios.delete(`${RequestService.BASE_URL}/manager/delete-request/${requestId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default RequestService;
