import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Copy,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Specialization as BackendBusinessType } from "../backend.d";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import type { BusinessType } from "../types";

interface UserProfileFormState {
  name: string;
  mobile: string;
  whatsapp: string;
  location: string;
  businessType: BusinessType | undefined;
}

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: "Farming", label: "🌾 Farming" },
  { value: "Fishery", label: "🐟 Fishery" },
  { value: "Poultry", label: "🐔 Poultry" },
  { value: "GoatFarming", label: "🐐 Goat Farming" },
];

const BUSINESS_TYPE_MAP: Record<BusinessType, BackendBusinessType> = {
  Farming: BackendBusinessType.agriculture,
  Fishery: BackendBusinessType.fishery,
  Poultry: BackendBusinessType.poultry,
  GoatFarming: BackendBusinessType.goatFarming,
};

function ProfileContent() {
  const { principal } = useAuth();
  const backend = useBackend();

  const [form, setForm] = useState<UserProfileFormState>({
    name: "",
    mobile: "",
    whatsapp: "",
    location: "",
    businessType: undefined,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof UserProfileFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    setSaving(true);
    try {
      await backend.saveCallerUserProfile({
        name: form.name.trim(),
        mobile: form.mobile ?? "",
        whatsapp: form.whatsapp ?? "",
        location: form.location ?? "",
        businessType: form.businessType
          ? BUSINESS_TYPE_MAP[form.businessType]
          : BackendBusinessType.agriculture,
      });
      setSaved(true);
      toast.success("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const copyPrincipal = () => {
    if (principal) {
      void navigator.clipboard.writeText(principal);
      toast.success("Principal copied to clipboard!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Keep your information up to date to receive better support from our
          experts.
        </p>
      </div>

      {/* Principal ID */}
      <Card className="mb-6 border-border" data-ocid="profile.principal_card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-body">
                  Your Identity (Principal)
                </p>
                <p className="text-xs font-mono text-foreground truncate max-w-[220px] sm:max-w-none">
                  {principal ?? "—"}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyPrincipal}
              className="shrink-0"
              data-ocid="profile.copy_principal_button"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Badge variant="secondary" className="mt-2 text-xs font-body">
            Verified via Internet Identity
          </Badge>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card
        className="border-border shadow-subtle"
        data-ocid="profile.form_card"
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-display">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-body font-medium flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-muted-foreground" />
              Full Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="font-body"
              data-ocid="profile.name_input"
            />
          </div>

          {/* Mobile */}
          <div className="space-y-1.5">
            <Label
              htmlFor="mobile"
              className="text-sm font-body font-medium flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
              Mobile Number / मोबाइल नंबर
            </Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.mobile ?? ""}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="font-body"
              data-ocid="profile.mobile_input"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <Label
              htmlFor="whatsapp"
              className="text-sm font-body font-medium flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
              WhatsApp Number / व्हाट्सएप नंबर
              <span className="text-xs text-muted-foreground font-normal ml-1">
                (Optional)
              </span>
            </Label>
            <div className="relative">
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+91 89863 78505"
                value={form.whatsapp ?? ""}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="font-body pl-10"
                data-ocid="profile.whatsapp_input"
              />
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                aria-hidden="true"
              >
                💬
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              Our experts will contact you on WhatsApp for faster support.
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label
              htmlFor="location"
              className="text-sm font-body font-medium flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              Village / Location
            </Label>
            <Input
              id="location"
              placeholder="e.g. Rampur Village, UP"
              value={form.location ?? ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="font-body"
              data-ocid="profile.location_input"
            />
          </div>

          {/* Business Type */}
          <div className="space-y-1.5">
            <Label className="text-sm font-body font-medium flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              Primary Business
            </Label>
            <Select
              value={form.businessType}
              onValueChange={(v) =>
                handleChange("businessType", v as BusinessType)
              }
            >
              <SelectTrigger
                className="font-body"
                data-ocid="profile.business_type_select"
              >
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPES.map((bt) => (
                  <SelectItem
                    key={bt.value}
                    value={bt.value}
                    className="font-body"
                  >
                    {bt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <Button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="w-full gradient-primary text-white border-0 font-body font-semibold h-11 hover:opacity-90 transition-smooth"
              data-ocid="profile.save_button"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </span>
              ) : saved ? (
                "✓ Saved"
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Layout>
      <ProtectedRoute>
        <ProfileContent />
      </ProtectedRoute>
    </Layout>
  );
}
