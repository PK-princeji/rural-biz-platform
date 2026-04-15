import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/experts";

module {
  public func createExpert(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
    nextId : Nat,
    input : Types.CreateExpertInput,
    now : Common.Timestamp,
  ) : Types.Expert {
    let expert : Types.Expert = {
      id = nextId;
      name = input.name;
      specialization = input.specialization;
      contactInfo = input.contactInfo;
      isActive = true;
      assignedCasesCount = 0;
      createdAt = now;
    };
    experts.add(nextId, expert);
    expert
  };

  public func getExpert(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
    id : Common.ExpertId,
  ) : ?Types.Expert {
    experts.get(id)
  };

  public func listExperts(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
  ) : [Types.Expert] {
    experts.values().toArray()
  };

  public func setExpertActive(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
    id : Common.ExpertId,
    isActive : Bool,
  ) : ?Types.Expert {
    switch (experts.get(id)) {
      case (?e) {
        let updated : Types.Expert = { e with isActive };
        experts.add(id, updated);
        ?updated
      };
      case null null;
    }
  };

  public func incrementAssignedCases(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
    id : Common.ExpertId,
  ) {
    switch (experts.get(id)) {
      case (?e) {
        experts.add(id, { e with assignedCasesCount = e.assignedCasesCount + 1 });
      };
      case null {};
    }
  };

  public func decrementAssignedCases(
    experts : Map.Map<Common.ExpertId, Types.Expert>,
    id : Common.ExpertId,
  ) {
    switch (experts.get(id)) {
      case (?e) {
        let count = if (e.assignedCasesCount > 0) e.assignedCasesCount - 1 else 0;
        experts.add(id, { e with assignedCasesCount = count });
      };
      case null {};
    }
  };
};
