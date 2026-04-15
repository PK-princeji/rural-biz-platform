import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import TrainingTypes "../types/trainings";
import Common "../types/common";
import TrainingsLib "../lib/trainings";

mixin (
  admins : Map.Map<Principal, Bool>,
  programs : Map.Map<Nat, TrainingTypes.TrainingProgram>,
  nextProgramId : { var value : Nat },
  enrollments : Map.Map<Nat, TrainingTypes.TrainingEnrollment>,
  nextEnrollmentId : { var value : Nat },
) {

  /// List all active training programs
  public query func listTrainingPrograms() : async [TrainingTypes.TrainingProgram] {
    TrainingsLib.listPrograms(programs)
  };

  /// Get a single training program by ID
  public query func getTrainingProgram(id : Common.TrainingId) : async ?TrainingTypes.TrainingProgram {
    TrainingsLib.getProgram(programs, id)
  };

  /// Create a new training program (admin only)
  public shared ({ caller }) func createTrainingProgram(input : TrainingTypes.CreateTrainingInput) : async TrainingTypes.TrainingProgram {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    TrainingsLib.createProgram(programs, nextProgramId, input, Time.now())
  };

  /// Toggle active status of a training program (admin only)
  public shared ({ caller }) func toggleTrainingProgramActive(id : Common.TrainingId) : async () {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    TrainingsLib.toggleProgramActive(programs, id)
  };

  /// Enroll the caller in a training program
  public shared ({ caller }) func enrollInTraining(input : TrainingTypes.EnrollTrainingInput) : async TrainingTypes.TrainingEnrollment {
    TrainingsLib.enrollUser(enrollments, nextEnrollmentId, caller, input, Time.now())
  };

  /// Get all training enrollments for the caller
  public query ({ caller }) func getMyTrainingEnrollments() : async [TrainingTypes.TrainingEnrollment] {
    TrainingsLib.getUserEnrollments(enrollments, caller)
  };

  /// Update enrollment status (admin only)
  public shared ({ caller }) func updateTrainingEnrollmentStatus(
    enrollmentId : Common.EnrollmentId,
    status : TrainingTypes.EnrollmentStatus,
  ) : async () {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    TrainingsLib.updateEnrollmentStatus(enrollments, enrollmentId, status, Time.now())
  };

  /// Get all enrollments for a program (admin only)
  public query ({ caller }) func getProgramEnrollments(programId : Common.TrainingId) : async [TrainingTypes.TrainingEnrollment] {
    if (admins.get(caller) != ?true) {
      Runtime.trap("Not authorized: admin only");
    };
    TrainingsLib.getProgramEnrollments(enrollments, programId)
  };
};
