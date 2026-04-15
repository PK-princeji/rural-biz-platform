import { r as reactExports, j as jsxRuntimeExports, v as Skeleton } from "./index-CbMjLiSd.js";
import { B as Badge } from "./badge-C9dywN_6.js";
import { u as useAuth, L as Layout, B as Button } from "./Layout-CayYN9jf.js";
import { C as Card, a as CardContent } from "./card-CkHY7Fg9.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CgD8sQJL.js";
import { I as Input } from "./input-CpM9KcBq.js";
import { L as Label } from "./label-JZLWgNgm.js";
import { u as ue } from "./index-Lnm63IYE.js";
import { R as ResourceCategory } from "./backend.d-Gv2yjQfN.js";
import { u as useBackend } from "./useBackend-Yzy7tc2i.js";
const CATEGORIES = [
  { value: "all", label: "All Resources", icon: "🌟" },
  { value: ResourceCategory.goat, label: "Goat Breeds", icon: "🐐" },
  { value: ResourceCategory.fish, label: "Fish Seeds", icon: "🐟" },
  { value: ResourceCategory.poultry, label: "Poultry", icon: "🐔" },
  { value: ResourceCategory.seeds, label: "Seeds & Feed", icon: "🌱" }
];
const CATEGORY_ICON = {
  [ResourceCategory.goat]: "🐐",
  [ResourceCategory.fish]: "🐟",
  [ResourceCategory.poultry]: "🐔",
  [ResourceCategory.seeds]: "🌱"
};
const CATEGORY_LABEL = {
  [ResourceCategory.goat]: "Goat Breed",
  [ResourceCategory.fish]: "Fish Seeds",
  [ResourceCategory.poultry]: "Poultry",
  [ResourceCategory.seeds]: "Seeds & Feed"
};
const STATUS_LABEL = {
  pending: "Pending",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
const STATUS_COLOR = {
  pending: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
    borderColor: "#fde047"
  },
  processing: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderColor: "#93c5fd"
  },
  delivered: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderColor: "#86efac"
  },
  cancelled: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderColor: "#fca5a5"
  }
};
function RequestModal({
  resource,
  open,
  onClose,
  onSubmit
}) {
  const [quantity, setQuantity] = reactExports.useState("1");
  const [location, setLocation] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [requestId, setRequestId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (open) {
      setQuantity("1");
      setLocation("");
      setRequestId(null);
    }
  }, [open]);
  async function handleSubmit(e) {
    e.preventDefault();
    const qty = Number.parseInt(quantity, 10);
    if (!qty || qty < 1) return;
    if (!location.trim()) return;
    setLoading(true);
    try {
      const id = await onSubmit(qty, location.trim());
      setRequestId(id);
    } catch {
      ue.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-md",
      "data-ocid": "resources.request_modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-foreground", children: requestId ? "Request Submitted!" : "Request Resource" }) }),
        requestId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-5 py-4 text-center",
            "data-ocid": "resources.request_modal.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl", children: "✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground mb-1", children: "Your supply request has been submitted successfully." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm mt-3", children: "Request ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-primary font-bold text-lg mt-1 bg-muted px-4 py-2 rounded-lg", children: [
                  "#",
                  requestId
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full gradient-primary text-white border-0 font-body",
                  onClick: onClose,
                  "data-ocid": "resources.request_modal.close_button",
                  children: "Done"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 py-2", children: [
          resource && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: CATEGORY_ICON[resource.category] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: resource.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: CATEGORY_LABEL[resource.category] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "quantity",
                className: "font-body text-sm font-medium",
                children: "Quantity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "quantity",
                type: "number",
                min: "1",
                value: quantity,
                onChange: (e) => setQuantity(e.target.value),
                placeholder: "Enter quantity",
                className: "font-body",
                required: true,
                "data-ocid": "resources.request_modal.quantity_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "location",
                className: "font-body text-sm font-medium",
                children: "Delivery Location"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "location",
                type: "text",
                value: location,
                onChange: (e) => setLocation(e.target.value),
                placeholder: "Village, District, State",
                className: "font-body",
                required: true,
                "data-ocid": "resources.request_modal.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "flex-1 font-body",
                onClick: onClose,
                "data-ocid": "resources.request_modal.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: loading,
                className: "flex-1 gradient-primary text-white border-0 font-body",
                "data-ocid": "resources.request_modal.submit_button",
                children: loading ? "Submitting…" : "Submit Request"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function ResourceCard({ resource, index, onRequest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `border-border shadow-subtle hover:shadow-elevated transition-smooth flex flex-col ${!resource.isAvailable ? "opacity-60" : ""}`,
      "data-ocid": `resources.resource_card.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-2xl shrink-0", children: CATEGORY_ICON[resource.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2", children: resource.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mt-1 text-xs font-body border-primary/30 text-primary",
                children: CATEGORY_LABEL[resource.category]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed mb-3 flex-1 line-clamp-3", children: resource.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: `text-xs font-body ${resource.isAvailable ? "border-accent/40 text-accent" : "border-muted-foreground/30 text-muted-foreground"}`,
            "data-ocid": `resources.availability_badge.item.${index}`,
            children: resource.isAvailable ? "✓ In Stock" : "Out of Stock"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            disabled: !resource.isAvailable,
            onClick: () => onRequest(resource),
            className: "w-full gradient-primary text-white border-0 font-body font-medium hover:opacity-90 transition-smooth disabled:opacity-40",
            "data-ocid": `resources.request_button.item.${index}`,
            children: "Request Supply"
          }
        )
      ] })
    }
  );
}
function MyRequestRow({
  req,
  index,
  resourceMap
}) {
  const resource = resourceMap.get(req.resourceId.toString());
  const statusStr = String(req.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-smooth",
      "data-ocid": `resources.my_request.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", children: resource ? CATEGORY_ICON[resource.category] : "📦" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: resource ? resource.name : `Resource #${req.resourceId}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body", children: [
            "Qty: ",
            req.quantity.toString(),
            " · ",
            req.deliveryLocation
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-body font-medium px-2 py-0.5 rounded-full border",
              style: STATUS_COLOR[statusStr] ?? {
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)"
              },
              children: STATUS_LABEL[statusStr] ?? statusStr
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
            "#",
            req.id.toString()
          ] })
        ] })
      ]
    }
  );
}
function ResourcesPage() {
  const backend = useBackend();
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [resources, setResources] = reactExports.useState([]);
  const [myRequests, setMyRequests] = reactExports.useState([]);
  const [loadingResources, setLoadingResources] = reactExports.useState(true);
  const [loadingRequests, setLoadingRequests] = reactExports.useState(false);
  const [selectedResource, setSelectedResource] = reactExports.useState(
    null
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLoadingResources(true);
    backend.listResources().then((res) => setResources(res)).catch(() => ue.error("Failed to load resources.")).finally(() => setLoadingResources(false));
  }, [backend]);
  reactExports.useEffect(() => {
    if (!isAuthenticated) return;
    setLoadingRequests(true);
    backend.getMySupplyRequests().then((reqs) => setMyRequests(reqs)).catch(() => {
    }).finally(() => setLoadingRequests(false));
  }, [backend, isAuthenticated]);
  const resourceMap = new Map(resources.map((r) => [r.id.toString(), r]));
  const filtered = activeCategory === "all" ? resources : resources.filter((r) => r.category === activeCategory);
  function openModal(resource) {
    if (!isAuthenticated) {
      ue.error("Please log in to request a supply.", {
        action: {
          label: "Log In",
          onClick: () => {
            window.location.href = "/login";
          }
        }
      });
      return;
    }
    setSelectedResource(resource);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setSelectedResource(null);
  }
  async function handleSubmitRequest(quantity, deliveryLocation) {
    if (!selectedResource) throw new Error("No resource selected");
    const result = await backend.submitSupplyRequest({
      resourceId: selectedResource.id,
      quantity: BigInt(quantity),
      deliveryLocation
    });
    if (isAuthenticated) {
      backend.getMySupplyRequests().then(setMyRequests).catch(() => {
      });
    }
    return result.id.toString();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "gradient-primary text-white py-14 px-4",
        "data-ocid": "resources.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-display font-bold mb-3", children: "Resource Catalog" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 font-body text-lg max-w-xl mx-auto", children: "Quality livestock, seeds, and supplies sourced from verified partners — delivered to your village." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 bg-background",
        "data-ocid": "resources.catalog_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 flex-wrap mb-8",
              "data-ocid": "resources.category_filters",
              role: "tablist",
              "aria-label": "Resource categories",
              children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": activeCategory === cat.value,
                  onClick: () => setActiveCategory(cat.value),
                  className: `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-smooth border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${activeCategory === cat.value ? "gradient-primary text-white border-transparent shadow-subtle" : "bg-card border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"}`,
                  "data-ocid": `resources.category_filter.${cat.value}_tab`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.label })
                  ]
                },
                cat.value
              ))
            }
          ),
          loadingResources ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-11 rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-lg" })
          ] }) }, sk)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
              "data-ocid": "resources.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl", children: "🔍" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No resources found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "No resources available in this category yet." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "font-body mt-2",
                    onClick: () => setActiveCategory("all"),
                    "data-ocid": "resources.empty_state_reset_button",
                    children: "View All Resources"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5", children: filtered.map((resource, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResourceCard,
            {
              resource,
              index: i + 1,
              onRequest: openModal
            },
            resource.id.toString()
          )) })
        ] })
      }
    ),
    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 bg-muted/40 border-t border-border",
        "data-ocid": "resources.my_requests_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "My Supply Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Track the status of your resource requests." })
          ] }),
          loadingRequests ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["r1", "r2", "r3"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, sk)) }) : myRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-12 gap-3 text-center border border-border rounded-2xl bg-card",
              "data-ocid": "resources.my_requests.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "📦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No requests yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Request a resource from the catalog above to get started." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: myRequests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MyRequestRow,
            {
              req,
              index: i + 1,
              resourceMap
            },
            req.id.toString()
          )) })
        ] })
      }
    ),
    !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-muted/40 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm mb-1", children: "Want to track your supply requests?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "Log in to view your request history" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RequestModal,
      {
        resource: selectedResource,
        open: modalOpen,
        onClose: closeModal,
        onSubmit: handleSubmitRequest
      }
    )
  ] });
}
export {
  ResourcesPage as default
};
