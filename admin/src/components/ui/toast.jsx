import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info, Loader2, X, XCircle } from "lucide-react";

/*
 * One toast system for the whole admin app.
 *   toast.success("Saved")                      → id
 *   toast.error("Failed", { description })      → id
 *   const id = toast.loading("Generating…"); toast.update(id, { type: "success", message: "Done" })
 *   toast.promise(promise, { loading, success, error })
 * Identical messages shown within a few seconds are merged instead of stacking.
 */

const DEFAULT_DURATION = { success: 3800, info: 4200, warning: 5200, error: 6500, loading: 0 };
const DEDUPE_WINDOW_MS = 4000;
const MAX_VISIBLE = 4;

let toasts = [];
let counter = 0;
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => toasts;

function text(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (value instanceof Error) return value.message;
  return String(value);
}

function add(type, message, options = {}) {
  const content = text(message);
  const now = Date.now();
  if (!options.id) {
    const duplicate = toasts.find(
      (item) => item.type === type && item.message === content && now - item.createdAt < DEDUPE_WINDOW_MS,
    );
    if (duplicate) {
      update(duplicate.id, { repeat: (duplicate.repeat || 1) + 1, createdAt: now });
      return duplicate.id;
    }
  } else if (toasts.some((item) => item.id === options.id)) {
    update(options.id, { type, message: content, ...options });
    return options.id;
  }
  counter += 1;
  const id = options.id || `t${counter}`;
  const item = {
    id,
    type,
    message: content,
    description: options.description ? text(options.description) : "",
    action: options.action,
    progress: options.progress,
    duration: options.duration ?? DEFAULT_DURATION[type] ?? 4000,
    createdAt: now,
    repeat: 1,
  };
  toasts = [...toasts, item].slice(-MAX_VISIBLE - 2);
  emit();
  return id;
}

function update(id, patch) {
  let found = false;
  toasts = toasts.map((item) => {
    if (item.id !== id) return item;
    found = true;
    const next = { ...item, ...patch };
    if (patch.message !== undefined) next.message = text(patch.message);
    if (patch.description !== undefined) next.description = text(patch.description);
    // A loading toast that settles gets the normal duration for its new type.
    if (patch.type && patch.duration === undefined && item.type === "loading" && patch.type !== "loading") {
      next.duration = DEFAULT_DURATION[patch.type];
      next.createdAt = Date.now();
    }
    return next;
  });
  if (found) emit();
  return found;
}

function dismiss(id) {
  const before = toasts.length;
  toasts = id ? toasts.filter((item) => item.id !== id) : [];
  if (toasts.length !== before) emit();
}

export const toast = {
  success: (message, options) => add("success", message, options),
  error: (message, options) => add("error", message, options),
  info: (message, options) => add("info", message, options),
  warning: (message, options) => add("warning", message, options),
  loading: (message, options) => add("loading", message, { duration: 0, ...options }),
  update,
  dismiss,
  async promise(promise, { loading, success, error }) {
    const id = add("loading", loading, { duration: 0 });
    try {
      const result = await promise;
      update(id, { type: "success", message: typeof success === "function" ? success(result) : success });
      return result;
    } catch (err) {
      update(id, { type: "error", message: typeof error === "function" ? error(err) : error || text(err) });
      throw err;
    }
  },
};

/** Drop-in replacement for antd's `message` API used by the existing pages. */
export const message = {
  success: (content) => toast.success(content),
  error: (content) => toast.error(content),
  warning: (content) => toast.warning(content),
  warn: (content) => toast.warning(content),
  info: (content) => toast.info(content),
  loading: (content) => toast.loading(content),
};

const STYLES = {
  success: { icon: CheckCircle2, tint: "text-emerald-600", ring: "bg-emerald-500/[0.12]", bar: "bg-emerald-500" },
  error: { icon: XCircle, tint: "text-rose-600", ring: "bg-rose-500/[0.12]", bar: "bg-rose-500" },
  warning: { icon: AlertTriangle, tint: "text-amber-600", ring: "bg-amber-500/[0.14]", bar: "bg-amber-500" },
  info: { icon: Info, tint: "text-sky-600", ring: "bg-sky-500/[0.12]", bar: "bg-sky-500" },
  loading: { icon: Loader2, tint: "text-violet-600", ring: "bg-violet-500/[0.12]", bar: "bg-violet-500", spin: true },
};

function ToastItem({ item }) {
  const style = STYLES[item.type] || STYLES.info;
  const Icon = style.icon;
  const timer = useRef(null);
  const paused = useRef(false);

  useEffect(() => {
    if (!item.duration) return undefined;
    const remaining = Math.max(0, item.createdAt + item.duration - Date.now());
    const tick = () => {
      if (paused.current) {
        timer.current = setTimeout(tick, 400);
        return;
      }
      dismiss(item.id);
    };
    timer.current = setTimeout(tick, remaining);
    return () => clearTimeout(timer.current);
  }, [item.id, item.duration, item.createdAt]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.97, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      role={item.type === "error" ? "alert" : "status"}
      aria-live={item.type === "error" ? "assertive" : "polite"}
      data-toast={item.type}
      className="pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-white/80 bg-white/90 p-3.5 pr-10 shadow-glass-lg backdrop-blur-2xl sm:w-[380px]"
    >
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${style.ring} ${style.tint}`}>
          <Icon size={17} className={style.spin ? "animate-spin" : undefined} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-ink">
            {item.message}
            {item.repeat > 1 && <span className="badge-neutral ml-2 align-middle">×{item.repeat}</span>}
          </p>
          {item.description && <p className="mt-0.5 text-[13px] leading-snug text-ink-muted">{item.description}</p>}
          {typeof item.progress === "number" && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-violet-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c084fc] transition-[width] duration-300"
                style={{ width: `${Math.round(Math.min(1, Math.max(0, item.progress)) * 100)}%` }}
              />
            </div>
          )}
          {item.action && (
            <button
              type="button"
              onClick={() => {
                item.action.onClick?.();
                dismiss(item.id);
              }}
              className="mt-2 rounded-lg bg-[#7c3aed]/10 px-2.5 py-1 text-xs font-semibold text-[#6d28d9] transition hover:bg-[#7c3aed]/15"
            >
              {item.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => dismiss(item.id)}
        className="absolute right-2.5 top-2.5 rounded-lg p-1 text-ink-faint transition hover:bg-black/5 hover:text-ink"
        aria-label="Dismiss notification"
      >
        <X size={15} />
      </button>
      {item.duration > 0 && (
        <span
          aria-hidden="true"
          className={`absolute bottom-0 left-0 h-[3px] ${style.bar} opacity-40`}
          style={{ animation: `toast-life ${item.duration}ms linear forwards` }}
          key={item.createdAt}
        />
      )}
    </motion.div>
  );
}

export function Toaster() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const visible = items.slice(-MAX_VISIBLE);
  return createPortal(
    <div
      className="toaster pointer-events-none fixed inset-x-3 bottom-3 z-[200] flex flex-col items-stretch gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:items-end"
      aria-label="Notifications"
    >
      <style>{"@keyframes toast-life{from{width:100%}to{width:0%}}"}</style>
      <AnimatePresence initial={false}>
        {visible.map((item) => (
          <ToastItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
