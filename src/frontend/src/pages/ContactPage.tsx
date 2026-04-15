import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Copy,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "../components/Layout";

// ─── FAQ Data ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I submit a service request?",
    a: "Go to the 'Request Service' page, choose your business type (Farming, Fishery, Poultry, or Goat), describe your problem, and upload a photo if needed. You'll get a unique Case ID immediately after submitting.",
  },
  {
    q: "How do I track my case status?",
    a: "Log in to your Dashboard and click 'My Cases'. You'll see the current status — Pending, In Progress, or Completed — along with your assigned expert's name and next steps.",
  },
  {
    q: "When will an expert contact me?",
    a: "An expert will be assigned within 24 hours of submitting your request. They will call or WhatsApp you on the mobile number you registered with. Make sure your number is active.",
  },
  {
    q: "How do I request resources (seeds, animals, feed)?",
    a: "Visit the 'Resources' section from the main menu. Browse available items like goat breeds, fish seeds, poultry, or crop seeds, then click 'Request' on any item to place your supply request.",
  },
  {
    q: "Is the Rural Biz Platform free to use?",
    a: "Yes! Basic services — including submitting requests, tracking cases, and accessing resources — are completely free. Premium support options for faster response and dedicated experts will be available soon.",
  },
  {
    q: "How do I update my profile or mobile number?",
    a: "After logging in, click your name in the top corner and select 'My Profile'. You can update your name, mobile number, location, and business type from there.",
  },
];

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`contact.faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-card text-left hover:bg-muted/40 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        data-ocid={`contact.faq.toggle.${index + 1}`}
      >
        <span className="font-display font-semibold text-sm sm:text-base text-foreground">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 py-4 bg-muted/20 border-t border-border">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const EMAIL = "support@ruralbiz.in";
  const PHONE = "+91-9876543210";
  const PHONE_TEL = "tel:+919876543210";
  const WA_LINK =
    "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20Rural%20Biz%20Platform%20account";

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setEmailCopied(true);
        toast.success("Email address copied to clipboard!");
        setTimeout(() => setEmailCopied(false), 2500);
      })
      .catch(() => {
        toast.error(`Could not copy. Please copy manually: ${EMAIL}`);
      });
  };

  const toggleFaq = (i: number) =>
    setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="gradient-primary text-white py-14 px-4"
        data-ocid="contact.hero_section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-4">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-body font-medium">
              Support Team Ready
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 text-balance">
            Contact &amp; Support
          </h1>
          <p className="text-white/85 font-body text-base sm:text-lg leading-relaxed">
            We are here to help your rural business succeed.
            <br className="hidden sm:block" />
            Call us, WhatsApp us, or check answers below.
          </p>
        </div>
      </section>

      {/* ── Primary Action Buttons ─────────────────────────────────────────── */}
      <section
        className="py-10 px-4 bg-background"
        data-ocid="contact.actions_section"
      >
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Call Button */}
          <a
            href={PHONE_TEL}
            className="flex items-center justify-between gap-4 w-full rounded-2xl border-2 border-accent bg-accent/10 px-6 py-5 hover:bg-accent/20 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            data-ocid="contact.call_button"
            aria-label={`Call us at ${PHONE}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 shadow-elevated">
                <Phone className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="text-left">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5">
                  Call Us Now
                </p>
                <p className="font-display font-bold text-xl text-foreground">
                  {PHONE}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  Mon–Sat, 9 AM – 6 PM
                </p>
              </div>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent" />
            </div>
          </a>

          {/* WhatsApp Button */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 w-full rounded-2xl border-2 px-6 py-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            style={{
              borderColor: "#25D366",
              backgroundColor: "rgba(37,211,102,0.08)",
            }}
            data-ocid="contact.whatsapp_button"
            aria-label="Chat on WhatsApp"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-elevated"
                style={{ backgroundColor: "#25D366" }}
              >
                {/* WhatsApp SVG icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 fill-white"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5">
                  Chat on WhatsApp
                </p>
                <p className="font-display font-bold text-xl text-foreground">
                  Send a Message
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  Quick reply within 1 hour
                </p>
              </div>
            </div>
            <div
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(37,211,102,0.2)" }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: "#25D366" }} />
            </div>
          </a>

          {/* Email with copy */}
          <Card className="border-border" data-ocid="contact.email_card">
            <CardContent className="p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5">
                    Support Email
                  </p>
                  <p className="font-display font-semibold text-foreground text-base truncate">
                    {EMAIL}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-xs font-body font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Copy email address"
                data-ocid="contact.copy_email_button"
              >
                {emailCopied ? (
                  <CheckCircle className="w-4 h-4 text-accent" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {emailCopied ? "Copied!" : "Copy"}
              </button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Support Hours ──────────────────────────────────────────────────── */}
      <section
        className="py-8 px-4 bg-muted/30 border-y border-border"
        data-ocid="contact.hours_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-accent" />
            <h2 className="font-display font-bold text-lg text-foreground">
              Support Hours
            </h2>
            <Badge variant="secondary" className="ml-auto text-xs font-body">
              Open Now
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                day: "Monday – Friday",
                time: "9:00 AM – 6:00 PM",
                active: true,
              },
              { day: "Saturday", time: "9:00 AM – 6:00 PM", active: true },
              { day: "Sunday", time: "Closed", active: false },
            ].map((h) => (
              <div
                key={h.day}
                className={`rounded-xl p-4 border ${h.active ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`}
              >
                <p className="text-xs font-body text-muted-foreground mb-1">
                  {h.day}
                </p>
                <p
                  className={`font-display font-bold text-sm ${h.active ? "text-accent" : "text-muted-foreground"}`}
                >
                  {h.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <section
        className="py-12 px-4 bg-background"
        data-ocid="contact.faq_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Common Questions
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base">
              Find quick answers to the questions we hear most often.
            </p>
          </div>

          <div className="space-y-3" data-ocid="contact.faq_list">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Banner ─────────────────────────────────────────────── */}
      <section
        className="py-10 px-4 gradient-primary"
        data-ocid="contact.cta_section"
      >
        <div className="max-w-2xl mx-auto text-center text-white">
          <p className="font-display font-bold text-xl sm:text-2xl mb-2">
            Still have a question?
          </p>
          <p className="font-body text-white/80 text-sm mb-6">
            Our support team speaks your language and understands your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent font-body font-bold text-sm hover:bg-white/90 transition-smooth shadow-elevated min-h-[52px]"
              data-ocid="contact.cta_call_button"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 border border-white/30 text-white font-body font-bold text-sm hover:bg-white/25 transition-smooth min-h-[52px]"
              data-ocid="contact.cta_whatsapp_button"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
