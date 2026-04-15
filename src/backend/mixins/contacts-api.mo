import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import ContactTypes "../types/contacts";
import ContactLib "../lib/contacts";

mixin (
  admins : Map.Map<Principal, Bool>,
  contactLeads : Map.Map<Nat, ContactTypes.ContactLead>,
  nextContactLeadId : { var value : Nat },
) {

  /// Submit a contact lead — callable by anyone (authenticated or anonymous)
  public shared ({ caller }) func submitContactLead(input : ContactTypes.CreateContactLeadInput) : async Nat {
    let userId : ?Common.UserId = if (caller.isAnonymous()) null else ?caller;
    ContactLib.createLead(contactLeads, nextContactLeadId, userId, input, Time.now())
  };

  /// List all contact leads (admin only)
  public query ({ caller }) func listAllContactLeads() : async [ContactTypes.ContactLead] {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Unauthorized: Admins only");
    };
    ContactLib.listLeads(contactLeads)
  };

  /// Get contact leads submitted by the calling user
  public query ({ caller }) func getMyContactLeads() : async [ContactTypes.ContactLead] {
    ContactLib.getLeadsByUser(contactLeads, caller)
  };
};
