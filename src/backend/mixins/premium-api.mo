import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import PremiumTypes "../types/premium";
import Common "../types/common";
import PremiumLib "../lib/premium";

mixin (
  admins : Map.Map<Principal, Bool>,
  premiumRequests : Map.Map<Nat, PremiumTypes.PremiumRequest>,
  nextPremiumRequestId : { var value : Nat },
) {

  /// Submit a premium support interest form (no payment — team contacts manually)
  public shared ({ caller }) func submitPremiumRequest(input : PremiumTypes.CreatePremiumRequestInput) : async PremiumTypes.PremiumRequest {
    PremiumLib.createRequest(premiumRequests, nextPremiumRequestId, caller, input, Time.now())
  };

  /// Get the caller's own premium support request
  public query ({ caller }) func getMyPremiumRequest() : async ?PremiumTypes.PremiumRequest {
    PremiumLib.getUserRequest(premiumRequests, caller)
  };

  /// List all premium requests (admin only)
  public query ({ caller }) func listPremiumRequests() : async [PremiumTypes.PremiumRequest] {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    PremiumLib.listRequests(premiumRequests)
  };

  /// Mark a premium request as contacted (admin only)
  public shared ({ caller }) func markPremiumRequestContacted(requestId : Common.PremiumRequestId) : async () {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    PremiumLib.markContacted(premiumRequests, requestId)
  };
};
