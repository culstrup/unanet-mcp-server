import { z } from "zod";
import { UnanetAuth, createUnanetClient } from "../auth.js";
import { Contact, Lead, Opportunity, Company } from "../types/unanet.js";

// Create contact tool
export const createContactTool = {
  name: "unanet_create_contact",
  description: "Create a new contact in Unanet",
  inputSchema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    notes: z.string().optional(),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const contactData: Contact = {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        phone: args.phone,
        company: args.company,
        title: args.title,
        notes: args.notes,
      };
      
      const response = await client.post<Contact>("/contacts", contactData);
      
      return {
        success: true,
        message: "Contact created successfully",
        contactId: response.data.id,
        contact: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Update lead tool
export const updateLeadTool = {
  name: "unanet_update_lead",
  description: "Update lead information in Unanet",
  inputSchema: z.object({
    leadId: z.string(),
    status: z.enum(["New", "Qualified", "Proposal", "Won", "Lost"]).optional(),
    value: z.number().optional(),
    probability: z.number().min(0).max(100).optional(),
    notes: z.string().optional(),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const updateData: Partial<Lead> = {};
      
      if (args.status) updateData.status = args.status;
      if (args.value !== undefined) updateData.value = args.value;
      if (args.probability !== undefined) updateData.probability = args.probability;
      if (args.notes) updateData.notes = args.notes;
      
      const response = await client.put(`/leads/${args.leadId}`, updateData);
      
      return {
        success: true,
        message: `Lead ${args.leadId} updated successfully`,
        lead: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Create opportunity tool
export const createOpportunityTool = {
  name: "unanet_create_opportunity",
  description: "Create a new opportunity in Unanet",
  inputSchema: z.object({
    name: z.string(),
    description: z.string().optional(),
    value: z.number().positive(),
    probability: z.number().min(0).max(100),
    stage: z.string(),
    closeDate: z.string().describe("Expected close date in YYYY-MM-DD format"),
    contactId: z.string().optional(),
    notes: z.string().optional(),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const opportunityData: Opportunity = {
        name: args.name,
        description: args.description,
        value: args.value,
        probability: args.probability,
        stage: args.stage,
        closeDate: args.closeDate,
        contactId: args.contactId,
        notes: args.notes,
      };
      
      const response = await client.post<Opportunity>("/opportunities", opportunityData);
      
      return {
        success: true,
        message: "Opportunity created successfully",
        opportunityId: response.data.id,
        opportunity: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Get company info tool
export const getCompanyInfoTool = {
  name: "unanet_get_company_info",
  description: "Get detailed information about a company",
  inputSchema: z.object({
    companyId: z.string().describe("The ID of the company"),
    includeContacts: z.boolean().optional().default(false),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const params: any = {};
      if (args.includeContacts) {
        params.include = "contacts";
      }
      
      const response = await client.get<Company>(`/companies/${args.companyId}`, { params });
      
      return {
        success: true,
        company: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};