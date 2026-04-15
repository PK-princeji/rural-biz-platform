var BusinessType = /* @__PURE__ */ ((BusinessType2) => {
  BusinessType2["fishery"] = "fishery";
  BusinessType2["goatFarming"] = "goatFarming";
  BusinessType2["poultry"] = "poultry";
  BusinessType2["agriculture"] = "agriculture";
  return BusinessType2;
})(BusinessType || {});
var CaseStatus = /* @__PURE__ */ ((CaseStatus2) => {
  CaseStatus2["pending"] = "pending";
  CaseStatus2["completed"] = "completed";
  CaseStatus2["inProgress"] = "inProgress";
  return CaseStatus2;
})(CaseStatus || {});
var ResourceCategory = /* @__PURE__ */ ((ResourceCategory2) => {
  ResourceCategory2["poultry"] = "poultry";
  ResourceCategory2["fish"] = "fish";
  ResourceCategory2["goat"] = "goat";
  ResourceCategory2["seeds"] = "seeds";
  return ResourceCategory2;
})(ResourceCategory || {});
var SupplyRequestStatus = /* @__PURE__ */ ((SupplyRequestStatus2) => {
  SupplyRequestStatus2["cancelled"] = "cancelled";
  SupplyRequestStatus2["pending"] = "pending";
  SupplyRequestStatus2["delivered"] = "delivered";
  SupplyRequestStatus2["processing"] = "processing";
  return SupplyRequestStatus2;
})(SupplyRequestStatus || {});
export {
  BusinessType as B,
  CaseStatus as C,
  ResourceCategory as R,
  SupplyRequestStatus as S
};
