import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Crown,
  FileText,
  GraduationCap,
  MapPin,
  Package,
  PlusCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import type {
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BUSINESS_LABEL: Record<Specialization, string> = {
  [Specialization.agriculture]: "Farming",
  [Specialization.fishery]: "Fishery",
  [Specialization.poultry]: "Poultry",
  [Specialization.goatFarming]: "Goat Farming",
};

const CASE_STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  [CaseStatus.pending]: {
    label: "Pending",
    className: "bg-primary/5 text-primary border-primary/20",
    icon: <Clock className="w-3 h-3" />,
  },
  [CaseStatus.inProgress]: {
    label: "In Progress",
    className: "bg-primary/10 text-primary border-primary/30",
    icon: <Briefcase className="w-3 h-3" />,
  },
  [CaseStatus.completed]: {
    label: "Completed",
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
    className: "bg-primary/5 text-primary border-primary/20",
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
    className: "bg-primary/5 text-primary border-primary/20",
  },
  [EnrollmentStatus.completed]: {
    label: "Completed",
    labelHi: "पूर्ण",
    className: "bg-accent/10 text-accent border-accent/30",
  },
};

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
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-display font-bold text-foreground leading-none">
            {value}
          </p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Case card ────────────────────────────────────────────────────────────────

function CaseCard({ c, index }: { c: Case; index: number }) {
  const [expanded, setExpanded] = useState(false);
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
                c.businessType}
            </Badge>
            <Badge
              className={`text-xs font-body border flex items-center gap-1 px-2 py-0 ${cfg.className}`}
            >
              {cfg.icon}
              {cfg.label}
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
                program.sector}
            </Badge>
          )}
          {program?.duration && <span>{program.duration}</span>}
          <span className="text-border">·</span>
          <span>Enrolled {formatDate(enrollment.enrolledAt)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge
          className={`text-xs font-body border px-2 py-0.5 ${cfg.className}`}
        >
          {lang === "hi" ? cfg.labelHi : cfg.label}
        </Badge>
      </div>
    </div>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="border-border shadow-subtle">
          <CardContent className="p-5 flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-10 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
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

  // Build program lookup map
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
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
                    "Track your cases and supply requests here",
                    "अपने केस और सप्लाई अनुरोध यहां देखें",
                  )
                )}
              </p>
            </>
          )}
        </div>

        {/* Action buttons row */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Premium button / badge */}
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

      {/* Stats */}
      {casesLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label={t("Total Cases", "कुल केस")}
            value={total}
            icon={<FileText className="w-5 h-5 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_total_card"
          />
          <StatCard
            label={t("Pending", "लंबित")}
            value={pending}
            icon={<Clock className="w-5 h-5 text-primary" />}
            bg="bg-primary/5"
            ocid="dashboard.stat_pending_card"
          />
          <StatCard
            label={t("In Progress", "प्रगति में")}
            value={inProgress}
            icon={<Briefcase className="w-5 h-5 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_inprogress_card"
          />
          <StatCard
            label={t("Completed", "पूर्ण")}
            value={completed}
            icon={<CheckCircle2 className="w-5 h-5 text-accent" />}
            bg="bg-accent/10"
            ocid="dashboard.stat_completed_card"
          />
        </div>
      )}

      {/* Cases section */}
      <section data-ocid="dashboard.cases_section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-display font-bold text-foreground">
            {t("My Cases", "मेरे केस")}
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
                "Failed to load cases. Please try again.",
                "केस लोड नहीं हो सके। पुनः प्रयास करें।",
              )}
            </p>
          </div>
        ) : casesLoading ? (
          <CasesSkeleton />
        ) : filteredCases.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-14 px-6 rounded-2xl border-2 border-dashed border-border bg-muted/20 text-center"
            data-ocid="dashboard.cases.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-base font-display font-semibold text-foreground mb-1">
              {activeFilter === "All"
                ? t("No cases yet", "अभी कोई केस नहीं")
                : t("No cases in this filter", "इस फ़िल्टर में कोई केस नहीं")}
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-5 max-w-xs">
              {activeFilter === "All"
                ? t(
                    "Submit your first service request and our experts will help you get started.",
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

      {/* Supply requests section */}
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
            {t("Browse Resources", "संसाधन देखें")}{" "}
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
        ) : supplyRequests.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl border-2 border-dashed border-border bg-muted/20 text-center"
            data-ocid="dashboard.supply.empty_state"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
              <Package className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-1">
              {t("No supply requests", "कोई आपूर्ति अनुरोध नहीं")}
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-4 max-w-xs">
              {t(
                "Browse our resource catalog to request seeds, livestock, feed, and more.",
                "बीज, पशु, चारा और अधिक के लिए संसाधन देखें।",
              )}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="font-body text-xs"
              onClick={() => void navigate({ to: "/resources" })}
              data-ocid="dashboard.supply.browse_button"
            >
              {t("Browse Resources", "संसाधन देखें")}
            </Button>
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

      {/* My Trainings section */}
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
            {t("Browse Programs", "कार्यक्रम देखें")}{" "}
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {enrollmentsLoading ? (
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : enrollments.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl border-2 border-dashed border-border bg-muted/20 text-center"
            data-ocid="dashboard.trainings.empty_state"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-sm font-display font-semibold text-foreground mb-1">
              {t("No trainings enrolled", "कोई प्रशिक्षण नामांकित नहीं")}
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-4 max-w-xs">
              {t(
                "Explore training programs in farming, fishery, poultry, and goat rearing.",
                "खेती, मछली पालन, पोल्ट्री और बकरी पालन में प्रशिक्षण देखें।",
              )}
            </p>
            <Button
              size="sm"
              className="gradient-primary text-white border-0 font-body font-semibold"
              onClick={() => void navigate({ to: "/trainings" })}
              data-ocid="dashboard.trainings.browse_programs_button"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              {t("Browse Training Programs", "प्रशिक्षण देखें")}
            </Button>
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

      {/* Profile completion nudge */}
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

      {/* Premium Modal */}
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
