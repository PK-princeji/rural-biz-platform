import type { Principal } from "@icp-sdk/core/principal";

// ─── Business Domain Enums ──────────────────────────────────────────────────

export type BusinessType = "Farming" | "Fishery" | "Poultry" | "GoatFarming";

export type CaseStatus = "Pending" | "InProgress" | "Completed" | "Cancelled";

export type SupplyRequestStatus =
  | "Pending"
  | "Approved"
  | "Fulfilled"
  | "Rejected";

// ─── Core Domain Types ──────────────────────────────────────────────────────

export interface Case {
  id: string;
  caseId: string;
  owner: Principal;
  businessType: BusinessType;
  description: string;
  photoUrl?: string;
  status: CaseStatus;
  assignedExpert?: string;
  nextSteps?: string;
  adminNotes?: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Expert {
  id: string;
  name: string;
  specialization: BusinessType[];
  phone?: string;
  email?: string;
  location?: string;
  bio?: string;
  isActive: boolean;
  createdAt: bigint;
}

export interface Resource {
  id: string;
  name: string;
  category: BusinessType;
  description: string;
  pricePerUnit?: string;
  unit?: string;
  imageUrl?: string;
  available: boolean;
  createdAt: bigint;
}

export interface SupplyRequest {
  id: string;
  owner: Principal;
  resourceId: string;
  quantity: number;
  notes?: string;
  status: SupplyRequestStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface UserProfile {
  principal: Principal;
  name: string;
  mobile?: string;
  location?: string;
  businessType?: BusinessType;
  createdAt: bigint;
  updatedAt: bigint;
}

// ─── Form / Input Types ──────────────────────────────────────────────────────

export interface CaseInput {
  businessType: BusinessType;
  description: string;
  photoUrl?: string;
}

export interface CaseUpdate {
  status?: CaseStatus;
  assignedExpert?: string;
  nextSteps?: string;
  adminNotes?: string;
}

export interface ExpertInput {
  name: string;
  specialization: BusinessType[];
  phone?: string;
  email?: string;
  location?: string;
  bio?: string;
}

export interface ResourceInput {
  name: string;
  category: BusinessType;
  description: string;
  pricePerUnit?: string;
  unit?: string;
  imageUrl?: string;
}

export interface SupplyRequestInput {
  resourceId: string;
  quantity: number;
  notes?: string;
}

export interface UserProfileInput {
  name: string;
  mobile?: string;
  location?: string;
  businessType?: BusinessType;
}

// ─── UI Helper Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  protected?: boolean;
  adminOnly?: boolean;
}

export interface SectorCard {
  type: BusinessType;
  label: string;
  icon: string;
  description: string;
}
