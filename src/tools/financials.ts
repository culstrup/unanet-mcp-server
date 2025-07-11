import { z } from "zod";
import { UnanetAuth, createUnanetClient } from "../auth.js";
import { Invoice, FinancialReport } from "../types/unanet.js";

// Get billing status tool
export const getBillingStatusTool = {
  name: "unanet_get_billing_status",
  description: "Get billing status and information for a project",
  inputSchema: z.object({
    projectId: z.string().describe("The ID of the project"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const response = await client.get(`/projects/${args.projectId}/billing`);
      const billingData = response.data;
      
      return {
        success: true,
        projectId: args.projectId,
        billing: {
          totalContract: billingData.totalContract,
          totalBilled: billingData.totalBilled,
          totalPaid: billingData.totalPaid,
          totalOutstanding: billingData.totalOutstanding,
          unbilledAmount: billingData.unbilledAmount,
          lastInvoiceDate: billingData.lastInvoiceDate,
          nextBillingDate: billingData.nextBillingDate,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Generate invoice tool
export const generateInvoiceTool = {
  name: "unanet_generate_invoice",
  description: "Generate an invoice for a project",
  inputSchema: z.object({
    projectId: z.string().describe("The ID of the project"),
    periodStart: z.string().describe("Start date for the invoice period (YYYY-MM-DD)"),
    periodEnd: z.string().describe("End date for the invoice period (YYYY-MM-DD)"),
    includeExpenses: z.boolean().optional().default(true),
    notes: z.string().optional(),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const invoiceRequest = {
        projectId: args.projectId,
        periodStart: args.periodStart,
        periodEnd: args.periodEnd,
        includeExpenses: args.includeExpenses,
        notes: args.notes,
      };
      
      const response = await client.post<Invoice>("/invoices/generate", invoiceRequest);
      const invoice = response.data;
      
      return {
        success: true,
        message: "Invoice generated successfully",
        invoice: {
          id: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          date: invoice.date,
          dueDate: invoice.dueDate,
          amount: invoice.amount,
          status: invoice.status,
          itemCount: invoice.lineItems.length,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Get financial report tool
export const getFinancialReportTool = {
  name: "unanet_get_financial_report",
  description: "Generate and retrieve financial reports from Unanet",
  inputSchema: z.object({
    reportType: z.enum([
      "ProjectProfitability",
      "CashFlow",
      "RevenueRecognition",
      "BudgetVsActual",
      "ARAgingSummary",
      "UtilizationReport"
    ]),
    startDate: z.string().describe("Report start date (YYYY-MM-DD)"),
    endDate: z.string().describe("Report end date (YYYY-MM-DD)"),
    projectId: z.string().optional().describe("Optional: Filter by specific project"),
    format: z.enum(["json", "summary"]).optional().default("summary"),
  }),
  handler: async (args: any, auth: UnanetAuth) => {
    const client = createUnanetClient(auth);
    
    try {
      const reportParams = {
        reportType: args.reportType,
        dateRange: {
          start: args.startDate,
          end: args.endDate,
        },
        projectId: args.projectId,
        format: args.format,
      };
      
      const response = await client.post<FinancialReport>("/reports/financial", reportParams);
      const report = response.data;
      
      if (args.format === "summary") {
        // Return a summarized version for easier reading
        return {
          success: true,
          reportType: report.reportType,
          period: `${args.startDate} to ${args.endDate}`,
          summary: extractReportSummary(report),
          generatedAt: report.generatedAt,
        };
      } else {
        // Return full report data
        return {
          success: true,
          report: report,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

// Helper function to extract summary from different report types
function extractReportSummary(report: FinancialReport): any {
  const summaryMap: { [key: string]: (data: any) => any } = {
    ProjectProfitability: (data) => ({
      totalRevenue: data.totalRevenue,
      totalCosts: data.totalCosts,
      profit: data.profit,
      profitMargin: data.profitMargin,
      topProjects: data.topProjects?.slice(0, 5),
    }),
    CashFlow: (data) => ({
      openingBalance: data.openingBalance,
      cashInflows: data.totalInflows,
      cashOutflows: data.totalOutflows,
      closingBalance: data.closingBalance,
      netCashFlow: data.netCashFlow,
    }),
    RevenueRecognition: (data) => ({
      recognizedRevenue: data.recognizedRevenue,
      deferredRevenue: data.deferredRevenue,
      totalContractValue: data.totalContractValue,
      recognitionPercentage: data.recognitionPercentage,
    }),
    BudgetVsActual: (data) => ({
      budgetedAmount: data.budget,
      actualAmount: data.actual,
      variance: data.variance,
      variancePercentage: data.variancePercentage,
    }),
    ARAgingSummary: (data) => ({
      totalOutstanding: data.totalOutstanding,
      current: data.current,
      days30: data.days30,
      days60: data.days60,
      days90: data.days90,
      over90: data.over90,
    }),
    UtilizationReport: (data) => ({
      averageUtilization: data.averageUtilization,
      billableHours: data.billableHours,
      totalHours: data.totalHours,
      topPerformers: data.topPerformers?.slice(0, 5),
    }),
  };
  
  const summaryExtractor = summaryMap[report.reportType];
  return summaryExtractor ? summaryExtractor(report.data) : report.data;
}