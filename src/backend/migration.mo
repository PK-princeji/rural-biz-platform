import Map "mo:core/Map";
import Principal "mo:core/Principal";
import ProfileTypes "types/profiles";
import CaseTypes "types/cases";

module {
  // ── Old types (inlined from .old/src/backend/types/) ─────────────────────
  type OldBusinessType = {
    #agriculture;
    #fishery;
    #poultry;
    #goatFarming;
  };

  type OldUserProfile = {
    id : Principal;
    name : Text;
    mobile : Text;
    location : Text;
    businessType : OldBusinessType;
    createdAt : Int;
    aiRecommendation : ?Text;
  };

  // ── Actor state shapes ────────────────────────────────────────────────────
  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, ProfileTypes.UserProfile>;
  };

  // ── Migration function ────────────────────────────────────────────────────
  public func run(old : OldActor) : NewActor {
    let userProfiles = old.userProfiles.map<Principal, OldUserProfile, ProfileTypes.UserProfile>(
      func(_id, p) {
        { p with whatsapp = "" }
      }
    );
    { userProfiles }
  };
};
