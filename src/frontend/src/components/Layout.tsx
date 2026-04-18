import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Clock,
  Languages,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sprout,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../hooks/useLanguage";

// ─── Nav data (uses bilingual labels via t()) ─────────────────────────────────

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { t, lang, toggle } = useLanguage();

  const NAV_LINKS = [
    { labelEn: "How It Works", labelHi: "कैसे काम करता है", href: "/" },
    { labelEn: "Sectors", labelHi: "क्षेत्र", href: "/#services" },
    { labelEn: "Resources", labelHi: "संसाधन", href: "/resources" },
    { labelEn: "Trainings", labelHi: "प्रशिक्षण", href: "/trainings" },
    { labelEn: "AI Quiz", labelHi: "AI क्विज़", href: "/ai-suggest" },
    { labelEn: "About", labelHi: "परिचय", href: "/about" },
    { labelEn: "Contact", labelHi: "संपर्क", href: "/contact" },
  ];

  const AUTH_NAV = [
    { labelEn: "Dashboard", labelHi: "डैशबोर्ड", href: "/dashboard" },
    { labelEn: "My Requests", labelHi: "मेरे अनुरोध", href: "/request" },
  ];

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
            <span>UdyamSathi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid={`nav.${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {lang === "hi" ? link.labelHi : link.labelEn}
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
                  data-ocid={`nav.${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {lang === "hi" ? link.labelHi : link.labelEn}
                </Link>
              ))}
          </nav>

          {/* Desktop right: lang toggle + auth */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language toggle */}
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-body font-semibold border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label={
                lang === "en" ? "Switch to Hindi" : "Switch to English"
              }
              data-ocid="nav.lang_toggle"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "EN | हिं" : "हिं | EN"}</span>
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" data-ocid="nav.profile_link">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-body"
                  >
                    {t("Profile", "प्रोफाइल")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="text-sm font-body border-primary/30 text-primary hover:bg-primary/5"
                  data-ocid="nav.logout_button"
                >
                  {t("Logout", "लॉगआउट")}
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
                {isLoading
                  ? t("Connecting…", "जोड़ रहे हैं…")
                  : t("Login", "लॉगिन")}
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
                data-ocid={`nav.mobile_${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {lang === "hi" ? link.labelHi : link.labelEn}
              </a>
            ))}
            {isAuthenticated &&
              AUTH_NAV.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`nav.mobile_${link.labelEn.toLowerCase().replace(/\s+/g, "_")}_link`}
                >
                  {lang === "hi" ? link.labelHi : link.labelEn}
                </Link>
              ))}

            <div className="pt-3 border-t border-border mt-2 space-y-2">
              {/* Mobile language toggle */}
              <button
                type="button"
                onClick={toggle}
                className="flex items-center gap-2 w-full py-2.5 px-3 rounded-md text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                data-ocid="nav.mobile_lang_toggle"
              >
                <Languages className="w-4 h-4" />
                <span>
                  {lang === "en" ? "Switch to हिंदी" : "Switch to English"}
                </span>
              </button>

              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link to="/profile" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm font-body"
                      data-ocid="nav.mobile_profile_button"
                    >
                      {t("Profile", "प्रोफाइल")}
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
                    {t("Logout", "लॉगआउट")}
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
                  {isLoading
                    ? t("Connecting…", "जोड़ रहे हैं…")
                    : t(
                        "Login with Internet Identity",
                        "इंटरनेट आइडेंटिटी से लॉगिन",
                      )}
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
  const { t } = useLanguage();

  const QUICK_LINKS = [
    { labelEn: "Home", labelHi: "होम", href: "/" },
    { labelEn: "About", labelHi: "परिचय", href: "/about" },
    { labelEn: "Services", labelHi: "सेवाएं", href: "/#services" },
    { labelEn: "AI Quiz", labelHi: "AI क्विज़", href: "/ai-suggest" },
    { labelEn: "Contact", labelHi: "संपर्क", href: "/contact" },
    { labelEn: "Admin", labelHi: "एडमिन", href: "/admin" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand + Contact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 gradient-primary rounded-md flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-primary">
                UdyamSathi
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
              {t(
                "Empowering Rural India with Skill + Support + System for sustainable growth.",
                "ग्रामीण भारत को Skill + Support + System के साथ सशक्त बनाना।",
              )}
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-xs text-muted-foreground font-body leading-relaxed">
                  DRCC Road, Kathal Bari, Barari,
                  <br />
                  Bhagalpur, Bihar – 812003, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="mailto:udyamsathisoppoter@gmail.com"
                  className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200 font-body break-all"
                >
                  udyamsathisoppoter@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a
                  href="tel:+918579042891"
                  className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200 font-body"
                >
                  +91 8579042891
                </a>
              </li>
              <li className="flex items-center gap-2">
                {/* WhatsApp icon via SVG */}
                <svg
                  className="w-4 h-4 text-accent shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/918986378505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-accent transition-colors duration-200 font-body"
                >
                  +91 8986378505
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs text-muted-foreground font-body">
                  {t("Mon–Sat, 9 AM – 6 PM", "सोम–शनि, सुबह 9 – शाम 6 बजे")}
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              {t("Quick Links", "त्वरित लिंक")}
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200 font-body"
                  >
                    {t(link.labelEn, link.labelHi)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              {t("Sectors", "क्षेत्र")}
            </h4>
            <ul className="space-y-2">
              {[
                { en: "Farming", hi: "खेती" },
                { en: "Fishery", hi: "मछली पालन" },
                { en: "Poultry", hi: "मुर्गी पालन" },
                { en: "Goat Farming", hi: "बकरी पालन" },
              ].map((s) => (
                <li key={s.en}>
                  <span className="text-sm text-muted-foreground font-body">
                    {t(s.en, s.hi)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-body">
            © {year} UdyamSathi. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            {t("Built by", "निर्मित")}{" "}
            <span className="font-semibold text-foreground">
              code_x_elite group
            </span>
          </p>
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
