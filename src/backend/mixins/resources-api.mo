import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/resources";

mixin (
  admins : Map.Map<Principal, Bool>,
  resources : Map.Map<Common.ResourceId, Types.Resource>,
  nextResourceId : { var value : Nat },
  supplyRequests : Map.Map<Common.SupplyRequestId, Types.SupplyRequest>,
  nextSupplyRequestId : { var value : Nat },
) {
  func resourcesIsAdmin(caller : Principal) : Bool {
    admins.get(caller) == ?true
  };

  /// Add a new resource to the catalog (admin only)
  public shared ({ caller }) func addResource(input : Types.CreateResourceInput) : async Types.Resource {
    if (not resourcesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    let id = nextResourceId.value;
    nextResourceId.value += 1;
    let resource : Types.Resource = {
      id;
      name = input.name;
      category = input.category;
      description = input.description;
      isAvailable = input.isAvailable;
    };
    resources.add(id, resource);
    resource
  };

  /// Get a specific resource by ID
  public query func getResource(id : Common.ResourceId) : async ?Types.Resource {
    resources.get(id)
  };

  /// List all resources in the catalog
  public query func listResources() : async [Types.Resource] {
    resources.values().toArray()
  };

  /// Submit a supply request for a resource (users)
  public shared ({ caller }) func submitSupplyRequest(input : Types.CreateSupplyRequestInput) : async Types.SupplyRequest {
    let id = nextSupplyRequestId.value;
    nextSupplyRequestId.value += 1;
    let req : Types.SupplyRequest = {
      id;
      userId = caller;
      resourceId = input.resourceId;
      quantity = input.quantity;
      deliveryLocation = input.deliveryLocation;
      status = #pending;
      createdAt = Time.now();
    };
    supplyRequests.add(id, req);
    req
  };

  /// Get a specific supply request
  public query ({ caller }) func getSupplyRequest(id : Common.SupplyRequestId) : async ?Types.SupplyRequest {
    switch (supplyRequests.get(id)) {
      case (?r) {
        if (r.userId == caller or resourcesIsAdmin(caller)) { ?r } else { null }
      };
      case null null;
    }
  };

  /// List supply requests for the calling user
  public query ({ caller }) func getMySupplyRequests() : async [Types.SupplyRequest] {
    supplyRequests.values().filter(func(r : Types.SupplyRequest) : Bool { r.userId == caller }).toArray()
  };

  /// List all supply requests (admin only)
  public query ({ caller }) func listAllSupplyRequests() : async [Types.SupplyRequest] {
    if (not resourcesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    supplyRequests.values().toArray()
  };

  /// Update supply request status (admin only)
  public shared ({ caller }) func updateSupplyRequestStatus(id : Common.SupplyRequestId, status : Types.SupplyRequestStatus) : async ?Types.SupplyRequest {
    if (not resourcesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    switch (supplyRequests.get(id)) {
      case (?existing) {
        let updated : Types.SupplyRequest = { existing with status };
        supplyRequests.add(id, updated);
        ?updated
      };
      case null null;
    }
  };
};
