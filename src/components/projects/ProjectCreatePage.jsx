import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../service/ProjectService';

function ProjectCreatePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        skills: '',
        manager: ''
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
            const projectDto = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim())
            };
            await ProjectService.createProject(projectDto, token);
            navigate('/admin/project-management');  // Navigate to the projects list page after successful creation
        } catch (error) {
            console.error('Error creating project:', error);
            setError('Error creating project: ' + error.message);
        }
    };

    return (
        <div className='auth-container'>
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Skills (comma-separated):</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Manager ID:</label>
                    <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
}

export default ProjectCreatePage;
