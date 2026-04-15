import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  Eye,
  Lightbulb,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wheat,
  Zap,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

// ─── Team data ─────────────────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Rahul Kumar",
    role: "Founder & CEO",
    roleHi: "संस्थापक और CEO",
    desc: "Passionate about rural entrepreneurship with 10+ years experience in agriculture development.",
    descHi: "कृषि विकास में 10+ वर्षों के अनुभव के साथ ग्रामीण उद्यमिता के प्रति जुनूनी।",
    initials: "RK",
    color: "from-primary/80 to-primary",
  },
  {
    name: "Priya Singh",
    role: "Head of Operations",
    roleHi: "संचालन प्रमुख",
    desc: "Expert in rural logistics and supply chain management for small businesses.",
    descHi: "छोटे व्यवसायों के लिए ग्रामीण लॉजिस्टिक्स और आपूर्ति श्रृंखला प्रबंधन में विशेषज्ञ।",
    initials: "PS",
    color: "from-accent/80 to-accent",
  },
  {
    name: "Amit Sharma",
    role: "Lead Expert – Agriculture",
    roleHi: "कृषि प्रमुख विशेषज्ञ",
    desc: "Certified agriculture specialist helping farmers maximize their yield and income.",
    descHi: "प्रमाणित कृषि विशेषज्ञ जो किसानों को उनकी उपज और आय बढ़ाने में मदद करते हैं।",
    initials: "AS",
    color: "from-primary/60 to-accent/80",
  },
  {
    name: "Sunita Devi",
    role: "Training Coordinator",
    roleHi: "प्रशिक्षण समन्वयक",
    desc: "Empowering women entrepreneurs through practical business training programs.",
    descHi:
      "व्यावहारिक व्यावसायिक प्रशिक्षण कार्यक्रमों के माध्यम से महिला उद्यमियों को सशक्त बनाना।",
    initials: "SD",
    color: "from-accent to-secondary",
  },
  {
    name: "Rajesh Yadav",
    role: "Technology Lead",
    roleHi: "प्रौद्योगिकी प्रमुख",
    desc: "Building digital solutions to connect rural entrepreneurs with modern market opportunities.",
    descHi:
      "ग्रामीण उद्यमियों को आधुनिक बाजार के अवसरों से जोड़ने के लिए डिजिटल समाधान बनाना।",
    initials: "RY",
    color: "from-primary to-accent/60",
  },
];

// ─── Problem & Solution data ────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: MapPin,
    titleEn: "No Expert Guidance",
    titleHi: "कोई विशेषज्ञ मार्गदर्शन नहीं",
    descEn:
      "Rural entrepreneurs struggle without access to qualified business advisors or agricultural specialists.",
    descHi:
      "ग्रामीण उद्यमी योग्य व्यापार सलाहकारों या कृषि विशेषज्ञों तक पहुँच के बिना संघर्ष करते हैं।",
  },
  {
    icon: TrendingUp,
    titleEn: "No Market Access",
    titleHi: "बाजार तक कोई पहुँच नहीं",
    descEn:
      "Farmers and small businesses cannot find buyers, fair prices, or supply chains to grow.",
    descHi:
      "किसान और छोटे व्यवसाय खरीदार, उचित मूल्य या बढ़ने के लिए आपूर्ति श्रृंखला नहीं पा सकते।",
  },
  {
    icon: BookOpen,
    titleEn: "Lack of Training",
    titleHi: "प्रशिक्षण का अभाव",
    descEn:
      "Modern farming techniques, financial literacy, and business skills are not easily accessible in rural areas.",
    descHi:
      "आधुनिक खेती तकनीक, वित्तीय साक्षरता और व्यावसायिक कौशल ग्रामीण क्षेत्रों में आसानी से उपलब्ध नहीं हैं।",
  },
  {
    icon: Phone,
    titleEn: "Isolation & Limited Support",
    titleHi: "अलगाव और सीमित समर्थन",
    descEn:
      "Rural communities lack peer networks, mentors, and institutional support to sustain their businesses.",
    descHi:
      "ग्रामीण समुदायों में अपने व्यवसाय को बनाए रखने के लिए सहकर्मी नेटवर्क, सलाहकार और संस्थागत समर्थन का अभाव है।",
  },
];

const SOLUTIONS = [
  {
    icon: Users,
    titleEn: "Expert Network",
    titleHi: "विशेषज्ञ नेटवर्क",
    descEn:
      "Certified specialists in agriculture, fishery, poultry, and goat farming assigned to each case.",
    descHi:
      "प्रत्येक मामले के लिए कृषि, मछली पालन, मुर्गी पालन और बकरी पालन में प्रमाणित विशेषज्ञ।",
  },
  {
    icon: ShieldCheck,
    titleEn: "Case Management",
    titleHi: "केस प्रबंधन",
    descEn:
      "Dedicated case IDs, status tracking, and step-by-step execution support for every user.",
    descHi:
      "हर उपयोगकर्ता के लिए समर्पित केस आईडी, स्थिति ट्रैकिंग और चरण-दर-चरण निष्पादन समर्थन।",
  },
  {
    icon: Brain,
    titleEn: "AI Recommendations",
    titleHi: "AI अनुशंसाएँ",
    descEn:
      "Smart business type suggestions based on location, resources, and personal goals via our AI quiz.",
    descHi:
      "हमारे AI क्विज़ के माध्यम से स्थान, संसाधनों और व्यक्तिगत लक्ष्यों के आधार पर स्मार्ट व्यवसाय प्रकार सुझाव।",
  },
  {
    icon: Zap,
    titleEn: "Training & Resources",
    titleHi: "प्रशिक्षण और संसाधन",
    descEn:
      "Enroll in hands-on programs and access seeds, breeds, and feed resources directly through the platform.",
    descHi:
      "व्यावहारिक कार्यक्रमों में नामांकन करें और प्लेटफ़ॉर्म के माध्यम से सीधे बीज, नस्लें और चारा संसाधन प्राप्त करें।",
  },
];

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <Layout>
      {/* ── Hero / Intro ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 bg-card border-b border-border"
        data-ocid="about.intro_section"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-8 w-48 h-48 rounded-full bg-accent/5 blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-accent/10 text-accent border-accent/20 font-body"
          >
            <Wheat className="w-3.5 h-3.5 mr-1.5" />
            {t("About Us", "हमारे बारे में")}
          </Badge>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 text-balance">
            {t(
              "Empowering Rural India, One Business at a Time",
              "एक समय में एक व्यवसाय, ग्रामीण भारत को सशक्त बनाना",
            )}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            {t(
              "Rural Biz Platform was born from a simple belief: every rural family deserves the tools, knowledge, and support to build a successful business. We bridge the gap between rural potential and real-world opportunity.",
              "Rural Biz Platform एक सरल विश्वास से उत्पन्न हुआ: प्रत्येक ग्रामीण परिवार एक सफल व्यवसाय बनाने के लिए उपकरण, ज्ञान और समर्थन का हकदार है। हम ग्रामीण क्षमता और वास्तविक दुनिया के अवसर के बीच की खाई को पाटते हैं।",
            )}
          </p>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16 bg-background"
        data-ocid="about.vision_mission_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              {t("Vision & Mission", "दृष्टि और मिशन")}
            </h2>
            <p className="text-sm text-muted-foreground font-body">
              {t("What drives us every day", "हर दिन हमें क्या प्रेरित करता है")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <Card className="p-7 border-border bg-card hover:shadow-elevated transition-smooth group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-smooth">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t("Our Vision", "हमारी दृष्टि")}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {t(
                      "Every rural family becomes a successful entrepreneur.",
                      "प्रत्येक ग्रामीण परिवार एक सफल उद्यमी बने।",
                    )}
                  </p>
                </div>
              </div>
            </Card>
            {/* Mission */}
            <Card className="p-7 border-border bg-card hover:shadow-elevated transition-smooth group">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-smooth">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t("Our Mission", "हमारा मिशन")}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {t(
                      "Provide expert guidance, training, and resources to rural entrepreneurs.",
                      "ग्रामीण उद्यमियों को विशेषज्ञ मार्गदर्शन, प्रशिक्षण और संसाधन प्रदान करना।",
                    )}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16 bg-muted/30 border-y border-border"
        data-ocid="about.problem_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="mb-3 bg-destructive/10 text-destructive border-destructive/20 font-body"
            >
              {t("The Challenge", "चुनौती")}
            </Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              {t(
                "What Rural Entrepreneurs Face",
                "ग्रामीण उद्यमियों को क्या झेलना पड़ता है",
              )}
            </h2>
            <p className="text-sm text-muted-foreground font-body max-w-xl mx-auto">
              {t(
                "Millions of rural families have the will to build businesses but lack the right support system.",
                "लाखों ग्रामीण परिवारों में व्यवसाय बनाने की इच्छाशक्ति है, लेकिन सही समर्थन प्रणाली का अभाव है।",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROBLEMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.titleEn}
                  className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border shadow-subtle"
                  data-ocid={`about.problem_${p.titleEn.toLowerCase().replace(/\s+/g, "_")}_card`}
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                      {lang === "hi" ? p.titleHi : p.titleEn}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      {lang === "hi" ? p.descHi : p.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16 bg-background"
        data-ocid="about.solution_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="mb-3 bg-accent/10 text-accent border-accent/20 font-body"
            >
              <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
              {t("Our Solution", "हमारा समाधान")}
            </Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              {t("How We Bridge the Gap", "हम खाई को कैसे पाटते हैं")}
            </h2>
            <p className="text-sm text-muted-foreground font-body max-w-xl mx-auto">
              {t(
                "A complete ecosystem — from expert matching to resource supply — built for rural entrepreneurs.",
                "एक पूर्ण पारिस्थितिकी तंत्र — विशेषज्ञ मिलान से संसाधन आपूर्ति तक — ग्रामीण उद्यमियों के लिए बनाया गया।",
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.titleEn}
                  className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border hover:border-accent/40 hover:shadow-elevated transition-smooth"
                  data-ocid={`about.solution_${s.titleEn.toLowerCase().replace(/\s+/g, "_")}_card`}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                      {lang === "hi" ? s.titleHi : s.titleEn}
                    </h4>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      {lang === "hi" ? s.descHi : s.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────────── */}
      <section
        className="py-14 sm:py-16 bg-muted/30 border-t border-border"
        data-ocid="about.team_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge
              variant="secondary"
              className="mb-3 bg-primary/10 text-primary border-primary/20 font-body"
            >
              <Users className="w-3.5 h-3.5 mr-1.5" />
              {t("Our Team", "हमारी टीम")}
            </Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
              {t("The People Behind Rural Biz", "Rural Biz के पीछे के लोग")}
            </h2>
            <p className="text-sm text-muted-foreground font-body max-w-xl mx-auto">
              {t(
                "Dedicated professionals united by one mission — transforming rural livelihoods.",
                "एक मिशन से एकजुट समर्पित पेशेवर — ग्रामीण आजीविका को बदलना।",
              )}
            </p>
          </div>

          {/* Top row: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {TEAM.slice(0, 3).map((member, index) => (
              <Card
                key={member.name}
                className="p-6 bg-card border-border hover:shadow-elevated hover:border-accent/40 transition-smooth text-center"
                data-ocid={`about.team_member.${index + 1}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 shadow-subtle`}
                >
                  <span className="font-display font-bold text-xl text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-0.5 truncate">
                  {member.name}
                </h3>
                <p className="text-xs font-body font-semibold text-accent mb-3">
                  {lang === "hi" ? member.roleHi : member.role}
                </p>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {lang === "hi" ? member.descHi : member.desc}
                </p>
              </Card>
            ))}
          </div>

          {/* Bottom row: 2 cards centred */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {TEAM.slice(3).map((member, index) => (
              <Card
                key={member.name}
                className="p-6 bg-card border-border hover:shadow-elevated hover:border-accent/40 transition-smooth text-center"
                data-ocid={`about.team_member.${index + 4}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 shadow-subtle`}
                >
                  <span className="font-display font-bold text-xl text-white">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-0.5 truncate">
                  {member.name}
                </h3>
                <p className="text-xs font-body font-semibold text-accent mb-3">
                  {lang === "hi" ? member.roleHi : member.role}
                </p>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {lang === "hi" ? member.descHi : member.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
