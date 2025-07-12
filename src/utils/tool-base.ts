import { z } from "zod";
import { UnanetAuth } from "../auth.js";

// Base type for all tool responses
export interface ToolResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
  [key: string]: any; // Allow additional properties
}

// Tool definition interface
export interface ToolDefinition<TSchema extends z.ZodSchema = z.ZodSchema> {
  name: string;
  description: string;
  inputSchema: TSchema;
  handler: (args: z.infer<TSchema>, auth: UnanetAuth) => Promise<ToolResponse>;
}

// Helper to create type-safe tools
export function createTool<TSchema extends z.ZodSchema>(
  definition: ToolDefinition<TSchema>
): ToolDefinition<TSchema> {
  return definition;
}