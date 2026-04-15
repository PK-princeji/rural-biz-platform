import { j as jsxRuntimeExports, r as reactExports, v as Skeleton, L as Link } from "./index-CbMjLiSd.js";
import { B as Badge } from "./badge-C9dywN_6.js";
import { L as Layout, B as Button } from "./Layout-CayYN9jf.js";
import { P as ProtectedRoute } from "./ProtectedRoute--S41oVFb.js";
import { u as useBackend } from "./useBackend-Yzy7tc2i.js";
import { m as motion, A as AnimatePresence } from "./proxy-B5NS9FcE.js";
const QUESTIONS = [
  {
    id: "location",
    question: "आपका क्षेत्र कैसा है? / Where is your location?",
    options: [
      {
        value: "Village near water",
        label: "गांव पानी के पास / Village near water",
        emoji: "🌊"
      },
      {
        value: "River/lake area",
        label: "नदी / झील क्षेत्र / River or lake area",
        emoji: "🏞️"
      },
      {
        value: "Dry farmland",
        label: "सूखी खेती की जमीन / Dry farmland",
        emoji: "🌾"
      },
      {
        value: "Hill/forest area",
        label: "पहाड़ / जंगल क्षेत्र / Hill or forest area",
        emoji: "⛰️"
      }
    ]
  },
  {
    id: "interest",
    question: "आपकी सबसे ज्यादा रुचि किस व्यवसाय में है? / Which business interests you most?",
    options: [
      { value: "Crop farming", label: "फसल खेती / Crop farming", emoji: "🌱" },
      { value: "Fish farming", label: "मछली पालन / Fish farming", emoji: "🐟" },
      { value: "Poultry", label: "मुर्गी पालन / Poultry", emoji: "🐔" },
      { value: "Goat farming", label: "बकरी पालन / Goat farming", emoji: "🐐" }
    ]
  },
  {
    id: "experience",
    question: "आपका अनुभव स्तर क्या है? / What is your experience level?",
    options: [
      { value: "Beginner", label: "नया शुरुआत / Beginner", emoji: "🌟" },
      {
        value: "Some experience",
        label: "कुछ अनुभव है / Some experience",
        emoji: "📈"
      },
      {
        value: "Experienced farmer",
        label: "अनुभवी किसान / Experienced farmer",
        emoji: "🏆"
      }
    ]
  },
  {
    id: "budget",
    question: "आपका अनुमानित बजट क्या है? / What is your approximate budget?",
    options: [
      {
        value: "Under ₹50,000",
        label: "₹50,000 से कम / Under ₹50,000",
        emoji: "💰"
      },
      { value: "₹50,000-2,00,000", label: "₹50,000 – ₹2,00,000", emoji: "💵" },
      {
        value: "Over ₹2,00,000",
        label: "₹2,00,000 से ज़्यादा / Over ₹2,00,000",
        emoji: "🏦"
      }
    ]
  },
  {
    id: "landAvailable",
    question: "क्या आपके पास जमीन / पानी उपलब्ध है? / Do you have land or water available?",
    options: [
      {
        value: "Yes, farmland",
        label: "हाँ, खेती की जमीन / Yes, farmland",
        emoji: "🌿"
      },
      {
        value: "Yes, water body",
        label: "हाँ, जल क्षेत्र / Yes, water body",
        emoji: "💧"
      },
      { value: "No land", label: "जमीन नहीं है / No land", emoji: "🏘️" },
      {
        value: "Rented land",
        label: "किराए की जमीन / Rented land",
        emoji: "📋"
      }
    ]
  }
];
const BUSINESS_CONFIG = {
  Farming: {
    label: "Crop Farming",
    labelHi: "फसल खेती",
    icon: "🌾",
    color: "bg-secondary/20 border-secondary/40 text-secondary-foreground",
    description: "Best for dry farmland with some experience in agriculture."
  },
  Fishery: {
    label: "Fish Farming",
    labelHi: "मछली पालन",
    icon: "🐟",
    color: "bg-primary/20 border-primary/40 text-primary-foreground",
    description: "Ideal near rivers, lakes, or water bodies with moderate budget."
  },
  Poultry: {
    label: "Poultry Farming",
    labelHi: "मुर्गी पालन",
    icon: "🐔",
    color: "bg-accent/20 border-accent/40 text-accent-foreground",
    description: "Low startup cost, suitable for any location with minimal land."
  },
  GoatFarming: {
    label: "Goat Farming",
    labelHi: "बकरी पालन",
    icon: "🐐",
    color: "bg-card border-border",
    description: "Great for hill or dry regions with low to medium investment."
  }
};
function AISuggestPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AISuggestInner, {}) });
}
function AISuggestInner() {
  const backend = useBackend();
  const [step, setStep] = reactExports.useState("loading");
  const [answers, setAnswers] = reactExports.useState({});
  const [savedResult, setSavedResult] = reactExports.useState(null);
  const [currentResult, setCurrentResult] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    async function loadSaved() {
      try {
        const result = await backend.getMyAIQuizResult();
        if (!cancelled) {
          if (result) {
            setSavedResult(result);
            setCurrentResult(result);
            setStep("result");
          } else {
            setStep(0);
          }
        }
      } catch {
        if (!cancelled) setStep(0);
      }
    }
    loadSaved();
    return () => {
      cancelled = true;
    };
  }, [backend]);
  function handleSelect(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }
  function handleNext() {
    if (typeof step === "number" && step < QUESTIONS.length - 1) {
      setStep(step + 1);
    }
  }
  function handlePrev() {
    if (typeof step === "number" && step > 0) {
      setStep(step - 1);
    }
  }
  async function handleSubmit() {
    const fullAnswers = answers;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await backend.submitAIQuiz(fullAnswers);
      setCurrentResult(result);
      setSavedResult(result);
      setStep("result");
    } catch {
      setSubmitError(
        "Something went wrong. Please try again. / कुछ गलत हुआ, दोबारा प्रयास करें।"
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  function handleRetake() {
    setAnswers({});
    setCurrentResult(null);
    setStep(0);
  }
  const currentQuestion = typeof step === "number" ? QUESTIONS[step] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : void 0;
  const isLastStep = typeof step === "number" && step === QUESTIONS.length - 1;
  const canProceed = !!currentAnswer;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "gradient-primary py-10 px-4 text-center",
        "data-ocid": "ai_suggest.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3 block", children: "🤖" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-primary-foreground text-balance", children: "AI Business Quiz" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display text-primary-foreground/80 mt-1", children: "AI व्यवसाय सलाह" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto text-balance", children: [
                "5 simple questions to find your perfect rural business match.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/60", children: "सही व्यवसाय खोजने के लिए 5 सवाल।" })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 py-8", children: [
      step === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "ai_suggest.loading_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-3/4 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }, i)) })
      ] }),
      typeof step === "number" && currentQuestion && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -30 },
          transition: { duration: 0.28 },
          "data-ocid": "ai_suggest.quiz.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body text-muted-foreground", children: [
                  "Question ",
                  step + 1,
                  " of ",
                  QUESTIONS.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-body text-muted-foreground", children: [
                  "प्रश्न ",
                  step + 1,
                  " / ",
                  QUESTIONS.length
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full gradient-primary rounded-full",
                  initial: { width: `${step / QUESTIONS.length * 100}%` },
                  animate: {
                    width: `${(step + 1) / QUESTIONS.length * 100}%`
                  },
                  transition: { duration: 0.4 },
                  "data-ocid": "ai_suggest.progress_bar"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg sm:text-xl font-display font-semibold text-foreground mb-5 text-balance leading-snug", children: currentQuestion.question }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 mb-8", children: currentQuestion.options.map((opt) => {
              const isSelected = currentAnswer === opt.value;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleSelect(currentQuestion.id, opt.value),
                  className: [
                    "flex items-center gap-4 w-full rounded-xl border-2 px-4 py-4 text-left transition-smooth focus-ring min-h-[56px]",
                    isSelected ? "border-accent bg-accent/15 shadow-elevated" : "border-border bg-card hover:border-accent/50 hover:bg-muted/40"
                  ].join(" "),
                  "data-ocid": `ai_suggest.option.${opt.value.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                  "aria-pressed": isSelected,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: opt.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: [
                          "font-body text-sm sm:text-base leading-snug",
                          isSelected ? "text-foreground font-semibold" : "text-foreground/80"
                        ].join(" "),
                        children: opt.label
                      }
                    ),
                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-accent text-lg flex-shrink-0", children: "✓" })
                  ]
                },
                opt.value
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: handlePrev,
                  className: "flex-1",
                  "data-ocid": "ai_suggest.prev_button",
                  children: "← Previous / पिछला"
                }
              ),
              !isLastStep ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleNext,
                  disabled: !canProceed,
                  className: "flex-1",
                  "data-ocid": "ai_suggest.next_button",
                  children: "Next / अगला →"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleSubmit,
                  disabled: !canProceed || isSubmitting,
                  className: "flex-1 gradient-primary text-primary-foreground font-semibold",
                  "data-ocid": "ai_suggest.submit_button",
                  children: isSubmitting ? "Analyzing... / विश्लेषण हो रहा है..." : "Get My Result / परिणाम देखें 🎯"
                }
              )
            ] }),
            submitError && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mt-4 text-sm text-destructive text-center",
                "data-ocid": "ai_suggest.error_state",
                children: submitError
              }
            )
          ]
        },
        step
      ) }),
      step === "result" && currentResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResultCard,
        {
          result: currentResult,
          isSavedResult: !!savedResult,
          onRetake: handleRetake
        }
      )
    ] })
  ] }) });
}
function ResultCard({ result, isSavedResult, onRetake }) {
  const biz = BUSINESS_CONFIG[result.businessType] ?? {
    label: String(result.businessType),
    labelHi: String(result.businessType),
    icon: "🌱",
    color: "bg-card border-border",
    description: ""
  };
  const confidenceColor = result.confidence === "High" || result.confidence === "high" ? "bg-secondary/20 text-secondary-foreground border-secondary/40" : result.confidence === "Medium" || result.confidence === "medium" ? "bg-accent/20 text-accent-foreground border-accent/40" : "bg-muted text-muted-foreground border-border";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      "data-ocid": "ai_suggest.result.card",
      children: [
        isSavedResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "flex items-center justify-center gap-2 mb-4 text-sm text-secondary font-body",
            "data-ocid": "ai_suggest.saved_indicator",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "✅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Saved to your profile / आपके प्रोफाइल में सेव हो गया" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border-2 p-6 mb-4 ${biz.color}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl flex-shrink-0", children: biz.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1 font-body", children: "Recommended Business / अनुशंसित व्यवसाय" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: biz.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-body text-muted-foreground", children: biz.labelHi }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs font-semibold ${confidenceColor}`,
                  "data-ocid": "ai_suggest.confidence_badge",
                  children: [
                    result.confidence,
                    " Confidence"
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground font-body leading-relaxed", children: biz.description })
        ] }),
        result.reasons && result.reasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider", children: "Why this? / यह क्यों?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: result.reasons.map((reason, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.li,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.15 + i * 0.1 },
              className: "flex items-start gap-3 text-sm text-foreground/80 font-body",
              "data-ocid": `ai_suggest.reason.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-secondary flex-shrink-0", children: "✦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reason })
              ]
            },
            reason
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "gradient-primary text-primary-foreground font-semibold",
              "data-ocid": "ai_suggest.view_resources_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resources", children: "📦 View Resources / संसाधन देखें" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "border-accent/50 text-foreground hover:bg-accent/10",
              "data-ocid": "ai_suggest.request_expert_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/request", children: "👨‍🔧 Request Expert / विशेषज्ञ सहायता" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRetake,
            className: "text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-smooth focus-ring rounded",
            "data-ocid": "ai_suggest.retake_button",
            children: "Retake Quiz / दोबारा प्रयास करें"
          }
        ) })
      ]
    },
    "result"
  ) });
}
export {
  AISuggestPage as default
};
