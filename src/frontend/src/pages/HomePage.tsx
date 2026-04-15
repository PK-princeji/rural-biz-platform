import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Layout } from "../components/Layout";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const SECTORS = [
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="44"
          width="56"
          height="6"
          rx="3"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 44 C12 28 20 18 32 14 C44 18 52 28 52 44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 44 C22 32 26 24 32 20 C38 24 42 32 42 44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 34 C14 30 20 32 24 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M56 34 C50 30 44 32 40 36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="32" cy="11" r="4" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M18 52 L18 58 M32 52 L32 58 M46 52 L46 58"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Farming",
    desc: "Crop planning, soil health, and irrigation support for every season.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <path
          d="M8 40 C14 32 22 28 32 30 C42 32 50 36 56 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 46 C14 38 22 34 32 36 C42 38 50 42 56 46"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="24"
          cy="22"
          rx="14"
          ry="9"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="21" cy="21" r="2" fill="currentColor" />
        <path
          d="M38 22 C40 18 46 16 50 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M50 18 L54 14 M50 18 L54 20 M50 18 L46 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 52 L56 52"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Fishery",
    desc: "Fish seed, pond management, and harvest support from day one.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <ellipse
          cx="28"
          cy="32"
          rx="16"
          ry="18"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="28" cy="20" r="7" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M28 13 L28 8 M24 10 L28 8 L32 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="19" r="1.5" fill="currentColor" />
        <path
          d="M44 24 C50 24 54 28 54 34 C54 40 50 44 44 44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 46 L18 56 M28 48 L28 56 M34 46 L38 56"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="44"
          cy="30"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    label: "Poultry",
    desc: "Broiler & layer setup, feed management, and disease guidance.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <ellipse
          cx="30"
          cy="38"
          rx="18"
          ry="14"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <circle cx="30" cy="20" r="9" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M24 12 C22 6 18 6 18 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M36 12 C38 6 42 6 42 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="27" cy="20" r="2" fill="currentColor" />
        <circle cx="33" cy="20" r="2" fill="currentColor" />
        <path
          d="M28 24 C29 26 31 26 32 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 48 L18 58 M26 50 L26 58 M34 50 L34 58 M40 48 L42 58"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Goat Farming",
    desc: "Breed selection, grazing plans, and ongoing health monitoring.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "👤",
    title: "Register",
    desc: "Create your free account with your name, mobile, and location. No technical knowledge needed.",
  },
  {
    step: "02",
    icon: "📋",
    title: "Submit Your Problem",
    desc: "Tell us about your business challenge. Get a unique Case ID instantly for tracking.",
  },
  {
    step: "03",
    icon: "🤝",
    title: "Get Expert Guidance",
    desc: "A local expert reviews your case, visits if needed, and gives a tailored action plan.",
  },
];

const WHY_US = [
  {
    icon: "🏆",
    title: "Expert Guidance",
    desc: "Connect with certified agri-experts and livestock specialists who understand rural realities.",
  },
  {
    icon: "⚡",
    title: "Quick Response",
    desc: "Cases are assigned within 24 hours. Track progress from your personal dashboard.",
  },
  {
    icon: "📦",
    title: "Resource Access",
    desc: "Request seeds, feed, equipment, and livestock breeds directly through the platform.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Works perfectly on any smartphone — designed for rural connectivity and ease of use.",
  },
  {
    icon: "🌍",
    title: "Local Network",
    desc: "Connected to district-level support teams who understand your region and language.",
  },
  {
    icon: "📈",
    title: "Business Growth",
    desc: "Ongoing monitoring ensures your business keeps growing season after season.",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden gradient-primary text-white"
        data-ocid="home.hero_section"
      >
        {/* Decorative wave / farmland silhouette */}
        <div
          className="absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-24 md:h-32"
            role="img"
            aria-label="decorative wave"
          >
            <path
              d="M0,80 C200,40 400,100 600,60 C800,20 1000,90 1200,50 C1300,30 1380,60 1440,40 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:pt-24 md:pb-36">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <Badge className="mb-5 bg-white/20 text-white border-white/30 hover:bg-white/25 font-body text-xs px-3 py-1">
              🌱 Rural Entrepreneurship Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-5 text-balance">
              Skill + Support
              <br className="hidden sm:block" /> + System
            </h1>
            <p className="text-lg sm:text-xl text-white/85 font-body leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
              Empowering rural entrepreneurs with the tools, knowledge, and
              community needed to grow sustainable and profitable businesses in
              agriculture.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground font-body font-semibold h-13 px-8 hover:bg-accent/90 transition-smooth shadow-elevated text-base"
                onClick={() => void navigate({ to: "/request" })}
                data-ocid="home.explore_cta_button"
              >
                Explore Our Programs
              </Button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center h-13 px-6 rounded-md border border-white/40 text-white text-sm font-body font-medium hover:bg-white/10 transition-smooth w-full sm:w-auto"
                data-ocid="home.learn_funding_link"
              >
                Learn about funding opportunities
              </a>
            </div>
          </div>

          {/* Sector icon cards */}
          <div
            id="sectors"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14"
            data-ocid="home.sectors_grid"
          >
            {SECTORS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-smooth cursor-pointer group"
                data-ocid={`home.sector_${s.label.toLowerCase().replace(/\s+/g, "_")}_card`}
              >
                <div className="text-white/90 group-hover:scale-110 transition-smooth">
                  {s.icon}
                </div>
                <span className="text-sm font-body font-semibold text-center leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 bg-muted/30"
        data-ocid="home.how_it_works_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed">
              From registration to growing your rural business — just three
              simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop only) */}
            <div
              className="hidden md:block absolute top-10 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-0.5 bg-border"
              aria-hidden="true"
            />

            {HOW_IT_WORKS.map((item, i) => (
              <div
                key={item.step}
                className="relative bg-card rounded-2xl p-8 border border-border shadow-subtle hover:shadow-elevated transition-smooth text-center"
                data-ocid={`home.step_${item.step}_card`}
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-elevated">
                  <span className="text-white text-xs font-display font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                <h3 className="font-display font-bold text-foreground text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              className="gradient-primary text-white font-body font-semibold h-12 px-8 hover:opacity-90 transition-smooth shadow-elevated"
              onClick={() => void navigate({ to: "/login" })}
              data-ocid="home.get_started_button"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* ── Our Sectors Detail ───────────────────────────────────────────── */}
      <section
        id="sectors-detail"
        className="py-20 bg-background"
        data-ocid="home.sectors_detail_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              What We Support
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Sectors
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed">
              Specialized guidance and resources for every type of rural
              business venture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTORS.map((s) => (
              <button
                type="button"
                key={s.label}
                className="card-interactive group flex flex-col items-start text-left w-full"
                data-ocid={`home.sector_detail_${s.label.toLowerCase().replace(/\s+/g, "_")}_card`}
                onClick={() => void navigate({ to: "/request" })}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-smooth">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {s.label}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-4 text-xs font-body font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-smooth">
                  Learn more →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
      <section
        id="why-us"
        className="py-20 bg-muted/30"
        data-ocid="home.why_us_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-base leading-relaxed">
              We combine local expertise, fast support, and practical resources
              so rural entrepreneurs can thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-6 border border-border shadow-subtle hover:shadow-elevated hover:border-accent/40 transition-smooth"
                data-ocid={`home.why_${item.title.toLowerCase().replace(/\s+/g, "_")}_card`}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="py-20 gradient-primary relative overflow-hidden"
        data-ocid="home.cta_section"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="text-5xl mb-6">🚜</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 text-balance">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/85 font-body mb-9 text-lg leading-relaxed max-w-xl mx-auto">
            Join thousands of rural entrepreneurs building sustainable
            businesses with expert support and real resources.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-primary font-body font-semibold h-13 px-10 hover:bg-white/90 transition-smooth shadow-elevated text-base"
              onClick={() => void navigate({ to: "/login" })}
              data-ocid="home.join_cta_button"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/40 text-white bg-transparent hover:bg-white/10 font-body font-medium h-13 px-8 text-base"
              onClick={() => void navigate({ to: "/contact" })}
              data-ocid="home.contact_cta_button"
            >
              📞 Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        className="bg-card border-t border-border py-12"
        data-ocid="home.footer_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-white font-display font-bold text-sm">
                    RB
                  </span>
                </div>
                <span className="font-display font-bold text-lg text-foreground">
                  Rural Biz Platform
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs mb-5">
                Empowering rural entrepreneurs with skill, support, and systems
                to build thriving agricultural businesses.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/20 rounded-lg px-4 py-2 text-sm font-body font-semibold hover:bg-accent/20 transition-smooth"
                  data-ocid="home.whatsapp_link"
                >
                  💬 WhatsApp Us
                </a>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-lg px-4 py-2 text-sm font-body font-semibold hover:bg-primary/20 transition-smooth"
                  data-ocid="home.phone_link"
                >
                  📞 Call Us
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", to: "/" },
                  { label: "Services", to: "/request" },
                  { label: "Resources", to: "/resources" },
                  { label: "Dashboard", to: "/dashboard" },
                  { label: "Contact", to: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.to}
                      className="text-sm text-muted-foreground font-body hover:text-accent transition-smooth"
                      data-ocid={`home.footer_${link.label.toLowerCase()}_link`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sectors */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                Sectors
              </h4>
              <ul className="space-y-2.5">
                {SECTORS.map((s) => (
                  <li key={s.label}>
                    <span className="text-sm text-muted-foreground font-body cursor-default">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground font-body text-center sm:text-left">
              © {new Date().getFullYear()} Rural Biz Platform. Built with love
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground font-body">
              📞 +91 12345 67890 &nbsp;|&nbsp; 📧 help@ruralbiz.in
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
