import { z } from "zod";
import { UnanetAuth, createUnanetClient } from "../auth.js";
import { Timesheet, TimesheetEntry, Expense } from "../types/unanet.js";

// Submit timesheet tool
export const submitTimesheetTool = {
  name: "unanet_submit_timesheet",
  description: "Submit time entries to Unanet",
  inputSchema: z.object({
    entries: z.array(z.object({
      projectId: z.string(),
      taskId: z.string().optional(),
      date: z.string().describe("Date in YYYY-MM-DD format"),
      hours: z.number().positive(),
      description: z.string().optional(),
      billable: z.boolean().default(true),
    })),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const timesheetData = {
        entries: args.entries,
        status: "Draft",
      };
      
      const response = await client.post<Timesheet>("/timesheets", timesheetData);
      
      return {
        success: true,
        message: "Timesheet entries submitted successfully",
        timesheetId: response.data.id,
        totalHours: response.data.totalHours,
        totalBillableHours: response.data.totalBillableHours,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Get timesheets tool
export const getTimesheetsTool = {
  name: "unanet_get_timesheets",
  description: "Retrieve timesheets for a date range",
  inputSchema: z.object({
    startDate: z.string().describe("Start date in YYYY-MM-DD format"),
    endDate: z.string().describe("End date in YYYY-MM-DD format"),
    status: z.enum(["Draft", "Submitted", "Approved", "Rejected", "All"]).optional().default("All"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const params: any = {
        periodStart: args.startDate,
        periodEnd: args.endDate,
      };
      
      if (args.status !== "All") {
        params.status = args.status;
      }
      
      const response = await client.get<Timesheet[]>("/timesheets", { params });
      
      return {
        success: true,
        count: response.data.length,
        timesheets: response.data.map(ts => ({
          id: ts.id,
          period: `${ts.periodStart} to ${ts.periodEnd}`,
          status: ts.status,
          totalHours: ts.totalHours,
          totalBillableHours: ts.totalBillableHours,
          entries: ts.entries.length,
        })),
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Submit expense tool
export const submitExpenseTool = {
  name: "unanet_submit_expense",
  description: "Submit an expense report to Unanet",
  inputSchema: z.object({
    projectId: z.string(),
    date: z.string().describe("Date in YYYY-MM-DD format"),
    category: z.string().describe("Expense category (e.g., Travel, Meals, Supplies)"),
    amount: z.number().positive(),
    description: z.string(),
    reimbursable: z.boolean().default(true),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const expenseData: Expense = {
        projectId: args.projectId,
        date: args.date,
        category: args.category,
        amount: args.amount,
        description: args.description,
        reimbursable: args.reimbursable,
      };
      
      const response = await client.post("/expenses", expenseData);
      
      return {
        success: true,
        message: "Expense submitted successfully",
        expenseId: response.data.id,
        amount: args.amount,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Approve timesheet tool
export const approveTimesheetTool = {
  name: "unanet_approve_timesheet",
  description: "Approve a submitted timesheet",
  inputSchema: z.object({
    timesheetId: z.string().describe("The ID of the timesheet to approve"),
    comments: z.string().optional().describe("Approval comments"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const response = await client.post(`/timesheets/${args.timesheetId}/approve`, {
        comments: args.comments,
      });
      
      return {
        success: true,
        message: `Timesheet ${args.timesheetId} approved successfully`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};