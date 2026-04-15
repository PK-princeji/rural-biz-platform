import Map "mo:core/Map";
import Time "mo:core/Time";
import AITypes "../types/ai";
import Common "../types/common";
import AILib "../lib/ai";

mixin (
  aiResults : Map.Map<Principal, AITypes.AIQuizResult>,
) {

  /// Submit quiz answers, get AI business recommendation on screen AND save to profile
  public shared ({ caller }) func submitAIQuiz(answers : AITypes.QuizAnswers) : async AITypes.AIQuizResult {
    let result = AILib.generateRecommendation(answers, Time.now());
    AILib.saveResult(aiResults, caller, result);
    result
  };

  /// Get the caller's saved AI quiz result from their profile
  public query ({ caller }) func getMyAIQuizResult() : async ?AITypes.AIQuizResult {
    AILib.getResult(aiResults, caller)
  };
};
