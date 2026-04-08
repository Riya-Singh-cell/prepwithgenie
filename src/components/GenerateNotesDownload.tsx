import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Brain,
  Cloud,
  FileText,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

interface ApiResponse {
  message: string;
  url: string;
}

// Pipeline steps shown during loading / after success
const PIPELINE_STEPS = [
  {
    id: "generate",
    icon: Brain,
    label: "Generating Notes",
    doneLabel: "Notes Generated",
    description: "AI is crafting your study notes",
  },
  {
    id: "upload",
    icon: Cloud,
    label: "Uploading to S3",
    doneLabel: "Saved to Cloud",
    description: "Notes saved to AWS S3 bucket",
  },
  {
    id: "ready",
    icon: FileText,
    label: "Preparing Link",
    doneLabel: "Ready to Download",
    description: "Secure S3 URL generated",
  },
];

// ─── Pipeline Step Indicator ──────────────────────────────────────────────────

interface StepProps {
  icon: React.ElementType;
  label: string;
  doneLabel: string;
  description: string;
  state: "pending" | "active" | "done";
  isLast: boolean;
}

const PipelineStep = ({
  icon: Icon,
  label,
  doneLabel,
  description,
  state,
  isLast,
}: StepProps) => {
  const isDone = state === "done";
  const isActive = state === "active";

  return (
    <div className="flex items-start gap-3 flex-1">
      <div className="flex flex-col items-center">
        {/* Circle */}
        <motion.div
          animate={{
            scale: isActive ? [1, 1.12, 1] : 1,
          }}
          transition={{ duration: 0.8, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            isDone
              ? "bg-green-100 dark:bg-green-900/40 border-2 border-green-400"
              : isActive
              ? "gradient-cta border-2 border-primary/30"
              : "bg-muted border-2 border-border"
          }`}
        >
          {isDone ? (
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
          ) : isActive ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Icon className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            className="w-0.5 mt-1 rounded-full"
            animate={{
              height: isDone ? 32 : 32,
              backgroundColor: isDone ? "#4ade80" : "#e2e8f0",
            }}
            transition={{ duration: 0.4 }}
          />
        )}
      </div>

      {/* Text */}
      <div className="pt-1 pb-4">
        <p
          className={`text-sm font-bold transition-colors duration-300 ${
            isDone
              ? "text-green-700 dark:text-green-400"
              : isActive
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          {isDone ? doneLabel : label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GenerateNotesDownload = () => {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [activeStep, setActiveStep] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Simulate step-by-step pipeline animation while waiting for real API
  const simulateSteps = async () => {
    setActiveStep(0);
    await new Promise((r) => setTimeout(r, 900));
    setActiveStep(1);
    await new Promise((r) => setTimeout(r, 900));
    setActiveStep(2);
  };

  const handleGenerate = async () => {
    const trimmedTopic = topic.trim();
    if (!trimmedTopic) return;

    setStatus("loading");
    setDownloadUrl(null);
    setErrorMessage("");
    setSuccessMessage("");
    setActiveStep(0);

    // Start step animation in parallel with real API call
    simulateSteps();

    try {
      const response = await fetch(
        `/api/generate-notes/?topic=${encodeURIComponent(trimmedTopic)}`,
        { method: "POST" }
      );

      if (!response.ok) {
        let errMsg = `Server error: ${response.status}`;
        try {
          const errData = await response.json();
          errMsg = errData.detail || errData.message || errMsg;
        } catch {
          errMsg = (await response.text()) || errMsg;
        }
        throw new Error(errMsg);
      }

      const data: ApiResponse = await response.json();

      // Ensure all steps appear done before showing success
      setActiveStep(2);
      await new Promise((r) => setTimeout(r, 400));

      setDownloadUrl(data.url);
      setSuccessMessage(data.message || "Notes generated and stored successfully!");
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(
        err.message || "Failed to generate notes. Make sure the backend is running at http://127.0.0.1:8000."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setDownloadUrl(null);
    setSuccessMessage("");
    setErrorMessage("");
    setActiveStep(0);
    setTopic("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGenerate();
  };

  // Derive step states for pipeline UI
  const getStepState = (index: number): "pending" | "active" | "done" => {
    if (status === "success") return "done";
    if (status === "loading") {
      if (index < activeStep) return "done";
      if (index === activeStep) return "active";
    }
    return "pending";
  };

  return (
    <div className="gradient-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="gradient-hero px-8 py-6 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-cta flex items-center justify-center shadow-soft flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold">Generate &amp; Download Notes</h2>
            <p className="text-sm text-muted-foreground">
              AI-powered notes · Stored on AWS S3 · Instant download
            </p>
          </div>
        </div>

        {/* Flow badge */}
        <div className="flex items-center gap-1.5 flex-wrap mt-4">
          {["Your Topic", "Groq LLM", "AWS S3", "Download Link"].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                {step}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div className="p-8 space-y-6">

        {/* Input + Button (hidden after success) */}
        <AnimatePresence>
          {status !== "success" && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                id="download-notes-topic-input"
                placeholder="Enter a topic, e.g. Photosynthesis, Quantum Mechanics…"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={status === "loading"}
                className="flex-1 h-11 text-sm"
              />
              <Button
                id="generate-notes-download-btn"
                onClick={handleGenerate}
                disabled={status === "loading" || !topic.trim()}
                size="lg"
                className="gradient-cta text-primary-foreground font-bold shadow-soft hover:shadow-glow transition-all whitespace-nowrap h-11"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Working…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Notes
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pipeline tracker (shown during loading & success) ── */}
        <AnimatePresence>
          {(status === "loading" || status === "success") && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-border/60 bg-background/60 px-6 py-5"
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                Pipeline Status
              </p>
              <div className="space-y-0">
                {PIPELINE_STEPS.map((step, i) => (
                  <PipelineStep
                    key={step.id}
                    icon={step.icon}
                    label={step.label}
                    doneLabel={step.doneLabel}
                    description={step.description}
                    state={getStepState(i)}
                    isLast={i === PIPELINE_STEPS.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Success result card ──────────────────────────────────────────── */}
        <AnimatePresence>
          {status === "success" && downloadUrl && (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-5 space-y-4"
            >
              {/* Success header */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-green-800 dark:text-green-300 text-sm">
                    {successMessage}
                  </p>
                  <p className="text-xs text-green-700/70 dark:text-green-500 mt-0.5">
                    Your notes for <span className="font-semibold">"{topic}"</span> are
                    saved on AWS S3 and ready to download.
                  </p>
                </div>
              </div>

              {/* S3 URL preview */}
              <div className="rounded-lg bg-white/60 dark:bg-black/20 border border-green-200/60 dark:border-green-800/60 px-4 py-2.5 flex items-center gap-2 overflow-hidden">
                <Cloud className="w-4 h-4 text-green-500 flex-shrink-0" />
                <p className="text-xs text-muted-foreground font-mono truncate flex-1">
                  {downloadUrl}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  id="download-notes-link"
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg gradient-cta text-white text-sm font-bold shadow-soft hover:shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  Download Notes
                </a>
                <button
                  id="generate-notes-reset-btn"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Error card ───────────────────────────────────────────────────── */}
        <AnimatePresence>
          {status === "error" && (
            <motion.div
              key="error-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-700 dark:text-red-400">
                  Generation Failed
                </p>
                <p className="text-sm text-red-600 dark:text-red-500 mt-0.5 leading-relaxed">
                  {errorMessage}
                </p>
                <button
                  onClick={handleGenerate}
                  className="mt-3 text-xs font-bold text-red-600 dark:text-red-400 underline underline-offset-2 hover:no-underline"
                >
                  Try again →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GenerateNotesDownload;
