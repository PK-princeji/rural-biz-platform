import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/cases";

module {
  public func createCase(
    cases : Map.Map<Common.CaseId, Types.Case>,
    nextId : Nat,
    caller : Common.UserId,
    input : Types.CreateCaseInput,
    now : Common.Timestamp,
  ) : Types.Case {
    let newCase : Types.Case = {
      id = nextId;
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
    cases.add(nextId, newCase);
    newCase
  };

  public func getCase(
    cases : Map.Map<Common.CaseId, Types.Case>,
    id : Common.CaseId,
  ) : ?Types.Case {
    cases.get(id)
  };

  public func listCases(
    cases : Map.Map<Common.CaseId, Types.Case>,
  ) : [Types.Case] {
    cases.values().toArray()
  };

  public func listCasesByUser(
    cases : Map.Map<Common.CaseId, Types.Case>,
    userId : Common.UserId,
  ) : [Types.Case] {
    cases.values().filter(func(c : Types.Case) : Bool { c.userId == userId }).toArray()
  };

  public func updateCase(
    cases : Map.Map<Common.CaseId, Types.Case>,
    id : Common.CaseId,
    input : Types.UpdateCaseInput,
    now : Common.Timestamp,
  ) : ?Types.Case {
    switch (cases.get(id)) {
      case (?existing) {
        let updated : Types.Case = {
          existing with
          status = switch (input.status) { case (?s) s; case null existing.status };
          assignedExpertId = switch (input.assignedExpertId) {
            case (?eid) ?eid;
            case null existing.assignedExpertId;
          };
          adminNotes = switch (input.adminNotes) {
            case (?n) ?n;
            case null existing.adminNotes;
          };
          updatedAt = now;
        };
        cases.add(id, updated);
        ?updated
      };
      case null null;
    }
  };
};
