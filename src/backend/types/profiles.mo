import Cases "cases";
import Common "common";

module {
  public type UserProfile = {
    id : Common.UserId;
    name : Text;
    mobile : Text;
    location : Text;
    businessType : Cases.BusinessType;
    createdAt : Common.Timestamp;
    aiRecommendation : ?Text;
  };

  public type SaveProfileInput = {
    name : Text;
    mobile : Text;
    location : Text;
    businessType : Cases.BusinessType;
    aiRecommendation : ?Text;
  };
};
