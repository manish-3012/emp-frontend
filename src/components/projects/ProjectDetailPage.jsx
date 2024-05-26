import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectService from '../service/ProjectService';

function ProjectDetailPage() {
    const { projectId } = useParams();
    const [projectInfo, setProjectInfo] = useState({});

    useEffect(() => {
        fetchProjectInfo();
    }, [projectId]);

    const fetchProjectInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await ProjectService.getProjectById(projectId, token);
            setProjectInfo(response);
        } catch (error) {
            console.error('Error fetching project information:', error);
        }
    };

    return (
        <div className="project-detail-page-container">
            <h2>Project Information</h2>
            <p>Project Name: {projectInfo.name}</p>
            <p>Description: {projectInfo.description}</p>
            <p>Manager ID: {projectInfo.managerId}</p>
            {(UserService.isAdmin() || UserService.isManager()) && (
                <button>
                    <Link to={`/update-project/${projectInfo.id}`}>Update This Project</Link>
                </button>
            )}
        </div>
    );
}

export default ProjectDetailPage;
