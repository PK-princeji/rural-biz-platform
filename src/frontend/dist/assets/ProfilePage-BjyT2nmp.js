import { j as jsxRuntimeExports, r as reactExports } from "./index-C68clJlo.js";
import { B as Badge } from "./badge-D_9nQC6K.js";
import { L as Layout, u as useAuth, B as Button } from "./Layout-CKZLOXF2.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CPJssoB_.js";
import { I as Input } from "./input-BpeXxRVK.js";
import { L as Label } from "./label-CVR3Egfq.js";
import { S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-B3Tuwn4h.js";
import { u as ue } from "./index-BMkuCIh0.js";
import { B as BusinessType } from "./backend.d-CKDproep.js";
import { P as ProtectedRoute } from "./ProtectedRoute-DWOsd4jr.js";
import { u as useBackend } from "./useBackend-CGH_aUep.js";
import { U as User, M as MapPin, B as Briefcase } from "./user-B41Bu45f.js";
import { C as Copy, P as Phone } from "./phone-wXB6ILpS.js";
import { L as LoaderCircle } from "./loader-circle-B7XCNxyQ.js";
import "./chevron-down-nDF5uijY.js";
import "./chevron-up-DXNjjg8s.js";
const BUSINESS_TYPES = [
  { value: "Farming", label: "🌾 Farming" },
  { value: "Fishery", label: "🐟 Fishery" },
  { value: "Poultry", label: "🐔 Poultry" },
  { value: "GoatFarming", label: "🐐 Goat Farming" }
];
const BUSINESS_TYPE_MAP = {
  Farming: BusinessType.agriculture,
  Fishery: BusinessType.fishery,
  Poultry: BusinessType.poultry,
  GoatFarming: BusinessType.goatFarming
};
function ProfileContent() {
  const { principal } = useAuth();
  const backend = useBackend();
  const [form, setForm] = reactExports.useState({
    name: "",
    mobile: "",
    location: "",
    businessType: void 0
  });
  const [saved, setSaved] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };
  const handleSave = async () => {
    if (!form.name.trim()) {
      ue.error("Please enter your full name.");
      return;
    }
    setSaving(true);
    try {
      await backend.saveCallerUserProfile({
        name: form.name.trim(),
        mobile: form.mobile ?? "",
        location: form.location ?? "",
        businessType: form.businessType ? BUSINESS_TYPE_MAP[form.businessType] : BusinessType.agriculture
      });
      setSaved(true);
      ue.success("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      ue.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  const copyPrincipal = () => {
    if (principal) {
      void navigator.clipboard.writeText(principal);
      ue.success("Principal copied to clipboard!");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Keep your information up to date to receive better support from our experts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6 border-border", "data-ocid": "profile.principal_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Your Identity (Principal)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground truncate max-w-[220px] sm:max-w-none", children: principal ?? "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: copyPrincipal,
            className: "shrink-0",
            "data-ocid": "profile.copy_principal_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mt-2 text-xs font-body", children: "Verified via Internet Identity" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border shadow-subtle",
        "data-ocid": "profile.form_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-display", children: "Personal Information" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "name",
                  className: "text-sm font-body font-medium flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    "Full Name *"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "name",
                  placeholder: "Enter your full name",
                  value: form.name,
                  onChange: (e) => handleChange("name", e.target.value),
                  className: "font-body",
                  "data-ocid": "profile.name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "mobile",
                  className: "text-sm font-body font-medium flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    "Mobile Number"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "mobile",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  value: form.mobile ?? "",
                  onChange: (e) => handleChange("mobile", e.target.value),
                  className: "font-body",
                  "data-ocid": "profile.mobile_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Label,
                {
                  htmlFor: "location",
                  className: "text-sm font-body font-medium flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    "Village / Location"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "location",
                  placeholder: "e.g. Rampur Village, UP",
                  value: form.location ?? "",
                  onChange: (e) => handleChange("location", e.target.value),
                  className: "font-body",
                  "data-ocid": "profile.location_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-body font-medium flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                "Primary Business"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: form.businessType,
                  onValueChange: (v) => handleChange("businessType", v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "font-body",
                        "data-ocid": "profile.business_type_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your business type" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BUSINESS_TYPES.map((bt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectItem,
                      {
                        value: bt.value,
                        className: "font-body",
                        children: bt.label
                      },
                      bt.value
                    )) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: () => void handleSave(),
                disabled: saving,
                className: "w-full gradient-primary text-white border-0 font-body font-semibold h-11 hover:opacity-90 transition-smooth",
                "data-ocid": "profile.save_button",
                children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Saving…"
                ] }) : saved ? "✓ Saved" : "Save Profile"
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
function ProfilePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileContent, {}) }) });
}
export {
  ProfilePage as default
};
