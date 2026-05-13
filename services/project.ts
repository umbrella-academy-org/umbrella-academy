import { Project } from "@/types";
import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";

class ProjectService {
  
    async getProjectData(projectId: string) {
        const response= apiClient.get<Project>(API_ENDPOINTS.PROJECT_BY_ID(projectId));
        return response;
    }

    async getAllProjects() {
        const response = apiClient.get<Project[]>(API_ENDPOINTS.PROJECT);
        return response;
    }

    async approveProject(projectId: string, trainerFeedback?: string) {
        const response = await apiClient.post<Project>(API_ENDPOINTS.PROJECT_APPROVE(projectId), { trainerFeedback });
        return response;
    }

    async rejectProject(projectId: string, trainerFeedback?: string) {
        const response = await apiClient.post<Project>(API_ENDPOINTS.PROJECT_REJECT(projectId), { trainerFeedback });
        return response;
    }
}

export const projectService = new ProjectService();