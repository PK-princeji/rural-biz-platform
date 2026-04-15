import { u as useNavigate, j as jsxRuntimeExports } from "./index-CbMjLiSd.js";
import { B as Badge } from "./badge-C9dywN_6.js";
import { L as Layout, B as Button } from "./Layout-CayYN9jf.js";
const SECTORS = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 64 64",
        fill: "none",
        className: "w-12 h-12",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "4",
              y: "44",
              width: "56",
              height: "6",
              rx: "3",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M12 44 C12 28 20 18 32 14 C44 18 52 28 52 44",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M22 44 C22 32 26 24 32 20 C38 24 42 32 42 44",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M8 34 C14 30 20 32 24 36",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M56 34 C50 30 44 32 40 36",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "11", r: "4", stroke: "currentColor", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M18 52 L18 58 M32 52 L32 58 M46 52 L46 58",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    label: "Farming",
    desc: "Crop planning, soil health, and irrigation support for every season."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 64 64",
        fill: "none",
        className: "w-12 h-12",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M8 40 C14 32 22 28 32 30 C42 32 50 36 56 40",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M8 46 C14 38 22 34 32 36 C42 38 50 42 56 46",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "24",
              cy: "22",
              rx: "14",
              ry: "9",
              stroke: "currentColor",
              strokeWidth: "2.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "21", cy: "21", r: "2", fill: "currentColor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M38 22 C40 18 46 16 50 18",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M50 18 L54 14 M50 18 L54 20 M50 18 L46 15",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M8 52 L56 52",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    label: "Fishery",
    desc: "Fish seed, pond management, and harvest support from day one."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 64 64",
        fill: "none",
        className: "w-12 h-12",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "28",
              cy: "32",
              rx: "16",
              ry: "18",
              stroke: "currentColor",
              strokeWidth: "2.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "28", cy: "20", r: "7", stroke: "currentColor", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M28 13 L28 8 M24 10 L28 8 L32 10",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "25", cy: "19", r: "1.5", fill: "currentColor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M44 24 C50 24 54 28 54 34 C54 40 50 44 44 44",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M22 46 L18 56 M28 48 L28 56 M34 46 L38 56",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "44",
              cy: "30",
              r: "3",
              stroke: "currentColor",
              strokeWidth: "2",
              fill: "none"
            }
          )
        ]
      }
    ),
    label: "Poultry",
    desc: "Broiler & layer setup, feed management, and disease guidance."
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: "0 0 64 64",
        fill: "none",
        className: "w-12 h-12",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ellipse",
            {
              cx: "30",
              cy: "38",
              rx: "18",
              ry: "14",
              stroke: "currentColor",
              strokeWidth: "2.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "30", cy: "20", r: "9", stroke: "currentColor", strokeWidth: "2.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M24 12 C22 6 18 6 18 10",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M36 12 C38 6 42 6 42 10",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "27", cy: "20", r: "2", fill: "currentColor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "33", cy: "20", r: "2", fill: "currentColor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M28 24 C29 26 31 26 32 24",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M20 48 L18 58 M26 50 L26 58 M34 50 L34 58 M40 48 L42 58",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          )
        ]
      }
    ),
    label: "Goat Farming",
    desc: "Breed selection, grazing plans, and ongoing health monitoring."
  }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "👤",
    title: "Register",
    desc: "Create your free account with your name, mobile, and location. No technical knowledge needed."
  },
  {
    step: "02",
    icon: "📋",
    title: "Submit Your Problem",
    desc: "Tell us about your business challenge. Get a unique Case ID instantly for tracking."
  },
  {
    step: "03",
    icon: "🤝",
    title: "Get Expert Guidance",
    desc: "A local expert reviews your case, visits if needed, and gives a tailored action plan."
  }
];
const WHY_US = [
  {
    icon: "🏆",
    title: "Expert Guidance",
    desc: "Connect with certified agri-experts and livestock specialists who understand rural realities."
  },
  {
    icon: "⚡",
    title: "Quick Response",
    desc: "Cases are assigned within 24 hours. Track progress from your personal dashboard."
  },
  {
    icon: "📦",
    title: "Resource Access",
    desc: "Request seeds, feed, equipment, and livestock breeds directly through the platform."
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Works perfectly on any smartphone — designed for rural connectivity and ease of use."
  },
  {
    icon: "🌍",
    title: "Local Network",
    desc: "Connected to district-level support teams who understand your region and language."
  },
  {
    icon: "📈",
    title: "Business Growth",
    desc: "Ongoing monitoring ensures your business keeps growing season after season."
  }
];
function HomePage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "hero",
        className: "relative overflow-hidden gradient-primary text-white",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  viewBox: "0 0 1440 120",
                  preserveAspectRatio: "none",
                  className: "w-full h-24 md:h-32",
                  role: "img",
                  "aria-label": "decorative wave",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M0,80 C200,40 400,100 600,60 C800,20 1000,90 1200,50 C1300,30 1380,60 1440,40 L1440,120 L0,120 Z",
                      fill: "white"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pt-24 md:pb-36", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center md:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-5 bg-white/20 text-white border-white/30 hover:bg-white/25 font-body text-xs px-3 py-1", children: "🌱 Rural Entrepreneurship Platform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-5 text-balance", children: [
                "Skill + Support",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
                " + System"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg sm:text-xl text-white/85 font-body leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0", children: "Empowering rural entrepreneurs with the tools, knowledge, and community needed to grow sustainable and profitable businesses in agriculture." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "w-full sm:w-auto bg-accent text-accent-foreground font-body font-semibold h-13 px-8 hover:bg-accent/90 transition-smooth shadow-elevated text-base",
                    onClick: () => void navigate({ to: "/request" }),
                    "data-ocid": "home.explore_cta_button",
                    children: "Explore Our Programs"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#how-it-works",
                    className: "inline-flex items-center justify-center h-13 px-6 rounded-md border border-white/40 text-white text-sm font-body font-medium hover:bg-white/10 transition-smooth w-full sm:w-auto",
                    "data-ocid": "home.learn_funding_link",
                    children: "Learn about funding opportunities"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                id: "sectors",
                className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14",
                "data-ocid": "home.sectors_grid",
                children: SECTORS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-smooth cursor-pointer group",
                    "data-ocid": `home.sector_${s.label.toLowerCase().replace(/\s+/g, "_")}_card`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/90 group-hover:scale-110 transition-smooth", children: s.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-semibold text-center leading-tight", children: s.label })
                    ]
                  },
                  s.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "how-it-works",
        className: "py-20 bg-muted/30",
        "data-ocid": "home.how_it_works_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3", children: "Simple Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold text-foreground mb-4", children: "How It Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed", children: "From registration to growing your rural business — just three simple steps." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "hidden md:block absolute top-10 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-0.5 bg-border",
                "aria-hidden": "true"
              }
            ),
            HOW_IT_WORKS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative bg-card rounded-2xl p-8 border border-border shadow-subtle hover:shadow-elevated transition-smooth text-center",
                "data-ocid": `home.step_${item.step}_card`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-display font-bold", children: i + 1 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4 mt-2", children: item.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-3", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: item.desc })
                ]
              },
              item.step
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "gradient-primary text-white font-body font-semibold h-12 px-8 hover:opacity-90 transition-smooth shadow-elevated",
              onClick: () => void navigate({ to: "/login" }),
              "data-ocid": "home.get_started_button",
              children: "Get Started Free"
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "sectors-detail",
        className: "py-20 bg-background",
        "data-ocid": "home.sectors_detail_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3", children: "What We Support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold text-foreground mb-4", children: "Our Sectors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed", children: "Specialized guidance and resources for every type of rural business venture." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: SECTORS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "card-interactive group flex flex-col items-start text-left w-full",
              "data-ocid": `home.sector_detail_${s.label.toLowerCase().replace(/\s+/g, "_")}_card`,
              onClick: () => void navigate({ to: "/request" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-smooth", children: s.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed flex-1", children: s.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 text-xs font-body font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-smooth", children: "Learn more →" })
              ]
            },
            s.label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "why-us",
        className: "py-20 bg-muted/30",
        "data-ocid": "home.why_us_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3", children: "Why Choose Us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold text-foreground mb-4", children: "Everything You Need to Succeed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed", children: "We combine local expertise, fast support, and practical resources so rural entrepreneurs can thrive." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: WHY_US.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl p-6 border border-border shadow-subtle hover:shadow-elevated hover:border-accent/40 transition-smooth",
              "data-ocid": `home.why_${item.title.toLowerCase().replace(/\s+/g, "_")}_card`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-4", children: item.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed", children: item.desc })
              ]
            },
            item.title
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 gradient-primary relative overflow-hidden",
        "data-ocid": "home.cta_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 pointer-events-none",
              style: {
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-6", children: "🚜" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-display font-bold mb-5 text-balance", children: "Ready to Start Your Journey?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 font-body mb-9 text-lg leading-relaxed max-w-xl mx-auto", children: "Join thousands of rural entrepreneurs building sustainable businesses with expert support and real resources." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "w-full sm:w-auto bg-white text-primary font-body font-semibold h-13 px-10 hover:bg-white/90 transition-smooth shadow-elevated text-base",
                  onClick: () => void navigate({ to: "/login" }),
                  "data-ocid": "home.join_cta_button",
                  children: "Get Started Free"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "w-full sm:w-auto border-white/40 text-white bg-transparent hover:bg-white/10 font-body font-medium h-13 px-8 text-base",
                  onClick: () => void navigate({ to: "/contact" }),
                  "data-ocid": "home.contact_cta_button",
                  children: "📞 Talk to an Expert"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "bg-card border-t border-border py-12",
        "data-ocid": "home.footer_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg gradient-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-display font-bold text-sm", children: "RB" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground", children: "Rural Biz Platform" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed max-w-xs mb-5", children: "Empowering rural entrepreneurs with skill, support, and systems to build thriving agricultural businesses." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://wa.me/911234567890",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 rounded-lg px-4 py-2 text-sm font-body font-semibold hover:bg-accent/20 transition-smooth",
                    "data-ocid": "home.whatsapp_link",
                    children: "💬 WhatsApp Us"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "tel:+911234567890",
                    className: "inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-lg px-4 py-2 text-sm font-body font-semibold hover:bg-primary/20 transition-smooth",
                    "data-ocid": "home.phone_link",
                    children: "📞 Call Us"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide", children: "Quick Links" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
                { label: "Home", to: "/" },
                { label: "Services", to: "/request" },
                { label: "Resources", to: "/resources" },
                { label: "Dashboard", to: "/dashboard" },
                { label: "Contact", to: "/contact" }
              ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: link.to,
                  className: "text-sm text-muted-foreground font-body hover:text-accent transition-smooth",
                  "data-ocid": `home.footer_${link.label.toLowerCase()}_link`,
                  children: link.label
                }
              ) }, link.label)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide", children: "Sectors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: SECTORS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body cursor-default", children: s.label }) }, s.label)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body text-center sm:text-left", children: [
              "© ",
              (/* @__PURE__ */ new Date()).getFullYear(),
              " Rural Biz Platform. Built with love using",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-accent hover:underline",
                  children: "caffeine.ai"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "📞 +91 12345 67890  |  📧 help@ruralbiz.in" })
          ] })
        ] })
      }
    )
  ] });
}
export {
  HomePage as default
};
