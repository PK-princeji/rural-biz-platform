import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/cases";
import ExpertTypes "../types/experts";

mixin (
  admins : Map.Map<Principal, Bool>,
  cases : Map.Map<Common.CaseId, Types.Case>,
  nextCaseId : { var value : Nat },
  experts : Map.Map<Common.ExpertId, ExpertTypes.Expert>,
) {
  func casesIsAdmin(caller : Principal) : Bool {
    admins.get(caller) == ?true
  };

  /// Submit a new service request (users)
  public shared ({ caller }) func submitCase(input : Types.CreateCaseInput) : async Types.Case {
    let id = nextCaseId.value;
    nextCaseId.value += 1;
    let now = Time.now();
    let newCase : Types.Case = {
      id;
      userId = caller;
      businessType = input.businessType;
      description = input.description;
      photoUrl = input.photoUrl;
      status = #pending;
      assignedExpertId = null;
      adminNotes = null;
      createdAt = now;
      updatedAt = now;
    };
    cases.add(id, newCase);
    newCase
  };

  /// Get a specific case by ID
  public query ({ caller }) func getCase(id : Common.CaseId) : async ?Types.Case {
    switch (cases.get(id)) {
      case (?c) {
        if (c.userId == caller or casesIsAdmin(caller)) { ?c } else { null }
      };
      case null null;
    }
  };

  /// List all cases for the calling user
  public query ({ caller }) func getMyCases() : async [Types.Case] {
    cases.values().filter(func(c : Types.Case) : Bool { c.userId == caller }).toArray()
  };

  /// List all cases (admin only)
  public query ({ caller }) func listAllCases() : async [Types.Case] {
    if (not casesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    cases.values().toArray()
  };

  /// Update case status, assigned expert, or notes (admin only).
  /// Adjusts expert assigned-cases counter when the assigned expert changes.
  public shared ({ caller }) func updateCase(id : Common.CaseId, input : Types.UpdateCaseInput) : async ?Types.Case {
    if (not casesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    switch (cases.get(id)) {
      case (?existing) {
        // Compute new assignedExpertId
        let newExpertId : ?Common.ExpertId = switch (input.assignedExpertId) {
          case (?eid) ?eid;
          case null existing.assignedExpertId;
        };
        // Update expert counters when assignment changes
        if (existing.assignedExpertId != newExpertId) {
          // Decrement previous expert
          switch (existing.assignedExpertId) {
            case (?oldId) {
              switch (experts.get(oldId)) {
                case (?e) {
                  let cnt = if (e.assignedCasesCount > 0) e.assignedCasesCount - 1 else 0;
                  experts.add(oldId, { e with assignedCasesCount = cnt });
                };
                case null {};
              };
            };
            case null {};
          };
          // Increment new expert
          switch (newExpertId) {
            case (?newId) {
              switch (experts.get(newId)) {
                case (?e) {
                  experts.add(newId, { e with assignedCasesCount = e.assignedCasesCount + 1 });
                };
                case null {};
              };
            };
            case null {};
          };
        };
        let updated : Types.Case = {
          existing with
          status = switch (input.status) { case (?s) s; case null existing.status };
          assignedExpertId = newExpertId;
          adminNotes = switch (input.adminNotes) {
            case (?n) ?n;
            case null existing.adminNotes;
          };
          updatedAt = Time.now();
        };
        cases.add(id, updated);
        ?updated
      };
      case null null;
    }
  };
};
