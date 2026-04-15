import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import TrainingTypes "../types/trainings";
import Common "../types/common";

module {
  public type TrainingPrograms = Map.Map<Nat, TrainingTypes.TrainingProgram>;
  public type TrainingEnrollments = Map.Map<Nat, TrainingTypes.TrainingEnrollment>;
  public type Counter = { var value : Nat };

  /// List all active training programs
  public func listPrograms(
    programs : TrainingPrograms
  ) : [TrainingTypes.TrainingProgram] {
    let result = List.empty<TrainingTypes.TrainingProgram>();
    for ((_, p) in programs.entries()) {
      if (p.isActive) {
        result.add(p);
      };
    };
    result.toArray()
  };

  /// Get a single training program by ID
  public func getProgram(
    programs : TrainingPrograms,
    id : Common.TrainingId,
  ) : ?TrainingTypes.TrainingProgram {
    programs.get(id)
  };

  /// Create a new training program (admin only)
  public func createProgram(
    programs : TrainingPrograms,
    nextId : Counter,
    input : TrainingTypes.CreateTrainingInput,
    now : Common.Timestamp,
  ) : TrainingTypes.TrainingProgram {
    let id = nextId.value;
    nextId.value += 1;
    let program : TrainingTypes.TrainingProgram = {
      id;
      title = input.title;
      description = input.description;
      duration = input.duration;
      sector = input.sector;
      isActive = true;
      createdAt = now;
    };
    programs.add(id, program);
    program
  };

  /// Toggle active status of a training program (admin only)
  public func toggleProgramActive(
    programs : TrainingPrograms,
    id : Common.TrainingId,
  ) {
    switch (programs.get(id)) {
      case (?p) {
        programs.add(id, { p with isActive = not p.isActive });
      };
      case null {
        Runtime.trap("Training program not found");
      };
    };
  };

  /// Enroll a user in a training program
  public func enrollUser(
    enrollments : TrainingEnrollments,
    nextId : Counter,
    userId : Common.UserId,
    input : TrainingTypes.EnrollTrainingInput,
    now : Common.Timestamp,
  ) : TrainingTypes.TrainingEnrollment {
    // Check if already enrolled
    for ((_, e) in enrollments.entries()) {
      if (Principal.equal(e.userId, userId) and e.programId == input.programId) {
        Runtime.trap("Already enrolled in this training program");
      };
    };
    let id = nextId.value;
    nextId.value += 1;
    let enrollment : TrainingTypes.TrainingEnrollment = {
      id;
      userId;
      programId = input.programId;
      status = #enrolled;
      enrolledAt = now;
      updatedAt = now;
    };
    enrollments.add(id, enrollment);
    enrollment
  };

  /// Get all enrollments for a specific user
  public func getUserEnrollments(
    enrollments : TrainingEnrollments,
    userId : Common.UserId,
  ) : [TrainingTypes.TrainingEnrollment] {
    let result = List.empty<TrainingTypes.TrainingEnrollment>();
    for ((_, e) in enrollments.entries()) {
      if (Principal.equal(e.userId, userId)) {
        result.add(e);
      };
    };
    result.toArray()
  };

  /// Update enrollment status (admin only)
  public func updateEnrollmentStatus(
    enrollments : TrainingEnrollments,
    enrollmentId : Common.EnrollmentId,
    status : TrainingTypes.EnrollmentStatus,
    now : Common.Timestamp,
  ) {
    switch (enrollments.get(enrollmentId)) {
      case (?e) {
        enrollments.add(enrollmentId, { e with status; updatedAt = now });
      };
      case null {
        Runtime.trap("Enrollment not found");
      };
    };
  };

  /// Get all enrollments for a program (admin only)
  public func getProgramEnrollments(
    enrollments : TrainingEnrollments,
    programId : Common.TrainingId,
  ) : [TrainingTypes.TrainingEnrollment] {
    let result = List.empty<TrainingTypes.TrainingEnrollment>();
    for ((_, e) in enrollments.entries()) {
      if (e.programId == programId) {
        result.add(e);
      };
    };
    result.toArray()
  };
};
