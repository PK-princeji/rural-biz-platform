import Common "common";

module {
  public type ContactLead = {
    id : Common.ContactLeadId;
    userId : ?Common.UserId;
    name : Text;
    phone : Text;
    whatsapp : Text;
    location : Text;
    problem : Text;
    email : Text;
    status : Text;
    submittedAt : Common.Timestamp;
  };

  public type CreateContactLeadInput = {
    name : Text;
    phone : Text;
    whatsapp : Text;
    location : Text;
    problem : Text;
    email : Text;
  };
};
