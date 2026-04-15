import { j as jsxRuntimeExports, r as reactExports, u as useNavigate } from "./index-O5tV6rR5.js";
import { B as Badge } from "./badge-u5RDyA2v.js";
import { c as createLucideIcon, L as Layout, B as Button, X } from "./Layout-qmqpYqra.js";
import { C as Card, a as CardContent } from "./card-CjrEt6Gr.js";
import { L as Label } from "./label-4fuT35kM.js";
import { T as Textarea } from "./textarea-CcaxOp0A.js";
import { u as ue } from "./index-Dc8nAsRh.js";
import { u as useBackend, S as Specialization, E as ExternalBlob } from "./useBackend-CyykzDSA.js";
import { P as ProtectedRoute } from "./ProtectedRoute-D1sTleuh.js";
import { A as AnimatePresence, m as motion } from "./proxy-Cwo9Hx36.js";
import { C as CircleCheck } from "./circle-check-4npBgBdk.js";
import { E as Eye } from "./eye-CgU12s-N.js";
import { C as ChevronRight } from "./chevron-right-8dmWaKxe.js";
import { L as LoaderCircle } from "./loader-circle-DD3K64_K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const BUSINESS_TYPES = [
  {
    value: Specialization.agriculture,
    label: "Agriculture",
    icon: "🌾",
    desc: "Crops, wheat, rice, vegetables"
  },
  {
    value: Specialization.fishery,
    label: "Fishery",
    icon: "🐟",
    desc: "Fish farming, ponds, aquaculture"
  },
  {
    value: Specialization.poultry,
    label: "Poultry",
    icon: "🐔",
    desc: "Hens, eggs, broiler farming"
  },
  {
    value: Specialization.goatFarming,
    label: "Goat Farming",
    icon: "🐐",
    desc: "Goat breeds, health, milk, meat"
  }
];
const MIN_DESCRIPTION = 20;
const MAX_DESCRIPTION = 800;
const STEPS = [
  { id: 1, label: "Business Type", icon: ClipboardList },
  { id: 2, label: "Photo", icon: Camera },
  { id: 3, label: "Review", icon: Eye }
];
function StepBar({ currentStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center justify-center gap-0 mb-8",
      "data-ocid": "request.step_bar",
      children: STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth ${isCompleted ? "border-accent bg-accent text-accent-foreground" : isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`,
                children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-body font-medium hidden sm:block ${isActive ? "text-primary" : isCompleted ? "text-accent" : "text-muted-foreground"}`,
                children: step.label
              }
            )
          ] }),
          idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-16 sm:w-24 h-0.5 mx-1 mb-5 transition-smooth ${currentStep > step.id ? "bg-accent" : "bg-border"}`
            }
          )
        ] }, step.id);
      })
    }
  );
}
function Step1({
  businessType,
  description,
  onBusinessType,
  onDescription,
  onNext
}) {
  const descLen = description.trim().length;
  const tooShort = descLen > 0 && descLen < MIN_DESCRIPTION;
  const canProceed = businessType !== null && descLen >= MIN_DESCRIPTION;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-body font-semibold text-foreground", children: [
            "Select Your Business Type",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: BUSINESS_TYPES.map((bt) => {
            const active = businessType === bt.value;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => onBusinessType(bt.value),
                "data-ocid": `request.business_type_${bt.value}_button`,
                className: `p-4 rounded-xl border-2 text-left flex flex-col gap-2 transition-smooth min-h-[80px] touch-manipulation ${active ? "border-accent bg-accent/10 shadow-elevated" : "border-border bg-card hover:border-accent/40 hover:bg-accent/5"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: bt.icon }),
                    active && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent ml-auto" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm font-body font-semibold ${active ? "text-accent" : "text-foreground"}`,
                        children: bt.label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-tight mt-0.5", children: bt.desc })
                  ] })
                ]
              },
              bt.value
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "description",
                className: "text-sm font-body font-semibold text-foreground",
                children: [
                  "Describe Your Problem or Need",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-mono tabular-nums ${descLen >= MIN_DESCRIPTION ? "text-accent" : "text-muted-foreground"}`,
                children: [
                  descLen,
                  "/",
                  MAX_DESCRIPTION
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "description",
              placeholder: "e.g. My wheat crop has developed yellow spots on the leaves over the last 3 days. Around 30% of the field is affected. I need help identifying the disease and the correct pesticide treatment.",
              value: description,
              onChange: (e) => onDescription(e.target.value.slice(0, MAX_DESCRIPTION)),
              rows: 5,
              className: `font-body resize-none text-base transition-smooth ${tooShort ? "border-destructive focus-visible:ring-destructive/50" : ""}`,
              "data-ocid": "request.description_textarea"
            }
          ),
          tooShort && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-xs text-destructive font-body",
              "data-ocid": "request.description_field_error",
              children: [
                "Please write at least ",
                MIN_DESCRIPTION,
                " characters (",
                MIN_DESCRIPTION - descLen,
                " more needed)."
              ]
            }
          ),
          !tooShort && descLen === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Be as specific as possible — more detail leads to faster, better support." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            onClick: onNext,
            disabled: !canProceed,
            className: "w-full h-12 font-body font-semibold text-base gradient-primary text-white border-0 hover:opacity-90 transition-smooth",
            "data-ocid": "request.step1_next_button",
            children: [
              "Continue to Photo Upload",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
            ]
          }
        )
      ] })
    },
    "step1"
  );
}
function Step2({ photoFile, onPhotoFile, onNext, onBack }) {
  const [dragging, setDragging] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file == null ? void 0 : file.type.startsWith("image/")) {
        onPhotoFile(file);
      } else if (file) {
        ue.error("Please upload an image file (JPG, PNG, etc.)");
      }
    },
    [onPhotoFile]
  );
  const handleFileChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
    if (file == null ? void 0 : file.type.startsWith("image/")) {
      onPhotoFile(file);
    } else if (file) {
      ue.error("Please select an image file.");
    }
  };
  const previewUrl = photoFile ? URL.createObjectURL(photoFile) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-body font-semibold text-foreground", children: [
            "Upload a Photo",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(Optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "A clear photo of your crop, animal, or problem helps experts diagnose faster." })
        ] }),
        !photoFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onDrop: handleDrop,
            onDragOver: (e) => {
              e.preventDefault();
              setDragging(true);
            },
            onDragLeave: () => setDragging(false),
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            "data-ocid": "request.photo_dropzone",
            className: `w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth min-h-[200px] touch-manipulation ${dragging ? "border-accent bg-accent/10 scale-[1.01]" : "border-border bg-muted/30 hover:border-accent/50 hover:bg-accent/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-14 h-14 rounded-full flex items-center justify-center transition-smooth ${dragging ? "bg-accent/20" : "bg-muted"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Upload,
                    {
                      className: `w-6 h-6 transition-smooth ${dragging ? "text-accent" : "text-muted-foreground"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body font-semibold text-foreground", children: dragging ? "Release to upload" : "Drag & drop your photo here" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1", children: "or tap to browse your device" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-2", children: "JPG, PNG, WEBP — max 10MB" })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-xl overflow-hidden border-2 border-accent/40 bg-card",
            "data-ocid": "request.photo_preview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: previewUrl ?? "",
                  alt: "Crop or field condition",
                  className: "w-full max-h-64 object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onPhotoFile(null);
                    if (fileRef.current) fileRef.current.value = "";
                  },
                  "data-ocid": "request.photo_remove_button",
                  className: "absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90 transition-smooth shadow-elevated",
                  "aria-label": "Remove photo",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 bg-foreground/60 px-3 py-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-background shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-background font-body truncate", children: photoFile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto shrink-0 text-xs", children: [
                  (photoFile.size / 1024).toFixed(0),
                  " KB"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/*",
            capture: "environment",
            className: "sr-only",
            onChange: handleFileChange,
            "data-ocid": "request.photo_upload_button",
            "aria-label": "Upload photo"
          }
        ),
        !photoFile && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            "data-ocid": "request.camera_button",
            className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-sm font-body font-medium text-muted-foreground hover:border-accent/40 hover:text-foreground transition-smooth touch-manipulation",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
              "Take Photo with Camera"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onBack,
              className: "flex-1 h-12 font-body border-border",
              "data-ocid": "request.step2_back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: onNext,
              className: "flex-[2] h-12 font-body font-semibold gradient-primary text-white border-0 hover:opacity-90 transition-smooth",
              "data-ocid": "request.step2_next_button",
              children: [
                "Review Request",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
              ]
            }
          )
        ] })
      ] })
    },
    "step2"
  );
}
function Step3({
  businessType,
  description,
  photoFile,
  loading,
  onSubmit,
  onBack
}) {
  const btInfo = BUSINESS_TYPES.find((b) => b.value === businessType);
  const previewUrl = photoFile ? URL.createObjectURL(photoFile) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -40 },
      transition: { duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-display font-bold text-foreground", children: "Review Your Request" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Please confirm the details below before submitting." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 divide-y divide-border overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: btInfo == null ? void 0 : btInfo.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground", children: "Business Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body font-semibold text-foreground", children: btInfo == null ? void 0 : btInfo.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "ml-auto text-accent border-accent/30 font-body text-xs",
                children: "Selected"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mb-1", children: "Your Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground leading-relaxed line-clamp-4", children: description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-1", children: [
              description.length,
              " characters"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 flex items-center gap-3", children: previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: previewUrl,
                alt: "Attached",
                className: "w-12 h-12 rounded-lg object-cover border border-border"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground", children: "Photo Attached" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground truncate max-w-[180px]", children: photoFile == null ? void 0 : photoFile.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent ml-auto shrink-0" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg border border-dashed border-border bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground", children: "Photo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-muted-foreground italic", children: "Not attached (optional)" })
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-primary/5 border border-primary/20 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-body leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "What happens next?" }),
          " After submission you'll receive a unique Case ID. An expert from our team will be assigned within 24 hours and will contact you directly."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onBack,
              disabled: loading,
              className: "flex-1 h-12 font-body border-border",
              "data-ocid": "request.step3_back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4 mr-1" }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: onSubmit,
              disabled: loading,
              className: "flex-[2] h-12 font-body font-semibold bg-accent hover:bg-accent/90 text-accent-foreground border-0 transition-smooth",
              "data-ocid": "request.submit_button",
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Submitting…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                "Submit Request"
              ] })
            }
          )
        ] })
      ] })
    },
    "step3"
  );
}
function SuccessState({ caseId, onSubmitAnother }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, type: "spring", bounce: 0.2 },
      className: "text-center py-4",
      "data-ocid": "request.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Request Submitted!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-xs mx-auto mb-7 leading-relaxed", children: "Your service request has been received. An expert will be assigned within 24 hours and will contact you directly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-accent/10 border-2 border-accent/30 rounded-2xl p-5 mb-7 max-w-xs mx-auto",
            "data-ocid": "request.case_id_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body uppercase tracking-wider mb-2", children: "Your Case ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-mono font-bold text-accent tracking-widest", children: [
                "#",
                caseId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-2 leading-relaxed", children: "Save this number to track your case status on the dashboard." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 max-w-xs mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => void navigate({ to: "/dashboard" }),
              className: "flex-1 h-12 gradient-primary text-white border-0 font-body font-semibold hover:opacity-90 transition-smooth",
              "data-ocid": "request.view_dashboard_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4 mr-2" }),
                "View Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onSubmitAnother,
              className: "flex-1 h-12 font-body border-border",
              "data-ocid": "request.submit_another_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 mr-2" }),
                "New Request"
              ]
            }
          )
        ] })
      ]
    },
    "success"
  );
}
function ServiceRequestContent() {
  const backend = useBackend();
  const [step, setStep] = reactExports.useState(1);
  const [businessType, setBusinessType] = reactExports.useState(
    Specialization.agriculture
  );
  const [description, setDescription] = reactExports.useState("");
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [caseId, setCaseId] = reactExports.useState(null);
  const resetForm = () => {
    setStep(1);
    setBusinessType(Specialization.agriculture);
    setDescription("");
    setPhotoFile(null);
    setCaseId(null);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let photoUrl;
      if (photoFile) {
        try {
          const bytes = new Uint8Array(await photoFile.arrayBuffer());
          const blob = ExternalBlob.fromBytes(bytes);
          await blob.getBytes();
          photoUrl = blob.getDirectURL();
        } catch {
          ue.error("Photo upload failed. Submitting without photo.");
        }
      }
      const result = await backend.submitCase({
        businessType,
        description,
        photoUrl
      });
      setCaseId(result.id);
      ue.success("Request submitted successfully!");
    } catch (err) {
      console.error(err);
      ue.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (caseId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessState, { caseId, onSubmitAnother: resetForm });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepBar, { currentStep: step }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step1,
        {
          businessType,
          description,
          onBusinessType: setBusinessType,
          onDescription: setDescription,
          onNext: () => setStep(2)
        },
        "step1"
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step2,
        {
          photoFile,
          onPhotoFile: setPhotoFile,
          onNext: () => setStep(3),
          onBack: () => setStep(1)
        },
        "step2"
      ),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Step3,
        {
          businessType,
          description,
          photoFile,
          loading,
          onSubmit: () => void handleSubmit(),
          onBack: () => setStep(2)
        },
        "step3"
      )
    ] })
  ] });
}
function ServiceRequestPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-4rem)] bg-muted/20 py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-center", "data-ocid": "request.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground", children: "Submit a Service Request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-2 max-w-sm mx-auto", children: "Tell us about your business problem and our expert team will guide you to success." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5 sm:p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceRequestContent, {}) }) })
  ] }) }) }) });
}
export {
  ServiceRequestPage as default
};
