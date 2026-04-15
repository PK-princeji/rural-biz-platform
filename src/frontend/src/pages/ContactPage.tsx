import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CreateContactLeadInput } from "../backend";
import { Layout } from "../components/Layout";
import { useBackend } from "../hooks/useBackend";

// ─── Constants ───────────────────────────────────────────────────────────────
const EMAIL = "udyamsathisoppoter@gmail.com";
const PHONE_DISPLAY = "+91 8579042891";
const PHONE_TEL = "tel:+918579042891";
const WA_NUMBER = "+91 8986378505";
const WA_LINK =
  "https://wa.me/918986378505?text=Hi%2C%20I%20need%20help%20with%20my%20rural%20business";
const ADDRESS =
  "DRCC Road, Kathal Bari, Barari, Bhagalpur, Bihar – 812003, India";
const COMPANY = "UdyamSathi";

// ─── FAQ Data ────────────────────────────────────────────────────────────────
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

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
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

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const backend = useBackend();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    location: "",
    problem: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    problem?: string;
  }>({});

  const validate = () => {
    const errs: { name?: string; phone?: string; problem?: string } = {};
    if (!form.name.trim()) errs.name = "Name is required / नाम आवश्यक है";
    if (!form.phone.trim()) errs.phone = "Phone is required / फोन आवश्यक है";
    if (!form.problem.trim())
      errs.problem = "Please describe your problem / समस्या बताएं";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const input: CreateContactLeadInput = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(),
        location: form.location.trim(),
        problem: form.problem.trim(),
        email: form.email.trim(),
      };
      await backend.submitContactLead(input);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-5 py-10 px-6 text-center"
        data-ocid="contact.form.success_state"
      >
        <div className="w-20 h-20 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display font-bold text-2xl text-foreground">
            Message Sent!
          </h3>
          <div className="rounded-xl bg-accent/10 border border-accent/25 px-6 py-4 max-w-sm mx-auto">
            <p className="font-body font-semibold text-accent text-base leading-snug">
              Thank you! Our team will contact you within 24 hours.
            </p>
            <p className="font-body text-muted-foreground text-sm mt-1">
              धन्यवाद! हमारी टीम 24 घंटे में संपर्क करेगी।
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="mt-1 font-body"
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              phone: "",
              whatsapp: "",
              location: "",
              problem: "",
              email: "",
            });
          }}
          data-ocid="contact.form.send_another_button"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6"
      data-ocid="contact.form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-name"
            className="font-body text-sm font-medium"
          >
            Name / नाम <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            autoComplete="name"
            data-ocid="contact.form.name_input"
            className={
              errors.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.name && (
            <p
              className="text-xs text-destructive font-body"
              data-ocid="contact.form.name.field_error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-phone"
            className="font-body text-sm font-medium"
          >
            Phone / फोन <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 XXXXXXXXXX"
            autoComplete="tel"
            data-ocid="contact.form.phone_input"
            className={
              errors.phone
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.phone && (
            <p
              className="text-xs text-destructive font-body"
              data-ocid="contact.form.phone.field_error"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-whatsapp"
            className="font-body text-sm font-medium"
          >
            WhatsApp (optional)
          </Label>
          <Input
            id="contact-whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+91 XXXXXXXXXX"
            data-ocid="contact.form.whatsapp_input"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <Label
            htmlFor="contact-location"
            className="font-body text-sm font-medium"
          >
            Location / स्थान
          </Label>
          <Input
            id="contact-location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Village, District, State"
            data-ocid="contact.form.location_input"
          />
        </div>
      </div>

      {/* Problem / Message */}
      <div className="space-y-1.5">
        <Label
          htmlFor="contact-problem"
          className="font-body text-sm font-medium"
        >
          Problem / Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="contact-problem"
          name="problem"
          value={form.problem}
          onChange={handleChange}
          placeholder="Describe your business problem or what help you need… / अपनी व्यापार समस्या बताएं…"
          rows={4}
          data-ocid="contact.form.problem_textarea"
          className={
            errors.problem
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
        />
        {errors.problem && (
          <p
            className="text-xs text-destructive font-body"
            data-ocid="contact.form.problem.field_error"
          >
            {errors.problem}
          </p>
        )}
      </div>

      {/* Email (optional) */}
      <div className="space-y-1.5">
        <Label
          htmlFor="contact-email"
          className="font-body text-sm font-medium"
        >
          Email (optional)
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          autoComplete="email"
          data-ocid="contact.form.email_input"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full min-h-[48px] font-body font-bold text-sm gap-2"
        data-ocid="contact.form.submit_button"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
            Sending… / भेज रहे हैं…
          </span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message / संदेश भेजें
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        setEmailCopied(true);
        toast.success("Email address copied!");
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
              {COMPANY} Support Team
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-3 text-balance">
            Contact &amp; Support
          </h1>
          <p className="text-white/85 font-body text-base sm:text-lg leading-relaxed">
            We are here to help your rural business succeed.
            <br className="hidden sm:block" />
            Call us, WhatsApp us, or fill the form below.
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
            aria-label={`Call us at ${PHONE_DISPLAY}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0 shadow-elevated">
                <Phone className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="text-left">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5">
                  Call Us Now / अभी कॉल करें
                </p>
                <p className="font-display font-bold text-xl text-foreground">
                  {PHONE_DISPLAY}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  Mon–Sat, 9:00 AM – 6:00 PM IST
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
            className="flex items-center justify-between gap-4 w-full rounded-2xl border-2 border-whatsapp bg-whatsapp-subtle px-6 py-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
            data-ocid="contact.whatsapp_button"
            aria-label="Chat on WhatsApp"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-whatsapp flex items-center justify-center shrink-0 shadow-elevated">
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
                  WhatsApp / व्हाट्सएप
                </p>
                <p className="font-display font-bold text-xl text-foreground">
                  {WA_NUMBER}
                </p>
                <p className="text-xs font-body text-muted-foreground mt-0.5">
                  Quick reply within 1 hour
                </p>
              </div>
            </div>
            <div className="shrink-0 w-10 h-10 rounded-full bg-whatsapp-ring flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-whatsapp" />
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
                    Email / ईमेल
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-display font-semibold text-primary text-sm sm:text-base truncate hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent block"
                    data-ocid="contact.email_link"
                  >
                    {EMAIL}
                  </a>
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

          {/* Address */}
          <Card className="border-border" data-ocid="contact.address_card">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-0.5">
                  Address / पता
                </p>
                <p className="font-body text-foreground text-sm leading-relaxed">
                  {ADDRESS}
                </p>
              </div>
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
              Working Hours / कार्य समय
            </h2>
            <Badge variant="secondary" className="ml-auto text-xs font-body">
              Open Now / अभी खुला
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                day: "Monday – Friday",
                time: "9:00 AM – 6:00 PM IST",
                active: true,
              },
              { day: "Saturday", time: "9:00 AM – 6:00 PM IST", active: true },
              { day: "Sunday", time: "Closed / बंद", active: false },
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

      {/* ── Contact Form ──────────────────────────────────────────────────── */}
      <section
        className="py-12 px-4 bg-background"
        data-ocid="contact.form_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-4">
              <Send className="w-4 h-4 text-accent" />
              <span className="text-sm font-body font-medium text-accent">
                Send a Message / संदेश भेजें
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Get in Touch
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base">
              Fill the form below and our team will contact you within 24 hours.
              <br />
              नीचे फॉर्म भरें, हमारी टीम 24 घंटे में संपर्क करेगी।
            </p>
          </div>

          <Card
            className="border-border shadow-elevated"
            data-ocid="contact.form_card"
          >
            <ContactForm />
          </Card>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <section
        className="py-12 px-4 bg-muted/30"
        data-ocid="contact.faq_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Common Questions / सामान्य प्रश्न
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
            Still have a question? / अभी भी कोई सवाल है?
          </p>
          <p className="font-body text-white/80 text-sm mb-6">
            Our support team is ready to help you start your rural business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-accent font-body font-bold text-sm hover:bg-white/90 transition-smooth shadow-elevated min-h-[52px]"
              data-ocid="contact.cta_call_button"
            >
              <Phone className="w-4 h-4" />
              Call Now / अभी कॉल करें
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
