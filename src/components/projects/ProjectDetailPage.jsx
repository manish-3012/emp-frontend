import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProjectService from '../service/ProjectService';
import { useUserContext } from '../auth/UserContext';

function ProjectDetailPage() {
    const { projectId } = useParams();
    const { profileInfo } = useUserContext();  // Get profileInfo from context
    const [projectInfo, setProjectInfo] = useState({
        name: '',
        description: '',
        manager: '',
        skills: [] // Initialize skills as an empty array
    });

    useEffect(() => {
        fetchProjectInfo(projectId);
    }, [projectId]);

    const fetchProjectInfo = async (projectId) => {
        try {
            const token = localStorage.getItem('token');
            let response;
            console.log("ProfileInfo: ", profileInfo);
            console.log("Fetching projectInfo");
            if (profileInfo.role === 'ADMIN') {
                // For admin, use the regular getProjectById method
                response = await ProjectService.getProjectById(projectId, token);
            } else if (profileInfo.role === 'MANAGER' || profileInfo.role === 'EMPLOYEE') {
                // For manager or user, use the getProjectByIdForManagerUser method
                response = await ProjectService.getProjectByIdForManagerUser(projectId, token);
            }
            console.log("projectInfo:", response);
            setProjectInfo(response);
        } catch (error) {
            console.error('Error fetching project information:', error);
        }
    };
    

    return (
        <div className="profile-page-container">
            <h2>Project Information</h2>
            <p>Project Name: {projectInfo.name}</p>
            <p>Description: {projectInfo.description}</p>
            <p>Manager ID: {projectInfo.manager}</p>
            <p>Skills: {projectInfo.skills && projectInfo.skills.length > 0 ? projectInfo.skills.join(', ') : 'No skills listed'}</p>
            {(profileInfo.role === "ADMIN" || profileInfo.role === "MANAGER") && (
                <button>
                    <Link to={`/update-project/${projectInfo.id}`}>Update This Project</Link>
                </button>
            )}
        </div>
    );
}

export default ProjectDetailPage;
