import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
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
  }
> = {
  Farming: {
    label: "Crop Farming",
    labelHi: "फसल खेती",
    icon: "🌾",
    color: "bg-secondary/20 border-secondary/40 text-secondary-foreground",
    description: "Best for dry farmland with some experience in agriculture.",
  },
  Fishery: {
    label: "Fish Farming",
    labelHi: "मछली पालन",
    icon: "🐟",
    color: "bg-primary/20 border-primary/40 text-primary-foreground",
    description:
      "Ideal near rivers, lakes, or water bodies with moderate budget.",
  },
  Poultry: {
    label: "Poultry Farming",
    labelHi: "मुर्गी पालन",
    icon: "🐔",
    color: "bg-accent/20 border-accent/40 text-accent-foreground",
    description:
      "Low startup cost, suitable for any location with minimal land.",
  },
  GoatFarming: {
    label: "Goat Farming",
    labelHi: "बकरी पालन",
    icon: "🐐",
    color: "bg-card border-border",
    description: "Great for hill or dry regions with low to medium investment.",
  },
};

// ─── WhatsApp helper ───────────────────────────────────────────────────────────

function buildWhatsAppUrl(businessType: BusinessType): string {
  const biz = BUSINESS_CONFIG[businessType] ?? { label: String(businessType) };
  const message = encodeURIComponent(
    `Hi! I completed the AI Business Quiz and got recommendation: ${biz.label}. I need expert help.`,
  );
  return `https://wa.me/918986378505?text=${message}`;
}

// ─── Component ─────────────────────────────────────────────────────────────────

type QuizStep = "loading" | "result" | number;

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
              AI Business Quiz
            </h1>
            <p className="text-lg font-display text-primary-foreground/80 mt-1">
              AI व्यवसाय सलाह
            </p>
            <p className="mt-3 text-sm text-primary-foreground/70 max-w-md mx-auto text-balance">
              5 simple questions to find your perfect rural business match.
              <br />
              <span className="text-primary-foreground/60">
                सही व्यवसाय खोजने के लिए 5 सवाल।
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
  };

  const confidenceColor =
    result.confidence === "High" || result.confidence === "high"
      ? "bg-secondary/20 text-secondary-foreground border-secondary/40"
      : result.confidence === "Medium" || result.confidence === "medium"
        ? "bg-accent/20 text-accent-foreground border-accent/40"
        : "bg-muted text-muted-foreground border-border";

  const whatsappUrl = buildWhatsAppUrl(result.businessType);

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
            className="flex items-center justify-center gap-2 mb-4 text-sm text-secondary font-body"
            data-ocid="ai_suggest.saved_indicator"
          >
            <span className="text-base">✅</span>
            <span>Saved to your profile / आपके प्रोफाइल में सेव हो गया</span>
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

        {/* Reasons */}
        {result.reasons && result.reasons.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="text-sm font-display font-semibold text-foreground mb-3 uppercase tracking-wider">
              Why this? / यह क्यों?
            </h3>
            <ul className="space-y-2">
              {result.reasons.map((reason, i) => (
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

        {/* Get Expert Call via WhatsApp — prominent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="mb-4"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 px-5 font-body font-semibold text-base text-white transition-smooth focus-ring bg-whatsapp"
            data-ocid="ai_suggest.get_expert_call_button"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span>Get Expert Call / विशेषज्ञ से बात करें</span>
            <span className="text-lg flex-shrink-0">📞</span>
          </a>
          <p className="text-xs text-center text-muted-foreground mt-2 font-body">
            WhatsApp पर तुरंत संपर्क करें · Contact us on WhatsApp
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <Button
            asChild
            className="gradient-primary text-primary-foreground font-semibold"
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
            <Link to="/request">👨‍🔧 Request Expert / विशेषज्ञ सहायता</Link>
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
