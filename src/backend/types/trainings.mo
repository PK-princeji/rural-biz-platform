import Cases "cases";
import Common "common";

module {
  public type EnrollmentStatus = {
    #enrolled;
    #ongoing;
    #completed;
  };

  public type TrainingProgram = {
    id : Common.TrainingId;
    title : Text;
    description : Text;
    duration : Text;
    sector : Cases.BusinessType;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type TrainingEnrollment = {
    id : Common.EnrollmentId;
    userId : Common.UserId;
    programId : Common.TrainingId;
    status : EnrollmentStatus;
    enrolledAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateTrainingInput = {
    title : Text;
    description : Text;
    duration : Text;
    sector : Cases.BusinessType;
  };

  public type EnrollTrainingInput = {
    programId : Common.TrainingId;
  };
};
