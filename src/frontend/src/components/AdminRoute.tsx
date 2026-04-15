import { Skeleton } from "@/components/ui/skeleton";
import { Navigate } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

// Known admin principals — in production this comes from backend checkIsAdmin
// For now we use a placeholder; actual admin check will use backend hook
const ADMIN_CHECK_KEY = "rural_biz_admin_principal";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isLoading, principal } = useAuth();

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin_route.loading_state"
      >
        <div className="space-y-4 w-full max-w-sm px-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-6 w-1/2 rounded-md" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Store principal in localStorage to persist admin check
  // Backend will validate via checkIsAdmin; this is a UI-layer hint
  const storedAdmin = localStorage.getItem(ADMIN_CHECK_KEY);
  const isAdmin = storedAdmin === principal;

  if (!isAdmin) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
        data-ocid="admin_route.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          Access Restricted
        </h2>
        <p className="text-sm text-muted-foreground font-body max-w-xs">
          This area is reserved for platform administrators. If you believe this
          is an error, please contact support.
        </p>
        <Navigate to="/dashboard" />
      </div>
    );
  }

  return <>{children}</>;
}
