// Unanet API Types

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "Active" | "Inactive" | "Completed";
  startDate: string;
  endDate?: string;
  budget?: number;
  actualCost?: number;
  percentComplete?: number;
  projectManager?: string;
  client?: string;
}

export interface ProjectDetails extends Project {
  tasks: Task[];
  team: TeamMember[];
  milestones: Milestone[];
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  assignedTo?: string;
  startDate: string;
  endDate: string;
  hoursEstimated: number;
  hoursActual: number;
  status: "Not Started" | "In Progress" | "Completed";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  allocation: number; // percentage
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: "Pending" | "Completed";
  value?: number;
}

export interface TimesheetEntry {
  projectId: string;
  taskId?: string;
  date: string;
  hours: number;
  description?: string;
  billable: boolean;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  periodStart: string;
  periodEnd: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  entries: TimesheetEntry[];
  totalHours: number;
  totalBillableHours: number;
}

export interface Expense {
  id?: string;
  projectId: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receipt?: string; // base64 encoded
  reimbursable: boolean;
}

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  contactId: string;
  status: "New" | "Qualified" | "Proposal" | "Won" | "Lost";
  value?: number;
  probability?: number;
  notes?: string;
}

export interface Opportunity {
  id?: string;
  name: string;
  description?: string;
  value: number;
  probability: number;
  stage: string;
  closeDate: string;
  contactId?: string;
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  revenue?: number;
  contacts?: Contact[];
}

export interface Invoice {
  id: string;
  projectId: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "Draft" | "Sent" | "Paid" | "Overdue";
  lineItems: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface FinancialReport {
  reportType: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any; // Flexible structure for different report types
  generatedAt: string;
}