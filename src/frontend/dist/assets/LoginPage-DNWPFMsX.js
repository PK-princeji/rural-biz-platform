import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-O5tV6rR5.js";
import { c as createLucideIcon, u as useAuth, L as Layout, S as Sprout, B as Button } from "./Layout-qmqpYqra.js";
import { C as Card, a as CardContent } from "./card-CjrEt6Gr.js";
import { S as Shield } from "./shield-DXsLMPK0.js";
import { Z as Zap } from "./zap-0fLTlHgv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
const BENEFITS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-5 h-5 text-accent" }),
    title: "Expert Guidance",
    desc: "Get matched with sector-specific experts for your business."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-accent" }),
    title: "Secure & Private",
    desc: "Your data is protected using Internet Identity — no passwords."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-accent" }),
    title: "Fast Support",
    desc: "Submit a request and receive a unique Case ID instantly."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-accent" }),
    title: "Rural First",
    desc: "Built for farmers, youth, and women entrepreneurs."
  }
];
function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background py-16 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-elevated mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-9 h-9 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground text-center", children: "Welcome to Rural Biz" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body text-center mt-1 max-w-xs", children: "Sign in with Internet Identity to access your dashboard, track your cases, and connect with experts." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border shadow-elevated mb-6",
        "data-ocid": "login.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full gradient-primary text-white border-0 font-body font-semibold text-base h-12 shadow-subtle hover:opacity-90 transition-smooth",
              onClick: login,
              disabled: isLoading,
              "data-ocid": "login.submit_button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                "Connecting…"
              ] }) : "Login with Internet Identity"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-4 font-body", children: "No account needed — Internet Identity is password-free and secure." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: BENEFITS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col gap-1.5 p-3 rounded-xl bg-card border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center", children: b.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display font-semibold text-foreground", children: b.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-snug", children: b.desc })
        ]
      },
      b.title
    )) })
  ] }) }) });
}
export {
  LoginPage as default
};
