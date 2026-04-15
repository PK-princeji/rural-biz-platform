import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/profiles";

mixin (
  admins : Map.Map<Principal, Bool>,
  userProfiles : Map.Map<Common.UserId, Types.UserProfile>,
) {
  func profilesIsAdmin(caller : Principal) : Bool {
    admins.get(caller) == ?true
  };

  /// Get the calling user's profile
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    userProfiles.get(caller)
  };

  /// Save (create or update) the calling user's profile
  public shared ({ caller }) func saveCallerUserProfile(input : Types.SaveProfileInput) : async () {
    let now = Time.now();
    let existing = userProfiles.get(caller);
    let profile : Types.UserProfile = {
      id = caller;
      name = input.name;
      mobile = input.mobile;
      whatsapp = input.whatsapp;
      location = input.location;
      businessType = input.businessType;
      createdAt = switch (existing) { case (?p) p.createdAt; case null now };
      aiRecommendation = input.aiRecommendation;
    };
    userProfiles.add(caller, profile);
  };

  /// Get any user's profile (own profile or admin)
  public query ({ caller }) func getUserProfile(user : Common.UserId) : async ?Types.UserProfile {
    if (caller != user and not profilesIsAdmin(caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user)
  };

  /// List all user profiles (admin only)
  public query ({ caller }) func listUserProfiles() : async [Types.UserProfile] {
    if (not profilesIsAdmin(caller)) { Runtime.trap("Unauthorized: Admins only") };
    userProfiles.values().toArray()
  };
};
