import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { AIQuizResult, QuizAnswers } from "../backend.d.ts";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useBackend } from "../hooks/useBackend";
import type { BusinessType } from "../types";

// ─── Quiz data ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "location" as keyof QuizAnswers,
    question: "आपका क्षेत्र कैसा है? / Where is your location?",
    options: [
      {
        value: "Village near water",
        label: "गांव पानी के पास / Village near water",
        emoji: "🌊",
      },
      {
        value: "River/lake area",
        label: "नदी / झील क्षेत्र / River or lake area",
        emoji: "🏞️",
      },
      {
        value: "Dry farmland",
        label: "सूखी खेती की जमीन / Dry farmland",
        emoji: "🌾",
      },
      {
        value: "Hill/forest area",
        label: "पहाड़ / जंगल क्षेत्र / Hill or forest area",
        emoji: "⛰️",
      },
    ],
  },
  {
    id: "interest" as keyof QuizAnswers,
    question:
      "आपकी सबसे ज्यादा रुचि किस व्यवसाय में है? / Which business interests you most?",
    options: [
      { value: "Crop farming", label: "फसल खेती / Crop farming", emoji: "🌱" },
      { value: "Fish farming", label: "मछली पालन / Fish farming", emoji: "🐟" },
      { value: "Poultry", label: "मुर्गी पालन / Poultry", emoji: "🐔" },
      { value: "Goat farming", label: "बकरी पालन / Goat farming", emoji: "🐐" },
    ],
  },
  {
    id: "experience" as keyof QuizAnswers,
    question: "आपका अनुभव स्तर क्या है? / What is your experience level?",
    options: [
      { value: "Beginner", label: "नया शुरुआत / Beginner", emoji: "🌟" },
      {
        value: "Some experience",
        label: "कुछ अनुभव है / Some experience",
        emoji: "📈",
      },
      {
        value: "Experienced farmer",
        label: "अनुभवी किसान / Experienced farmer",
        emoji: "🏆",
      },
    ],
  },
  {
    id: "budget" as keyof QuizAnswers,
    question: "आपका अनुमानित बजट क्या है? / What is your approximate budget?",
    options: [
      {
        value: "Under ₹50,000",
        label: "₹50,000 से कम / Under ₹50,000",
        emoji: "💰",
      },
      { value: "₹50,000-2,00,000", label: "₹50,000 – ₹2,00,000", emoji: "💵" },
      {
        value: "Over ₹2,00,000",
        label: "₹2,00,000 से ज़्यादा / Over ₹2,00,000",
        emoji: "🏦",
      },
    ],
  },
  {
    id: "landAvailable" as keyof QuizAnswers,
    question:
      "क्या आपके पास जमीन / पानी उपलब्ध है? / Do you have land or water available?",
    options: [
      {
        value: "Yes, farmland",
        label: "हाँ, खेती की जमीन / Yes, farmland",
        emoji: "🌿",
      },
      {
        value: "Yes, water body",
        label: "हाँ, जल क्षेत्र / Yes, water body",
        emoji: "💧",
      },
      { value: "No land", label: "जमीन नहीं है / No land", emoji: "🏘️" },
      {
        value: "Rented land",
        label: "किराए की जमीन / Rented land",
        emoji: "📋",
      },
    ],
  },
] as const;

// ─── Business type display config ─────────────────────────────────────────────

const BUSINESS_CONFIG: Record<
  BusinessType,
  {
    label: string;
    labelHi: string;
    icon: string;
    color: string;
    description: string;
    reasons: string[];
  }
> = {
  Farming: {
    label: "Crop Farming",
    labelHi: "फसल खेती",
    icon: "🌾",
    color: "bg-secondary/20 border-secondary/40 text-secondary-foreground",
    description: "Best for dry farmland with some experience in agriculture.",
    reasons: [
      "Your location and land type are ideal for crop cultivation",
      "Crop farming matches your interest and experience level",
      "Investment is proportional to your available budget",
    ],
  },
  Fishery: {
    label: "Fish Farming",
    labelHi: "मछली पालन",
    icon: "🐟",
    color: "bg-primary/20 border-primary/40 text-primary-foreground",
    description:
      "Ideal near rivers, lakes, or water bodies with moderate budget.",
    reasons: [
      "Water availability in your area supports fish cultivation",
      "Fish farming offers high income with steady demand",
      "Your budget range covers initial pond setup costs",
    ],
  },
  Poultry: {
    label: "Poultry Farming",
    labelHi: "मुर्गी पालन",
    icon: "🐔",
    color: "bg-accent/20 border-accent/40 text-accent-foreground",
    description:
      "Low startup cost, suitable for any location with minimal land.",
    reasons: [
      "Poultry requires minimal land and low initial investment",
      "Year-round income with consistent local market demand",
      "Easy to start even without prior farming experience",
    ],
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
      "Strong demand for meat and milk in local markets",
    ],
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────

type QuizStep = "loading" | "intro" | "result" | number;

export default function AISuggestPage() {
  return (
    <ProtectedRoute>
      <AISuggestInner />
    </ProtectedRoute>
  );
}

function AISuggestInner() {
  const backend = useBackend();
  const [step, setStep] = useState<QuizStep>("loading");
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [savedResult, setSavedResult] = useState<AIQuizResult | null>(null);
  const [currentResult, setCurrentResult] = useState<AIQuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load saved result on mount
  useEffect(() => {
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

  function handleSelect(questionId: keyof QuizAnswers, value: string) {
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
    const fullAnswers = answers as QuizAnswers;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await backend.submitAIQuiz(fullAnswers);
      setCurrentResult(result);
      setSavedResult(result);
      setStep("result");
    } catch {
      setSubmitError(
        "Something went wrong. Please try again. / कुछ गलत हुआ, दोबारा प्रयास करें।",
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
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isLastStep = typeof step === "number" && step === QUESTIONS.length - 1;
  const canProceed = !!currentAnswer;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* Header */}
        <div
          className="gradient-primary py-10 px-4 text-center"
          data-ocid="ai_suggest.section"
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-4xl mb-3 block">🤖</span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground text-balance">
              Find the Best Business for You
            </h1>
            <p className="text-lg font-display text-primary-foreground/80 mt-1">
              अपना सबसे अच्छा व्यवसाय खोजें
            </p>
            <p className="mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto text-balance">
              Answer 5 quick questions and our AI will recommend the perfect
              rural business for your situation.
              <br />
              <span className="text-primary-foreground/60">
                5 सवालों में UdyamSathi AI आपको सही व्यवसाय बतायेगा।
              </span>
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-xl mx-auto px-4 py-8">
          {/* Loading State */}
          {step === "loading" && (
            <div className="space-y-4" data-ocid="ai_suggest.loading_state">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-12 w-3/4 rounded-xl" />
              <div className="grid grid-cols-1 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            </div>
          )}

          {/* Intro / Start Screen */}
          {step === "intro" && (
            <AnimatePresence mode="wait">
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
                data-ocid="ai_suggest.intro.panel"
              >
                {/* Feature highlights */}
                <div className="grid grid-cols-1 gap-3 mb-8 text-left">
                  {[
                    {
                      icon: "🎯",
                      title: "Personalized for You",
                      desc: "आपकी स्थिति के अनुसार सलाह / Advice based on your situation",
                    },
                    {
                      icon: "💡",
                      title: "AI-Powered Analysis",
                      desc: "स्मार्ट एल्गोरिदम से सर्वोत्तम विकल्प / Best option via smart algorithm",
                    },
                    {
                      icon: "📊",
                      title: "Saved to Your Dashboard",
                      desc: "परिणाम आपके डैशबोर्ड में सेव होगा / Result saved to your profile",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <span className="text-2xl flex-shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-foreground text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground font-body leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    onClick={handleStartQuiz}
                    size="lg"
                    className="w-full gradient-primary text-primary-foreground font-display font-bold text-lg py-6 rounded-xl shadow-elevated hover:opacity-90 transition-smooth"
                    data-ocid="ai_suggest.find_best_business_button"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Find Best Business / सर्वश्रेष्ठ व्यवसाय खोजें
                  </Button>
                  <p className="mt-3 text-sm text-muted-foreground font-body">
                    ⏱ Takes less than 2 minutes · 2 मिनट से कम समय लगेगा
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Quiz Steps */}
          {typeof step === "number" && currentQuestion && (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.28 }}
                data-ocid="ai_suggest.quiz.panel"
              >
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-body text-muted-foreground">
                      Question {step + 1} of {QUESTIONS.length}
                    </span>
                    <span className="text-sm font-body text-muted-foreground">
                      प्रश्न {step + 1} / {QUESTIONS.length}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-primary rounded-full"
                      initial={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                      animate={{
                        width: `${((step + 1) / QUESTIONS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                      data-ocid="ai_suggest.progress_bar"
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-5 text-balance leading-snug">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentAnswer === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          handleSelect(currentQuestion.id, opt.value)
                        }
                        className={[
                          "flex items-center gap-4 w-full rounded-xl border-2 px-4 py-4 text-left transition-smooth focus-ring min-h-[56px]",
                          isSelected
                            ? "border-accent bg-accent/15 shadow-elevated"
                            : "border-border bg-card hover:border-accent/50 hover:bg-muted/40",
                        ].join(" ")}
                        data-ocid={`ai_suggest.option.${opt.value.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                        aria-pressed={isSelected}
                      >
                        <span className="text-2xl flex-shrink-0">
                          {opt.emoji}
                        </span>
                        <span
                          className={[
                            "font-body text-sm sm:text-base leading-snug",
                            isSelected
                              ? "text-foreground font-semibold"
                              : "text-foreground/80",
                          ].join(" ")}
                        >
                          {opt.label}
                        </span>
                        {isSelected && (
                          <span className="ml-auto text-accent text-lg flex-shrink-0">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  {step > 0 && (
                    <Button
                      variant="outline"
                      onClick={handlePrev}
                      className="flex-1"
                      data-ocid="ai_suggest.prev_button"
                    >
                      ← Previous / पिछला
                    </Button>
                  )}
                  {!isLastStep ? (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="flex-1"
                      data-ocid="ai_suggest.next_button"
                    >
                      Next / अगला →
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed || isSubmitting}
                      className="flex-1 gradient-primary text-primary-foreground font-semibold"
                      data-ocid="ai_suggest.submit_button"
                    >
                      {isSubmitting
                        ? "Analyzing... / विश्लेषण हो रहा है..."
                        : "Get My Result / परिणाम देखें 🎯"}
                    </Button>
                  )}
                </div>

                {submitError && (
                  <p
                    className="mt-4 text-sm text-destructive text-center"
                    data-ocid="ai_suggest.error_state"
                  >
                    {submitError}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Result */}
          {step === "result" && currentResult && (
            <ResultCard
              result={currentResult}
              isSavedResult={!!savedResult}
              onRetake={handleRetake}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

// ─── ResultCard ────────────────────────────────────────────────────────────────

interface ResultCardProps {
  result: AIQuizResult;
  isSavedResult: boolean;
  onRetake: () => void;
}

function ResultCard({ result, isSavedResult, onRetake }: ResultCardProps) {
  const biz = BUSINESS_CONFIG[result.businessType] ?? {
    label: String(result.businessType),
    labelHi: String(result.businessType),
    icon: "🌱",
    color: "bg-card border-border",
    description: "",
    reasons: [],
  };

  const confidenceColor =
    result.confidence === "High" || result.confidence === "high"
      ? "bg-secondary/20 text-secondary-foreground border-secondary/40"
      : result.confidence === "Medium" || result.confidence === "medium"
        ? "bg-accent/20 text-accent-foreground border-accent/40"
        : "bg-muted text-muted-foreground border-border";

  // Prefer backend reasons, fall back to config-level reasons (top 3)
  const displayReasons =
    result.reasons && result.reasons.length > 0
      ? result.reasons.slice(0, 3)
      : biz.reasons.slice(0, 3);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="result"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        data-ocid="ai_suggest.result.card"
      >
        {/* Saved indicator */}
        {isSavedResult && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-4 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-2.5 text-sm text-secondary font-body"
            data-ocid="ai_suggest.saved_indicator"
          >
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>
              Your recommendation has been saved to your dashboard / आपकी
              सिफारिश डैशबोर्ड में सेव हो गई है
            </span>
          </motion.div>
        )}

        {/* Main result card */}
        <div className={`rounded-2xl border-2 p-6 mb-4 ${biz.color}`}>
          <div className="flex items-start gap-4">
            <span className="text-5xl flex-shrink-0">{biz.icon}</span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-body">
                Recommended Business / अनुशंसित व्यवसाय
              </p>
              <h2 className="text-2xl font-display font-bold text-foreground">
                {biz.label}
              </h2>
              <p className="text-base font-body text-muted-foreground">
                {biz.labelHi}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold ${confidenceColor}`}
                  data-ocid="ai_suggest.confidence_badge"
                >
                  {result.confidence} Confidence
                </Badge>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground font-body leading-relaxed">
            {biz.description}
          </p>
        </div>

        {/* Top 3 Reasons */}
        {displayReasons.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider">
              Why this suits you? / यह आपके लिए क्यों?
            </h3>
            <ul className="space-y-2">
              {displayReasons.map((reason, i) => (
                <motion.li
                  key={reason}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm text-foreground/80 font-body"
                  data-ocid={`ai_suggest.reason.item.${i + 1}`}
                >
                  <span className="mt-0.5 text-secondary flex-shrink-0">✦</span>
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Get Expert Call — primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="mb-3"
        >
          <Button
            asChild
            size="lg"
            className="w-full gradient-primary text-primary-foreground font-display font-bold text-base py-5 rounded-xl shadow-elevated hover:opacity-90 transition-smooth"
            data-ocid="ai_suggest.get_expert_call_button"
          >
            <Link to="/contact">
              <Phone className="w-5 h-5 mr-2" />
              Get Expert Call / विशेषज्ञ से बात करें 📞
            </Link>
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2 font-body">
            हमारी टीम 24 घंटे में संपर्क करेगी · Our team will contact you within 24
            hours
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <Button
            asChild
            variant="outline"
            className="border-secondary/50 text-foreground hover:bg-secondary/10"
            data-ocid="ai_suggest.view_resources_button"
          >
            <Link to="/resources">📦 View Resources / संसाधन देखें</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-accent/50 text-foreground hover:bg-accent/10"
            data-ocid="ai_suggest.request_expert_button"
          >
            <Link to="/request">👨‍🔧 Submit Request / सहायता माँगें</Link>
          </Button>
        </div>

        {/* Dashboard link */}
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 mb-4 flex items-center gap-3">
          <span className="text-xl flex-shrink-0">📊</span>
          <div className="min-w-0">
            <p className="text-sm font-body text-foreground">
              View your saved AI result in your dashboard
            </p>
            <p className="text-xs text-muted-foreground">
              डैशबोर्ड में अपना AI परिणाम देखें
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="flex-shrink-0 ml-auto"
            data-ocid="ai_suggest.go_dashboard_button"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Retake */}
        <div className="text-center">
          <button
            type="button"
            onClick={onRetake}
            className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-smooth focus-ring rounded"
            data-ocid="ai_suggest.retake_button"
          >
            Retake Quiz / दोबारा प्रयास करें
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
