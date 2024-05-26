// components/ProjectManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectService from '../service/ProjectService';

function ProjectManagementPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects data when the component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await ProjectService.listProjects(token);
      setProjects(response); // Assuming the list of projects is the response itself
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      // Prompt for confirmation before deleting the project
      const confirmDelete = window.confirm('Are you sure you want to delete this project?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await ProjectService.deleteProject(projectId, token);
        // After deleting the project, fetch the updated list of projects
        fetchProjects();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="project-management-container">
      <h2>Projects Management Page</h2>
      <button className='reg-button'> <Link to="/create-project">Add Project</Link></button>
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
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.managerId}</td>
              <td>
                <button className='delete-button' onClick={() => deleteProject(project.id)}>Delete</button>
                <button><Link to={`/update-project/${project.id}`}>
                  Update
                </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectManagementPage;
