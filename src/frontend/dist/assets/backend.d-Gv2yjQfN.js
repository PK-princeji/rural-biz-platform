var CaseStatus = /* @__PURE__ */ ((CaseStatus2) => {
  CaseStatus2["pending"] = "pending";
  CaseStatus2["completed"] = "completed";
  CaseStatus2["inProgress"] = "inProgress";
  return CaseStatus2;
})(CaseStatus || {});
var EnrollmentStatus = /* @__PURE__ */ ((EnrollmentStatus2) => {
  EnrollmentStatus2["enrolled"] = "enrolled";
  EnrollmentStatus2["completed"] = "completed";
  EnrollmentStatus2["ongoing"] = "ongoing";
  return EnrollmentStatus2;
})(EnrollmentStatus || {});
var ResourceCategory = /* @__PURE__ */ ((ResourceCategory2) => {
  ResourceCategory2["poultry"] = "poultry";
  ResourceCategory2["fish"] = "fish";
  ResourceCategory2["goat"] = "goat";
  ResourceCategory2["seeds"] = "seeds";
  return ResourceCategory2;
})(ResourceCategory || {});
var Specialization = /* @__PURE__ */ ((Specialization2) => {
  Specialization2["fishery"] = "fishery";
  Specialization2["goatFarming"] = "goatFarming";
  Specialization2["poultry"] = "poultry";
  Specialization2["agriculture"] = "agriculture";
  return Specialization2;
})(Specialization || {});
var SupplyRequestStatus = /* @__PURE__ */ ((SupplyRequestStatus2) => {
  SupplyRequestStatus2["cancelled"] = "cancelled";
  SupplyRequestStatus2["pending"] = "pending";
  SupplyRequestStatus2["delivered"] = "delivered";
  SupplyRequestStatus2["processing"] = "processing";
  return SupplyRequestStatus2;
})(SupplyRequestStatus || {});
export {
  CaseStatus as C,
  EnrollmentStatus as E,
  ResourceCategory as R,
  Specialization as S,
  SupplyRequestStatus as a
};
