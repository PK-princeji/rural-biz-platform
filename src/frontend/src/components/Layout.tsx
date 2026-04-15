import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { label: "How It Works", href: "/" },
  { label: "Sectors", href: "/#sectors" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const AUTH_NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Requests", href: "/request" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-primary transition-smooth hover:opacity-80"
            data-ocid="nav.logo_link"
          >
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span>Rural Biz</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated &&
              AUTH_NAV.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-body font-medium transition-colors duration-200 ${
                    currentPath === link.href
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          {/* Auth Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" data-ocid="nav.profile_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-body"
                  >
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-sm font-body border-primary/30 text-primary hover:bg-primary/5"
                  data-ocid="nav.logout_button"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoading}
                className="gradient-primary text-white border-0 font-body font-semibold shadow-subtle hover:opacity-90 transition-smooth"
                data-ocid="nav.login_button"
              >
                {isLoading ? "Connecting…" : "Login"}
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevated animate-in slide-in-from-top-2">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                onClick={() => setMobileOpen(false)}
                data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated &&
              AUTH_NAV.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {link.label}
                </Link>
              ))}
            <div className="pt-3 border-t border-border mt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-body"
                      data-ocid="nav.mobile_profile_button"
                    >
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-sm font-body border-primary/30 text-primary"
                    data-ocid="nav.mobile_logout_button"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isLoading}
                  className="w-full gradient-primary text-white border-0 font-body font-semibold"
                  data-ocid="nav.mobile_login_button"
                >
                  {isLoading ? "Connecting…" : "Login with Internet Identity"}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 gradient-primary rounded-md flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-primary">
                Rural Biz
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Empowering rural entrepreneurs with Skill + Support + System for
              sustainable growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/resources" },
                { label: "Contact", href: "/contact" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Sectors
            </h4>
            <ul className="space-y-2">
              {["Farming", "Fishery", "Poultry", "Goat Farming"].map((s) => (
                <li key={s}>
                  <span className="text-sm text-muted-foreground font-body">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © {year} Rural Biz Platform. All rights reserved.
          </p>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200 font-body"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={`flex-1 ${fullWidth ? "" : ""}`}>{children}</main>
      <Footer />
    </div>
  );
}
