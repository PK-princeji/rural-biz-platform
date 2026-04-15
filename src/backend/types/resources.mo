import Common "common";

module {
  public type ResourceCategory = {
    #goat;
    #fish;
    #poultry;
    #seeds;
  };

  public type Resource = {
    id : Common.ResourceId;
    name : Text;
    category : ResourceCategory;
    description : Text;
    isAvailable : Bool;
  };

  public type SupplyRequestStatus = {
    #pending;
    #processing;
    #delivered;
    #cancelled;
  };

  public type SupplyRequest = {
    id : Common.SupplyRequestId;
    userId : Common.UserId;
    resourceId : Common.ResourceId;
    quantity : Nat;
    deliveryLocation : Text;
    status : SupplyRequestStatus;
    createdAt : Common.Timestamp;
  };

  public type CreateResourceInput = {
    name : Text;
    category : ResourceCategory;
    description : Text;
    isAvailable : Bool;
  };

  public type CreateSupplyRequestInput = {
    resourceId : Common.ResourceId;
    quantity : Nat;
    deliveryLocation : Text;
  };
};
