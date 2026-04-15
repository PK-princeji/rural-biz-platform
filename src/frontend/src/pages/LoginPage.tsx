import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Globe, Shield, Sprout, Zap } from "lucide-react";
import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";

const BENEFITS = [
  {
    icon: <Sprout className="w-5 h-5 text-accent" />,
    title: "Expert Guidance",
    desc: "Get matched with sector-specific experts for your business.",
  },
  {
    icon: <Shield className="w-5 h-5 text-accent" />,
    title: "Secure & Private",
    desc: "Your data is protected using Internet Identity — no passwords.",
  },
  {
    icon: <Zap className="w-5 h-5 text-accent" />,
    title: "Fast Support",
    desc: "Submit a request and receive a unique Case ID instantly.",
  },
  {
    icon: <Globe className="w-5 h-5 text-accent" />,
    title: "Rural First",
    desc: "Built for farmers, youth, and women entrepreneurs.",
  },
];

export default function LoginPage() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background py-16 px-4">
        <div className="w-full max-w-md">
          {/* Logo mark */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-elevated mb-4">
              <Sprout className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground text-center">
              Welcome to Rural Biz
            </h1>
            <p className="text-sm text-muted-foreground font-body text-center mt-1 max-w-xs">
              Sign in with Internet Identity to access your dashboard, track
              your cases, and connect with experts.
            </p>
          </div>

          {/* Login Card */}
          <Card
            className="border-border shadow-elevated mb-6"
            data-ocid="login.card"
          >
            <CardContent className="p-6">
              <Button
                size="lg"
                className="w-full gradient-primary text-white border-0 font-body font-semibold text-base h-12 shadow-subtle hover:opacity-90 transition-smooth"
                onClick={login}
                disabled={isLoading}
                data-ocid="login.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting…
                  </span>
                ) : (
                  "Login with Internet Identity"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4 font-body">
                No account needed — Internet Identity is password-free and
                secure.
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-1.5 p-3 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  {b.icon}
                </div>
                <p className="text-xs font-display font-semibold text-foreground">
                  {b.title}
                </p>
                <p className="text-xs text-muted-foreground font-body leading-snug">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
