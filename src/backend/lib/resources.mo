import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/resources";

module {
  public func createResource(
    resources : Map.Map<Common.ResourceId, Types.Resource>,
    nextId : Nat,
    input : Types.CreateResourceInput,
  ) : Types.Resource {
    let resource : Types.Resource = {
      id = nextId;
      name = input.name;
      category = input.category;
      description = input.description;
      isAvailable = input.isAvailable;
    };
    resources.add(nextId, resource);
    resource
  };

  public func getResource(
    resources : Map.Map<Common.ResourceId, Types.Resource>,
    id : Common.ResourceId,
  ) : ?Types.Resource {
    resources.get(id)
  };

  public func listResources(
    resources : Map.Map<Common.ResourceId, Types.Resource>,
  ) : [Types.Resource] {
    resources.values().toArray()
  };

  public func createSupplyRequest(
    requests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
    nextId : Nat,
    caller : Common.UserId,
    input : Types.CreateSupplyRequestInput,
    now : Common.Timestamp,
  ) : Types.SupplyRequest {
    let req : Types.SupplyRequest = {
      id = nextId;
      userId = caller;
      resourceId = input.resourceId;
      quantity = input.quantity;
      deliveryLocation = input.deliveryLocation;
      status = #pending;
      createdAt = now;
    };
    requests.add(nextId, req);
    req
  };

  public func getSupplyRequest(
    requests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
    id : Common.SupplyRequestId,
  ) : ?Types.SupplyRequest {
    requests.get(id)
  };

  public func listSupplyRequests(
    requests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
  ) : [Types.SupplyRequest] {
    requests.values().toArray()
  };

  public func listSupplyRequestsByUser(
    requests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
    userId : Common.UserId,
  ) : [Types.SupplyRequest] {
    requests.values().filter(func(r : Types.SupplyRequest) : Bool { r.userId == userId }).toArray()
  };

  public func updateSupplyRequestStatus(
    requests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
    id : Common.SupplyRequestId,
    status : Types.SupplyRequestStatus,
  ) : ?Types.SupplyRequest {
    switch (requests.get(id)) {
      case (?existing) {
        let updated : Types.SupplyRequest = { existing with status };
        requests.add(id, updated);
        ?updated
      };
      case null null;
    }
  };
};
