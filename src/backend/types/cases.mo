import Common "common";

module {
  public type BusinessType = {
    #agriculture;
    #fishery;
    #poultry;
    #goatFarming;
  };

  public type CaseStatus = {
    #pending;
    #inProgress;
    #completed;
  };

  public type Case = {
    id : Common.CaseId;
    userId : Common.UserId;
    businessType : BusinessType;
    description : Text;
    photoUrl : ?Text;
    status : CaseStatus;
    assignedExpertId : ?Common.ExpertId;
    adminNotes : ?Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateCaseInput = {
    businessType : BusinessType;
    description : Text;
    photoUrl : ?Text;
  };

  public type UpdateCaseInput = {
    status : ?CaseStatus;
    assignedExpertId : ?Common.ExpertId;
    adminNotes : ?Text;
  };
};
