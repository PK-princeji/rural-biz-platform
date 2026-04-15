import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import PremiumTypes "../types/premium";
import Common "../types/common";

module {
  public type PremiumRequests = Map.Map<Nat, PremiumTypes.PremiumRequest>;
  public type Counter = { var value : Nat };

  /// Submit a premium support interest request (max 1 per user)
  public func createRequest(
    requests : PremiumRequests,
    nextId : Counter,
    userId : Common.UserId,
    input : PremiumTypes.CreatePremiumRequestInput,
    now : Common.Timestamp,
  ) : PremiumTypes.PremiumRequest {
    // Enforce max 1 request per user
    for ((_, r) in requests.entries()) {
      if (Principal.equal(r.userId, userId)) {
        Runtime.trap("You already have a premium support request. Our team will contact you soon.");
      };
    };
    let id = nextId.value;
    nextId.value += 1;
    let request : PremiumTypes.PremiumRequest = {
      id;
      userId;
      name = input.name;
      mobile = input.mobile;
      email = input.email;
      reason = input.reason;
      createdAt = now;
      isContacted = false;
    };
    requests.add(id, request);
    request
  };

  /// List all premium requests (admin only)
  public func listRequests(
    requests : PremiumRequests
  ) : [PremiumTypes.PremiumRequest] {
    let result = List.empty<PremiumTypes.PremiumRequest>();
    for ((_, r) in requests.entries()) {
      result.add(r);
    };
    result.toArray()
  };

  /// Mark a premium request as contacted (admin only)
  public func markContacted(
    requests : PremiumRequests,
    requestId : Common.PremiumRequestId,
  ) {
    switch (requests.get(requestId)) {
      case (?r) {
        requests.add(requestId, { r with isContacted = true });
      };
      case null {
        Runtime.trap("Premium request not found");
      };
    };
  };

  /// Get a caller's own premium request
  public func getUserRequest(
    requests : PremiumRequests,
    userId : Common.UserId,
  ) : ?PremiumTypes.PremiumRequest {
    for ((_, r) in requests.entries()) {
      if (Principal.equal(r.userId, userId)) {
        return ?r;
      };
    };
    null
  };
};
