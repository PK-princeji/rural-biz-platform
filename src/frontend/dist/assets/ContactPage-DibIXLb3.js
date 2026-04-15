import { r as reactExports, j as jsxRuntimeExports } from "./index-C68clJlo.js";
import { B as Badge } from "./badge-D_9nQC6K.js";
import { C as Card, a as CardContent } from "./card-CPJssoB_.js";
import { u as ue } from "./index-BMkuCIh0.js";
import { c as createLucideIcon, L as Layout } from "./Layout-CKZLOXF2.js";
import { P as Phone, C as Copy } from "./phone-wXB6ILpS.js";
import { C as Clock } from "./clock-B_5YBnRd.js";
import { C as ChevronDown } from "./chevron-down-nDF5uijY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
const FAQS = [
  {
    q: "How do I submit a service request?",
    a: "Go to the 'Request Service' page, choose your business type (Farming, Fishery, Poultry, or Goat), describe your problem, and upload a photo if needed. You'll get a unique Case ID immediately after submitting."
  },
  {
    q: "How do I track my case status?",
    a: "Log in to your Dashboard and click 'My Cases'. You'll see the current status — Pending, In Progress, or Completed — along with your assigned expert's name and next steps."
  },
  {
    q: "When will an expert contact me?",
    a: "An expert will be assigned within 24 hours of submitting your request. They will call or WhatsApp you on the mobile number you registered with. Make sure your number is active."
  },
  {
    q: "How do I request resources (seeds, animals, feed)?",
    a: "Visit the 'Resources' section from the main menu. Browse available items like goat breeds, fish seeds, poultry, or crop seeds, then click 'Request' on any item to place your supply request."
  },
  {
    q: "Is the Rural Biz Platform free to use?",
    a: "Yes! Basic services — including submitting requests, tracking cases, and accessing resources — are completely free. Premium support options for faster response and dedicated experts will be available soon."
  },
  {
    q: "How do I update my profile or mobile number?",
    a: "After logging in, click your name in the top corner and select 'My Profile'. You can update your name, mobile number, location, and business type from there."
  }
];
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl overflow-hidden",
      "data-ocid": `contact.faq.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            "aria-expanded": isOpen,
            className: "w-full flex items-center justify-between gap-3 px-5 py-4 bg-card text-left hover:bg-muted/40 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
            "data-ocid": `contact.faq.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm sm:text-base text-foreground", children: faq.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 bg-muted/20 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: faq.a }) })
          }
        )
      ]
    }
  );
}
function ContactPage() {
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [emailCopied, setEmailCopied] = reactExports.useState(false);
  const EMAIL = "support@ruralbiz.in";
  const PHONE = "+91-9876543210";
  const PHONE_TEL = "tel:+919876543210";
  const WA_LINK = "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20Rural%20Biz%20Platform%20account";
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setEmailCopied(true);
      ue.success("Email address copied to clipboard!");
      setTimeout(() => setEmailCopied(false), 2500);
    }).catch(() => {
      ue.error(`Could not copy. Please copy manually: ${EMAIL}`);
    });
  };
  const toggleFaq = (i) => setOpenFaq((prev) => prev === i ? null : i);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "gradient-primary text-white py-14 px-4",
        "data-ocid": "contact.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-body font-medium", children: "Support Team Ready" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl sm:text-4xl font-display font-bold mb-3 text-balance", children: "Contact & Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/85 font-body text-base sm:text-lg leading-relaxed", children: [
            "We are here to help your rural business succeed.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
            "Call us, WhatsApp us, or check answers below."
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 px-4 bg-background",
        "data-ocid": "contact.actions_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: PHONE_TEL,
              className: "flex items-center justify-between gap-4 w-full rounded-2xl border-2 border-accent bg-accent/10 px-6 py-5 hover:bg-accent/20 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              "data-ocid": "contact.call_button",
              "aria-label": `Call us at ${PHONE}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-7 h-7 text-accent-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5", children: "Call Us Now" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: PHONE }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mt-0.5", children: "Mon–Sat, 9 AM – 6 PM" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-accent" }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: WA_LINK,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-between gap-4 w-full rounded-2xl border-2 px-6 py-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]",
              style: {
                borderColor: "#25D366",
                backgroundColor: "rgba(37,211,102,0.08)"
              },
              "data-ocid": "contact.whatsapp_button",
              "aria-label": "Chat on WhatsApp",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-elevated",
                      style: { backgroundColor: "#25D366" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          viewBox: "0 0 24 24",
                          className: "w-7 h-7 fill-white",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5", children: "Chat on WhatsApp" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: "Send a Message" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mt-0.5", children: "Quick reply within 1 hour" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    style: { backgroundColor: "rgba(37,211,102,0.2)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5", style: { color: "#25D366" } })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", "data-ocid": "contact.email_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5", children: "Support Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base truncate", children: EMAIL })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleCopyEmail,
                className: "shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-xs font-body font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "aria-label": "Copy email address",
                "data-ocid": "contact.copy_email_button",
                children: [
                  emailCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                  emailCopied ? "Copied!" : "Copy"
                ]
              }
            )
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-8 px-4 bg-muted/30 border-y border-border",
        "data-ocid": "contact.hours_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Support Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto text-xs font-body", children: "Open Now" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            {
              day: "Monday – Friday",
              time: "9:00 AM – 6:00 PM",
              active: true
            },
            { day: "Saturday", time: "9:00 AM – 6:00 PM", active: true },
            { day: "Sunday", time: "Closed", active: false }
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl p-4 border ${h.active ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-muted-foreground mb-1", children: h.day }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display font-bold text-sm ${h.active ? "text-accent" : "text-muted-foreground"}`,
                    children: h.time
                  }
                )
              ]
            },
            h.day
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 px-4 bg-background",
        "data-ocid": "contact.faq_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: "Common Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-muted-foreground text-sm sm:text-base", children: "Find quick answers to the questions we hear most often." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "contact.faq_list", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FaqItem,
            {
              faq,
              index: i,
              isOpen: openFaq === i,
              onToggle: () => toggleFaq(i)
            },
            faq.q
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-10 px-4 gradient-primary",
        "data-ocid": "contact.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl sm:text-2xl mb-2", children: "Still have a question?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-white/80 text-sm mb-6", children: "Our support team speaks your language and understands your business." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: PHONE_TEL,
                className: "flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent font-body font-bold text-sm hover:bg-white/90 transition-smooth shadow-elevated min-h-[52px]",
                "data-ocid": "contact.cta_call_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                  "Call Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: WA_LINK,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white font-body font-bold text-sm hover:bg-white/25 transition-smooth min-h-[52px]",
                "data-ocid": "contact.cta_whatsapp_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                  "WhatsApp Us"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ContactPage as default
};
