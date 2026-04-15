import Map "mo:core/Map";
import Principal "mo:core/Principal";
import ContactTypes "../types/contacts";
import Common "../types/common";

module {
  public type ContactLeads = Map.Map<Nat, ContactTypes.ContactLead>;
  public type Counter = { var value : Nat };

  /// Submit a new contact lead
  public func createLead(
    leads : ContactLeads,
    nextId : Counter,
    userId : ?Common.UserId,
    input : ContactTypes.CreateContactLeadInput,
    now : Common.Timestamp,
  ) : Nat {
    let id = nextId.value;
    nextId.value += 1;
    let lead : ContactTypes.ContactLead = {
      id;
      userId;
      name = input.name;
      phone = input.phone;
      whatsapp = input.whatsapp;
      location = input.location;
      problem = input.problem;
      email = input.email;
      status = "new";
      submittedAt = now;
    };
    leads.add(id, lead);
    id
  };

  /// List all leads (admin)
  public func listLeads(leads : ContactLeads) : [ContactTypes.ContactLead] {
    leads.values().toArray()
  };

  /// Get leads submitted by a specific user
  public func getLeadsByUser(
    leads : ContactLeads,
    userId : Common.UserId,
  ) : [ContactTypes.ContactLead] {
    leads.values().filter(func(l : ContactTypes.ContactLead) : Bool {
      switch (l.userId) {
        case (?uid) Principal.equal(uid, userId);
        case null false;
      }
    }).toArray()
  };
};
