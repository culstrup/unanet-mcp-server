#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import { UnanetAuth, validateAuth } from "./auth.js";
import { 
  getProjectsTool, 
  getProjectDetailsTool,
  updateProjectBudgetTool,
  getProjectStatusTool 
} from "./tools/projects.js";
import {
  submitTimesheetTool,
  getTimesheetsTool,
  submitExpenseTool,
  approveTimesheetTool
} from "./tools/timesheet.js";
import {
  createContactTool,
  updateLeadTool,
  createOpportunityTool,
  getCompanyInfoTool
} from "./tools/contacts.js";
import {
  getBillingStatusTool,
  generateInvoiceTool,
  getFinancialReportTool
} from "./tools/financials.js";
import { projectListResource, timesheetTemplatesResource } from "./resources/reports.js";

// Load environment variables
dotenv.config();

// Server metadata
const SERVER_NAME = "unanet-mcp-server";
const SERVER_VERSION = "1.0.0";

// Initialize server
const server = new Server(
  {
    name: SERVER_NAME,
    version: SERVER_VERSION,
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Authentication configuration
const auth: UnanetAuth = {
  username: process.env.UNANET_USERNAME || "",
  password: process.env.UNANET_PASSWORD || "",
  apiKey: process.env.UNANET_API_KEY || "",
  firmCode: process.env.UNANET_FIRM_CODE || "",
  baseUrl: process.env.UNANET_BASE_URL || "https://api.unanet.com",
};

// Validate authentication on startup
try {
  validateAuth(auth);
  console.error(`[${SERVER_NAME}] Authentication configured successfully`);
} catch (error) {
  console.error(`[${SERVER_NAME}] Authentication error:`, error);
  process.exit(1);
}

// Tool definitions
const tools = [
  // Project Management Tools
  getProjectsTool,
  getProjectDetailsTool,
  updateProjectBudgetTool,
  getProjectStatusTool,
  
  // Timesheet Tools
  submitTimesheetTool,
  getTimesheetsTool,
  submitExpenseTool,
  approveTimesheetTool,
  
  // Contact Management Tools
  createContactTool,
  updateLeadTool,
  createOpportunityTool,
  getCompanyInfoTool,
  
  // Financial Tools
  getBillingStatusTool,
  generateInvoiceTool,
  getFinancialReportTool,
];

// Resource definitions
const resources = [
  projectListResource,
  timesheetTemplatesResource,
];

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.inputSchema),
    })),
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  const tool = tools.find(t => t.name === name);
  if (!tool) {
    throw new Error(`Tool not found: ${name}`);
  }
  
  try {
    // Validate input
    const validatedArgs = tool.inputSchema.parse(args);
    
    // Execute tool with authentication
    const result = await tool.handler(validatedArgs, auth);
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid arguments: ${error.errors.map(e => e.message).join(", ")}`);
    }
    throw error;
  }
});

// Handle list resources request
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: resources.map(resource => ({
      uri: resource.uri,
      name: resource.name,
      description: resource.description,
      mimeType: resource.mimeType,
    })),
  };
});

// Handle read resource request
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;
  
  const resource = resources.find(r => r.uri === uri);
  if (!resource) {
    throw new Error(`Resource not found: ${uri}`);
  }
  
  const content = await resource.handler(auth);
  
  return {
    contents: [
      {
        uri,
        mimeType: resource.mimeType,
        text: JSON.stringify(content, null, 2),
      },
    ],
  };
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[${SERVER_NAME}] Server started successfully`);
}

main().catch((error) => {
  console.error(`[${SERVER_NAME}] Fatal error:`, error);
  process.exit(1);
});