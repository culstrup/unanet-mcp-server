import { z } from "zod";
import { UnanetAuth, createUnanetClient } from "../auth.js";
import { Project, ProjectDetails } from "../types/unanet.js";

// Get all projects tool
export const getProjectsTool = {
  name: "unanet_get_projects",
  description: "Get a list of all projects from Unanet",
  inputSchema: z.object({
    status: z.enum(["Active", "Inactive", "Completed", "All"]).optional().default("All"),
    limit: z.number().positive().optional().default(50),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const params: any = {
        limit: args.limit,
      };
      
      if (args.status !== "All") {
        params.status = args.status;
      }
      
      const response = await client.get<Project[]>("/projects", { params });
      
      return {
        success: true,
        count: response.data.length,
        projects: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Get project details tool
export const getProjectDetailsTool = {
  name: "unanet_get_project_details",
  description: "Get detailed information about a specific project",
  inputSchema: z.object({
    projectId: z.string().describe("The ID of the project to retrieve"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const response = await client.get<ProjectDetails>(`/projects/${args.projectId}`);
      
      return {
        success: true,
        project: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Update project budget tool
export const updateProjectBudgetTool = {
  name: "unanet_update_project_budget",
  description: "Update the budget for a specific project",
  inputSchema: z.object({
    projectId: z.string().describe("The ID of the project to update"),
    budget: z.number().positive().describe("The new budget amount"),
    notes: z.string().optional().describe("Notes about the budget change"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const response = await client.patch(`/projects/${args.projectId}`, {
        budget: args.budget,
        budgetNotes: args.notes,
      });
      
      return {
        success: true,
        message: `Budget updated successfully for project ${args.projectId}`,
        newBudget: args.budget,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Get project status tool
export const getProjectStatusTool = {
  name: "unanet_get_project_status",
  description: "Get the current status and dashboard data for a project",
  inputSchema: z.object({
    projectId: z.string().describe("The ID of the project"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const [projectResponse, metricsResponse] = await Promise.all([
        client.get<ProjectDetails>(`/projects/${args.projectId}`),
        client.get(`/projects/${args.projectId}/metrics`),
      ]);
      
      const project = projectResponse.data;
      const metrics = metricsResponse.data;
      
      return {
        success: true,
        projectId: args.projectId,
        name: project.name,
        status: project.status,
        percentComplete: project.percentComplete,
        budget: {
          total: project.budget,
          spent: project.actualCost,
          remaining: project.budget ? project.budget - (project.actualCost || 0) : null,
        },
        schedule: {
          startDate: project.startDate,
          endDate: project.endDate,
          daysRemaining: calculateDaysRemaining(project.endDate),
        },
        metrics: metrics,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Helper function
function calculateDaysRemaining(endDate?: string): number | null {
  if (!endDate) return null;
  
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}