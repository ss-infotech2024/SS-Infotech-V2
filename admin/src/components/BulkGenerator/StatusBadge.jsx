import { FiAlertCircle, FiCheckCircle, FiClock, FiLoader } from "react-icons/fi";

const STYLES = {
  queued: { icon: FiClock, label: "Queued", className: "bg-gray-100/90 text-gray-600" },
  working: { icon: FiLoader, label: "Generating", className: "bg-purple-100/90 text-purple-700", spin: true },
  done: { icon: FiCheckCircle, label: "Ready", className: "bg-emerald-100/90 text-emerald-700" },
  error: { icon: FiAlertCircle, label: "Failed", className: "bg-red-100/90 text-red-700" },
};

/** Per-certificate generation status. Renders nothing when the certificate has not been generated. */
export default function StatusBadge({ status, compact = false }) {
  const style = status && STYLES[status.state];
  if (!style) return null;
  const Icon = style.icon;
  const title = status.state === "error"
    ? status.error || "Failed"
    : status.state === "done"
      ? `Generated as ${status.format === "word" ? "Word" : "PDF"}`
      : style.label;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-sm backdrop-blur ${style.className}`}
      title={title}
      data-status={status.state}
    >
      <Icon className={style.spin ? "animate-spin" : undefined} aria-hidden="true" />
      {compact ? <span className="sr-only">{style.label}</span> : style.label}
    </span>
  );
}
