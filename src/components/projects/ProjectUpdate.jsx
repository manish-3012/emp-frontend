// components/ProjectUpdate.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectService from '../service/ProjectService';

function ProjectUpdate() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    manager: '',
    skills: ''
  });

  useEffect(() => {
    fetchProjectDataById(projectId); // Pass the projectId to fetchProjectDataById
  }, [projectId]); // Whenever there is a change in projectId, run this

  const fetchProjectDataById = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await ProjectService.getProjectById(projectId, token); // Pass projectId to getProjectById
      const { name, description, manager, skills } = response;
      setProjectData({ name, description, manager, skills: skills.join(', ') });
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this project?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const updatedProjectData = {
          ...projectData,
          skills: projectData.skills.split(',').map(skill => skill.trim())
        };
        const res = await ProjectService.updateProject(projectId, updatedProjectData, token);
        console.log(res);
        // Redirect to project management page or display a success message
        navigate("/admin/project-management");
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={projectData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={projectData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Manager ID:</label>
          <input type="text" name="manager" value={projectData.manager} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input type="text" name="skills" value={projectData.skills} onChange={handleInputChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProjectUpdate;
