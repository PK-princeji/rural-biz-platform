import { j as jsxRuntimeExports, r as reactExports, v as Skeleton, L as Link } from "./index-Bv79MXo9.js";
import { B as Badge } from "./badge-CB92I89i.js";
import { L as Layout, B as Button, P as Phone } from "./Layout-CN7ytZ9a.js";
import { P as ProtectedRoute } from "./ProtectedRoute-CiwO1PTR.js";
import { u as useBackend } from "./useBackend-iWixMNi1.js";
import { m as motion, A as AnimatePresence } from "./proxy-RHPRxWwD.js";
import { S as Sparkles } from "./sparkles-DDvnkrYQ.js";
import { C as CircleCheckBig } from "./circle-check-big-d-JKuDrZ.js";
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
    description: "Best for dry farmland with some experience in agriculture.",
    reasons: [
      "Your location and land type are ideal for crop cultivation",
      "Crop farming matches your interest and experience level",
      "Investment is proportional to your available budget"
    ]
  },
  Fishery: {
    label: "Fish Farming",
    labelHi: "मछली पालन",
    icon: "🐟",
    color: "bg-primary/20 border-primary/40 text-primary-foreground",
    description: "Ideal near rivers, lakes, or water bodies with moderate budget.",
    reasons: [
      "Water availability in your area supports fish cultivation",
      "Fish farming offers high income with steady demand",
      "Your budget range covers initial pond setup costs"
    ]
  },
  Poultry: {
    label: "Poultry Farming",
    labelHi: "मुर्गी पालन",
    icon: "🐔",
    color: "bg-accent/20 border-accent/40 text-accent-foreground",
    description: "Low startup cost, suitable for any location with minimal land.",
    reasons: [
      "Poultry requires minimal land and low initial investment",
      "Year-round income with consistent local market demand",
      "Easy to start even without prior farming experience"
    ]
  },
  GoatFarming: {
    label: "Goat Farming",
    labelHi: "बकरी पालन",
    icon: "🐐",
    color: "bg-card border-border",
    description: "Great for hill or dry regions with low to medium investment.",
    reasons: [
      "Goats thrive in your terrain and climate conditions",
      "Low maintenance with high return on investment",
      "Strong demand for meat and milk in local markets"
    ]
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
            setStep("intro");
          }
        }
      } catch {
        if (!cancelled) setStep("intro");
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
    setStep("intro");
  }
  function handleStartQuiz() {
    setAnswers({});
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-primary-foreground text-balance", children: "Find the Best Business for You" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display text-primary-foreground/80 mt-1", children: "अपना सबसे अच्छा व्यवसाय खोजें" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto text-balance", children: [
                "Answer 5 quick questions and our AI will recommend the perfect rural business for your situation.",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/60", children: "5 सवालों में UdyamSathi AI आपको सही व्यवसाय बतायेगा।" })
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
      step === "intro" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.4 },
          className: "text-center",
          "data-ocid": "ai_suggest.intro.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 mb-8 text-left", children: [
              {
                icon: "🎯",
                title: "Personalized for You",
                desc: "आपकी स्थिति के अनुसार सलाह / Advice based on your situation"
              },
              {
                icon: "💡",
                title: "AI-Powered Analysis",
                desc: "स्मार्ट एल्गोरिदम से सर्वोत्तम विकल्प / Best option via smart algorithm"
              },
              {
                icon: "📊",
                title: "Saved to Your Dashboard",
                desc: "परिणाम आपके डैशबोर्ड में सेव होगा / Result saved to your profile"
              }
            ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -16 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.1 },
                className: "flex items-start gap-4 rounded-xl border border-border bg-card p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: item.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed mt-0.5", children: item.desc })
                  ] })
                ]
              },
              item.title
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: 0.35 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleStartQuiz,
                      size: "lg",
                      className: "w-full gradient-primary text-primary-foreground font-display font-bold text-lg py-6 rounded-xl shadow-elevated hover:opacity-90 transition-smooth",
                      "data-ocid": "ai_suggest.find_best_business_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 mr-2" }),
                        "Find Best Business / सर्वश्रेष्ठ व्यवसाय खोजें"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground font-body", children: "⏱ Takes less than 2 minutes · 2 मिनट से कम समय लगेगा" })
                ]
              }
            )
          ]
        },
        "intro"
      ) }),
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
    description: "",
    reasons: []
  };
  const confidenceColor = result.confidence === "High" || result.confidence === "high" ? "bg-secondary/20 text-secondary-foreground border-secondary/40" : result.confidence === "Medium" || result.confidence === "medium" ? "bg-accent/20 text-accent-foreground border-accent/40" : "bg-muted text-muted-foreground border-border";
  const displayReasons = result.reasons && result.reasons.length > 0 ? result.reasons.slice(0, 3) : biz.reasons.slice(0, 3);
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
            className: "flex items-center justify-center gap-2 mb-4 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-2.5 text-sm text-secondary font-body",
            "data-ocid": "ai_suggest.saved_indicator",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your recommendation has been saved to your dashboard / आपकी सिफारिश डैशबोर्ड में सेव हो गई है" })
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
        displayReasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider", children: "Why this suits you? / यह आपके लिए क्यों?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: displayReasons.map((reason, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4, duration: 0.35 },
            className: "mb-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "w-full gradient-primary text-primary-foreground font-display font-bold text-base py-5 rounded-xl shadow-elevated hover:opacity-90 transition-smooth",
                  "data-ocid": "ai_suggest.get_expert_call_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 mr-2" }),
                    "Get Expert Call / विशेषज्ञ से बात करें 📞"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground mt-2 font-body", children: "हमारी टीम 24 घंटे में संपर्क करेगी · Our team will contact you within 24 hours" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              className: "border-secondary/50 text-foreground hover:bg-secondary/10",
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
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/request", children: "👨‍🔧 Submit Request / सहायता माँगें" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-muted/40 px-4 py-3 mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: "📊" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-body text-foreground", children: "View your saved AI result in your dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "डैशबोर्ड में अपना AI परिणाम देखें" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "flex-shrink-0 ml-auto",
              "data-ocid": "ai_suggest.go_dashboard_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: "Dashboard" })
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
