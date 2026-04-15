import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Navigate, useNavigate } from "@tanstack/react-router";
import {
  ActivityIcon,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  PlusCircle,
  ShieldAlert,
  Users,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Specialization as BusinessType,
  CaseStatus,
  type Expert,
} from "../backend.d";
import type { Case } from "../backend.d";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtPrincipal(p: { toText(): string } | string): string {
  const s = typeof p === "string" ? p : p.toText();
  return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

const BUSINESS_LABELS: Record<string, string> = {
  agriculture: "Farming",
  fishery: "Fishery",
  poultry: "Poultry",
  goatFarming: "Goat Farming",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  inProgress: "In Progress",
  completed: "Completed",
};

const STATUS_COLORS: Record<string, React.CSSProperties> = {
  pending: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
    borderColor: "#fde047",
  },
  inProgress: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderColor: "#93c5fd",
  },
  completed: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderColor: "#86efac",
  },
};

// ─── Skeletons ───────────────────────────────────────────────────────────────

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="border-border shadow-subtle">
          <CardContent className="p-4">
            <Skeleton className="h-8 w-12 mb-1 rounded" />
            <Skeleton className="h-3 w-20 rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CaseListSkeleton() {
  return (
    <div className="divide-y divide-border">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 space-y-2">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Expert Card ──────────────────────────────────────────────────────────────

interface ExpertCardProps {
  expert: Expert;
  index: number;
  onToggle: (id: bigint, active: boolean) => Promise<void>;
}

function ExpertCard({ expert, index, onToggle }: ExpertCardProps) {
  const [toggling, setToggling] = useState(false);

  async function handleToggle(checked: boolean) {
    setToggling(true);
    try {
      await onToggle(expert.id, checked);
    } finally {
      setToggling(false);
    }
  }

  return (
    <Card
      className="border-border shadow-subtle"
      data-ocid={`admin.expert_card.${index}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-display font-semibold text-foreground text-sm">
                {expert.name}
              </p>
              <Badge
                variant="outline"
                className="text-xs font-body"
                style={
                  expert.isActive
                    ? { borderColor: "#86efac", color: "#166534" }
                    : {
                        borderColor: "var(--border)",
                        color: "var(--muted-foreground)",
                      }
                }
              >
                {expert.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-0.5">
              {BUSINESS_LABELS[expert.specialization] ?? expert.specialization}
            </p>
            {expert.contactInfo && (
              <p className="text-xs text-muted-foreground font-body mt-0.5 truncate">
                {expert.contactInfo}
              </p>
            )}
            <p className="text-xs text-muted-foreground font-body mt-1">
              Assigned cases:{" "}
              <span className="font-semibold text-foreground">
                {expert.assignedCasesCount.toString()}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Switch
              checked={expert.isActive}
              onCheckedChange={handleToggle}
              disabled={toggling}
              data-ocid={`admin.expert_toggle.${index}`}
              aria-label={
                expert.isActive ? "Deactivate expert" : "Activate expert"
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Add Expert Form ──────────────────────────────────────────────────────────

interface AddExpertFormProps {
  onAdd: (name: string, spec: string, contact: string) => Promise<void>;
}

function AddExpertForm({ onAdd }: AddExpertFormProps) {
  const [name, setName] = useState("");
  const [spec, setSpec] = useState("");
  const [contact, setContact] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !spec) {
      toast.error("Name and specialization are required.");
      return;
    }
    setSaving(true);
    try {
      await onAdd(name.trim(), spec, contact.trim());
      setName("");
      setSpec("");
      setContact("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card
      className="border-border shadow-subtle"
      data-ocid="admin.add_expert_card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-display flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-accent" />
          Add New Expert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs font-body text-muted-foreground">
              Full Name *
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Ramesh Kumar"
              className="font-body text-sm h-9"
              data-ocid="admin.expert_name_input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-body text-muted-foreground">
              Specialization *
            </Label>
            <Select value={spec} onValueChange={setSpec}>
              <SelectTrigger
                className="font-body text-sm h-9"
                data-ocid="admin.expert_spec_select"
              >
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={BusinessType.agriculture}
                  className="font-body text-sm"
                >
                  Agriculture / Farming
                </SelectItem>
                <SelectItem
                  value={BusinessType.fishery}
                  className="font-body text-sm"
                >
                  Fishery
                </SelectItem>
                <SelectItem
                  value={BusinessType.poultry}
                  className="font-body text-sm"
                >
                  Poultry
                </SelectItem>
                <SelectItem
                  value={BusinessType.goatFarming}
                  className="font-body text-sm"
                >
                  Goat Farming
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-body text-muted-foreground">
              Contact Info (phone / email)
            </Label>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="font-body text-sm h-9"
              data-ocid="admin.expert_contact_input"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={saving}
            className="w-full gradient-primary text-white border-0 font-body text-sm"
            data-ocid="admin.add_expert_submit_button"
          >
            {saving ? "Adding…" : "Add Expert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Case Detail Panel ────────────────────────────────────────────────────────

interface CaseDetailProps {
  c: Case;
  index: number;
  experts: Expert[];
  onSave: (
    id: bigint,
    status: CaseStatus,
    expertId: bigint | undefined,
    notes: string,
  ) => Promise<void>;
}

function CaseDetail({ c, index, experts, onSave }: CaseDetailProps) {
  const [status, setStatus] = useState<string>(c.status);
  const [expertId, setExpertId] = useState<string>(
    c.assignedExpertId !== undefined ? String(c.assignedExpertId) : "none",
  );
  const [notes, setNotes] = useState(c.adminNotes ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const resolvedExpertId =
        expertId !== "none" ? BigInt(expertId) : undefined;
      await onSave(c.id, status as CaseStatus, resolvedExpertId, notes);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="px-4 pb-4 pt-3 bg-muted/10 border-t border-border"
      data-ocid={`admin.case_detail.${index}`}
    >
      {c.photoUrl && (
        <div className="mb-3">
          <img
            src={c.photoUrl}
            alt="Uploaded attachment for this case"
            className="rounded-lg border border-border h-32 object-cover w-full sm:w-64"
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground font-body mb-3 leading-relaxed">
        {c.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Status */}
        <div className="space-y-1">
          <p className="text-xs font-body text-muted-foreground font-medium">
            Update Status
          </p>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              className="font-body text-sm h-9"
              data-ocid={`admin.case_status_select.${index}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(CaseStatus).map((s) => (
                <SelectItem key={s} value={s} className="font-body text-sm">
                  {STATUS_LABELS[s] ?? s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Assign Expert */}
        <div className="space-y-1">
          <p className="text-xs font-body text-muted-foreground font-medium">
            Assign Expert
          </p>
          <Select value={expertId} onValueChange={setExpertId}>
            <SelectTrigger
              className="font-body text-sm h-9"
              data-ocid={`admin.case_expert_select.${index}`}
            >
              <SelectValue placeholder="Select expert" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" className="font-body text-sm">
                Unassigned
              </SelectItem>
              {experts
                .filter((e) => e.isActive)
                .map((e) => (
                  <SelectItem
                    key={String(e.id)}
                    value={String(e.id)}
                    className="font-body text-sm"
                  >
                    {e.name} (
                    {BUSINESS_LABELS[e.specialization] ?? e.specialization})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Admin Notes */}
      <div className="space-y-1 mb-3">
        <p className="text-xs font-body text-muted-foreground font-medium">
          Admin Notes
        </p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes, next steps, visit summary…"
          className="font-body text-sm min-h-[80px] resize-none"
          data-ocid={`admin.case_notes_textarea.${index}`}
        />
      </div>
      <Button
        size="sm"
        onClick={handleSave}
        disabled={saving}
        className="gradient-primary text-white border-0 font-body text-xs"
        data-ocid={`admin.case_save_button.${index}`}
      >
        {saving ? "Saving…" : "Save Changes"}
      </Button>
    </div>
  );
}

// ─── Cases Tab ────────────────────────────────────────────────────────────────

interface CasesTabProps {
  cases: Case[];
  experts: Expert[];
  loading: boolean;
  onSaveCase: (
    id: bigint,
    status: CaseStatus,
    expertId: bigint | undefined,
    notes: string,
  ) => Promise<void>;
}

function CasesTab({ cases, experts, loading, onSaveCase }: CasesTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedCase, setExpandedCase] = useState<bigint | null>(null);

  const filtered = cases.filter((c) => {
    const matchSearch =
      String(c.id).includes(search) ||
      (BUSINESS_LABELS[c.businessType] ?? c.businessType)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
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

  const stats = [
    {
      label: "Total Cases",
      value: total,
      icon: <FileText className="w-5 h-5 text-primary" />,
      bg: "bg-primary/10",
      ocid: "admin.stat_total_card",
    },
    {
      label: "Pending",
      value: pending,
      icon: <Clock className="w-5 h-5" style={{ color: "#92400e" }} />,
      bg: "bg-primary/5",
      ocid: "admin.stat_pending_card",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: <ActivityIcon className="w-5 h-5 text-primary" />,
      bg: "bg-primary/10",
      ocid: "admin.stat_in_progress_card",
    },
    {
      label: "Completed",
      value: completed,
      icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
      bg: "bg-accent/10",
      ocid: "admin.stat_completed_card",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <Card
              key={s.label}
              className="border-border shadow-subtle"
              data-ocid={s.ocid}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl font-display font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {s.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Case ID, type, or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-body text-sm"
            data-ocid="admin.search_input"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger
            className="font-body text-sm h-10 w-full sm:w-44"
            data-ocid="admin.status_filter_select"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-body text-sm">
              All Statuses
            </SelectItem>
            <SelectItem
              value={CaseStatus.pending}
              className="font-body text-sm"
            >
              Pending
            </SelectItem>
            <SelectItem
              value={CaseStatus.inProgress}
              className="font-body text-sm"
            >
              In Progress
            </SelectItem>
            <SelectItem
              value={CaseStatus.completed}
              className="font-body text-sm"
            >
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases list */}
      <Card
        className="border-border shadow-subtle"
        data-ocid="admin.cases_card"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center justify-between">
            <span>All Cases</span>
            <Badge variant="outline" className="font-body text-xs">
              {filtered.length} shown
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <CaseListSkeleton />
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-12"
              data-ocid="admin.cases_empty_state"
            >
              <FileText className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-body">
                No cases found.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((c, i) => (
                <div key={String(c.id)} data-ocid={`admin.case.item.${i + 1}`}>
                  <button
                    type="button"
                    className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/20 transition-smooth cursor-pointer text-left"
                    onClick={() =>
                      setExpandedCase(expandedCase === c.id ? null : c.id)
                    }
                    data-ocid={`admin.case_toggle.${i + 1}`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-xs font-mono text-muted-foreground">
                          #{String(c.id).padStart(4, "0")}
                        </span>
                        <Badge variant="outline" className="text-xs font-body">
                          {BUSINESS_LABELS[c.businessType] ?? c.businessType}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground font-body line-clamp-1">
                        {c.description}
                      </p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">
                        User: {fmtPrincipal(c.userId)} · {fmtDate(c.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        className="text-xs font-body border"
                        style={STATUS_COLORS[c.status] ?? {}}
                      >
                        {STATUS_LABELS[c.status] ?? c.status}
                      </Badge>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedCase === c.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  {expandedCase === c.id && (
                    <CaseDetail
                      c={c}
                      index={i + 1}
                      experts={experts}
                      onSave={onSaveCase}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Experts Tab ──────────────────────────────────────────────────────────────

interface ExpertsTabProps {
  experts: Expert[];
  loading: boolean;
  onToggle: (id: bigint, active: boolean) => Promise<void>;
  onAdd: (name: string, spec: string, contact: string) => Promise<void>;
}

function ExpertsTab({ experts, loading, onToggle, onAdd }: ExpertsTabProps) {
  return (
    <div className="space-y-6">
      <AddExpertForm onAdd={onAdd} />
      <Card
        className="border-border shadow-subtle"
        data-ocid="admin.experts_card"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Expert Directory ({experts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : experts.length === 0 ? (
            <div
              className="text-center py-10"
              data-ocid="admin.experts_empty_state"
            >
              <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-body">
                No experts added yet. Use the form above to add one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experts.map((e, i) => (
                <ExpertCard
                  key={String(e.id)}
                  expert={e}
                  index={i + 1}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Admin Content ────────────────────────────────────────────────────────────

function AdminContent() {
  const backend = useBackend();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"cases" | "experts">("cases");
  const [cases, setCases] = useState<Case[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const [loadingExperts, setLoadingExperts] = useState(true);
  const [adminChecked, setAdminChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin on mount
  useEffect(() => {
    async function checkAdmin() {
      try {
        const ok = await backend.checkIsAdmin();
        setIsAdmin(ok);
      } catch {
        setIsAdmin(false);
      } finally {
        setAdminChecked(true);
      }
    }
    checkAdmin();
  }, [backend]);

  // Load data once admin confirmed
  useEffect(() => {
    if (!isAdmin) return;
    async function loadCases() {
      setLoadingCases(true);
      try {
        const data = await backend.listAllCases();
        setCases(data);
      } catch {
        toast.error("Failed to load cases.");
      } finally {
        setLoadingCases(false);
      }
    }
    async function loadExperts() {
      setLoadingExperts(true);
      try {
        const data = await backend.listExperts();
        setExperts(data);
      } catch {
        toast.error("Failed to load experts.");
      } finally {
        setLoadingExperts(false);
      }
    }
    loadCases();
    loadExperts();
  }, [backend, isAdmin]);

  // Not yet determined
  if (!adminChecked) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin.loading_state"
      >
        <div className="space-y-3 w-full max-w-sm px-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-6 w-1/2 rounded-md" />
        </div>
      </div>
    );
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
        data-ocid="admin.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          Access Restricted
        </h2>
        <p className="text-sm text-muted-foreground font-body max-w-xs mb-6">
          This area is reserved for platform administrators. Please log in with
          an admin account.
        </p>
        <Button
          onClick={() => navigate({ to: "/dashboard" })}
          className="gradient-primary text-white border-0 font-body"
          data-ocid="admin.go_dashboard_button"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  // Save case
  async function handleSaveCase(
    id: bigint,
    status: CaseStatus,
    assignedExpertId: bigint | undefined,
    adminNotes: string,
  ) {
    try {
      const updated = await backend.updateCase(id, {
        status,
        ...(assignedExpertId !== undefined ? { assignedExpertId } : {}),
        adminNotes: adminNotes || undefined,
      });
      if (updated) {
        setCases((prev) => prev.map((c) => (c.id === id ? updated : c)));
        toast.success("Case updated successfully.");
      }
    } catch {
      toast.error("Failed to update case.");
    }
  }

  // Toggle expert
  async function handleToggleExpert(id: bigint, active: boolean) {
    try {
      const updated = await backend.setExpertActive(id, active);
      if (updated) {
        setExperts((prev) => prev.map((e) => (e.id === id ? updated : e)));
        toast.success(`Expert ${active ? "activated" : "deactivated"}.`);
      }
    } catch {
      toast.error("Failed to update expert status.");
    }
  }

  // Add expert
  async function handleAddExpert(name: string, spec: string, contact: string) {
    try {
      const newExpert = await backend.addExpert({
        name,
        specialization: spec as Expert["specialization"],
        contactInfo: contact,
      });
      setExperts((prev) => [...prev, newExpert]);
      toast.success(`Expert "${name}" added successfully.`);
    } catch {
      toast.error("Failed to add expert.");
    }
  }

  const tabs = [
    {
      id: "cases" as const,
      label: "Cases",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "experts" as const,
      label: "Experts",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Panel
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-body ml-11">
          Manage service requests, assign experts, and oversee the platform.
        </p>
      </div>

      {/* Tab navigation */}
      <div
        className="flex gap-1 p-1 bg-muted/40 rounded-lg border border-border mb-6 w-fit"
        data-ocid="admin.tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-smooth ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-subtle"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`admin.${tab.id}_tab`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === "cases" && (
              <Badge
                variant="outline"
                className="ml-1 text-xs font-body h-5 min-w-[20px] justify-center"
              >
                {cases.length}
              </Badge>
            )}
            {tab.id === "experts" && (
              <Badge
                variant="outline"
                className="ml-1 text-xs font-body h-5 min-w-[20px] justify-center"
              >
                {experts.length}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "cases" ? (
        <CasesTab
          cases={cases}
          experts={experts}
          loading={loadingCases}
          onSaveCase={handleSaveCase}
        />
      ) : (
        <ExpertsTab
          experts={experts}
          loading={loadingExperts}
          onToggle={handleToggleExpert}
          onAdd={handleAddExpert}
        />
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div
          className="flex items-center justify-center min-h-[60vh]"
          data-ocid="admin.loading_state"
        >
          <div className="space-y-3 w-full max-w-sm px-6">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <AdminContent />
    </Layout>
  );
}
