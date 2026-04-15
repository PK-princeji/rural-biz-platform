import Common "common";

module {
  public type Specialization = {
    #agriculture;
    #fishery;
    #poultry;
    #goatFarming;
  };

  public type Expert = {
    id : Common.ExpertId;
    name : Text;
    specialization : Specialization;
    contactInfo : Text;
    isActive : Bool;
    assignedCasesCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type CreateExpertInput = {
    name : Text;
    specialization : Specialization;
    contactInfo : Text;
  };
};
