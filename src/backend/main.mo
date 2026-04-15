import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import CaseTypes "types/cases";
import ExpertTypes "types/experts";
import ResourceTypes "types/resources";
import ProfileTypes "types/profiles";
import TrainingTypes "types/trainings";
import PremiumTypes "types/premium";
import AITypes "types/ai";
import ContactTypes "types/contacts";
import CasesApi "mixins/cases-api";
import ExpertsApi "mixins/experts-api";
import ResourcesApi "mixins/resources-api";
import ProfilesApi "mixins/profiles-api";
import TrainingsApi "mixins/trainings-api";
import PremiumApi "mixins/premium-api";
import AIApi "mixins/ai-api";
import ContactsApi "mixins/contacts-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Simple admin set — first caller to grantAdmin becomes admin
  let admins = Map.empty<Principal, Bool>();

  // User profiles
  let userProfiles = Map.empty<Principal, ProfileTypes.UserProfile>();
  include ProfilesApi(admins, userProfiles);

  // Experts (declared first so it can be passed to CasesApi for counter tracking)
  let experts = Map.empty<Nat, ExpertTypes.Expert>();
  let nextExpertId = { var value : Nat = 0 };
  include ExpertsApi(admins, experts, nextExpertId);

  // Cases (service requests) — IDs start at 1
  let cases = Map.empty<Nat, CaseTypes.Case>();
  let nextCaseId = { var value : Nat = 1 };
  include CasesApi(admins, cases, nextCaseId, experts);

  // Resources & supply requests
  let resources = Map.empty<Nat, ResourceTypes.Resource>();
  let nextResourceId = { var value : Nat = 0 };
  let supplyRequests = Map.empty<Nat, ResourceTypes.SupplyRequest>();
  let nextSupplyRequestId = { var value : Nat = 0 };
  include ResourcesApi(admins, resources, nextResourceId, supplyRequests, nextSupplyRequestId);

  // Training programs & enrollments
  let trainingPrograms = Map.empty<Nat, TrainingTypes.TrainingProgram>();
  let nextTrainingId = { var value : Nat = 0 };
  let trainingEnrollments = Map.empty<Nat, TrainingTypes.TrainingEnrollment>();
  let nextEnrollmentId = { var value : Nat = 0 };
  include TrainingsApi(admins, trainingPrograms, nextTrainingId, trainingEnrollments, nextEnrollmentId);

  // Premium support requests
  let premiumRequests = Map.empty<Nat, PremiumTypes.PremiumRequest>();
  let nextPremiumId = { var value : Nat = 0 };
  include PremiumApi(admins, premiumRequests, nextPremiumId);

  // AI quiz results
  let aiResults = Map.empty<Principal, AITypes.AIQuizResult>();
  include AIApi(aiResults);

  // Contact leads — form submissions for lead capture
  let contactLeads = Map.empty<Nat, ContactTypes.ContactLead>();
  let nextContactLeadId = { var value : Nat = 0 };
  include ContactsApi(admins, contactLeads, nextContactLeadId);

  // Seed sample resources (3+ per category)
  do {
    let seedResources : [(Text, ResourceTypes.ResourceCategory, Text)] = [
      // Goat
      ("Sirohi Goat", #goat, "Hardy breed suitable for semi-arid regions, good for meat and milk production."),
      ("Barbari Goat", #goat, "Small dual-purpose breed, excellent for small farms with limited grazing land."),
      ("Beetal Goat", #goat, "Large breed from Punjab, high milk yield and good for commercial farming."),
      // Fish
      ("Rohu Fish Seed", #fish, "Popular freshwater carp species, fast-growing and high market demand."),
      ("Katla Fish Seed", #fish, "Surface feeder carp, ideal for composite fish culture in ponds."),
      ("Tilapia Seed", #fish, "Hardy and fast-growing, tolerates poor water quality, great for beginners."),
      // Poultry
      ("Giriraja Chicken", #poultry, "Dual-purpose backyard poultry breed, disease-resistant and adaptable to rural conditions."),
      ("Kadaknath Chicken", #poultry, "Black-meat breed from Madhya Pradesh, high market value and medicinal uses."),
      ("Aseel Chicken", #poultry, "Indigenous fighting breed, resilient and suitable for free-range rearing."),
      // Seeds
      ("Wheat Seeds (HD-2967)", #seeds, "High-yielding wheat variety suitable for irrigated conditions across North India."),
      ("Paddy Seeds (PR-121)", #seeds, "Short-duration paddy variety, water-efficient and resistant to blast disease."),
      ("Mustard Seeds (RH-749)", #seeds, "High oil-content mustard hybrid, ideal for Rabi season cultivation."),
    ];
    var id = 0;
    for ((name, category, description) in seedResources.vals()) {
      resources.add(id, {
        id;
        name;
        category;
        description;
        isAvailable = true;
      });
      id += 1;
    };
    nextResourceId.value := id;
  };

  // Seed 8 training programs (2 per sector)
  do {
    let now = Time.now();
    let seedPrograms : [(Text, Text, Text, CaseTypes.BusinessType)] = [
      (
        "Modern Farming Techniques",
        "Learn advanced cultivation methods, soil health management, crop rotation, and use of modern tools for higher yield.",
        "30 days",
        #agriculture,
      ),
      (
        "Organic Crop Management",
        "Master organic farming practices, natural pest control, composting, and eco-friendly inputs for sustainable income.",
        "45 days",
        #agriculture,
      ),
      (
        "Fish Culture & Pond Management",
        "Understand pond preparation, fish stocking, water quality management, feeding, and disease control for profitable fishery.",
        "21 days",
        #fishery,
      ),
      (
        "Aquaculture Business Setup",
        "Step-by-step guidance to set up a commercial aquaculture unit — financing, licensing, species selection, and marketing.",
        "35 days",
        #fishery,
      ),
      (
        "Commercial Poultry Farming",
        "Complete training on broiler and layer management, housing design, nutrition, health care, and market linkage.",
        "28 days",
        #poultry,
      ),
      (
        "Layer & Broiler Management",
        "In-depth techniques for egg production (layer) and meat production (broiler) with focus on cost reduction and profitability.",
        "42 days",
        #poultry,
      ),
      (
        "Goat Breed Selection & Care",
        "Learn to select the right goat breeds for your region, daily care routines, vaccination, and basic veterinary practices.",
        "25 days",
        #goatFarming,
      ),
      (
        "Goat Business Profitability",
        "Financial planning, market access, record keeping, and scaling strategies for a successful goat farming business.",
        "30 days",
        #goatFarming,
      ),
    ];
    var pid = 0;
    for ((title, description, duration, sector) in seedPrograms.vals()) {
      trainingPrograms.add(pid, {
        id = pid;
        title;
        description;
        duration;
        sector;
        isActive = true;
        createdAt = now;
      });
      pid += 1;
    };
    nextTrainingId.value := pid;
  };

  /// Grant admin role to a principal (only existing admins or first caller)
  public shared ({ caller }) func grantAdmin(user : Principal) : async () {
    let isFirstAdmin = admins.size() == 0;
    if (not isFirstAdmin and not (admins.get(caller) == ?true)) {
      assert false;
    };
    admins.add(user, true);
  };

  /// Check if caller is an admin
  public query ({ caller }) func checkIsAdmin() : async Bool {
    admins.get(caller) == ?true
  };
};
