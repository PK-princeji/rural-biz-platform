import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  Lightbulb,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  PlusCircle,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import type {
  AIQuizResult,
  Case,
  PremiumRequest,
  SupplyRequest,
  TrainingEnrollment,
  TrainingProgram,
  UserProfile,
} from "../backend.d";
import {
  CaseStatus,
  EnrollmentStatus,
  Specialization,
  SupplyRequestStatus,
} from "../backend.d";
import { Layout } from "../components/Layout";
import {
  PremiumBadge,
  PremiumUpgradeModal,
} from "../components/PremiumUpgradeModal";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useBackend } from "../hooks/useBackend";
import { useLanguage } from "../hooks/useLanguage";

// ─── Constants ─────────────────────────────────────────────────────────────────

const WHATSAPP_LINK = "https://wa.me/918986378505";
const PHONE_LINK = "tel:+918579042891";

const BUSINESS_LABEL: Record<Specialization, string> = {
  [Specialization.agriculture]: "Farming",
  [Specialization.fishery]: "Fishery",
  [Specialization.poultry]: "Poultry",
  [Specialization.goatFarming]: "Goat Farming",
};

const CASE_STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; labelHi: string; className: string; icon: React.ReactNode }
> = {
  [CaseStatus.pending]: {
    label: "Pending",
    labelHi: "लंबित",
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
    icon: <Clock className="w-3 h-3" />,
  },
  [CaseStatus.inProgress]: {
    label: "In Progress",
    labelHi: "प्रगति में",
    className: "bg-primary/10 text-primary border-primary/30",
    icon: <Briefcase className="w-3 h-3" />,
  },
  [CaseStatus.completed]: {
    label: "Completed",
    labelHi: "पूर्ण",
    className: "bg-accent/10 text-accent border-accent/30",
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
};

const SUPPLY_STATUS_CONFIG: Record<
  SupplyRequestStatus,
  { label: string; className: string }
> = {
  [SupplyRequestStatus.pending]: {
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  },
  [SupplyRequestStatus.processing]: {
    label: "Processing",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  [SupplyRequestStatus.delivered]: {
    label: "Delivered",
    className: "bg-accent/10 text-accent border-accent/30",
  },
  [SupplyRequestStatus.cancelled]: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const ENROLLMENT_STATUS_CONFIG: Record<
  EnrollmentStatus,
  { label: string; labelHi: string; className: string }
> = {
  [EnrollmentStatus.enrolled]: {
    label: "Enrolled",
    labelHi: "नामांकित",
    className: "bg-primary/10 text-primary border-primary/30",
  },
  [EnrollmentStatus.ongoing]: {
    label: "Ongoing",
    labelHi: "जारी है",
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  },
  [EnrollmentStatus.completed]: {
    label: "Completed",
    labelHi: "पूर्ण",
    className: "bg-accent/10 text-accent border-accent/30",
  },
};

// ─── Journey steps ─────────────────────────────────────────────────────────────

type JourneyStep = {
  id: number;
  label: string;
  labelHi: string;
  icon: React.ReactNode;
};

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    label: "Register",
    labelHi: "पंजीकरण",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 2,
    label: "Submit Problem",
    labelHi: "समस्या भेजें",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 3,
    label: "Case Created",
    labelHi: "केस बना",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 4,
    label: "Expert Contact",
    labelHi: "विशेषज्ञ संपर्क",
    icon: <Phone className="w-4 h-4" />,
  },
  {
    id: 5,
    label: "Execution",
    labelHi: "कार्यान्वयन",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: 6,
    label: "Profit",
    labelHi: "लाभ",
    icon: <Sparkles className="w-4 h-4" />,
  },
];

function getCurrentStep(cases: Case[]): number {
  if (cases.length === 0) return 1;
  const hasCompleted = cases.some((c) => c.status === CaseStatus.completed);
  if (hasCompleted) return 6;
  const hasInProgress = cases.some((c) => c.status === CaseStatus.inProgress);
  if (hasInProgress) return 4;
  return 3;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCaseId(id: bigint): string {
  return `RB-${String(id).padStart(4, "0")}`;
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterTab = "All" | "Pending" | "InProgress" | "Completed";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "InProgress" },
  { label: "Completed", value: "Completed" },
];

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon,
  bg,
  ocid,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  bg: string;
  ocid: string;
}) {
  return (
    <Card className="border-border shadow-subtle" data-ocid={ocid}>
      <CardContent className="p-4 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xl font-display font-bold text-foreground leading-none">
            {value}
          </p>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Progress Tracker ─────────────────────────────────────────────────────────

function ProgressTracker({
  currentStep,
  loading,
}: {
  currentStep: number;
  loading: boolean;
}) {
  const { t, lang } = useLanguage();

  return (
    <Card
      className="border-border shadow-subtle bg-gradient-to-br from-primary/5 to-accent/5"
      data-ocid="dashboard.progress_tracker"
    >
      <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
        <CardTitle className="text-base font-display font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          {t("Your Business Journey", "आपकी व्यापार यात्रा")}
        </CardTitle>
        <p className="text-xs text-muted-foreground font-body mt-0.5">
          {t(
            "Register → Submit Problem → Case → Expert Contact → Execution → Profit",
            "पंजीकरण → समस्या → केस → संपर्क → कार्य → लाभ",
          )}
        </p>
      </CardHeader>
      <CardContent className="px-4 sm:px-5 pb-4">
        {loading ? (
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="flex-1 h-14 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="flex items-stretch gap-1 sm:gap-2 overflow-x-auto pb-1">
            {JOURNEY_STEPS.map((step, idx) => {
              const isDone = step.id < currentStep;
              const isActive = step.id === currentStep;

              return (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div
                    className={`flex-1 min-w-[52px] flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-smooth ${
                      isActive
                        ? "border-accent bg-accent/10 shadow-subtle"
                        : isDone
                          ? "border-accent/30 bg-accent/5"
                          : "border-border/50 bg-muted/20 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-accent text-white"
                          : isDone
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-body font-medium text-center leading-tight ${
                        isActive
                          ? "text-accent"
                          : isDone
                            ? "text-accent/80"
                            : "text-muted-foreground"
                      }`}
                    >
                      {lang === "hi" ? step.labelHi : step.label}
                    </span>
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>
                  {idx < JOURNEY_STEPS.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-border mx-0.5 shrink-0 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {!loading && (
          <p className="text-xs text-muted-foreground font-body mt-3 text-center">
            {t(`Step ${currentStep} of 6`, `चरण ${currentStep} / 6`)}
            {currentStep < 6 && (
              <span className="ml-1 text-accent font-medium">
                {t("— Keep going!", "— आगे बढ़ते रहें!")}
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Request Call Banner ──────────────────────────────────────────────────────

function RequestCallBanner() {
  const { t } = useLanguage();

  return (
    <div
      className="rounded-xl border border-accent/30 bg-accent/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      data-ocid="dashboard.request_call_banner"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
          <Phone className="w-4 h-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-body font-semibold text-foreground">
            {t("Talk to Our Expert Team", "हमारे विशेषज्ञ से बात करें")}
          </p>
          <p className="text-xs text-muted-foreground font-body">
            {t(
              "Get personalized guidance for your business. Available Mon–Sat, 9 AM–6 PM.",
              "सोम–शनि, सुबह 9–शाम 6 बजे उपलब्ध।",
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <Button
          asChild
          size="sm"
          className="bg-accent hover:bg-accent/90 text-white border-0 font-body font-semibold text-xs transition-smooth"
          data-ocid="dashboard.whatsapp_button"
        >
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            {t("WhatsApp", "व्हाट्सएप")}
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-accent/30 text-accent hover:bg-accent/5 font-body font-semibold text-xs transition-smooth"
          data-ocid="dashboard.call_button"
        >
          <a href={PHONE_LINK}>
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            {t("Call Now", "अभी कॉल करें")}
          </a>
        </Button>
      </div>
    </div>
  );
}

// ─── AI Results section ───────────────────────────────────────────────────────

function AIResultsSection({
  result,
  loading,
  navigate,
}: {
  result: AIQuizResult | null | undefined;
  loading: boolean;
  navigate: (opts: { to: string }) => void;
}) {
  const { t } = useLanguage();

  return (
    <section data-ocid="dashboard.ai_results_section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          {t("AI Recommendation", "AI सुझाव")}
        </h2>
        {result && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate({ to: "/ai-suggest" })}
            className="text-accent font-body text-xs"
            data-ocid="dashboard.ai.retake_button"
          >
            {t("Retake Quiz", "फिर से करें")}
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-36 rounded-xl" />
      ) : result ? (
        <Card
          className="border-primary/20 bg-gradient-to-br from-primary/5 to-card shadow-subtle"
          data-ocid="dashboard.ai_result_card"
        >
          <CardContent className="p-4 sm:p-5 space-y-4">
            {/* Top row: Business type + confidence */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">
                  {t("Recommended Business", "अनुशंसित व्यवसाय")}
                </p>
                <p className="text-xl font-display font-bold text-foreground">
                  {BUSINESS_LABEL[
                    result.businessType as unknown as Specialization
                  ] ?? String(result.businessType)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className="bg-accent/10 text-accent border-accent/30 font-body text-xs px-2 py-0.5">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {t("Confidence", "विश्वास")}: {result.confidence}
                </Badge>
              </div>
            </div>

            {/* Reasons */}
            {result.reasons.length > 0 && (
              <div>
                <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {t("Why this is right for you", "यह आपके लिए क्यों सही है")}
                </p>
                <ul className="space-y-1.5">
                  {result.reasons.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-2 text-sm font-body text-foreground"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <span className="leading-snug">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-border/50">
              <Button
                size="sm"
                className="gradient-primary text-white border-0 font-body font-semibold text-xs"
                onClick={() => void navigate({ to: "/request" })}
                data-ocid="dashboard.ai.start_business_button"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                {t("Start This Business", "यह व्यापार शुरू करें")}
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-accent/30 text-accent hover:bg-accent/5 font-body text-xs"
                data-ocid="dashboard.ai.expert_call_button"
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  {t("Get Expert Call", "विशेषज्ञ से बात करें")}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl border-2 border-dashed border-primary/20 bg-primary/3 text-center"
          data-ocid="dashboard.ai.empty_state"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
            <Lightbulb className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-sm font-display font-semibold text-foreground mb-1">
            {t("Discover Your Best Business", "अपना बेस्ट व्यवसाय खोजें")}
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-4 max-w-xs">
            {t(
              "Our AI will analyze your location, budget, and interests to recommend the perfect rural business.",
              "हमारा AI आपके क्षेत्र, बजट, और रुचि के आधार पर सही व्यापार सुझाएगा।",
            )}
          </p>
          <Button
            size="sm"
            className="gradient-primary text-white border-0 font-body font-semibold"
            onClick={() => void navigate({ to: "/ai-suggest" })}
            data-ocid="dashboard.ai.take_quiz_button"
          >
            <Bot className="w-4 h-4 mr-1.5" />
            {t("Find Best Business", "बेस्ट बिज़नेस खोजें")}
          </Button>
        </div>
      )}
    </section>
  );
}

// ─── Case card ────────────────────────────────────────────────────────────────

function CaseCard({ c, index }: { c: Case; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { lang } = useLanguage();
  const cfg = CASE_STATUS_CONFIG[c.status];

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle transition-smooth hover:shadow-elevated"
      data-ocid={`dashboard.case.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full text-left p-4 flex items-start sm:items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-ocid={`dashboard.case.toggle.${index + 1}`}
      >
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">
              {formatCaseId(c.id)}
            </span>
            <Badge
              variant="outline"
              className="text-xs font-body px-2 py-0 border-border"
            >
              {BUSINESS_LABEL[c.businessType as unknown as Specialization] ??
                String(c.businessType)}
            </Badge>
            <Badge
              className={`text-xs font-body border flex items-center gap-1 px-2 py-0 ${cfg.className}`}
            >
              {cfg.icon}
              {lang === "hi" ? cfg.labelHi : cfg.label}
            </Badge>
          </div>
          <p className="text-sm text-foreground font-body line-clamp-1 pr-4">
            {c.description}
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Submitted {formatDate(c.createdAt)}
          </p>
        </div>
        <div className="shrink-0 text-muted-foreground mt-0.5">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border bg-muted/30 px-4 py-4 space-y-3">
          <div>
            <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              Full Description
            </p>
            <p className="text-sm text-foreground font-body leading-relaxed">
              {c.description}
            </p>
          </div>
          {c.photoUrl && (
            <div>
              <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Uploaded Photo
              </p>
              <img
                src={c.photoUrl}
                alt="Submitted document"
                className="w-full max-w-xs h-40 object-cover rounded-lg border border-border"
              />
            </div>
          )}
          {c.assignedExpertId != null && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-body text-foreground">
                Expert assigned (ID: {String(c.assignedExpertId)})
              </span>
            </div>
          )}
          {c.adminNotes && (
            <div>
              <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Next Steps / Admin Notes
              </p>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm text-foreground font-body leading-relaxed whitespace-pre-line">
                  {c.adminNotes}
                </p>
              </div>
            </div>
          )}
          {!c.adminNotes && !c.assignedExpertId && (
            <p className="text-sm text-muted-foreground font-body italic">
              Awaiting expert assignment and review.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Supply request row ───────────────────────────────────────────────────────

function SupplyRow({ sr, index }: { sr: SupplyRequest; index: number }) {
  const cfg = SUPPLY_STATUS_CONFIG[sr.status];
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-smooth"
      data-ocid={`dashboard.supply.item.${index + 1}`}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-accent shrink-0" />
          <span className="text-sm font-body font-medium text-foreground truncate">
            Resource #{String(sr.resourceId)}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            × {String(sr.quantity)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{sr.deliveryLocation}</span>
          <span className="text-border">·</span>
          <span>{formatDate(sr.createdAt)}</span>
        </div>
      </div>
      <Badge
        className={`text-xs font-body border shrink-0 px-2 py-0.5 ${cfg.className}`}
      >
        {cfg.label}
      </Badge>
    </div>
  );
}

// ─── Training enrollment card ─────────────────────────────────────────────────

function TrainingCard({
  enrollment,
  program,
  index,
}: {
  enrollment: TrainingEnrollment;
  program: TrainingProgram | null;
  index: number;
}) {
  const { lang } = useLanguage();
  const cfg = ENROLLMENT_STATUS_CONFIG[enrollment.status];

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-smooth"
      data-ocid={`dashboard.training.item.${index + 1}`}
    >
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-body font-medium text-foreground truncate">
            {program?.title ?? `Program #${String(enrollment.programId)}`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-body">
          {program?.sector && (
            <Badge
              variant="outline"
              className="text-xs px-1.5 py-0 border-border font-body"
            >
              {BUSINESS_LABEL[program.sector as unknown as Specialization] ??
                String(program.sector)}
            </Badge>
          )}
          {program?.duration && <span>{program.duration}</span>}
          <span className="text-border">·</span>
          <span>Enrolled {formatDate(enrollment.enrolledAt)}</span>
        </div>
      </div>
      <Badge
        className={`text-xs font-body border px-2 py-0.5 shrink-0 ${cfg.className}`}
      >
        {lang === "hi" ? cfg.labelHi : cfg.label}
      </Badge>
    </div>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="border-border shadow-subtle">
          <CardContent className="p-4 flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-8 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CasesSkeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <Skeleton key={i} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}

// ─── Main content ─────────────────────────────────────────────────────────────

function DashboardContent() {
  const navigate = useNavigate();
  const backend = useBackend();
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [expandedSupply, setExpandedSupply] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);

  const { data: profile, isLoading: profileLoading } =
    useQuery<UserProfile | null>({
      queryKey: ["profile"],
      queryFn: () => backend.getCallerUserProfile(),
    });

  const {
    data: cases = [],
    isLoading: casesLoading,
    isError: casesError,
  } = useQuery<Case[]>({
    queryKey: ["myCases"],
    queryFn: () => backend.getMyCases(),
  });

  const {
    data: supplyRequests = [],
    isLoading: supplyLoading,
    isError: supplyError,
  } = useQuery<SupplyRequest[]>({
    queryKey: ["mySupplyRequests"],
    queryFn: () => backend.getMySupplyRequests(),
  });

  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery<
    TrainingEnrollment[]
  >({
    queryKey: ["myTrainingEnrollments"],
    queryFn: () => backend.getMyTrainingEnrollments(),
  });

  const { data: allPrograms = [] } = useQuery<TrainingProgram[]>({
    queryKey: ["trainingPrograms"],
    queryFn: () => backend.listTrainingPrograms(),
  });

  const { data: existingPremiumRequest } = useQuery<PremiumRequest | null>({
    queryKey: ["myPremiumRequest"],
    queryFn: () => backend.getMyPremiumRequest(),
  });

  const { data: aiResult, isLoading: aiLoading } =
    useQuery<AIQuizResult | null>({
      queryKey: ["myAIQuizResult"],
      queryFn: () => backend.getMyAIQuizResult(),
    });

  const programMap = new Map<string, TrainingProgram>(
    allPrograms.map((p) => [String(p.id), p]),
  );

  // Stats
  const total = cases.length;
  const pending = cases.filter((c) => c.status === CaseStatus.pending).length;
  const inProgress = cases.filter(
    (c) => c.status === CaseStatus.inProgress,
  ).length;
  const completed = cases.filter(
    (c) => c.status === CaseStatus.completed,
  ).length;

  // Current journey step
  const currentStep = casesLoading ? 1 : getCurrentStep(cases);

  // Filtered cases
  const filteredCases = cases.filter((c) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Pending") return c.status === CaseStatus.pending;
    if (activeFilter === "InProgress")
      return c.status === CaseStatus.inProgress;
    if (activeFilter === "Completed") return c.status === CaseStatus.completed;
    return true;
  });

  const greeting = profile?.name
    ? t(`Welcome back, ${profile.name}!`, `वापस आए, ${profile.name}!`)
    : t("My Dashboard", "मेरा डैशबोर्ड");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {profileLoading ? (
            <>
              <Skeleton className="h-7 w-48 rounded-lg mb-2" />
              <Skeleton className="h-4 w-32 rounded" />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-display font-bold text-foreground">
                {greeting}
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-1">
                {profile?.location ? (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.location}
                  </span>
                ) : (
                  t(
                    "Track your business journey here",
                    "अपनी व्यापार यात्रा यहां देखें",
                  )
                )}
              </p>
            </>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {existingPremiumRequest ? (
            <PremiumBadge />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPremiumModalOpen(true)}
              className="font-body font-semibold text-xs border-primary/30 text-primary hover:bg-primary/5 transition-smooth"
              data-ocid="dashboard.upgrade_premium_button"
            >
              <Crown className="w-3.5 h-3.5 mr-1.5" />
              {t("Upgrade to Premium", "प्रीमियम अपग्रेड")}
            </Button>
          )}
          <Button
            onClick={() => void navigate({ to: "/request" })}
            className="gradient-primary text-white border-0 font-body font-semibold shadow-subtle hover:opacity-90 transition-smooth"
            data-ocid="dashboard.new_request_button"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            {t("New Request", "नया अनुरोध")}
          </Button>
        </div>
      </div>

      {/* ── Progress Tracker ── */}
      <ProgressTracker currentStep={currentStep} loading={casesLoading} />

      {/* ── Stats ── */}
      {casesLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label={t("Total Cases", "कुल केस")}
            value={total}
            icon={<FileText className="w-4 h-4 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_total_card"
          />
          <StatCard
            label={t("Pending", "लंबित")}
            value={pending}
            icon={<Clock className="w-4 h-4 text-yellow-700" />}
            bg="bg-yellow-500/10"
            ocid="dashboard.stat_pending_card"
          />
          <StatCard
            label={t("In Progress", "प्रगति में")}
            value={inProgress}
            icon={<Briefcase className="w-4 h-4 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_inprogress_card"
          />
          <StatCard
            label={t("Completed", "पूर्ण")}
            value={completed}
            icon={<CheckCircle2 className="w-4 h-4 text-accent" />}
            bg="bg-accent/10"
            ocid="dashboard.stat_completed_card"
          />
        </div>
      )}

      {/* ── Request Call Banner ── */}
      <RequestCallBanner />

      {/* ── AI Results ── */}
      <AIResultsSection
        result={aiResult}
        loading={aiLoading}
        navigate={(opts) => void navigate(opts)}
      />

      {/* ── My Requests (Cases) ── */}
      <section data-ocid="dashboard.cases_section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-display font-bold text-foreground">
            {t("My Requests", "मेरे अनुरोध")}
          </h2>
          <div
            className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 w-full sm:w-auto overflow-x-auto"
            data-ocid="dashboard.filter.tab"
            role="tablist"
          >
            {FILTER_TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                role="tab"
                aria-selected={activeFilter === tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`text-xs font-body font-medium px-3 py-1.5 rounded-md whitespace-nowrap transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                  activeFilter === tab.value
                    ? "bg-card text-foreground shadow-subtle"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`dashboard.filter_${tab.value.toLowerCase()}_tab`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {casesError ? (
          <div
            className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive"
            data-ocid="dashboard.cases.error_state"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-body">
              {t(
                "Failed to load requests. Please try again.",
                "अनुरोध लोड नहीं हो सके।",
              )}
            </p>
          </div>
        ) : casesLoading ? (
          <CasesSkeleton />
        ) : filteredCases.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12 px-6 rounded-2xl border-2 border-dashed border-border bg-muted/20 text-center"
            data-ocid="dashboard.cases.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-base font-display font-semibold text-foreground mb-1">
              {activeFilter === "All"
                ? t("No requests yet", "अभी कोई अनुरोध नहीं")
                : t("No requests in this filter", "इस फ़िल्टर में कोई अनुरोध नहीं")}
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-5 max-w-xs">
              {activeFilter === "All"
                ? t(
                    "Submit your first request and our experts will help you get started.",
                    "अपना पहला अनुरोध भेजें और हमारे विशेषज्ञ आपकी मदद करेंगे।",
                  )
                : t(
                    "Try switching to a different filter.",
                    "दूसरा फ़िल्टर आज़माएं।",
                  )}
            </p>
            {activeFilter === "All" && (
              <Button
                size="sm"
                className="gradient-primary text-white border-0 font-body font-semibold"
                onClick={() => void navigate({ to: "/request" })}
                data-ocid="dashboard.cases.submit_request_button"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                {t("Submit a Request", "अनुरोध भेजें")}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3" data-ocid="dashboard.cases_list">
            {filteredCases.map((c, i) => (
              <CaseCard key={String(c.id)} c={c} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── Supply Requests ── */}
      {(supplyLoading || supplyRequests.length > 0 || supplyError) && (
        <section data-ocid="dashboard.supply_section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              {t("Supply Requests", "आपूर्ति अनुरोध")}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void navigate({ to: "/resources" })}
              className="text-accent font-body text-xs"
              data-ocid="dashboard.supply.browse_resources_button"
            >
              {t("Browse Resources", "संसाधन देखें")}
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {supplyError ? (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive"
              data-ocid="dashboard.supply.error_state"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-body">
                {t(
                  "Failed to load supply requests.",
                  "आपूर्ति अनुरोध लोड नहीं हो सके।",
                )}
              </p>
            </div>
          ) : supplyLoading ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <Card
              className="border-border shadow-subtle"
              data-ocid="dashboard.supply_card"
            >
              <CardContent className="p-4 space-y-3">
                {(expandedSupply
                  ? supplyRequests
                  : supplyRequests.slice(0, 3)
                ).map((sr, i) => (
                  <SupplyRow key={String(sr.id)} sr={sr} index={i} />
                ))}
                {supplyRequests.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setExpandedSupply((v) => !v)}
                    className="text-xs text-accent font-body font-medium w-full text-center py-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded"
                    data-ocid="dashboard.supply.toggle_expand_button"
                  >
                    {expandedSupply
                      ? t("Show less", "कम दिखाएं")
                      : lang === "hi"
                        ? `${supplyRequests.length - 3} और दिखाएं`
                        : `Show ${supplyRequests.length - 3} more`}
                  </button>
                )}
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* ── My Trainings ── */}
      {(enrollmentsLoading || enrollments.length > 0) && (
        <section data-ocid="dashboard.trainings_section">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">
                {t("My Trainings", "मेरे प्रशिक्षण")}
              </h2>
              <p className="text-xs text-muted-foreground font-body mt-0.5">
                {t(
                  "Track your enrolled training programs",
                  "नामांकित प्रशिक्षण कार्यक्रम देखें",
                )}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void navigate({ to: "/trainings" })}
              className="text-accent font-body text-xs"
              data-ocid="dashboard.trainings.browse_button"
            >
              {t("Browse Programs", "कार्यक्रम देखें")}
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {enrollmentsLoading ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <Card
              className="border-border shadow-subtle"
              data-ocid="dashboard.trainings_card"
            >
              <CardContent className="p-4 space-y-3">
                {enrollments.map((e, i) => (
                  <TrainingCard
                    key={String(e.id)}
                    enrollment={e}
                    program={programMap.get(String(e.programId)) ?? null}
                    index={i}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* ── Explore Trainings CTA (only when no enrollments) ── */}
      {!enrollmentsLoading && enrollments.length === 0 && (
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border"
          data-ocid="dashboard.explore_trainings_cta"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-semibold text-foreground">
              {t("Explore Training Programs", "प्रशिक्षण कार्यक्रम देखें")}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {t(
                "Learn farming, fishery, poultry, and goat rearing from experts.",
                "विशेषज्ञों से खेती, मछली पालन, पोल्ट्री और बकरी पालन सीखें।",
              )}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="font-body text-xs shrink-0"
            onClick={() => void navigate({ to: "/trainings" })}
            data-ocid="dashboard.explore_trainings_button"
          >
            {t("Browse Programs", "कार्यक्रम देखें")}
          </Button>
        </div>
      )}

      {/* ── Profile completion nudge ── */}
      {!profileLoading && !profile?.name && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-body font-semibold text-foreground">
              {t("Complete your profile", "अपनी प्रोफाइल पूरी करें")}
            </p>
            <p className="text-xs text-muted-foreground font-body">
              {t(
                "Add your name, mobile, and location to get personalized expert support.",
                "व्यक्तिगत विशेषज्ञ सहायता के लिए नाम, मोबाइल और स्थान जोड़ें।",
              )}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="font-body text-xs shrink-0 border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => void navigate({ to: "/profile" })}
            data-ocid="dashboard.complete_profile_button"
          >
            {t("Update Profile", "प्रोफाइल अपडेट करें")}
          </Button>
        </div>
      )}

      {/* ── Premium Modal ── */}
      <PremiumUpgradeModal
        open={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
      />
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <Layout>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </Layout>
  );
}
