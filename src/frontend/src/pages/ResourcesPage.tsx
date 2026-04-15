import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type Resource,
  ResourceCategory,
  type SupplyRequest,
} from "../backend.d";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

// ─── Category Meta ───────────────────────────────────────────────────────────

type FilterCategory = "all" | ResourceCategory;

interface CategoryMeta {
  value: FilterCategory;
  label: string;
  icon: string;
}

const CATEGORIES: CategoryMeta[] = [
  { value: "all", label: "All Resources", icon: "🌟" },
  { value: ResourceCategory.goat, label: "Goat Breeds", icon: "🐐" },
  { value: ResourceCategory.fish, label: "Fish Seeds", icon: "🐟" },
  { value: ResourceCategory.poultry, label: "Poultry", icon: "🐔" },
  { value: ResourceCategory.seeds, label: "Seeds & Feed", icon: "🌱" },
];

const CATEGORY_ICON: Record<ResourceCategory, string> = {
  [ResourceCategory.goat]: "🐐",
  [ResourceCategory.fish]: "🐟",
  [ResourceCategory.poultry]: "🐔",
  [ResourceCategory.seeds]: "🌱",
};

const CATEGORY_LABEL: Record<ResourceCategory, string> = {
  [ResourceCategory.goat]: "Goat Breed",
  [ResourceCategory.fish]: "Fish Seeds",
  [ResourceCategory.poultry]: "Poultry",
  [ResourceCategory.seeds]: "Seeds & Feed",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<string, React.CSSProperties> = {
  pending: {
    backgroundColor: "#fef9c3",
    color: "#854d0e",
    borderColor: "#fde047",
  },
  processing: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderColor: "#93c5fd",
  },
  delivered: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderColor: "#86efac",
  },
  cancelled: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderColor: "#fca5a5",
  },
};

// ─── Request Modal ───────────────────────────────────────────────────────────

interface RequestModalProps {
  resource: Resource | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (quantity: number, location: string) => Promise<string>;
}

function RequestModal({
  resource,
  open,
  onClose,
  onSubmit,
}: RequestModalProps) {
  const [quantity, setQuantity] = useState("1");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setQuantity("1");
      setLocation("");
      setRequestId(null);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const qty = Number.parseInt(quantity, 10);
    if (!qty || qty < 1) return;
    if (!location.trim()) return;
    setLoading(true);
    try {
      const id = await onSubmit(qty, location.trim());
      setRequestId(id);
    } catch {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="sm:max-w-md"
        data-ocid="resources.request_modal.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {requestId ? "Request Submitted!" : "Request Resource"}
          </DialogTitle>
        </DialogHeader>

        {requestId ? (
          <div
            className="flex flex-col items-center gap-5 py-4 text-center"
            data-ocid="resources.request_modal.success_state"
          >
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-3xl">
              ✅
            </div>
            <div>
              <p className="font-body text-muted-foreground mb-1">
                Your supply request has been submitted successfully.
              </p>
              <p className="font-display font-semibold text-foreground text-sm mt-3">
                Request ID
              </p>
              <p className="font-mono text-primary font-bold text-lg mt-1 bg-muted px-4 py-2 rounded-lg">
                #{requestId}
              </p>
            </div>
            <Button
              className="w-full gradient-primary text-white border-0 font-body"
              onClick={onClose}
              data-ocid="resources.request_modal.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
            {resource && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                <span className="text-2xl">
                  {CATEGORY_ICON[resource.category]}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-sm text-foreground truncate">
                    {resource.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    {CATEGORY_LABEL[resource.category]}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label
                htmlFor="quantity"
                className="font-body text-sm font-medium"
              >
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="font-body"
                required
                data-ocid="resources.request_modal.quantity_input"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="location"
                className="font-body text-sm font-medium"
              >
                Delivery Location
              </Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Village, District, State"
                className="font-body"
                required
                data-ocid="resources.request_modal.location_input"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 font-body"
                onClick={onClose}
                data-ocid="resources.request_modal.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 gradient-primary text-white border-0 font-body"
                data-ocid="resources.request_modal.submit_button"
              >
                {loading ? "Submitting…" : "Submit Request"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Resource Card ───────────────────────────────────────────────────────────

interface ResourceCardProps {
  resource: Resource;
  index: number;
  onRequest: (resource: Resource) => void;
}

function ResourceCard({ resource, index, onRequest }: ResourceCardProps) {
  return (
    <Card
      className={`border-border shadow-subtle hover:shadow-elevated transition-smooth flex flex-col ${!resource.isAvailable ? "opacity-60" : ""}`}
      data-ocid={`resources.resource_card.item.${index}`}
    >
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-2xl shrink-0">
            {CATEGORY_ICON[resource.category]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
              {resource.name}
            </h3>
            <Badge
              variant="outline"
              className="mt-1 text-xs font-body border-primary/30 text-primary"
            >
              {CATEGORY_LABEL[resource.category]}
            </Badge>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-body leading-relaxed mb-3 flex-1 line-clamp-3">
          {resource.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className={`text-xs font-body ${
              resource.isAvailable
                ? "border-accent/40 text-accent"
                : "border-muted-foreground/30 text-muted-foreground"
            }`}
            data-ocid={`resources.availability_badge.item.${index}`}
          >
            {resource.isAvailable ? "✓ In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <Button
          size="sm"
          disabled={!resource.isAvailable}
          onClick={() => onRequest(resource)}
          className="w-full gradient-primary text-white border-0 font-body font-medium hover:opacity-90 transition-smooth disabled:opacity-40"
          data-ocid={`resources.request_button.item.${index}`}
        >
          Request Supply
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── My Requests Row ─────────────────────────────────────────────────────────

function MyRequestRow({
  req,
  index,
  resourceMap,
}: {
  req: SupplyRequest;
  index: number;
  resourceMap: Map<string, Resource>;
}) {
  const resource = resourceMap.get(req.resourceId.toString());
  const statusStr = String(req.status);

  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-accent/30 transition-smooth"
      data-ocid={`resources.my_request.item.${index}`}
    >
      <span className="text-xl shrink-0">
        {resource ? CATEGORY_ICON[resource.category] : "📦"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-sm text-foreground truncate">
          {resource ? resource.name : `Resource #${req.resourceId}`}
        </p>
        <p className="text-xs text-muted-foreground font-body">
          Qty: {req.quantity.toString()} · {req.deliveryLocation}
        </p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span
          className="text-xs font-body font-medium px-2 py-0.5 rounded-full border"
          style={
            STATUS_COLOR[statusStr] ?? {
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
            }
          }
        >
          {STATUS_LABEL[statusStr] ?? statusStr}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          #{req.id.toString()}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const backend = useBackend();
  const { isAuthenticated } = useAuth();

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [resources, setResources] = useState<Resource[]>([]);
  const [myRequests, setMyRequests] = useState<SupplyRequest[]>([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch resources on mount
  useEffect(() => {
    setLoadingResources(true);
    backend
      .listResources()
      .then((res) => setResources(res))
      .catch(() => toast.error("Failed to load resources."))
      .finally(() => setLoadingResources(false));
  }, [backend]);

  // Fetch my supply requests if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoadingRequests(true);
    backend
      .getMySupplyRequests()
      .then((reqs) => setMyRequests(reqs))
      .catch(() => {})
      .finally(() => setLoadingRequests(false));
  }, [backend, isAuthenticated]);

  // Build resource lookup map
  const resourceMap = new Map(resources.map((r) => [r.id.toString(), r]));

  const filtered =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  function openModal(resource: Resource) {
    if (!isAuthenticated) {
      toast.error("Please log in to request a supply.", {
        action: {
          label: "Log In",
          onClick: () => {
            window.location.href = "/login";
          },
        },
      });
      return;
    }
    setSelectedResource(resource);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedResource(null);
  }

  async function handleSubmitRequest(
    quantity: number,
    deliveryLocation: string,
  ): Promise<string> {
    if (!selectedResource) throw new Error("No resource selected");
    const result = await backend.submitSupplyRequest({
      resourceId: selectedResource.id,
      quantity: BigInt(quantity),
      deliveryLocation,
    });
    // Refresh my requests
    if (isAuthenticated) {
      backend
        .getMySupplyRequests()
        .then(setMyRequests)
        .catch(() => {});
    }
    return result.id.toString();
  }

  return (
    <Layout>
      {/* Hero */}
      <section
        className="gradient-primary text-white py-14 px-4"
        data-ocid="resources.hero_section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3">
            Resource Catalog
          </h1>
          <p className="text-white/80 font-body text-lg max-w-xl mx-auto">
            Quality livestock, seeds, and supplies sourced from verified
            partners — delivered to your village.
          </p>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        className="py-10 bg-background"
        data-ocid="resources.catalog_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div
            className="flex gap-2 flex-wrap mb-8"
            data-ocid="resources.category_filters"
            role="tablist"
            aria-label="Resource categories"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-smooth border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeCategory === cat.value
                    ? "gradient-primary text-white border-transparent shadow-subtle"
                    : "bg-card border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                }`}
                data-ocid={`resources.category_filter.${cat.value}_tab`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          {loadingResources ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => (
                <Card key={sk} className="border-border">
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-11 w-11 rounded-xl" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
              data-ocid="resources.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-3xl">
                🔍
              </div>
              <div>
                <p className="font-display font-semibold text-foreground mb-1">
                  No resources found
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  No resources available in this category yet.
                </p>
              </div>
              <Button
                variant="outline"
                className="font-body mt-2"
                onClick={() => setActiveCategory("all")}
                data-ocid="resources.empty_state_reset_button"
              >
                View All Resources
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((resource, i) => (
                <ResourceCard
                  key={resource.id.toString()}
                  resource={resource}
                  index={i + 1}
                  onRequest={openModal}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* My Requests Section */}
      {isAuthenticated && (
        <section
          className="py-10 bg-muted/40 border-t border-border"
          data-ocid="resources.my_requests_section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl text-foreground mb-1">
                My Supply Requests
              </h2>
              <p className="text-sm text-muted-foreground font-body">
                Track the status of your resource requests.
              </p>
            </div>

            {loadingRequests ? (
              <div className="space-y-3">
                {["r1", "r2", "r3"].map((sk) => (
                  <Skeleton key={sk} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : myRequests.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 gap-3 text-center border border-border rounded-2xl bg-card"
                data-ocid="resources.my_requests.empty_state"
              >
                <span className="text-4xl">📦</span>
                <p className="font-display font-semibold text-foreground">
                  No requests yet
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  Request a resource from the catalog above to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myRequests.map((req, i) => (
                  <MyRequestRow
                    key={req.id.toString()}
                    req={req}
                    index={i + 1}
                    resourceMap={resourceMap}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Login Prompt */}
      {!isAuthenticated && (
        <section className="py-10 bg-muted/40 border-t border-border">
          <div className="max-w-md mx-auto px-4 text-center">
            <p className="font-body text-muted-foreground text-sm mb-1">
              Want to track your supply requests?
            </p>
            <p className="font-display font-semibold text-foreground text-base">
              Log in to view your request history
            </p>
          </div>
        </section>
      )}

      {/* Request Modal */}
      <RequestModal
        resource={selectedResource}
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitRequest}
      />
    </Layout>
  );
}
