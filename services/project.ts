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
}

export const projectService = new ProjectService();