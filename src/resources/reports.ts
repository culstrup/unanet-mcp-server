import { UnanetAuth, createUnanetClient } from "../auth.js";
import { Project, Timesheet } from "../types/unanet.js";

// Project list resource
export const projectListResource = {
  uri: "unanet://projects/active",
  name: "Active Projects",
  description: "List of all active projects in Unanet",
  mimeType: "application/json",
  handler: async (auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const response = await client.get<Project[]>("/projects", {
        params: {
          status: "Active",
          limit: 100,
        },
      });
      
      return {
        projects: response.data.map(project => ({
          id: project.id,
          name: project.name,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
          budget: project.budget,
          percentComplete: project.percentComplete,
          projectManager: project.projectManager,
        })),
        count: response.data.length,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        error: error.message,
        projects: [],
        count: 0,
      };
    }
  },
};

// Timesheet templates resource
export const timesheetTemplatesResource = {
  uri: "unanet://timesheets/templates",
  name: "Timesheet Templates",
  description: "Common timesheet entry templates and recent entries",
  mimeType: "application/json",
  handler: async (auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      // Get recent timesheet entries to use as templates
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Last 30 days
      
      const response = await client.get<Timesheet[]>("/timesheets", {
        params: {
          periodStart: startDate.toISOString().split("T")[0],
          periodEnd: endDate.toISOString().split("T")[0],
          limit: 5,
        },
      });
      
      // Extract unique project/task combinations
      const templates = new Map();
      
      response.data.forEach(timesheet => {
        timesheet.entries.forEach(entry => {
          const key = `${entry.projectId}-${entry.taskId || "default"}`;
          if (!templates.has(key)) {
            templates.set(key, {
              projectId: entry.projectId,
              taskId: entry.taskId,
              description: entry.description,
              billable: entry.billable,
            });
          }
        });
      });
      
      return {
        templates: Array.from(templates.values()),
        commonCategories: [
          { name: "Development", billable: true },
          { name: "Meeting", billable: true },
          { name: "Code Review", billable: true },
          { name: "Documentation", billable: true },
          { name: "Training", billable: false },
          { name: "Administrative", billable: false },
        ],
        lastUpdated: new Date().toISOString(),
      };
    } catch (error: any) {
      return {
        error: error.message,
        templates: [],
        commonCategories: [],
      };
    }
  },
};