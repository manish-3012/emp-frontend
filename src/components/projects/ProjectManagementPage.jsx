import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../service/ProjectService';
import { useUserContext } from '../auth/UserContext';

function ProjectManagementPage() {
  const [projects, setProjects] = useState([]);
  const { profileInfo } = useUserContext();

  useEffect(() => {
    if (profileInfo && profileInfo.userId) {
      fetchProjects();
    }
  }, [profileInfo]);

  const fetchProjects = async () => {
    if (!profileInfo || !profileInfo.userId) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');

      let response;
      if (profileInfo.role === 'MANAGER') {
        response = await ProjectService.getProjectsForManager(token);
      } else {
        response = await ProjectService.listProjects(token);
      }
      setProjects(response); // Ensure response is correctly assigned to projects
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this project?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await ProjectService.deleteProject(projectId, token);
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>Projects Management Page</h2>
      {profileInfo.role === 'ADMIN' && (
        <button className='reg-button'><Link to="/create-project">Add Project</Link></button>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Manager ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.manager}</td>
              <td>
                {profileInfo.role === 'ADMIN' && (
                  <button className='delete-button' onClick={() => deleteProject(project.id)}>Delete</button>
                )}
                <button><Link to={`/project-detail/${project.id}`}>
                  See Details
                </Link></button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ProjectManagementPage;