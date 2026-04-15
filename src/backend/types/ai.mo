import Cases "cases";
import Common "common";

module {
  public type AIQuizResult = {
    businessType : Cases.BusinessType;
    confidence : Text;
    reasons : [Text];
    createdAt : Common.Timestamp;
  };

  public type QuizAnswers = {
    location : Text;
    interest : Text;
    experience : Text;
    budget : Text;
    landAvailable : Text;
  };
};
