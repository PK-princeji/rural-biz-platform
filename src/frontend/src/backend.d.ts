import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SaveProfileInput {
    name: string;
    businessType: BusinessType;
    mobile: string;
    location: string;
}
export type Timestamp = bigint;
export interface Case {
    id: CaseId;
    status: CaseStatus;
    userId: UserId;
    createdAt: Timestamp;
    businessType: BusinessType;
    description: string;
    photoUrl?: string;
    updatedAt: Timestamp;
    assignedExpertId?: ExpertId;
    adminNotes?: string;
}
export interface CreateCaseInput {
    businessType: BusinessType;
    description: string;
    photoUrl?: string;
}
export interface CreateExpertInput {
    contactInfo: string;
    name: string;
    specialization: Specialization;
}
export interface CreateResourceInput {
    name: string;
    isAvailable: boolean;
    description: string;
    category: ResourceCategory;
}
export interface Expert {
    id: ExpertId;
    contactInfo: string;
    assignedCasesCount: bigint;
    name: string;
    createdAt: Timestamp;
    isActive: boolean;
    specialization: Specialization;
}
export interface CreateSupplyRequestInput {
    resourceId: ResourceId;
    deliveryLocation: string;
    quantity: bigint;
}
export type UserId = Principal;
export interface UpdateCaseInput {
    status?: CaseStatus;
    assignedExpertId?: ExpertId;
    adminNotes?: string;
}
export type ExpertId = bigint;
export type CaseId = bigint;
export interface Resource {
    id: ResourceId;
    name: string;
    isAvailable: boolean;
    description: string;
    category: ResourceCategory;
}
export interface SupplyRequest {
    id: SupplyRequestId;
    status: SupplyRequestStatus;
    resourceId: ResourceId;
    userId: UserId;
    createdAt: Timestamp;
    deliveryLocation: string;
    quantity: bigint;
}
export type ResourceId = bigint;
export type SupplyRequestId = bigint;
export interface UserProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    businessType: BusinessType;
    mobile: string;
    location: string;
}
export enum BusinessType {
    fishery = "fishery",
    goatFarming = "goatFarming",
    poultry = "poultry",
    agriculture = "agriculture"
}
export enum CaseStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum ResourceCategory {
    poultry = "poultry",
    fish = "fish",
    goat = "goat",
    seeds = "seeds"
}
export enum SupplyRequestStatus {
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    processing = "processing"
}
export interface backendInterface {
    addExpert(input: CreateExpertInput): Promise<Expert>;
    addResource(input: CreateResourceInput): Promise<Resource>;
    /**
     * / Check if caller is an admin
     */
    checkIsAdmin(): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCase(id: CaseId): Promise<Case | null>;
    getExpert(id: ExpertId): Promise<Expert | null>;
    getMyCases(): Promise<Array<Case>>;
    getMySupplyRequests(): Promise<Array<SupplyRequest>>;
    getResource(id: ResourceId): Promise<Resource | null>;
    getSupplyRequest(id: SupplyRequestId): Promise<SupplyRequest | null>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    /**
     * / Grant admin role to a principal (only existing admins or first caller)
     */
    grantAdmin(user: Principal): Promise<void>;
    listAllCases(): Promise<Array<Case>>;
    listAllSupplyRequests(): Promise<Array<SupplyRequest>>;
    listExperts(): Promise<Array<Expert>>;
    listResources(): Promise<Array<Resource>>;
    listUserProfiles(): Promise<Array<UserProfile>>;
    saveCallerUserProfile(input: SaveProfileInput): Promise<void>;
    setExpertActive(id: ExpertId, isActive: boolean): Promise<Expert | null>;
    submitCase(input: CreateCaseInput): Promise<Case>;
    submitSupplyRequest(input: CreateSupplyRequestInput): Promise<SupplyRequest>;
    updateCase(id: CaseId, input: UpdateCaseInput): Promise<Case | null>;
    updateSupplyRequestStatus(id: SupplyRequestId, status: SupplyRequestStatus): Promise<SupplyRequest | null>;
}
