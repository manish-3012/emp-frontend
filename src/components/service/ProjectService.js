import axios from 'axios';

class ProjectService {
    static BASE_URL = "http://localhost:8080";

    static async createProject(projectDto, token) {
        try {
            const response = await axios.post(`${ProjectService.BASE_URL}/adminmanager/create-project`, projectDto, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async listProjects(token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/admin/get-projects`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProjectById(id, token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/admin/get-project/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProjectByIdForManagerUser(id, token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/manageruser/get-project/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async updateProject(id, projectDto, token) {
        try {
            const response = await axios.put(`${ProjectService.BASE_URL}/admin/update-project/${id}`, projectDto, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async partialUpdateProject(id, projectDto, token) {
        try {
            const response = await axios.patch(`${ProjectService.BASE_URL}/admin/partial-update-project/${id}`, projectDto, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteProject(id, token) {
        try {
            const response = await axios.delete(`${ProjectService.BASE_URL}/admin/delete-project/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProjectsByManagerId(empId, token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/admin/get-project/manager/${empId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProjectsForManager(token) {
        try {
            const response = await axios.get(`${ProjectService.BASE_URL}/manager/get-projects`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default ProjectService;
