import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import AITypes "../types/ai";
import CaseTypes "../types/cases";
import Common "../types/common";

module {
  public type AIResults = Map.Map<Principal, AITypes.AIQuizResult>;

  /// Score quiz answers and pick best matching BusinessType with reasons
  func scoreAnswers(answers : AITypes.QuizAnswers) : (CaseTypes.BusinessType, Text, [Text]) {
    var agriScore : Int = 0;
    var fishScore : Int = 0;
    var poultryScore : Int = 0;
    var goatScore : Int = 0;

    let reasons = List.empty<Text>();

    // Location scoring
    let loc = answers.location.toLower();
    if (loc.contains(#text "water") or loc.contains(#text "pond") or loc.contains(#text "river") or loc.contains(#text "lake")) {
      fishScore += 3;
      reasons.add("Your location near water bodies is ideal for fishery and aquaculture");
    } else if (loc.contains(#text "forest") or loc.contains(#text "hill") or loc.contains(#text "hilly")) {
      goatScore += 2;
      agriScore += 1;
      reasons.add("Hilly terrain is well-suited for goat farming");
    } else if (loc.contains(#text "rural") or loc.contains(#text "village") or loc.contains(#text "gaon")) {
      agriScore += 2;
      goatScore += 1;
      reasons.add("Rural areas offer excellent conditions for agriculture and goat farming");
    } else {
      agriScore += 1;
    };

    // Interest scoring
    let interest = answers.interest.toLower();
    if (interest.contains(#text "fish") or interest.contains(#text "aqua") or interest.contains(#text "pond")) {
      fishScore += 4;
      reasons.add("Your interest in fishery/aquaculture aligns with high market demand");
    } else if (interest.contains(#text "goat") or interest.contains(#text "bakri") or interest.contains(#text "sheep")) {
      goatScore += 4;
      reasons.add("Goat farming matches your interest and requires low initial investment");
    } else if (interest.contains(#text "poultry") or interest.contains(#text "chicken") or interest.contains(#text "murgi") or interest.contains(#text "egg")) {
      poultryScore += 4;
      reasons.add("Poultry farming aligns with your interest and gives quick returns");
    } else if (interest.contains(#text "farm") or interest.contains(#text "crop") or interest.contains(#text "wheat") or interest.contains(#text "rice") or interest.contains(#text "khet")) {
      agriScore += 4;
      reasons.add("Agriculture matches your interest with strong government support available");
    } else {
      agriScore += 1;
    };

    // Experience scoring
    let exp = answers.experience.toLower();
    if (exp.contains(#text "fish") or exp.contains(#text "aqua")) {
      fishScore += 3;
    } else if (exp.contains(#text "goat") or exp.contains(#text "animal") or exp.contains(#text "pashu")) {
      goatScore += 3;
    } else if (exp.contains(#text "poultry") or exp.contains(#text "chicken")) {
      poultryScore += 3;
    } else if (exp.contains(#text "farm") or exp.contains(#text "crop") or exp.contains(#text "kheti")) {
      agriScore += 3;
    } else if (exp.contains(#text "none") or exp.contains(#text "no") or exp.contains(#text "beginner") or exp.contains(#text "nahi")) {
      poultryScore += 1;
      goatScore += 1;
      reasons.add("As a beginner, goat farming or poultry are ideal entry points with lower risk");
    };

    // Budget scoring
    let budget = answers.budget.toLower();
    if (budget.contains(#text "low") or budget.contains(#text "small") or budget.contains(#text "less") or budget.contains(#text "kam")) {
      goatScore += 2;
      poultryScore += 1;
      reasons.add("Your budget is suitable for goat farming which needs low capital to start");
    } else if (budget.contains(#text "medium") or budget.contains(#text "moderate")) {
      agriScore += 1;
      poultryScore += 2;
      fishScore += 1;
    } else if (budget.contains(#text "high") or budget.contains(#text "large") or budget.contains(#text "zyada")) {
      fishScore += 2;
      agriScore += 2;
      reasons.add("Your higher budget opens opportunities in commercial fishery or large-scale agriculture");
    };

    // Land available scoring
    let land = answers.landAvailable.toLower();
    if (land.contains(#text "yes") or land.contains(#text "haan") or land.contains(#text "hai")) {
      agriScore += 3;
      reasons.add("Having land available gives you a strong advantage for agriculture");
    } else if (land.contains(#text "no") or land.contains(#text "nahi") or land.contains(#text "nai")) {
      goatScore += 2;
      poultryScore += 2;
      reasons.add("Without land, goat farming or poultry are excellent options requiring minimal space");
    } else {
      agriScore += 1;
    };

    // Determine highest scoring sector
    let maxScore = Int.max(agriScore, Int.max(fishScore, Int.max(poultryScore, goatScore)));

    let businessType : CaseTypes.BusinessType =
      if (maxScore == agriScore) { #agriculture }
      else if (maxScore == fishScore) { #fishery }
      else if (maxScore == poultryScore) { #poultry }
      else { #goatFarming };

    let confidence : Text =
      if (maxScore >= 8) { "High" }
      else if (maxScore >= 5) { "Medium" }
      else { "Low" };

    // Ensure at least one reason
    if (reasons.size() == 0) {
      reasons.add("Based on your profile, this sector offers the best match for rural entrepreneurship");
    };

    // Return up to 3 reasons
    let finalReasons : [Text] =
      if (reasons.size() <= 3) { reasons.toArray() }
      else { reasons.sliceToArray(0, 3) };

    (businessType, confidence, finalReasons)
  };

  /// Generate a business recommendation from quiz answers
  public func generateRecommendation(
    answers : AITypes.QuizAnswers,
    now : Common.Timestamp,
  ) : AITypes.AIQuizResult {
    let (businessType, confidence, reasons) = scoreAnswers(answers);
    {
      businessType;
      confidence;
      reasons;
      createdAt = now;
    }
  };

  /// Save quiz result to user profile store
  public func saveResult(
    results : AIResults,
    userId : Common.UserId,
    result : AITypes.AIQuizResult,
  ) {
    results.add(userId, result);
  };

  /// Get a user's saved AI quiz result
  public func getResult(
    results : AIResults,
    userId : Common.UserId,
  ) : ?AITypes.AIQuizResult {
    results.get(userId)
  };
};
