import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/experts";

mixin (
  admins : Map.Map<Principal, Bool>,
  experts : Map.Map<Common.ExpertId, Types.Expert>,
  nextExpertId : { var value : Nat },
) {
  func expertsIsAdmin(caller : Principal) : Bool {
    admins.get(caller) == ?true
  };

  /// Add a new expert (admin only)
  public shared ({ caller }) func addExpert(input : Types.CreateExpertInput) : async Types.Expert {
    if (not expertsIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    let id = nextExpertId.value;
    nextExpertId.value += 1;
    let expert : Types.Expert = {
      id;
      name = input.name;
      specialization = input.specialization;
      contactInfo = input.contactInfo;
      isActive = true;
      assignedCasesCount = 0;
      createdAt = Time.now();
    };
    experts.add(id, expert);
    expert
  };

  /// Get a specific expert by ID
  public query func getExpert(id : Common.ExpertId) : async ?Types.Expert {
    experts.get(id)
  };

  /// List all experts
  public query func listExperts() : async [Types.Expert] {
    experts.values().toArray()
  };

  /// Activate or deactivate an expert (admin only)
  public shared ({ caller }) func setExpertActive(id : Common.ExpertId, isActive : Bool) : async ?Types.Expert {
    if (not expertsIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    switch (experts.get(id)) {
      case (?e) {
        let updated : Types.Expert = { e with isActive };
        experts.add(id, updated);
        ?updated
      };
      case null null;
    }
  };
};
