import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/profiles";

module {
  public func saveProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    caller : Common.UserId,
    input : Types.SaveProfileInput,
    now : Common.Timestamp,
  ) {
    let existing = profiles.get(caller);
    let profile : Types.UserProfile = {
      id = caller;
      name = input.name;
      mobile = input.mobile;
      location = input.location;
      businessType = input.businessType;
      createdAt = switch (existing) { case (?p) p.createdAt; case null now };
    };
    profiles.add(caller, profile);
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfile {
    profiles.get(userId)
  };

  public func listProfiles(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
  ) : [Types.UserProfile] {
    profiles.values().toArray()
  };
};
