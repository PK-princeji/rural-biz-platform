import Common "common";

module {
  public type PremiumRequest = {
    id : Common.PremiumRequestId;
    userId : Common.UserId;
    name : Text;
    mobile : Text;
    email : Text;
    reason : Text;
    createdAt : Common.Timestamp;
    isContacted : Bool;
  };

  public type CreatePremiumRequestInput = {
    name : Text;
    mobile : Text;
    email : Text;
    reason : Text;
  };
};
