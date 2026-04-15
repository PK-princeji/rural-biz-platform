import { r as reactExports, j as jsxRuntimeExports, w as cn, v as Skeleton, N as Navigate, u as useNavigate } from "./index-BtsEeMO8.js";
import { B as Badge } from "./badge-BkWPGqdT.js";
import { c as createLucideIcon, a as useComposedRefs, u as useAuth, L as Layout, B as Button, C as Clock } from "./Layout-BYuDWVFP.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DPsZjIdD.js";
import { I as Input } from "./input-DDgxqJRY.js";
import { L as Label } from "./label-Cfd9NRVi.js";
import { u as usePrevious, a as useSize, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./select-CeWcWAjs.js";
import { a as useControllableState, P as Primitive, c as composeEventHandlers, e as createContextScope } from "./index-DxvYvMv5.js";
import { T as Textarea } from "./textarea-o8v4We29.js";
import { u as ue } from "./index-wwv1Wm--.js";
import { C as CaseStatus, S as Specialization } from "./backend.d-Gv2yjQfN.js";
import { u as useBackend } from "./useBackend-DuyaqMRp.js";
import { F as FileText, C as CirclePlus } from "./file-text-DzqCT8KT.js";
import { U as Users } from "./users-BRaA4Jca.js";
import { C as ChevronDown } from "./chevron-down-DHjvnRdE.js";
import { C as CircleCheck } from "./circle-check-QIfuxD2n.js";
import "./chevron-up-DAFlLxDy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function fmtDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function fmtPrincipal(p) {
  const s = typeof p === "string" ? p : p.toText();
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}
const BUSINESS_LABELS = {
  agriculture: "Farming",
  fishery: "Fishery",
  poultry: "Poultry",
  goatFarming: "Goat Farming"
};
const STATUS_LABELS = {
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed"
};
const STATUS_COLORS = {
  pending: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
    borderColor: "#fde047"
  },
  inProgress: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderColor: "#93c5fd"
  },
  completed: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderColor: "#86efac"
  }
};
function StatsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-12 mb-1 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 rounded" })
  ] }) }, i)) });
}
function CaseListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2 rounded" })
  ] }, i)) });
}
function ExpertCard({ expert, index, onToggle }) {
  const [toggling, setToggling] = reactExports.useState(false);
  async function handleToggle(checked) {
    setToggling(true);
    try {
      await onToggle(expert.id, checked);
    } finally {
      setToggling(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border shadow-subtle",
      "data-ocid": `admin.expert_card.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: expert.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-body",
                style: expert.isActive ? { borderColor: "#86efac", color: "#166534" } : {
                  borderColor: "var(--border)",
                  color: "var(--muted-foreground)"
                },
                children: expert.isActive ? "Active" : "Inactive"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: BUSINESS_LABELS[expert.specialization] ?? expert.specialization }),
          expert.contactInfo && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5 truncate", children: expert.contactInfo }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-1", children: [
            "Assigned cases:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: expert.assignedCasesCount.toString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-end gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: expert.isActive,
            onCheckedChange: handleToggle,
            disabled: toggling,
            "data-ocid": `admin.expert_toggle.${index}`,
            "aria-label": expert.isActive ? "Deactivate expert" : "Activate expert"
          }
        ) })
      ] }) })
    }
  );
}
function AddExpertForm({ onAdd }) {
  const [name, setName] = reactExports.useState("");
  const [spec, setSpec] = reactExports.useState("");
  const [contact, setContact] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !spec) {
      ue.error("Name and specialization are required.");
      return;
    }
    setSaving(true);
    try {
      await onAdd(name.trim(), spec, contact.trim());
      setName("");
      setSpec("");
      setContact("");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-border shadow-subtle",
      "data-ocid": "admin.add_expert_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 text-accent" }),
          "Add New Expert"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-body text-muted-foreground", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "e.g. Dr. Ramesh Kumar",
                className: "font-body text-sm h-9",
                "data-ocid": "admin.expert_name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-body text-muted-foreground", children: "Specialization *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: spec, onValueChange: setSpec, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "font-body text-sm h-9",
                  "data-ocid": "admin.expert_spec_select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select specialization" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: Specialization.agriculture,
                    className: "font-body text-sm",
                    children: "Agriculture / Farming"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: Specialization.fishery,
                    className: "font-body text-sm",
                    children: "Fishery"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: Specialization.poultry,
                    className: "font-body text-sm",
                    children: "Poultry"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: Specialization.goatFarming,
                    className: "font-body text-sm",
                    children: "Goat Farming"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-body text-muted-foreground", children: "Contact Info (phone / email)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: contact,
                onChange: (e) => setContact(e.target.value),
                placeholder: "e.g. +91 98765 43210",
                className: "font-body text-sm h-9",
                "data-ocid": "admin.expert_contact_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: saving,
              className: "w-full gradient-primary text-white border-0 font-body text-sm",
              "data-ocid": "admin.add_expert_submit_button",
              children: saving ? "Adding…" : "Add Expert"
            }
          )
        ] }) })
      ]
    }
  );
}
function CaseDetail({ c, index, experts, onSave }) {
  const [status, setStatus] = reactExports.useState(c.status);
  const [expertId, setExpertId] = reactExports.useState(
    c.assignedExpertId !== void 0 ? String(c.assignedExpertId) : "none"
  );
  const [notes, setNotes] = reactExports.useState(c.adminNotes ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  async function handleSave() {
    setSaving(true);
    try {
      const resolvedExpertId = expertId !== "none" ? BigInt(expertId) : void 0;
      await onSave(c.id, status, resolvedExpertId, notes);
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 pb-4 pt-3 bg-muted/10 border-t border-border",
      "data-ocid": `admin.case_detail.${index}`,
      children: [
        c.photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: c.photoUrl,
            alt: "Uploaded attachment for this case",
            className: "rounded-lg border border-border h-32 object-cover w-full sm:w-64"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mb-3 leading-relaxed", children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground font-medium", children: "Update Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "font-body text-sm h-9",
                  "data-ocid": `admin.case_status_select.${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(CaseStatus).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "font-body text-sm", children: STATUS_LABELS[s] ?? s }, s)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground font-medium", children: "Assign Expert" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: expertId, onValueChange: setExpertId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "font-body text-sm h-9",
                  "data-ocid": `admin.case_expert_select.${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select expert" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", className: "font-body text-sm", children: "Unassigned" }),
                experts.filter((e) => e.isActive).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SelectItem,
                  {
                    value: String(e.id),
                    className: "font-body text-sm",
                    children: [
                      e.name,
                      " (",
                      BUSINESS_LABELS[e.specialization] ?? e.specialization,
                      ")"
                    ]
                  },
                  String(e.id)
                ))
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground font-medium", children: "Admin Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "Add internal notes, next steps, visit summary…",
              className: "font-body text-sm min-h-[80px] resize-none",
              "data-ocid": `admin.case_notes_textarea.${index}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: handleSave,
            disabled: saving,
            className: "gradient-primary text-white border-0 font-body text-xs",
            "data-ocid": `admin.case_save_button.${index}`,
            children: saving ? "Saving…" : "Save Changes"
          }
        )
      ]
    }
  );
}
function CasesTab({ cases, experts, loading, onSaveCase }) {
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [expandedCase, setExpandedCase] = reactExports.useState(null);
  const filtered = cases.filter((c) => {
    const matchSearch = String(c.id).includes(search) || (BUSINESS_LABELS[c.businessType] ?? c.businessType).toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const total = cases.length;
  const pending = cases.filter((c) => c.status === CaseStatus.pending).length;
  const inProgress = cases.filter(
    (c) => c.status === CaseStatus.inProgress
  ).length;
  const completed = cases.filter(
    (c) => c.status === CaseStatus.completed
  ).length;
  const stats = [
    {
      label: "Total Cases",
      value: total,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
      bg: "bg-primary/10",
      ocid: "admin.stat_total_card"
    },
    {
      label: "Pending",
      value: pending,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5", style: { color: "#92400e" } }),
      bg: "bg-primary/5",
      ocid: "admin.stat_pending_card"
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary" }),
      bg: "bg-primary/10",
      ocid: "admin.stat_in_progress_card"
    },
    {
      label: "Completed",
      value: completed,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent" }),
      bg: "bg-accent/10",
      ocid: "admin.stat_completed_card"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSkeleton, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border shadow-subtle",
        "data-ocid": s.ocid,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`,
              children: s.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground", children: s.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: s.label })
          ] })
        ] })
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by Case ID, type, or keyword…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9 font-body text-sm",
            "data-ocid": "admin.search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "font-body text-sm h-10 w-full sm:w-44",
            "data-ocid": "admin.status_filter_select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", className: "font-body text-sm", children: "All Statuses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: CaseStatus.pending,
              className: "font-body text-sm",
              children: "Pending"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: CaseStatus.inProgress,
              className: "font-body text-sm",
              children: "In Progress"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: CaseStatus.completed,
              className: "font-body text-sm",
              children: "Completed"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border shadow-subtle",
        "data-ocid": "admin.cases_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All Cases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-body text-xs", children: [
              filtered.length,
              " shown"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(CaseListSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-12",
              "data-ocid": "admin.cases_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "No cases found." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `admin.case.item.${i + 1}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/20 transition-smooth cursor-pointer text-left",
                onClick: () => setExpandedCase(expandedCase === c.id ? null : c.id),
                "data-ocid": `admin.case_toggle.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
                        "#",
                        String(c.id).padStart(4, "0")
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-body", children: BUSINESS_LABELS[c.businessType] ?? c.businessType })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-body line-clamp-1", children: c.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: [
                      "User: ",
                      fmtPrincipal(c.userId),
                      " · ",
                      fmtDate(c.createdAt)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "text-xs font-body border",
                        style: STATUS_COLORS[c.status] ?? {},
                        children: STATUS_LABELS[c.status] ?? c.status
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronDown,
                      {
                        className: `w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedCase === c.id ? "rotate-180" : ""}`
                      }
                    )
                  ] })
                ]
              }
            ),
            expandedCase === c.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
              CaseDetail,
              {
                c,
                index: i + 1,
                experts,
                onSave: onSaveCase
              }
            )
          ] }, String(c.id))) }) })
        ]
      }
    )
  ] });
}
function ExpertsTab({ experts, loading, onToggle, onAdd }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddExpertForm, { onAdd }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "border-border shadow-subtle",
        "data-ocid": "admin.experts_card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-display flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-accent" }),
            "Expert Directory (",
            experts.length,
            ")"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, i)) }) : experts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10",
              "data-ocid": "admin.experts_empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "No experts added yet. Use the form above to add one." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: experts.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ExpertCard,
            {
              expert: e,
              index: i + 1,
              onToggle
            },
            String(e.id)
          )) }) })
        ]
      }
    )
  ] });
}
function AdminContent() {
  const backend = useBackend();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("cases");
  const [cases, setCases] = reactExports.useState([]);
  const [experts, setExperts] = reactExports.useState([]);
  const [loadingCases, setLoadingCases] = reactExports.useState(true);
  const [loadingExperts, setLoadingExperts] = reactExports.useState(true);
  const [adminChecked, setAdminChecked] = reactExports.useState(false);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function checkAdmin() {
      try {
        const ok = await backend.checkIsAdmin();
        setIsAdmin(ok);
      } catch {
        setIsAdmin(false);
      } finally {
        setAdminChecked(true);
      }
    }
    checkAdmin();
  }, [backend]);
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    async function loadCases() {
      setLoadingCases(true);
      try {
        const data = await backend.listAllCases();
        setCases(data);
      } catch {
        ue.error("Failed to load cases.");
      } finally {
        setLoadingCases(false);
      }
    }
    async function loadExperts() {
      setLoadingExperts(true);
      try {
        const data = await backend.listExperts();
        setExperts(data);
      } catch {
        ue.error("Failed to load experts.");
      } finally {
        setLoadingExperts(false);
      }
    }
    loadCases();
    loadExperts();
  }, [backend, isAdmin]);
  if (!adminChecked) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "admin.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 w-full max-w-sm px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4 rounded-md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/2 rounded-md" })
        ] })
      }
    );
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] px-6 text-center",
        "data-ocid": "admin.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Access Restricted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-xs mb-6", children: "This area is reserved for platform administrators. Please log in with an admin account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/dashboard" }),
              className: "gradient-primary text-white border-0 font-body",
              "data-ocid": "admin.go_dashboard_button",
              children: "Go to Dashboard"
            }
          )
        ]
      }
    );
  }
  async function handleSaveCase(id, status, assignedExpertId, adminNotes) {
    try {
      const updated = await backend.updateCase(id, {
        status,
        ...assignedExpertId !== void 0 ? { assignedExpertId } : {},
        adminNotes: adminNotes || void 0
      });
      if (updated) {
        setCases((prev) => prev.map((c) => c.id === id ? updated : c));
        ue.success("Case updated successfully.");
      }
    } catch {
      ue.error("Failed to update case.");
    }
  }
  async function handleToggleExpert(id, active) {
    try {
      const updated = await backend.setExpertActive(id, active);
      if (updated) {
        setExperts((prev) => prev.map((e) => e.id === id ? updated : e));
        ue.success(`Expert ${active ? "activated" : "deactivated"}.`);
      }
    } catch {
      ue.error("Failed to update expert status.");
    }
  }
  async function handleAddExpert(name, spec, contact) {
    try {
      const newExpert = await backend.addExpert({
        name,
        specialization: spec,
        contactInfo: contact
      });
      setExperts((prev) => [...prev, newExpert]);
      ue.success(`Expert "${name}" added successfully.`);
    } catch {
      ue.error("Failed to add expert.");
    }
  }
  const tabs = [
    {
      id: "cases",
      label: "Cases",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" })
    },
    {
      id: "experts",
      label: "Experts",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg gradient-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Admin Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body ml-11", children: "Manage service requests, assign experts, and oversee the platform." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 p-1 bg-muted/40 rounded-lg border border-border mb-6 w-fit",
        "data-ocid": "admin.tabs",
        children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth ${activeTab === tab.id ? "bg-card text-foreground shadow-subtle" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `admin.${tab.id}_tab`,
            children: [
              tab.icon,
              tab.label,
              tab.id === "cases" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "ml-1 text-xs font-body h-5 min-w-[20px] justify-center",
                  children: cases.length
                }
              ),
              tab.id === "experts" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "ml-1 text-xs font-body h-5 min-w-[20px] justify-center",
                  children: experts.length
                }
              )
            ]
          },
          tab.id
        ))
      }
    ),
    activeTab === "cases" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      CasesTab,
      {
        cases,
        experts,
        loading: loadingCases,
        onSaveCase: handleSaveCase
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExpertsTab,
      {
        experts,
        loading: loadingExperts,
        onToggle: handleToggleExpert,
        onAdd: handleAddExpert
      }
    )
  ] });
}
function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[60vh]",
        "data-ocid": "admin.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 w-full max-w-sm px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-3/4 rounded-md" })
        ] })
      }
    ) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminContent, {}) });
}
export {
  AdminPage as default
};
