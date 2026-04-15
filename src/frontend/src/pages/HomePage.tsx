import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  GraduationCap,
  Handshake,
  HeadphonesIcon,
  IndianRupee,
  Lightbulb,
  MapPin,
  Phone,
  Sprout,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";
import { Layout } from "../components/Layout";
import { useLanguage } from "../hooks/useLanguage";

/* ─── Sector SVG icons ──────────────────────────────────────────────────── */

const FarmingIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" aria-hidden="true">
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
    <circle cx="32" cy="11" r="4" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M18 52 L18 58 M32 52 L32 58 M46 52 L46 58"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const FisheryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" aria-hidden="true">
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
      d="M8 52 L56 52"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const PoultryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" aria-hidden="true">
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
  </svg>
);

const GoatIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10" aria-hidden="true">
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
      d="M20 48 L18 58 M26 50 L26 58 M34 50 L34 58 M40 48 L42 58"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────────────────── */

const SECTORS = [
  {
    Icon: FarmingIcon,
    labelEn: "Farming",
    labelHi: "खेती",
    descEn:
      "Crop planning, soil health, and irrigation support for every season.",
    descHi: "फसल योजना, मिट्टी स्वास्थ्य, और हर मौसम के लिए सिंचाई सहायता।",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  {
    Icon: FisheryIcon,
    labelEn: "Fishery",
    labelHi: "मछली पालन",
    descEn: "Fish seed, pond management, and harvest support from day one.",
    descHi: "मछली बीज, तालाब प्रबंधन, और पहले दिन से कटाई समर्थन।",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    Icon: PoultryIcon,
    labelEn: "Poultry",
    labelHi: "मुर्गी पालन",
    descEn: "Broiler & layer setup, feed management, and disease guidance.",
    descHi: "ब्रॉयलर और लेयर सेटअप, फ़ीड प्रबंधन, और रोग मार्गदर्शन।",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    Icon: GoatIcon,
    labelEn: "Goat Farming",
    labelHi: "बकरी पालन",
    descEn: "Breed selection, grazing plans, and ongoing health monitoring.",
    descHi: "नस्ल चयन, चराई योजना, और निरंतर स्वास्थ्य निगरानी।",
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
];

const STEPS = [
  {
    n: "01",
    Icon: UserCheck,
    titleEn: "Register",
    titleHi: "पंजीकरण",
    descEn: "Create your free account with name, mobile & location.",
    descHi: "नाम, मोबाइल और स्थान के साथ अपना खाता बनाएं।",
  },
  {
    n: "02",
    Icon: BriefcaseBusiness,
    titleEn: "Submit Problem",
    titleHi: "समस्या दर्ज करें",
    descEn: "Describe your business challenge and get a unique Case ID.",
    descHi: "अपनी व्यावसायिक चुनौती बताएं और केस ID पाएं।",
  },
  {
    n: "03",
    Icon: CheckCircle2,
    titleEn: "Case Created",
    titleHi: "केस बना",
    descEn: "Your request is logged and assigned to our expert team.",
    descHi: "आपका अनुरोध दर्ज हो जाता है और विशेषज्ञ टीम को सौंपा जाता है।",
  },
  {
    n: "04",
    Icon: Phone,
    titleEn: "Expert Contact",
    titleHi: "विशेषज्ञ संपर्क",
    descEn: "A specialist calls or visits you with a tailored action plan.",
    descHi: "विशेषज्ञ आपसे संपर्क करता है और कार्य योजना देता है।",
  },
  {
    n: "05",
    Icon: Zap,
    titleEn: "Execution",
    titleHi: "क्रियान्वयन",
    descEn: "We support setup, training, and resource supply on-ground.",
    descHi: "हम सेटअप, प्रशिक्षण और संसाधन आपूर्ति में मदद करते हैं।",
  },
  {
    n: "06",
    Icon: TrendingUp,
    titleEn: "Profit",
    titleHi: "मुनाफ़ा",
    descEn: "Your business grows with ongoing monitoring and support.",
    descHi: "निरंतर निगरानी के साथ आपका व्यवसाय बढ़ता है।",
  },
];

const PRICING = [
  {
    name: "Free Consultation",
    nameHi: "मुफ़्त परामर्श",
    price: "₹0",
    period: "One-time",
    periodHi: "एक बार",
    color: "border-border",
    highlight: false,
    features: [
      "Basic business advice",
      "Sector information",
      "1 free phone call",
      "Resource catalogue access",
    ],
    featuresHi: [
      "बुनियादी व्यवसाय सलाह",
      "क्षेत्र जानकारी",
      "1 मुफ्त फोन कॉल",
      "संसाधन कैटलॉग एक्सेस",
    ],
    cta: "Get Started Free",
    ctaHi: "मुफ़्त शुरू करें",
    to: "/login",
  },
  {
    name: "Training Program",
    nameHi: "प्रशिक्षण कार्यक्रम",
    price: "₹1,499",
    period: "Per program",
    periodHi: "प्रति कार्यक्रम",
    color: "border-border",
    highlight: false,
    features: [
      "Sector-specific training",
      "Hands-on workshops",
      "Certificate on completion",
      "Dashboard tracking",
    ],
    featuresHi: [
      "क्षेत्र-विशिष्ट प्रशिक्षण",
      "व्यावहारिक कार्यशालाएं",
      "पूर्णता प्रमाण पत्र",
      "डैशबोर्ड ट्रैकिंग",
    ],
    cta: "Enroll Now",
    ctaHi: "अभी नामांकन करें",
    to: "/trainings",
  },
  {
    name: "Setup Support",
    nameHi: "सेटअप सहायता",
    price: "₹2,999",
    period: "Full project",
    periodHi: "पूरा प्रोजेक्ट",
    color: "border-accent",
    highlight: true,
    features: [
      "End-to-end business setup",
      "Expert field visit",
      "Resource procurement help",
      "60-day follow-up support",
    ],
    featuresHi: [
      "एंड-टू-एंड व्यवसाय सेटअप",
      "विशेषज्ञ फील्ड विज़िट",
      "संसाधन खरीद सहायता",
      "60-दिन फॉलो-अप",
    ],
    cta: "Get Setup Help",
    ctaHi: "सेटअप सहायता पाएं",
    to: "/request",
  },
  {
    name: "Premium",
    nameHi: "प्रीमियम",
    price: "Custom",
    priceHi: "कस्टम",
    period: "Priority support",
    periodHi: "प्राथमिकता समर्थन",
    color: "border-primary",
    highlight: false,
    features: [
      "Dedicated expert manager",
      "Priority response (< 4 hrs)",
      "Monthly progress reviews",
      "All services included",
    ],
    featuresHi: [
      "समर्पित विशेषज्ञ",
      "प्राथमिकता प्रतिक्रिया (< 4 घंटे)",
      "मासिक प्रगति समीक्षा",
      "सभी सेवाएं शामिल",
    ],
    cta: "Contact for Details",
    ctaHi: "विवरण के लिए संपर्क करें",
    to: "/contact",
  },
];

const WHY_US = [
  {
    Icon: Handshake,
    titleEn: "Expert Guidance",
    titleHi: "विशेषज्ञ मार्गदर्शन",
    descEn:
      "Certified agri-experts and livestock specialists who understand rural realities.",
    descHi: "ग्रामीण वास्तविकताओं को समझने वाले विशेषज्ञ।",
  },
  {
    Icon: Zap,
    titleEn: "Quick Response",
    titleHi: "त्वरित प्रतिक्रिया",
    descEn:
      "Cases assigned within 24 hours. Track progress from your dashboard.",
    descHi: "24 घंटों के भीतर केस असाइन होता है।",
  },
  {
    Icon: MapPin,
    titleEn: "Local Network",
    titleHi: "स्थानीय नेटवर्क",
    descEn: "District-level support teams who understand your region.",
    descHi: "जिला स्तरीय सहायता टीम जो आपके क्षेत्र को समझती है।",
  },
  {
    Icon: GraduationCap,
    titleEn: "Training Programs",
    titleHi: "प्रशिक्षण कार्यक्रम",
    descEn: "Hands-on sector-specific workshops with certificates.",
    descHi: "प्रमाण पत्र के साथ व्यावहारिक कार्यशालाएं।",
  },
  {
    Icon: Lightbulb,
    titleEn: "AI Suggestions",
    titleHi: "AI सुझाव",
    descEn: "Smart quiz recommends the best business fit for your profile.",
    descHi: "स्मार्ट क्विज़ आपके लिए सबसे अच्छा व्यवसाय बताता है।",
  },
  {
    Icon: HeadphonesIcon,
    titleEn: "Ongoing Support",
    titleHi: "निरंतर समर्थन",
    descEn: "Continuous monitoring ensures your business keeps growing.",
    descHi: "निरंतर निगरानी से आपका व्यवसाय बढ़ता रहता है।",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function HomePage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  return (
    <Layout>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden gradient-primary text-white"
        data-ocid="home.hero_section"
      >
        {/* Decorative dot grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-20"
            role="presentation"
            aria-label="decorative wave"
          >
            <path
              d="M0,50 C200,20 400,70 600,40 C800,10 1000,60 1200,30 C1300,15 1380,45 1440,25 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pt-20 md:pb-32">
          {/* Headline + CTAs */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/25 font-body text-xs px-3 py-1">
              🌱{" "}
              {t("Rural Entrepreneurship Platform", "ग्रामीण उद्यमिता प्लेटफार्म")}
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-5 text-balance">
              {t("Start Your Business", "अपना व्यवसाय शुरू करें")}
              <br />
              <span className="text-white/90">
                {t("with Full Support", "पूरी सहायता के साथ")}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/85 font-body leading-relaxed mb-8 max-w-2xl mx-auto">
              {t(
                "Expert guidance, field support, training and resources — all in one platform for rural entrepreneurs.",
                "विशेषज्ञ मार्गदर्शन, फील्ड सहायता, प्रशिक्षण और संसाधन — ग्रामीण उद्यमियों के लिए एक ही प्लेटफार्म।",
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary font-body font-bold h-12 px-8 hover:bg-white/90 transition-smooth shadow-elevated text-base"
                onClick={() => void navigate({ to: "/login" })}
                data-ocid="home.start_business_button"
              >
                <Sprout className="w-4 h-4 mr-2" />
                {t("Start Your Business", "व्यवसाय शुरू करें")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/50 text-white bg-transparent hover:bg-white/15 font-body font-semibold h-12 px-8 text-base"
                onClick={() => void navigate({ to: "/contact" })}
                data-ocid="home.get_expert_help_button"
              >
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                {t("Get Expert Help", "विशेषज्ञ सहायता लें")}
              </Button>
            </div>
          </div>

          {/* Sector icon cards */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto"
            data-ocid="home.sectors_grid"
          >
            {SECTORS.map((s) => (
              <button
                type="button"
                key={s.labelEn}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-smooth cursor-pointer group"
                data-ocid={`home.sector_${s.labelEn.toLowerCase().replace(/\s+/g, "_")}_card`}
                onClick={() => void navigate({ to: "/request" })}
                onKeyUp={(e) =>
                  e.key === "Enter" && void navigate({ to: "/request" })
                }
              >
                <div className="text-white/90 group-hover:scale-110 transition-smooth">
                  <s.Icon />
                </div>
                <span className="text-sm font-body font-semibold text-center leading-tight">
                  {lang === "hi" ? s.labelHi : s.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────── */}
      <section
        id="problem"
        className="py-16 bg-background"
        data-ocid="home.problem_section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-destructive mb-3">
            {t("The Problem", "समस्या")}
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
            {t(
              "Rural Entrepreneurs Face Real Barriers",
              "ग्रामीण उद्यमियों के सामने असली चुनौतियाँ",
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                id: "guidance",
                n: "1",
                en: "Lack of expert guidance leaves farmers unable to scale beyond subsistence — the right advice at the right time is missing.",
                hi: "सही समय पर सही सलाह न मिलने से किसान गुज़ारे से आगे नहीं बढ़ पाते।",
              },
              {
                id: "access",
                n: "2",
                en: "Access to quality inputs like seeds, feed, and equipment is difficult and expensive in rural areas without a trusted network.",
                hi: "बीज, चारा और उपकरण जैसे गुणवत्ता संसाधनों तक पहुंच ग्रामीण क्षेत्रों में कठिन है।",
              },
              {
                id: "system",
                n: "3",
                en: "Young people and women in rural areas have entrepreneurial drive but no structured system to help them execute their business ideas.",
                hi: "युवाओं और महिलाओं में उद्यमशीलता है, लेकिन व्यवसाय चलाने की व्यवस्थित प्रणाली नहीं।",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-5 rounded-xl bg-destructive/5 border border-destructive/15"
                data-ocid={`home.problem_item.${item.n}`}
              >
                <div className="w-6 h-6 rounded-full bg-destructive/20 text-destructive flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.n}
                </div>
                <p className="text-sm text-foreground font-body leading-relaxed">
                  {lang === "hi" ? item.hi : item.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────────────────────── */}
      <section
        id="solution"
        className="py-16 bg-muted/30"
        data-ocid="home.solution_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              {t("Our Solution", "हमारा समाधान")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t("Skill + Support + System", "कौशल + समर्थन + प्रणाली")}
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-base leading-relaxed">
              {t(
                "We combine local expertise, practical resources, and a structured process so every rural entrepreneur can launch and grow a profitable business.",
                "हम स्थानीय विशेषज्ञता, व्यावहारिक संसाधनों और एक व्यवस्थित प्रक्रिया को मिलाते हैं ताकि हर ग्रामीण उद्यमी एक लाभदायक व्यवसाय शुरू कर सके।",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                Icon: GraduationCap,
                titleEn: "Skill",
                titleHi: "कौशल",
                descEn:
                  "Structured training in farming, fishery, poultry, and goat farming with certified experts.",
                descHi:
                  "प्रमाणित विशेषज्ञों के साथ खेती, मछली पालन, मुर्गी पालन में प्रशिक्षण।",
                bg: "bg-primary/8 border-primary/20",
                icon: "text-primary",
              },
              {
                Icon: Handshake,
                titleEn: "Support",
                titleHi: "समर्थन",
                descEn:
                  "Dedicated expert assigned to every case — field visits, resource supply, and ongoing monitoring.",
                descHi:
                  "हर केस के लिए विशेषज्ञ — फील्ड विज़िट, संसाधन आपूर्ति और निगरानी।",
                bg: "bg-accent/8 border-accent/20",
                icon: "text-accent",
              },
              {
                Icon: BriefcaseBusiness,
                titleEn: "System",
                titleHi: "प्रणाली",
                descEn:
                  "Complete digital platform — register, submit problems, track cases, and manage your business.",
                descHi: "पूरा डिजिटल प्लेटफार्म — पंजीकरण, समस्या दर्ज करें, केस ट्रैक करें।",
                bg: "bg-secondary/8 border-secondary/20",
                icon: "text-secondary",
              },
            ].map((item) => (
              <div
                key={item.titleEn}
                className={`rounded-2xl p-7 border ${item.bg} flex flex-col items-center text-center`}
                data-ocid={`home.solution_${item.titleEn.toLowerCase()}_card`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-card ${item.icon}`}
                >
                  <item.Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  {lang === "hi" ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {lang === "hi" ? item.descHi : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-16 bg-background"
        data-ocid="home.how_it_works_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              {t("Simple Process", "सरल प्रक्रिया")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t("How It Works", "यह कैसे काम करता है")}
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm leading-relaxed">
              {t(
                "Six clear steps from registration to running a profitable business.",
                "पंजीकरण से लाभदायक व्यवसाय तक छह स्पष्ट चरण।",
              )}
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className="relative bg-card rounded-2xl p-5 md:p-7 border border-border shadow-subtle hover:shadow-elevated hover:border-accent/40 transition-smooth text-center group"
                data-ocid={`home.step_${step.n}_card`}
              >
                {/* Step number circle */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full gradient-primary flex items-center justify-center shadow-elevated">
                  <span className="text-white text-xs font-display font-bold">
                    {i + 1}
                  </span>
                </div>
                {/* Arrow between steps on desktop */}
                {i < STEPS.length - 1 && i % 3 !== 2 && (
                  <div className="hidden md:block absolute top-8 -right-3 z-10 text-muted-foreground">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mt-3 mb-3 group-hover:bg-primary/20 transition-smooth">
                  <step.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm md:text-base mb-1">
                  {lang === "hi" ? step.titleHi : step.titleEn}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed hidden sm:block">
                  {lang === "hi" ? step.descHi : step.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Journey line label */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground font-body">
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">
              {t("Register", "पंजीकरण")}
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="px-3 py-1.5 rounded-full bg-muted">
              {t("Submit", "सबमिट")}
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="px-3 py-1.5 rounded-full bg-muted">
              {t("Case", "केस")}
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="px-3 py-1.5 rounded-full bg-muted">
              {t("Expert", "विशेषज्ञ")}
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="px-3 py-1.5 rounded-full bg-muted">
              {t("Execute", "क्रियान्वयन")}
            </span>
            <ArrowRight className="w-4 h-4" />
            <span className="px-3 py-1.5 rounded-full bg-accent/15 text-accent font-semibold">
              {t("Profit 💰", "मुनाफ़ा 💰")}
            </span>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="gradient-primary text-white font-body font-semibold h-12 px-8 hover:opacity-90 transition-smooth shadow-elevated"
              onClick={() => void navigate({ to: "/login" })}
              data-ocid="home.get_started_button"
            >
              {t("Get Started Free", "मुफ़्त शुरू करें")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Services / Sectors ───────────────────────────────────────────── */}
      <section
        id="services"
        className="py-16 bg-muted/30"
        data-ocid="home.services_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              {t("What We Support", "हम क्या समर्थन करते हैं")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t("Our Services", "हमारी सेवाएं")}
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm leading-relaxed">
              {t(
                "Specialized guidance, resources, and field support for every rural business sector.",
                "हर ग्रामीण व्यवसाय क्षेत्र के लिए विशेष मार्गदर्शन, संसाधन और फील्ड समर्थन।",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECTORS.map((s) => (
              <button
                type="button"
                key={s.labelEn}
                className="card-interactive group flex flex-col items-start text-left w-full"
                data-ocid={`home.service_${s.labelEn.toLowerCase().replace(/\s+/g, "_")}_card`}
                onClick={() => void navigate({ to: "/request" })}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-smooth`}
                >
                  <s.Icon />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  {lang === "hi" ? s.labelHi : s.labelEn}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed flex-1">
                  {lang === "hi" ? s.descHi : s.descEn}
                </p>
                <span className="mt-3 text-xs font-body font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-smooth">
                  {t("Request Support", "सहायता अनुरोध")}{" "}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Suggestion ────────────────────────────────────────────────── */}
      <section
        id="ai-suggest"
        className="py-16 bg-background"
        data-ocid="home.ai_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl gradient-primary p-8 md:p-12 text-white relative overflow-hidden">
            {/* Bg decoration */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-sm font-body font-semibold uppercase tracking-wide">
                    {t("AI Powered", "AI संचालित")}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  {t(
                    "Not Sure Which Business to Start?",
                    "कौन सा व्यवसाय शुरू करें?",
                  )}
                </h2>
                <p className="text-white/85 font-body leading-relaxed mb-6 text-sm md:text-base">
                  {t(
                    "Take our 2-minute quiz. Our AI analyzes your location, skills, and budget to recommend the best business for you — and saves it to your dashboard.",
                    "हमारा 2 मिनट का क्विज़ लें। हमारा AI आपकी जगह, कौशल और बजट के आधार पर सबसे अच्छा व्यवसाय बताता है।",
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-white text-primary font-body font-bold h-12 px-7 hover:bg-white/90 transition-smooth shadow-elevated"
                    onClick={() => void navigate({ to: "/ai-suggest" })}
                    data-ocid="home.find_best_business_button"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {t("Find Best Business", "सबसे अच्छा व्यवसाय खोजें")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white bg-transparent hover:bg-white/10 font-body h-12 px-5"
                    onClick={() => void navigate({ to: "/login" })}
                    data-ocid="home.ai_login_button"
                  >
                    {t("View My Results", "मेरे परिणाम देखें")}
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex flex-col gap-3">
                <div className="rounded-xl px-5 py-3 bg-white/15 text-white font-body text-sm flex justify-between items-center">
                  <span className="text-xs opacity-70">
                    {t("What is your location?", "आपका स्थान क्या है?")}
                  </span>
                  <span>Bhagalpur, Bihar</span>
                </div>
                <div className="rounded-xl px-5 py-3 bg-white/15 text-white font-body text-sm flex justify-between items-center">
                  <span className="text-xs opacity-70">
                    {t("Available budget?", "उपलब्ध बजट?")}
                  </span>
                  <span>₹15,000 – ₹25,000</span>
                </div>
                <div className="rounded-xl px-5 py-3 bg-white text-primary font-bold font-body text-sm flex justify-between items-center">
                  <span className="text-xs opacity-70">
                    {t("AI Recommendation", "AI सुझाव")}
                  </span>
                  <span className="text-primary">{`🐐 ${t("Goat Farming — High ROI", "बकरी पालन — उच्च ROI")}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
      <section
        id="why-us"
        className="py-16 bg-muted/30"
        data-ocid="home.why_us_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              {t("Why Choose Us", "हमें क्यों चुनें")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t("Everything You Need to Succeed", "सफलता के लिए सब कुछ")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((item) => (
              <div
                key={item.titleEn}
                className="bg-card rounded-2xl p-6 border border-border shadow-subtle hover:shadow-elevated hover:border-accent/30 transition-smooth"
                data-ocid={`home.why_${item.titleEn.toLowerCase().replace(/\s+/g, "_")}_card`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <item.Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  {lang === "hi" ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {lang === "hi" ? item.descHi : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-16 bg-background"
        data-ocid="home.pricing_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent mb-3">
              {t("Transparent Pricing", "पारदर्शी मूल्य")}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {t("Choose Your Plan", "अपना प्लान चुनें")}
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto text-sm">
              {t(
                "Affordable support for every stage of your rural business journey.",
                "आपकी ग्रामीण व्यवसाय यात्रा के हर चरण के लिए किफायती सहायता।",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 ${plan.color} bg-card p-6 flex flex-col shadow-subtle transition-smooth hover:shadow-elevated ${plan.highlight ? "ring-2 ring-accent/40 scale-[1.02]" : ""}`}
                data-ocid={`home.pricing_${plan.name.toLowerCase().replace(/\s+/g, "_")}_card`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground text-xs px-3 font-semibold shadow">
                      {t("Most Popular", "सबसे लोकप्रिय")}
                    </Badge>
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-display font-bold text-foreground text-base mb-1">
                    {lang === "hi" ? plan.nameHi : plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {lang === "hi" && plan.priceHi
                        ? plan.priceHi
                        : plan.price}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground font-body">
                    {lang === "hi" ? plan.periodHi : plan.period}
                  </span>
                </div>
                <ul className="flex-1 space-y-2 mb-5">
                  {(lang === "hi" ? plan.featuresHi : plan.features).map(
                    (f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-xs font-body text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ),
                  )}
                </ul>
                <Button
                  className={`w-full font-body font-semibold ${plan.highlight ? "gradient-primary text-white border-0 hover:opacity-90" : "variant-outline"}`}
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => void navigate({ to: plan.to as "/" })}
                  data-ocid={`home.pricing_${plan.name.toLowerCase().replace(/\s+/g, "_")}_cta_button`}
                >
                  {lang === "hi" ? plan.ctaHi : plan.cta}
                </Button>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground font-body mt-6 flex items-center justify-center gap-1">
            <IndianRupee className="w-3 h-3" />
            {t(
              "All prices are inclusive. No hidden charges.",
              "सभी मूल्य समावेशी हैं। कोई छिपा शुल्क नहीं।",
            )}
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-16 gradient-primary relative overflow-hidden"
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
          <div className="text-5xl mb-5">🚜</div>
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 text-balance">
            {t(
              "Ready to Start Your Journey?",
              "अपनी यात्रा शुरू करने के लिए तैयार हैं?",
            )}
          </h2>
          <p className="text-white/85 font-body mb-8 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {t(
              "Join rural entrepreneurs across Bihar building sustainable businesses with our expert support and real resources.",
              "बिहार के ग्रामीण उद्यमियों के साथ जुड़ें जो हमारी विशेषज्ञ सहायता से टिकाऊ व्यवसाय बना रहे हैं।",
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-primary font-body font-bold h-13 px-10 hover:bg-white/90 transition-smooth shadow-elevated text-base"
              onClick={() => void navigate({ to: "/login" })}
              data-ocid="home.cta_start_business_button"
            >
              <Sprout className="w-4 h-4 mr-2" />
              {t("Start Your Business", "व्यवसाय शुरू करें")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/40 text-white bg-transparent hover:bg-white/15 font-body font-semibold h-13 px-8 text-base"
              onClick={() => void navigate({ to: "/contact" })}
              data-ocid="home.cta_expert_help_button"
            >
              <CircleDollarSign className="w-4 h-4 mr-2" />
              {t("Talk to an Expert", "विशेषज्ञ से बात करें")}
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
