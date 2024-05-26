// services/EmployeeService.jsx
import axios from 'axios';
import UserService from './UserService';
class EmployeeService {
    static BASE_URL = "http://localhost:8080"; // Update this URL if different

    static async listEmployees(token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employees`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeesByProjectId(projectId, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employees/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeesByManagerId(managerId, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employees/manager/${managerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeeById(employeeId, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeeByUserId(userId, token) {
        console.log("Inside EmployeeService");
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employee/user-id/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        return response.data;
    }

    static async getEmpIdForCurrentUser(token) {
        try {
            const profile = await UserService.getYourProfile(token);
            const userId = profile.ourUsers.userId;
            console.log(userId);
            const response = await EmployeeService.getEmployeeByUserId(userId, token);
            return response.empId;
        } catch (error) {
            console.error('Error fetching Employee information for the current user:', error);
            throw error;
        }
    }

    static async getEmployeeByEmail(email, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employee/email/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeeByUsername(username, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/all/get-employee/username/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async getEmployeesBySkill(skill, token) {
        const response = await axios.get(`${EmployeeService.BASE_URL}/adminmanager/get-employees/skills/${skill}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async addSkills(employeeId, skills, token) {
        const response = await axios.patch(`${EmployeeService.BASE_URL}/manageruser/add-skills/${employeeId}`, skills, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async assignProject(employeeId, projectId, token) {
        const response = await axios.put(`${EmployeeService.BASE_URL}/admin/assign-project/${employeeId}/${projectId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async unassignProject(employeeId, projectId, token) {
        const response = await axios.put(`${EmployeeService.BASE_URL}/admin/unassign-project/${employeeId}/${projectId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async deleteEmployee(employeeId, token) {
        const response = await axios.delete(`${EmployeeService.BASE_URL}/admin/delete-employee/${employeeId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async updateEmployee(employeeId, employeeData, token) {
        const response = await axios.put(`${EmployeeService.BASE_URL}/admin/update-employee/${employeeId}`, employeeData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async partialUpdateEmployee(employeeId, employeeData, token) {
        const response = await axios.patch(`${EmployeeService.BASE_URL}/admin/partial-update-employee/${employeeId}`, employeeData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
}

export default EmployeeService;
