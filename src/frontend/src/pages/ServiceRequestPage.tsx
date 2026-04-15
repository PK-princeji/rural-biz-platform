import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  ImageIcon,
  LayoutDashboard,
  Loader2,
  RotateCcw,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type ChangeEvent,
  type DragEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { BusinessType, ExternalBlob } from "../backend";
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useBackend } from "../hooks/useBackend";

// ─── Constants ───────────────────────────────────────────────────────────────

const BUSINESS_TYPES: {
  value: BusinessType;
  label: string;
  icon: string;
  desc: string;
}[] = [
  {
    value: BusinessType.agriculture,
    label: "Agriculture",
    icon: "🌾",
    desc: "Crops, wheat, rice, vegetables",
  },
  {
    value: BusinessType.fishery,
    label: "Fishery",
    icon: "🐟",
    desc: "Fish farming, ponds, aquaculture",
  },
  {
    value: BusinessType.poultry,
    label: "Poultry",
    icon: "🐔",
    desc: "Hens, eggs, broiler farming",
  },
  {
    value: BusinessType.goatFarming,
    label: "Goat Farming",
    icon: "🐐",
    desc: "Goat breeds, health, milk, meat",
  },
];

const MIN_DESCRIPTION = 20;
const MAX_DESCRIPTION = 800;

const STEPS = [
  { id: 1, label: "Business Type", icon: ClipboardList },
  { id: 2, label: "Photo", icon: Camera },
  { id: 3, label: "Review", icon: Eye },
];

// ─── Step Progress Bar ────────────────────────────────────────────────────────

function StepBar({ currentStep }: { currentStep: number }) {
  return (
    <div
      className="flex items-center justify-center gap-0 mb-8"
      data-ocid="request.step_bar"
    >
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-smooth ${
                  isCompleted
                    ? "border-accent bg-accent text-accent-foreground"
                    : isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`text-xs font-body font-medium hidden sm:block ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-accent"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-1 mb-5 transition-smooth ${
                  currentStep > step.id ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

interface Step1Props {
  businessType: BusinessType;
  description: string;
  onBusinessType: (v: BusinessType) => void;
  onDescription: (v: string) => void;
  onNext: () => void;
}

function Step1({
  businessType,
  description,
  onBusinessType,
  onDescription,
  onNext,
}: Step1Props) {
  const descLen = description.trim().length;
  const tooShort = descLen > 0 && descLen < MIN_DESCRIPTION;
  const canProceed = businessType !== null && descLen >= MIN_DESCRIPTION;

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="space-y-6">
        {/* Business Type Grid */}
        <div className="space-y-3">
          <Label className="text-sm font-body font-semibold text-foreground">
            Select Your Business Type{" "}
            <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {BUSINESS_TYPES.map((bt) => {
              const active = businessType === bt.value;
              return (
                <button
                  key={bt.value}
                  type="button"
                  onClick={() => onBusinessType(bt.value)}
                  data-ocid={`request.business_type_${bt.value}_button`}
                  className={`p-4 rounded-xl border-2 text-left flex flex-col gap-2 transition-smooth min-h-[80px] touch-manipulation ${
                    active
                      ? "border-accent bg-accent/10 shadow-elevated"
                      : "border-border bg-card hover:border-accent/40 hover:bg-accent/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{bt.icon}</span>
                    {active && (
                      <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-body font-semibold ${active ? "text-accent" : "text-foreground"}`}
                    >
                      {bt.label}
                    </p>
                    <p className="text-xs text-muted-foreground font-body leading-tight mt-0.5">
                      {bt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="description"
              className="text-sm font-body font-semibold text-foreground"
            >
              Describe Your Problem or Need{" "}
              <span className="text-destructive">*</span>
            </Label>
            <span
              className={`text-xs font-mono tabular-nums ${
                descLen >= MIN_DESCRIPTION
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {descLen}/{MAX_DESCRIPTION}
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="e.g. My wheat crop has developed yellow spots on the leaves over the last 3 days. Around 30% of the field is affected. I need help identifying the disease and the correct pesticide treatment."
            value={description}
            onChange={(e) =>
              onDescription(e.target.value.slice(0, MAX_DESCRIPTION))
            }
            rows={5}
            className={`font-body resize-none text-base transition-smooth ${
              tooShort
                ? "border-destructive focus-visible:ring-destructive/50"
                : ""
            }`}
            data-ocid="request.description_textarea"
          />
          {tooShort && (
            <p
              className="text-xs text-destructive font-body"
              data-ocid="request.description_field_error"
            >
              Please write at least {MIN_DESCRIPTION} characters (
              {MIN_DESCRIPTION - descLen} more needed).
            </p>
          )}
          {!tooShort && descLen === 0 && (
            <p className="text-xs text-muted-foreground font-body">
              Be as specific as possible — more detail leads to faster, better
              support.
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="w-full h-12 font-body font-semibold text-base gradient-primary text-white border-0 hover:opacity-90 transition-smooth"
          data-ocid="request.step1_next_button"
        >
          Continue to Photo Upload
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

interface Step2Props {
  photoFile: File | null;
  onPhotoFile: (f: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

function Step2({ photoFile, onPhotoFile, onNext, onBack }: Step2Props) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        onPhotoFile(file);
      } else if (file) {
        toast.error("Please upload an image file (JPG, PNG, etc.)");
      }
    },
    [onPhotoFile],
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file?.type.startsWith("image/")) {
      onPhotoFile(file);
    } else if (file) {
      toast.error("Please select an image file.");
    }
  };

  const previewUrl = photoFile ? URL.createObjectURL(photoFile) : null;

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="text-sm font-body font-semibold text-foreground">
            Upload a Photo{" "}
            <span className="text-muted-foreground font-normal">
              (Optional)
            </span>
          </Label>
          <p className="text-sm text-muted-foreground font-body">
            A clear photo of your crop, animal, or problem helps experts
            diagnose faster.
          </p>
        </div>

        {/* Drop Zone */}
        {!photoFile ? (
          <button
            type="button"
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
            data-ocid="request.photo_dropzone"
            className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth min-h-[200px] touch-manipulation ${
              dragging
                ? "border-accent bg-accent/10 scale-[1.01]"
                : "border-border bg-muted/30 hover:border-accent/50 hover:bg-accent/5"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-smooth ${dragging ? "bg-accent/20" : "bg-muted"}`}
            >
              <Upload
                className={`w-6 h-6 transition-smooth ${dragging ? "text-accent" : "text-muted-foreground"}`}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-body font-semibold text-foreground">
                {dragging ? "Release to upload" : "Drag & drop your photo here"}
              </p>
              <p className="text-xs text-muted-foreground font-body mt-1">
                or tap to browse your device
              </p>
              <p className="text-xs text-muted-foreground font-body mt-2">
                JPG, PNG, WEBP — max 10MB
              </p>
            </div>
          </button>
        ) : (
          <div
            className="relative rounded-xl overflow-hidden border-2 border-accent/40 bg-card"
            data-ocid="request.photo_preview"
          >
            <img
              src={previewUrl ?? ""}
              alt="Crop or field condition"
              className="w-full max-h-64 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                onPhotoFile(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              data-ocid="request.photo_remove_button"
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90 transition-smooth shadow-elevated"
              aria-label="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-foreground/60 px-3 py-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-background shrink-0" />
              <p className="text-xs text-background font-body truncate">
                {photoFile.name}
              </p>
              <Badge variant="secondary" className="ml-auto shrink-0 text-xs">
                {(photoFile.size / 1024).toFixed(0)} KB
              </Badge>
            </div>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={handleFileChange}
          data-ocid="request.photo_upload_button"
          aria-label="Upload photo"
        />

        {/* Camera shortcut on mobile */}
        {!photoFile && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            data-ocid="request.camera_button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-sm font-body font-medium text-muted-foreground hover:border-accent/40 hover:text-foreground transition-smooth touch-manipulation"
          >
            <Camera className="w-4 h-4" />
            Take Photo with Camera
          </button>
        )}

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12 font-body border-border"
            data-ocid="request.step2_back_button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            className="flex-[2] h-12 font-body font-semibold gradient-primary text-white border-0 hover:opacity-90 transition-smooth"
            data-ocid="request.step2_next_button"
          >
            Review Request
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

interface Step3Props {
  businessType: BusinessType;
  description: string;
  photoFile: File | null;
  loading: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

function Step3({
  businessType,
  description,
  photoFile,
  loading,
  onSubmit,
  onBack,
}: Step3Props) {
  const btInfo = BUSINESS_TYPES.find((b) => b.value === businessType);
  const previewUrl = photoFile ? URL.createObjectURL(photoFile) : null;

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="space-y-5">
        <div className="space-y-1">
          <h3 className="text-base font-display font-bold text-foreground">
            Review Your Request
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            Please confirm the details below before submitting.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-muted/30 divide-y divide-border overflow-hidden">
          {/* Business Type */}
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">{btInfo?.icon}</span>
            <div>
              <p className="text-xs font-body text-muted-foreground">
                Business Type
              </p>
              <p className="text-sm font-body font-semibold text-foreground">
                {btInfo?.label}
              </p>
            </div>
            <Badge
              variant="outline"
              className="ml-auto text-accent border-accent/30 font-body text-xs"
            >
              Selected
            </Badge>
          </div>

          {/* Description */}
          <div className="px-4 py-3">
            <p className="text-xs font-body text-muted-foreground mb-1">
              Your Description
            </p>
            <p className="text-sm font-body text-foreground leading-relaxed line-clamp-4">
              {description}
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              {description.length} characters
            </p>
          </div>

          {/* Photo */}
          <div className="px-4 py-3 flex items-center gap-3">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Attached"
                  className="w-12 h-12 rounded-lg object-cover border border-border"
                />
                <div>
                  <p className="text-xs font-body text-muted-foreground">
                    Photo Attached
                  </p>
                  <p className="text-sm font-body text-foreground truncate max-w-[180px]">
                    {photoFile?.name}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-accent ml-auto shrink-0" />
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-lg border border-dashed border-border bg-muted flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-body text-muted-foreground">
                    Photo
                  </p>
                  <p className="text-sm font-body text-muted-foreground italic">
                    Not attached (optional)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
          <p className="text-xs text-primary font-body leading-relaxed">
            <strong>What happens next?</strong> After submission you'll receive
            a unique Case ID. An expert from our team will be assigned within 24
            hours and will contact you directly.
          </p>
        </div>

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={loading}
            className="flex-1 h-12 font-body border-border"
            data-ocid="request.step3_back_button"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="flex-[2] h-12 font-body font-semibold bg-accent hover:bg-accent/90 text-accent-foreground border-0 transition-smooth"
            data-ocid="request.submit_button"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Submit Request
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

interface SuccessProps {
  caseId: bigint;
  onSubmitAnother: () => void;
}

function SuccessState({ caseId, onSubmitAnother }: SuccessProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, type: "spring", bounce: 0.2 }}
      className="text-center py-4"
      data-ocid="request.success_state"
    >
      {/* Checkmark */}
      <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-10 h-10 text-accent" />
      </div>

      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
        Request Submitted!
      </h2>
      <p className="text-sm text-muted-foreground font-body max-w-xs mx-auto mb-7 leading-relaxed">
        Your service request has been received. An expert will be assigned
        within 24 hours and will contact you directly.
      </p>

      {/* Case ID Card */}
      <div
        className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-5 mb-7 max-w-xs mx-auto"
        data-ocid="request.case_id_card"
      >
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-2">
          Your Case ID
        </p>
        <p className="text-3xl font-mono font-bold text-accent tracking-widest">
          #{caseId.toString()}
        </p>
        <p className="text-xs text-muted-foreground font-body mt-2 leading-relaxed">
          Save this number to track your case status on the dashboard.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
        <Button
          type="button"
          onClick={() => void navigate({ to: "/dashboard" })}
          className="flex-1 h-12 gradient-primary text-white border-0 font-body font-semibold hover:opacity-90 transition-smooth"
          data-ocid="request.view_dashboard_button"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          View Dashboard
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onSubmitAnother}
          className="flex-1 h-12 font-body border-border"
          data-ocid="request.submit_another_button"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function ServiceRequestContent() {
  const backend = useBackend();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState<BusinessType>(
    BusinessType.agriculture,
  );
  const [description, setDescription] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState<bigint | null>(null);

  const resetForm = () => {
    setStep(1);
    setBusinessType(BusinessType.agriculture);
    setDescription("");
    setPhotoFile(null);
    setCaseId(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let photoUrl: string | undefined;
      if (photoFile) {
        try {
          const bytes = new Uint8Array(await photoFile.arrayBuffer());
          const blob = ExternalBlob.fromBytes(bytes);
          await blob.getBytes(); // ensure bytes are loaded
          photoUrl = blob.getDirectURL();
        } catch {
          toast.error("Photo upload failed. Submitting without photo.");
        }
      }
      const result = await backend.submitCase({
        businessType,
        description,
        photoUrl,
      });
      setCaseId(result.id);
      toast.success("Request submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (caseId !== null) {
    return <SuccessState caseId={caseId} onSubmitAnother={resetForm} />;
  }

  return (
    <div>
      <StepBar currentStep={step} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1
            key="step1"
            businessType={businessType}
            description={description}
            onBusinessType={setBusinessType}
            onDescription={setDescription}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2
            key="step2"
            photoFile={photoFile}
            onPhotoFile={setPhotoFile}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <Step3
            key="step3"
            businessType={businessType}
            description={description}
            photoFile={photoFile}
            loading={loading}
            onSubmit={() => void handleSubmit()}
            onBack={() => setStep(2)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceRequestPage() {
  return (
    <Layout>
      <ProtectedRoute>
        <div className="min-h-[calc(100vh-4rem)] bg-muted/20 py-8 px-4">
          <div className="max-w-lg mx-auto">
            {/* Header */}
            <div className="mb-6 text-center" data-ocid="request.page">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Submit a Service Request
              </h1>
              <p className="text-sm text-muted-foreground font-body mt-2 max-w-sm mx-auto">
                Tell us about your business problem and our expert team will
                guide you to success.
              </p>
            </div>

            <Card className="border-border shadow-elevated">
              <CardContent className="p-5 sm:p-7">
                <ServiceRequestContent />
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
