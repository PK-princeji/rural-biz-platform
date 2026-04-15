import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  FileText,
  MapPin,
  Package,
  PlusCircle,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import type { Case, SupplyRequest, UserProfile } from "../backend.d";
import { BusinessType, CaseStatus, SupplyRequestStatus } from "../backend.d";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useBackend } from "../hooks/useBackend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BUSINESS_LABEL: Record<BusinessType, string> = {
  [BusinessType.agriculture]: "Farming",
  [BusinessType.fishery]: "Fishery",
  [BusinessType.poultry]: "Poultry",
  [BusinessType.goatFarming]: "Goat Farming",
};

const CASE_STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; style: React.CSSProperties; icon: React.ReactNode }
> = {
  [CaseStatus.pending]: {
    label: "Pending",
    style: {
      backgroundColor: "#fef9c3",
      color: "#854d0e",
      borderColor: "#fde047",
    },
    icon: <Clock className="w-3 h-3" />,
  },
  [CaseStatus.inProgress]: {
    label: "In Progress",
    style: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      borderColor: "#93c5fd",
    },
    icon: <Briefcase className="w-3 h-3" />,
  },
  [CaseStatus.completed]: {
    label: "Completed",
    style: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      borderColor: "#86efac",
    },
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
};

const SUPPLY_STATUS_CONFIG: Record<
  SupplyRequestStatus,
  { label: string; style: React.CSSProperties }
> = {
  [SupplyRequestStatus.pending]: {
    label: "Pending",
    style: {
      backgroundColor: "#fef9c3",
      color: "#854d0e",
      borderColor: "#fde047",
    },
  },
  [SupplyRequestStatus.processing]: {
    label: "Processing",
    style: {
      backgroundColor: "#dbeafe",
      color: "#1e40af",
      borderColor: "#93c5fd",
    },
  },
  [SupplyRequestStatus.delivered]: {
    label: "Delivered",
    style: {
      backgroundColor: "#dcfce7",
      color: "#166534",
      borderColor: "#86efac",
    },
  },
  [SupplyRequestStatus.cancelled]: {
    label: "Cancelled",
    style: {
      backgroundColor: "#fee2e2",
      color: "#991b1b",
      borderColor: "#fca5a5",
    },
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
      {/* Header row */}
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
              {BUSINESS_LABEL[c.businessType] ?? c.businessType}
            </Badge>
            <Badge
              className="text-xs font-body border flex items-center gap-1 px-2 py-0"
              style={cfg.style}
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

      {/* Expanded detail */}
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
                alt="Submitted document for this case"
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

function SupplyRow({
  sr,
  index,
}: {
  sr: SupplyRequest;
  index: number;
}) {
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
        className="text-xs font-body border shrink-0 px-2 py-0.5"
        style={cfg.style}
      >
        {cfg.label}
      </Badge>
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
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [expandedSupply, setExpandedSupply] = useState(false);

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
    ? `Welcome back, ${profile.name}!`
    : "My Dashboard";

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
                  "Track your cases and supply requests here"
                )}
              </p>
            </>
          )}
        </div>
        <Button
          onClick={() => void navigate({ to: "/request" })}
          className="gradient-primary text-white border-0 font-body font-semibold shadow-subtle hover:opacity-90 transition-smooth shrink-0"
          data-ocid="dashboard.new_request_button"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      {casesLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Cases"
            value={total}
            icon={<FileText className="w-5 h-5 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_total_card"
          />
          <StatCard
            label="Pending"
            value={pending}
            icon={<Clock className="w-5 h-5" style={{ color: "#92400e" }} />}
            bg="bg-primary/5"
            ocid="dashboard.stat_pending_card"
          />
          <StatCard
            label="In Progress"
            value={inProgress}
            icon={<Briefcase className="w-5 h-5 text-primary" />}
            bg="bg-primary/10"
            ocid="dashboard.stat_inprogress_card"
          />
          <StatCard
            label="Completed"
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
            My Cases
          </h2>
          {/* Filter tabs */}
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
              Failed to load cases. Please try again.
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
                ? "No cases yet"
                : `No ${activeFilter === "InProgress" ? "In Progress" : activeFilter} cases`}
            </h3>
            <p className="text-sm text-muted-foreground font-body mb-5 max-w-xs">
              {activeFilter === "All"
                ? "Submit your first service request and our experts will help you get started."
                : "Try switching to a different filter to see your other cases."}
            </p>
            {activeFilter === "All" && (
              <Button
                size="sm"
                className="gradient-primary text-white border-0 font-body font-semibold"
                onClick={() => void navigate({ to: "/request" })}
                data-ocid="dashboard.cases.submit_request_button"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Submit a Request
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
            Supply Requests
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void navigate({ to: "/resources" })}
            className="text-accent font-body text-xs"
            data-ocid="dashboard.supply.browse_resources_button"
          >
            Browse Resources <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {supplyError ? (
          <div
            className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive"
            data-ocid="dashboard.supply.error_state"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-body">Failed to load supply requests.</p>
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
              No supply requests
            </h3>
            <p className="text-xs text-muted-foreground font-body mb-4 max-w-xs">
              Browse our resource catalog to request seeds, livestock, feed, and
              more.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="font-body text-xs"
              onClick={() => void navigate({ to: "/resources" })}
              data-ocid="dashboard.supply.browse_button"
            >
              Browse Resources
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
                    ? "Show less"
                    : `Show ${supplyRequests.length - 3} more`}
                </button>
              )}
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
              Complete your profile
            </p>
            <p className="text-xs text-muted-foreground font-body">
              Add your name, mobile, and location to get personalized expert
              support.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="font-body text-xs shrink-0 border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => void navigate({ to: "/profile" })}
            data-ocid="dashboard.complete_profile_button"
          >
            Update Profile
          </Button>
        </div>
      )}
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
