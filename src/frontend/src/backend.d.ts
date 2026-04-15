import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface TrainingProgram {
    id: TrainingId;
    title: string;
    duration: string;
    createdAt: Timestamp;
    description: string;
    sector: BusinessType;
    isActive: boolean;
}
export interface CreateCaseInput {
    businessType: BusinessType;
    description: string;
    photoUrl?: string;
}
export interface QuizAnswers {
    interest: string;
    experience: string;
    budget: string;
    location: string;
    landAvailable: string;
}
export interface CreateExpertInput {
    contactInfo: string;
    name: string;
    specialization: Specialization;
}
export interface EnrollTrainingInput {
    programId: TrainingId;
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
export interface CreateResourceInput {
    name: string;
    isAvailable: boolean;
    description: string;
    category: ResourceCategory;
}
export type TrainingId = bigint;
export interface AIQuizResult {
    reasons: Array<string>;
    createdAt: Timestamp;
    businessType: BusinessType;
    confidence: string;
}
export interface UpdateCaseInput {
    status?: CaseStatus;
    assignedExpertId?: ExpertId;
    adminNotes?: string;
}
export type PremiumRequestId = bigint;
export interface SupplyRequest {
    id: SupplyRequestId;
    status: SupplyRequestStatus;
    resourceId: ResourceId;
    userId: UserId;
    createdAt: Timestamp;
    deliveryLocation: string;
    quantity: bigint;
}
export interface CreatePremiumRequestInput {
    name: string;
    email: string;
    mobile: string;
    reason: string;
}
export type SupplyRequestId = bigint;
export interface SaveProfileInput {
    aiRecommendation?: string;
    name: string;
    businessType: BusinessType;
    mobile: string;
    location: string;
}
export type EnrollmentId = bigint;
export interface CreateTrainingInput {
    title: string;
    duration: string;
    description: string;
    sector: BusinessType;
}
export interface PremiumRequest {
    id: PremiumRequestId;
    userId: UserId;
    name: string;
    createdAt: Timestamp;
    email: string;
    isContacted: boolean;
    mobile: string;
    reason: string;
}
export interface TrainingEnrollment {
    id: EnrollmentId;
    status: EnrollmentStatus;
    userId: UserId;
    updatedAt: Timestamp;
    enrolledAt: Timestamp;
    programId: TrainingId;
}
export interface CreateSupplyRequestInput {
    resourceId: ResourceId;
    deliveryLocation: string;
    quantity: bigint;
}
export type UserId = Principal;
export type ExpertId = bigint;
export type CaseId = bigint;
export interface Resource {
    id: ResourceId;
    name: string;
    isAvailable: boolean;
    description: string;
    category: ResourceCategory;
}
export type ResourceId = bigint;
export interface UserProfile {
    id: UserId;
    aiRecommendation?: string;
    name: string;
    createdAt: Timestamp;
    businessType: BusinessType;
    mobile: string;
    location: string;
}
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
export enum CaseStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum EnrollmentStatus {
    enrolled = "enrolled",
    completed = "completed",
    ongoing = "ongoing"
}
export enum ResourceCategory {
    poultry = "poultry",
    fish = "fish",
    goat = "goat",
    seeds = "seeds"
}
export enum Specialization {
    fishery = "fishery",
    goatFarming = "goatFarming",
    poultry = "poultry",
    agriculture = "agriculture"
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
    createTrainingProgram(input: CreateTrainingInput): Promise<TrainingProgram>;
    enrollInTraining(input: EnrollTrainingInput): Promise<TrainingEnrollment>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCase(id: CaseId): Promise<Case | null>;
    getExpert(id: ExpertId): Promise<Expert | null>;
    getMyAIQuizResult(): Promise<AIQuizResult | null>;
    getMyCases(): Promise<Array<Case>>;
    getMyPremiumRequest(): Promise<PremiumRequest | null>;
    getMySupplyRequests(): Promise<Array<SupplyRequest>>;
    getMyTrainingEnrollments(): Promise<Array<TrainingEnrollment>>;
    getProgramEnrollments(programId: TrainingId): Promise<Array<TrainingEnrollment>>;
    getResource(id: ResourceId): Promise<Resource | null>;
    getSupplyRequest(id: SupplyRequestId): Promise<SupplyRequest | null>;
    getTrainingProgram(id: TrainingId): Promise<TrainingProgram | null>;
    getUserProfile(user: UserId): Promise<UserProfile | null>;
    /**
     * / Grant admin role to a principal (only existing admins or first caller)
     */
    grantAdmin(user: Principal): Promise<void>;
    listAllCases(): Promise<Array<Case>>;
    listAllSupplyRequests(): Promise<Array<SupplyRequest>>;
    listExperts(): Promise<Array<Expert>>;
    listPremiumRequests(): Promise<Array<PremiumRequest>>;
    listResources(): Promise<Array<Resource>>;
    listTrainingPrograms(): Promise<Array<TrainingProgram>>;
    listUserProfiles(): Promise<Array<UserProfile>>;
    markPremiumRequestContacted(requestId: PremiumRequestId): Promise<void>;
    saveCallerUserProfile(input: SaveProfileInput): Promise<void>;
    setExpertActive(id: ExpertId, isActive: boolean): Promise<Expert | null>;
    submitAIQuiz(answers: QuizAnswers): Promise<AIQuizResult>;
    submitCase(input: CreateCaseInput): Promise<Case>;
    submitPremiumRequest(input: CreatePremiumRequestInput): Promise<PremiumRequest>;
    submitSupplyRequest(input: CreateSupplyRequestInput): Promise<SupplyRequest>;
    toggleTrainingProgramActive(id: TrainingId): Promise<void>;
    updateCase(id: CaseId, input: UpdateCaseInput): Promise<Case | null>;
    updateSupplyRequestStatus(id: SupplyRequestId, status: SupplyRequestStatus): Promise<SupplyRequest | null>;
    updateTrainingEnrollmentStatus(enrollmentId: EnrollmentId, status: EnrollmentStatus): Promise<void>;
}
