import type { backendInterface, BusinessType, CaseStatus, ResourceCategory, SupplyRequestStatus } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toString: () => "aaaa-bbbb-cccc-dddd" } as Principal;

export const mockBackend: backendInterface = {
  addExpert: async (input) => ({
    id: BigInt(1),
    name: input.name,
    contactInfo: input.contactInfo,
    specialization: input.specialization,
    assignedCasesCount: BigInt(0),
    isActive: true,
    createdAt: BigInt(Date.now()),
  }),

  addResource: async (input) => ({
    id: BigInt(0),
    name: input.name,
    description: input.description,
    category: input.category,
    isAvailable: input.isAvailable,
  }),

  checkIsAdmin: async () => true,

  getCallerUserProfile: async () => ({
    id: mockPrincipal,
    name: "Ramesh Kumar",
    mobile: "9876543210",
    location: "Jaipur, Rajasthan",
    businessType: "agriculture" as unknown as BusinessType,
    createdAt: BigInt(Date.now()),
  }),

  getCase: async () => ({
    id: BigInt(1),
    userId: mockPrincipal,
    businessType: "agriculture" as unknown as BusinessType,
    description: "Need help with crop disease identification",
    status: "pending" as unknown as CaseStatus,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  }),

  getExpert: async () => ({
    id: BigInt(1),
    name: "Dr. Suresh Patel",
    contactInfo: "9876543211",
    specialization: "agriculture" as any,
    assignedCasesCount: BigInt(3),
    isActive: true,
    createdAt: BigInt(Date.now()),
  }),

  getMyCases: async () => [
    {
      id: BigInt(1001),
      userId: mockPrincipal,
      businessType: "agriculture" as unknown as BusinessType,
      description: "Crop disease in wheat fields — need expert advice urgently.",
      status: "pending" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 86400000),
      updatedAt: BigInt(Date.now() - 86400000),
    },
    {
      id: BigInt(1002),
      userId: mockPrincipal,
      businessType: "poultry" as unknown as BusinessType,
      description: "Poultry vaccination schedule help needed.",
      status: "inProgress" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 172800000),
      updatedAt: BigInt(Date.now() - 43200000),
      assignedExpertId: BigInt(1),
    },
    {
      id: BigInt(1003),
      userId: mockPrincipal,
      businessType: "fishery" as unknown as BusinessType,
      description: "Fish pond water quality management.",
      status: "completed" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 259200000),
      updatedAt: BigInt(Date.now() - 86400000),
    },
  ],

  getMySupplyRequests: async () => [
    {
      id: BigInt(1),
      resourceId: BigInt(0),
      userId: mockPrincipal,
      quantity: BigInt(5),
      deliveryLocation: "Jaipur, Rajasthan",
      status: "pending" as unknown as SupplyRequestStatus,
      createdAt: BigInt(Date.now()),
    },
  ],

  getResource: async () => ({
    id: BigInt(0),
    name: "Sirohi Goat",
    description: "Hardy breed suitable for semi-arid regions, good for meat and milk production.",
    category: "goat" as unknown as ResourceCategory,
    isAvailable: true,
  }),

  getSupplyRequest: async () => ({
    id: BigInt(1),
    resourceId: BigInt(0),
    userId: mockPrincipal,
    quantity: BigInt(5),
    deliveryLocation: "Jaipur, Rajasthan",
    status: "pending" as unknown as SupplyRequestStatus,
    createdAt: BigInt(Date.now()),
  }),

  getUserProfile: async () => ({
    id: mockPrincipal,
    name: "Ramesh Kumar",
    mobile: "9876543210",
    location: "Jaipur, Rajasthan",
    businessType: "agriculture" as unknown as BusinessType,
    createdAt: BigInt(Date.now()),
  }),

  grantAdmin: async () => undefined,

  listAllCases: async () => [
    {
      id: BigInt(1001),
      userId: mockPrincipal,
      businessType: "agriculture" as unknown as BusinessType,
      description: "Crop disease in wheat fields — need expert advice urgently.",
      status: "pending" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 86400000),
      updatedAt: BigInt(Date.now() - 86400000),
    },
    {
      id: BigInt(1002),
      userId: { toString: () => "xxxx-yyyy-zzzz" } as Principal,
      businessType: "poultry" as unknown as BusinessType,
      description: "Poultry vaccination schedule query.",
      status: "inProgress" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 172800000),
      updatedAt: BigInt(Date.now() - 43200000),
      assignedExpertId: BigInt(1),
    },
    {
      id: BigInt(1003),
      userId: { toString: () => "pppp-qqqq-rrrr" } as Principal,
      businessType: "fishery" as unknown as BusinessType,
      description: "Fish pond water quality management.",
      status: "completed" as unknown as CaseStatus,
      createdAt: BigInt(Date.now() - 259200000),
      updatedAt: BigInt(Date.now() - 86400000),
    },
  ],

  listAllSupplyRequests: async () => [
    {
      id: BigInt(1),
      resourceId: BigInt(0),
      userId: mockPrincipal,
      quantity: BigInt(5),
      deliveryLocation: "Jaipur, Rajasthan",
      status: "pending" as unknown as SupplyRequestStatus,
      createdAt: BigInt(Date.now()),
    },
  ],

  listExperts: async () => [
    {
      id: BigInt(1),
      name: "Dr. Suresh Patel",
      contactInfo: "9876543211",
      specialization: "agriculture" as any,
      assignedCasesCount: BigInt(3),
      isActive: true,
      createdAt: BigInt(Date.now()),
    },
    {
      id: BigInt(2),
      name: "Ms. Priya Sharma",
      contactInfo: "9876543212",
      specialization: "fishery" as any,
      assignedCasesCount: BigInt(1),
      isActive: true,
      createdAt: BigInt(Date.now()),
    },
  ],

  listResources: async () => [
    {
      id: BigInt(0),
      name: "Sirohi Goat",
      description: "Hardy breed suitable for semi-arid regions, good for meat and milk production.",
      category: "goat" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(1),
      name: "Barbari Goat",
      description: "Small dual-purpose breed, excellent for small farms with limited grazing land.",
      category: "goat" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(3),
      name: "Rohu Fish Seed",
      description: "Popular freshwater carp species, fast-growing and high market demand.",
      category: "fish" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(4),
      name: "Katla Fish Seed",
      description: "Surface feeder carp, ideal for composite fish culture in ponds.",
      category: "fish" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(6),
      name: "Giriraja Chicken",
      description: "Dual-purpose backyard poultry breed, disease-resistant and adaptable to rural conditions.",
      category: "poultry" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(9),
      name: "Wheat Seeds (HD-2967)",
      description: "High-yielding wheat variety suitable for irrigated conditions across North India.",
      category: "seeds" as unknown as ResourceCategory,
      isAvailable: true,
    },
    {
      id: BigInt(10),
      name: "Paddy Seeds (PR-121)",
      description: "Short-duration paddy variety, water-efficient and resistant to blast disease.",
      category: "seeds" as unknown as ResourceCategory,
      isAvailable: true,
    },
  ],

  listUserProfiles: async () => [
    {
      id: mockPrincipal,
      name: "Ramesh Kumar",
      mobile: "9876543210",
      location: "Jaipur, Rajasthan",
      businessType: "agriculture" as unknown as BusinessType,
      createdAt: BigInt(Date.now()),
    },
  ],

  saveCallerUserProfile: async () => undefined,

  setExpertActive: async () => ({
    id: BigInt(1),
    name: "Dr. Suresh Patel",
    contactInfo: "9876543211",
    specialization: "agriculture" as any,
    assignedCasesCount: BigInt(3),
    isActive: false,
    createdAt: BigInt(Date.now()),
  }),

  submitCase: async (input) => ({
    id: BigInt(1004),
    userId: mockPrincipal,
    businessType: input.businessType,
    description: input.description,
    photoUrl: input.photoUrl,
    status: "pending" as unknown as CaseStatus,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  }),

  submitSupplyRequest: async (input) => ({
    id: BigInt(2),
    resourceId: input.resourceId,
    userId: mockPrincipal,
    quantity: input.quantity,
    deliveryLocation: input.deliveryLocation,
    status: "pending" as unknown as SupplyRequestStatus,
    createdAt: BigInt(Date.now()),
  }),

  updateCase: async () => ({
    id: BigInt(1001),
    userId: mockPrincipal,
    businessType: "agriculture" as unknown as BusinessType,
    description: "Crop disease in wheat fields.",
    status: "inProgress" as unknown as CaseStatus,
    createdAt: BigInt(Date.now() - 86400000),
    updatedAt: BigInt(Date.now()),
  }),

  updateSupplyRequestStatus: async () => ({
    id: BigInt(1),
    resourceId: BigInt(0),
    userId: mockPrincipal,
    quantity: BigInt(5),
    deliveryLocation: "Jaipur, Rajasthan",
    status: "processing" as unknown as SupplyRequestStatus,
    createdAt: BigInt(Date.now()),
  }),
};
