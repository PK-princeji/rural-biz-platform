import { r as reactExports, j as jsxRuntimeExports, v as Skeleton } from "./index-D5CkRmqC.js";
import { E as EnrollmentStatus } from "./backend.d-Gv2yjQfN.js";
import { B as Badge } from "./badge-B_aNeSKq.js";
import { c as createLucideIcon, u as useAuth, L as Layout, B as Button, C as Clock } from "./Layout-D66vg4zp.js";
import { C as Card, b as CardHeader, a as CardContent, d as CardFooter } from "./card-CoZItkaf.js";
import { u as useBackend } from "./useBackend-DRPDFQde.js";
import { u as ue } from "./index-D49uVNl_.js";
import { B as BookOpen } from "./book-open-CQTKi6qJ.js";
import { C as CircleCheck } from "./circle-check-BjrctCVz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 7h.01", key: "1kdx03" }],
  ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20", key: "oj1oa8" }],
  ["path", { d: "m20 7 2 .5-2 .5", key: "12nv4d" }],
  ["path", { d: "M10 18v3", key: "1yea0a" }],
  ["path", { d: "M14 17.75V21", key: "1pymcb" }],
  ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61", key: "1npnn0" }]
];
const Bird = createLucideIcon("bird", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
      key: "15baut"
    }
  ],
  ["path", { d: "M18 12v.5", key: "18hhni" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
      key: "l9di03"
    }
  ],
  [
    "path",
    { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4", key: "1kjonw" }
  ],
  [
    "path",
    { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98", key: "1zlm23" }
  ]
];
const Fish = createLucideIcon("fish", __iconNode$2);
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
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SECTOR_FILTERS = [
  { key: "All", label: "All", labelHi: "सभी" },
  { key: "Farming", label: "Agriculture", labelHi: "कृषि" },
  { key: "Fishery", label: "Fishery", labelHi: "मत्स्य" },
  { key: "Poultry", label: "Poultry", labelHi: "मुर्गीपालन" },
  { key: "GoatFarming", label: "Goat Farming", labelHi: "बकरी पालन" }
];
function sectorIcon(sector, className = "w-5 h-5") {
  switch (sector) {
    case "Fishery":
    case "fish":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Fish, { className });
    case "Poultry":
    case "poultry":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Bird, { className });
    case "GoatFarming":
    case "goatFarming":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: `${className} rotate-45` });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className });
  }
}
function sectorLabel(sector) {
  switch (sector) {
    case "Farming":
    case "agriculture":
      return "Agriculture";
    case "Fishery":
    case "fish":
      return "Fishery";
    case "Poultry":
    case "poultry":
      return "Poultry";
    case "GoatFarming":
    case "goatFarming":
      return "Goat Farming";
    default:
      return sector;
  }
}
function sectorBadgeClass(_sector) {
  return "bg-primary/10 text-primary border-primary/20";
}
function sectorIconBg(_sector) {
  return "bg-primary/10 text-primary";
}
function TrainingCard({
  program,
  enrollment,
  onEnroll,
  enrolling,
  index
}) {
  const isEnrolled = !!enrollment;
  const statusLabel = (enrollment == null ? void 0 : enrollment.status) === EnrollmentStatus.completed ? "Completed" : (enrollment == null ? void 0 : enrollment.status) === EnrollmentStatus.ongoing ? "Ongoing" : "Enrolled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "flex flex-col bg-card border-border hover:border-accent/40 hover:shadow-elevated transition-smooth",
      "data-ocid": `trainings.card.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sectorIconBg(program.sector)}`,
                children: sectorIcon(program.sector)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-xs shrink-0 ${sectorBadgeClass(program.sector)}`,
                children: sectorLabel(program.sector)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-snug mt-3", children: program.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 py-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed line-clamp-3", children: program.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body", children: program.duration })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "pt-4", children: isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent text-sm font-body font-medium",
            "data-ocid": `trainings.enrolled_badge.${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                statusLabel,
                " ✓"
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full min-h-[44px] gradient-primary text-white border-0 font-body font-semibold transition-smooth hover:opacity-90",
            disabled: enrolling,
            onClick: () => onEnroll(program.id),
            "data-ocid": `trainings.enroll_button.${index}`,
            children: enrolling ? "Enrolling…" : "Enroll Now / अभी जुड़ें"
          }
        ) })
      ]
    }
  );
}
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];
function TrainingCardSkeleton({ n }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: SKELETON_KEYS.slice(0, n).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-20 h-5 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 mt-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 mt-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full mt-3 rounded-lg" })
      ]
    },
    key
  )) });
}
function TrainingsPage() {
  const backend = useBackend();
  const { isAuthenticated } = useAuth();
  const [programs, setPrograms] = reactExports.useState([]);
  const [enrollments, setEnrollments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [enrollingId, setEnrollingId] = reactExports.useState(null);
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  reactExports.useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const progs = await backend.listTrainingPrograms();
        setPrograms(progs.filter((p) => p.isActive));
        if (isAuthenticated) {
          try {
            const enrs = await backend.getMyTrainingEnrollments();
            setEnrollments(enrs);
          } catch {
          }
        }
      } catch {
        ue.error("Could not load training programs. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [backend, isAuthenticated]);
  const enrollmentMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const e of enrollments) {
      map.set(e.programId, e);
    }
    return map;
  }, [enrollments]);
  const filtered = reactExports.useMemo(() => {
    if (activeFilter === "All") return programs;
    const sectorKey = activeFilter === "GoatFarming" ? "goatFarming" : activeFilter === "Farming" ? "agriculture" : activeFilter === "Fishery" ? "fish" : "poultry";
    return programs.filter(
      (p) => p.sector === activeFilter || p.sector === sectorKey || activeFilter === "Farming" && p.sector === "agriculture" || activeFilter === "Fishery" && p.sector === "fish" || activeFilter === "Poultry" && p.sector === "poultry" || activeFilter === "GoatFarming" && p.sector === "goatFarming"
    );
  }, [programs, activeFilter]);
  async function handleEnroll(programId) {
    if (!isAuthenticated) {
      ue.error("Please log in to enroll in a training program.", {
        action: {
          label: "Log In",
          onClick: () => {
            window.location.href = "/login";
          }
        }
      });
      return;
    }
    setEnrollingId(programId);
    try {
      const result = await backend.enrollInTraining({ programId });
      setEnrollments((prev) => [...prev, result]);
      ue.success("Successfully enrolled! / नामांकन सफल रहा!", {
        description: "You can track your training progress in your Dashboard.",
        duration: 5e3
      });
    } catch {
      ue.error("Enrollment failed. Please try again.");
    } finally {
      setEnrollingId(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: "Training Programs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body font-medium", children: "प्रशिक्षण कार्यक्रम" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm sm:text-base mt-3 max-w-2xl", children: "Enroll in expert-led programs to build skills for your business. Learn farming, fishery, poultry, and goat farming at your own pace." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 border-b border-border px-4 py-3 sticky top-16 z-30",
        "data-ocid": "trainings.filter_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground shrink-0 mr-1" }),
          SECTOR_FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveFilter(f.key),
              className: `shrink-0 px-4 py-2 rounded-full text-xs font-body font-semibold transition-smooth border whitespace-nowrap min-h-[36px] ${activeFilter === f.key ? "gradient-primary text-white border-transparent" : "bg-card text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"}`,
              "data-ocid": `trainings.filter.${f.key.toLowerCase()}`,
              children: [
                f.label,
                " / ",
                f.labelHi
              ]
            },
            f.key
          ))
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-10 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrainingCardSkeleton, { n: 6 }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
        "data-ocid": "trainings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: "No Programs Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body text-sm max-w-xs", children: "No training programs available for this sector yet. Check back soon or explore all programs." }),
          activeFilter !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setActiveFilter("All"),
              className: "mt-2 border-primary/30 text-primary hover:bg-primary/5",
              "data-ocid": "trainings.show_all_button",
              children: "Show All Programs"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mb-6", children: [
        filtered.length,
        " program",
        filtered.length !== 1 ? "s" : "",
        " ",
        "available"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "trainings.list",
          children: filtered.map((program, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrainingCard,
            {
              program,
              enrollment: enrollmentMap.get(program.id),
              onEnroll: handleEnroll,
              enrolling: enrollingId === program.id,
              index: i + 1
            },
            String(program.id)
          ))
        }
      )
    ] }) }) })
  ] });
}
export {
  TrainingsPage as default
};
