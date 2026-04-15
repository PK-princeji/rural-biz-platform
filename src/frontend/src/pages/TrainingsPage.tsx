import type { TrainingEnrollment, TrainingProgram } from "@/backend.d";
import { EnrollmentStatus } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import {
  Bird,
  BookOpen,
  CheckCircle2,
  Clock,
  Fish,
  Leaf,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";
import type { BusinessType } from "../types";

// ─── Sector helpers ──────────────────────────────────────────────────────────

type SectorFilter = BusinessType | "All";

const SECTOR_FILTERS: { key: SectorFilter; label: string; labelHi: string }[] =
  [
    { key: "All", label: "All", labelHi: "सभी" },
    { key: "Farming", label: "Agriculture", labelHi: "कृषि" },
    { key: "Fishery", label: "Fishery", labelHi: "मत्स्य" },
    { key: "Poultry", label: "Poultry", labelHi: "मुर्गीपालन" },
    { key: "GoatFarming", label: "Goat Farming", labelHi: "बकरी पालन" },
  ];

function sectorIcon(sector: string, className = "w-5 h-5") {
  switch (sector) {
    case "Fishery":
    case "fish":
      return <Fish className={className} />;
    case "Poultry":
    case "poultry":
      return <Bird className={className} />;
    case "GoatFarming":
    case "goatFarming":
      return <Leaf className={`${className} rotate-45`} />;
    default:
      return <Leaf className={className} />;
  }
}

function sectorLabel(sector: string): string {
  switch (sector) {
    case "Farming":
    case "agriculture":
      return "Agriculture";
    case "Fishery":
    case "fish":
      return "Fishery";
    case "Poultry":
    case "poultry":
      return "Poultry";
    case "GoatFarming":
    case "goatFarming":
      return "Goat Farming";
    default:
      return sector;
  }
}

function sectorBadgeClass(_sector: string): string {
  return "bg-primary/10 text-primary border-primary/20";
}

function sectorIconBg(_sector: string): string {
  return "bg-primary/10 text-primary";
}

// ─── Training Card ────────────────────────────────────────────────────────────

interface TrainingCardProps {
  program: TrainingProgram;
  enrollment: TrainingEnrollment | undefined;
  onEnroll: (programId: bigint) => Promise<void>;
  enrolling: boolean;
  index: number;
}

function TrainingCard({
  program,
  enrollment,
  onEnroll,
  enrolling,
  index,
}: TrainingCardProps) {
  const isEnrolled = !!enrollment;
  const statusLabel =
    enrollment?.status === EnrollmentStatus.completed
      ? "Completed"
      : enrollment?.status === EnrollmentStatus.ongoing
        ? "Ongoing"
        : "Enrolled";

  return (
    <Card
      className="flex flex-col bg-card border-border hover:border-accent/40 hover:shadow-elevated transition-smooth"
      data-ocid={`trainings.card.${index}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sectorIconBg(program.sector)}`}
          >
            {sectorIcon(program.sector)}
          </div>
          <Badge
            variant="outline"
            className={`text-xs shrink-0 ${sectorBadgeClass(program.sector)}`}
          >
            {sectorLabel(program.sector)}
          </Badge>
        </div>
        <h3 className="font-display font-semibold text-foreground text-base leading-snug mt-3">
          {program.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 py-0">
        <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">
          {program.description}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span className="font-body">{program.duration}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        {isEnrolled ? (
          <div
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent text-sm font-body font-medium"
            data-ocid={`trainings.enrolled_badge.${index}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusLabel} ✓</span>
          </div>
        ) : (
          <Button
            className="w-full min-h-[44px] gradient-primary text-white border-0 font-body font-semibold transition-smooth hover:opacity-90"
            disabled={enrolling}
            onClick={() => onEnroll(program.id)}
            data-ocid={`trainings.enroll_button.${index}`}
          >
            {enrolling ? "Enrolling…" : "Enroll Now / अभी जुड़ें"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

function TrainingCardSkeleton({ n }: { n: number }) {
  return (
    <>
      {SKELETON_KEYS.slice(0, n).map((key) => (
        <div
          key={key}
          className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-start justify-between">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <Skeleton className="w-20 h-5 rounded-full" />
          </div>
          <Skeleton className="h-5 w-3/4 mt-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-28 mt-2" />
          <Skeleton className="h-11 w-full mt-3 rounded-lg" />
        </div>
      ))}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrainingsPage() {
  const backend = useBackend();
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<bigint | null>(null);
  const [activeFilter, setActiveFilter] = useState<SectorFilter>("All");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [progs, enrs] = await Promise.all([
          backend.listTrainingPrograms(),
          backend.getMyTrainingEnrollments(),
        ]);
        setPrograms(progs.filter((p) => p.isActive));
        setEnrollments(enrs);
      } catch {
        toast.error("Could not load training programs. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [backend]);

  const enrollmentMap = useMemo(() => {
    const map = new Map<bigint, TrainingEnrollment>();
    for (const e of enrollments) {
      map.set(e.programId, e);
    }
    return map;
  }, [enrollments]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return programs;
    const sectorKey =
      activeFilter === "GoatFarming"
        ? "goatFarming"
        : activeFilter === "Farming"
          ? "agriculture"
          : activeFilter === "Fishery"
            ? "fish"
            : "poultry";
    return programs.filter(
      (p) =>
        p.sector === activeFilter ||
        p.sector === sectorKey ||
        (activeFilter === "Farming" && p.sector === "agriculture") ||
        (activeFilter === "Fishery" && p.sector === "fish") ||
        (activeFilter === "Poultry" && p.sector === "poultry") ||
        (activeFilter === "GoatFarming" && p.sector === "goatFarming"),
    );
  }, [programs, activeFilter]);

  async function handleEnroll(programId: bigint) {
    setEnrollingId(programId);
    try {
      const result = await backend.enrollInTraining({ programId });
      setEnrollments((prev) => [...prev, result]);
      toast.success("Successfully enrolled! / नामांकन सफल रहा!", {
        description: "You can track your training progress in your Dashboard.",
        duration: 5000,
      });
    } catch {
      toast.error("Enrollment failed. Please try again.");
    } finally {
      setEnrollingId(null);
    }
  }

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
                Training Programs
              </h1>
              <p className="text-sm text-muted-foreground font-body font-medium">
                प्रशिक्षण कार्यक्रम
              </p>
            </div>
          </div>
          <p className="text-muted-foreground font-body text-sm sm:text-base mt-3 max-w-2xl">
            Enroll in expert-led programs to build skills for your business.
            Learn farming, fishery, poultry, and goat farming at your own pace.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section
        className="bg-muted/30 border-b border-border px-4 py-3 sticky top-16 z-30"
        data-ocid="trainings.filter_bar"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 mr-1" />
            {SECTOR_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-body font-semibold transition-smooth border whitespace-nowrap min-h-[36px] ${
                  activeFilter === f.key
                    ? "gradient-primary text-white border-transparent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
                }`}
                data-ocid={`trainings.filter.${f.key.toLowerCase()}`}
              >
                {f.label} / {f.labelHi}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-background py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TrainingCardSkeleton n={6} />
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
              data-ocid="trainings.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg">
                No Programs Found
              </h3>
              <p className="text-muted-foreground font-body text-sm max-w-xs">
                No training programs available for this sector yet. Check back
                soon or explore all programs.
              </p>
              {activeFilter !== "All" && (
                <Button
                  variant="outline"
                  onClick={() => setActiveFilter("All")}
                  className="mt-2 border-primary/30 text-primary hover:bg-primary/5"
                  data-ocid="trainings.show_all_button"
                >
                  Show All Programs
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground font-body mb-6">
                {filtered.length} program{filtered.length !== 1 ? "s" : ""}{" "}
                available
              </p>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-ocid="trainings.list"
              >
                {filtered.map((program, i) => (
                  <TrainingCard
                    key={String(program.id)}
                    program={program}
                    enrollment={enrollmentMap.get(program.id)}
                    onEnroll={handleEnroll}
                    enrolling={enrollingId === program.id}
                    index={i + 1}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
