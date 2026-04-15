import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Crown,
  Headphones,
  Shield,
  UserCheck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { CreatePremiumRequestInput } from "../backend.d";
import { useBackend } from "../hooks/useBackend";
import { useLanguage } from "../hooks/useLanguage";

// ─── Tier feature row ─────────────────────────────────────────────────────────

function FeatureRow({
  label,
  free,
  premium,
}: {
  label: string;
  free: boolean;
  premium: boolean;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-2.5 pr-3 text-xs font-body text-foreground">{label}</td>
      <td className="py-2.5 text-center">
        {free ? (
          <CheckCircle2 className="w-4 h-4 text-accent mx-auto" />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </td>
      <td className="py-2.5 text-center">
        {premium ? (
          <CheckCircle2 className="w-4 h-4 text-accent mx-auto" />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        )}
      </td>
    </tr>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface PremiumUpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PremiumUpgradeModal({
  open,
  onClose,
}: PremiumUpgradeModalProps) {
  const { t } = useLanguage();
  const backend = useBackend();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<CreatePremiumRequestInput>({
    name: "",
    mobile: "",
    email: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Partial<CreatePremiumRequestInput>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: (input: CreatePremiumRequestInput) =>
      backend.submitPremiumRequest(input),
    onSuccess: () => setSubmitted(true),
  });

  function validate() {
    const e: Partial<CreatePremiumRequestInput> = {};
    if (!form.name.trim()) e.name = t("Name is required", "नाम आवश्यक है");
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.trim()))
      e.mobile = t("Enter a valid 10-digit mobile", "10 अंकों का नंबर दें");
    if (!form.email.trim() || !form.email.includes("@"))
      e.email = t("Enter a valid email", "सही ईमेल दें");
    if (!form.reason.trim())
      e.reason = t("Please describe your needs", "अपनी जरूरत बताएं");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) mutate(form);
  }

  function handleClose() {
    setSubmitted(false);
    setForm({ name: "", mobile: "", email: "", reason: "" });
    setErrors({});
    onClose();
  }

  const FEATURES = [
    { label: t("Basic Support", "बेसिक सपोर्ट"), free: true, premium: true },
    {
      label: t("Expert Assignment", "विशेषज्ञ नियुक्ति"),
      free: false,
      premium: true,
    },
    {
      label: t("Priority Response", "प्राथमिकता प्रतिक्रिया"),
      free: false,
      premium: true,
    },
    { label: t("Faster Resolution", "तेज़ समाधान"), free: false, premium: true },
    {
      label: t("Standard Response Time", "सामान्य प्रतिक्रिया समय"),
      free: true,
      premium: false,
    },
    { label: t("Field Visits", "फील्ड विजिट"), free: false, premium: true },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        className="max-w-lg w-full max-h-[92dvh] overflow-y-auto p-0 gap-0 sm:rounded-2xl"
        data-ocid="premium.dialog"
      >
        {/* Header gradient banner */}
        <div className="gradient-primary px-6 pt-6 pb-5 rounded-t-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <DialogHeader className="p-0">
              <DialogTitle className="text-white font-display text-xl leading-tight">
                {t("Upgrade to Premium", "प्रीमियम अपग्रेड करें")}
              </DialogTitle>
            </DialogHeader>
          </div>
          <p className="text-white/80 text-sm font-body">
            {t(
              "Get priority support, expert assignment & faster response",
              "प्राथमिकता सपोर्ट, विशेषज्ञ और तेज़ प्रतिक्रिया पाएं",
            )}
          </p>
        </div>

        <div className="px-6 py-5 space-y-6">
          {submitted ? (
            /* ── Success state ── */
            <div
              className="flex flex-col items-center text-center py-6 space-y-4"
              data-ocid="premium.success_state"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground">
                  {t("Request Submitted!", "अनुरोध भेजा गया!")}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-1 max-w-xs">
                  {t(
                    "Our team will contact you within 24 hours",
                    "हमारी टीम 24 घंटे में संपर्क करेगी",
                  )}
                </p>
              </div>
              <Button
                onClick={handleClose}
                className="gradient-primary text-white border-0 font-body font-semibold"
                data-ocid="premium.close_button"
              >
                {t("Close", "बंद करें")}
              </Button>
            </div>
          ) : (
            <>
              {/* ── Tier comparison ── */}
              <div>
                <h3 className="text-sm font-display font-semibold text-foreground mb-3">
                  {t("Plan Comparison", "प्लान तुलना")}
                </h3>
                <div className="rounded-xl border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/40">
                        <th className="py-2.5 px-3 text-left text-xs font-display font-semibold text-muted-foreground">
                          {t("Feature", "सुविधा")}
                        </th>
                        <th className="py-2.5 text-center text-xs font-display font-semibold text-muted-foreground w-20">
                          <div className="flex items-center justify-center gap-1">
                            <Shield className="w-3.5 h-3.5" />
                            {t("Free", "मुफ्त")}
                          </div>
                        </th>
                        <th className="py-2.5 text-center text-xs font-display font-semibold text-accent w-24">
                          <div className="flex items-center justify-center gap-1">
                            <Crown className="w-3.5 h-3.5" />
                            {t("Premium", "प्रीमियम")}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card px-3">
                      {FEATURES.map((f) => (
                        <FeatureRow key={f.label} {...f} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <Headphones className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground font-body">
                    {t(
                      "No payment required — our team will personally contact you to discuss the best plan.",
                      "कोई भुगतान नहीं — हमारी टीम आपसे संपर्क कर सबसे अच्छा प्लान तय करेगी।",
                    )}
                  </p>
                </div>
              </div>

              {/* ── Contact form ── */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="text-sm font-display font-semibold text-foreground flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  {t("Contact Us to Upgrade", "अपग्रेड के लिए संपर्क करें")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pm-name"
                      className="text-xs font-body font-medium"
                    >
                      {t("Full Name", "पूरा नाम")} *
                    </Label>
                    <Input
                      id="pm-name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder={t("Your name", "आपका नाम")}
                      className="font-body text-sm"
                      data-ocid="premium.name_input"
                    />
                    {errors.name && (
                      <p
                        className="text-xs text-destructive font-body"
                        data-ocid="premium.name.field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="pm-mobile"
                      className="text-xs font-body font-medium"
                    >
                      {t("Mobile Number", "मोबाइल नंबर")} *
                    </Label>
                    <Input
                      id="pm-mobile"
                      type="tel"
                      inputMode="numeric"
                      value={form.mobile}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, mobile: e.target.value }))
                      }
                      placeholder="9876543210"
                      className="font-body text-sm"
                      data-ocid="premium.mobile_input"
                    />
                    {errors.mobile && (
                      <p
                        className="text-xs text-destructive font-body"
                        data-ocid="premium.mobile.field_error"
                      >
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pm-email"
                    className="text-xs font-body font-medium"
                  >
                    {t("Email Address", "ईमेल पता")} *
                  </Label>
                  <Input
                    id="pm-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="name@example.com"
                    className="font-body text-sm"
                    data-ocid="premium.email_input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs text-destructive font-body"
                      data-ocid="premium.email.field_error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Reason */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pm-reason"
                    className="text-xs font-body font-medium"
                  >
                    {t("Business Needs / Reason", "व्यापार की जरूरत / कारण")} *
                  </Label>
                  <Textarea
                    id="pm-reason"
                    rows={3}
                    value={form.reason}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, reason: e.target.value }))
                    }
                    placeholder={t(
                      "Describe your farming/business needs and why you need priority support…",
                      "अपनी खेती/व्यापार की जरूरत बताएं और क्यों आपको प्राथमिकता सपोर्ट चाहिए…",
                    )}
                    className="font-body text-sm resize-none"
                    data-ocid="premium.reason_textarea"
                  />
                  {errors.reason && (
                    <p
                      className="text-xs text-destructive font-body"
                      data-ocid="premium.reason.field_error"
                    >
                      {errors.reason}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 font-body"
                    data-ocid="premium.cancel_button"
                  >
                    {t("Cancel", "रद्द करें")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 gradient-primary text-white border-0 font-body font-semibold"
                    data-ocid="premium.submit_button"
                  >
                    <Zap className="w-4 h-4 mr-1.5" />
                    {isPending
                      ? t("Submitting…", "भेज रहे हैं…")
                      : t("Request Upgrade", "अपग्रेड अनुरोध करें")}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Premium status badge ─────────────────────────────────────────────────────

export function PremiumBadge() {
  const { t } = useLanguage();
  return (
    <Badge
      className="font-body text-xs border border-accent/30 bg-accent/10 text-accent-foreground flex items-center gap-1 px-2.5 py-1"
      data-ocid="dashboard.premium_status_badge"
    >
      <Crown className="w-3 h-3" />
      {t("Request Submitted", "अनुरोध भेजा गया")}
    </Badge>
  );
}
