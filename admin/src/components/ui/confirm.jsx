import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, HelpCircle, LogOut } from "lucide-react";

/*
 * Promise-based confirmation dialog for destructive or important actions.
 *   if (!(await confirmDialog({ title: "Delete job?", description: "…", confirmText: "Delete", tone: "danger" }))) return;
 */

let current = null;
const queue = [];
const listeners = new Set();
const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const getSnapshot = () => current;

function next() {
  current = queue.shift() || null;
  emit();
}

export function confirmDialog(options = {}) {
  return new Promise((resolve) => {
    queue.push({
      title: options.title || "Are you sure?",
      description: options.description || "",
      confirmText: options.confirmText || "Confirm",
      cancelText: options.cancelText || "Cancel",
      tone: options.tone || "danger",
      icon: options.icon,
      resolve,
    });
    if (!current) next();
  });
}

function settle(value) {
  if (!current) return;
  current.resolve(value);
  next();
}

const TONES = {
  danger: { icon: AlertTriangle, tint: "bg-rose-500/[0.12] text-rose-600", button: "btn-danger" },
  primary: { icon: HelpCircle, tint: "bg-violet-500/[0.12] text-violet-600", button: "btn-primary" },
  logout: { icon: LogOut, tint: "bg-violet-500/[0.12] text-violet-600", button: "btn-primary" },
};

export function ConfirmHost() {
  const dialog = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);
  const tone = dialog ? TONES[dialog.tone] || TONES.danger : null;
  const Icon = dialog?.icon || tone?.icon;

  useEffect(() => {
    if (!dialog) return undefined;
    const previous = document.activeElement;
    // Destructive dialogs focus Cancel first so a stray Enter never deletes anything.
    const focusTarget = dialog.tone === "danger" ? cancelRef.current : confirmRef.current;
    requestAnimationFrame(() => focusTarget?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        settle(false);
      } else if (event.key === "Tab") {
        const buttons = [cancelRef.current, confirmRef.current].filter(Boolean);
        const index = buttons.indexOf(document.activeElement);
        event.preventDefault();
        buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      if (previous instanceof HTMLElement) previous.focus?.();
    };
  }, [dialog]);

  return createPortal(
    <AnimatePresence>
      {dialog && (
        <motion.div
          key="confirm"
          className="fixed inset-0 z-[180] flex items-end justify-center bg-[#1b0b33]/35 p-3 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, pointerEvents: "auto" }}
          // A closing dialog must never swallow the user's next click.
          exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 0.15 } }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) settle(false);
          }}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby={dialog.description ? "confirm-description" : undefined}
            className="w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-6 shadow-glass-lg backdrop-blur-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98, pointerEvents: "none", transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <div className="flex items-start gap-4">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.tint}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="confirm-title" className="text-lg font-bold tracking-tight text-ink">{dialog.title}</h2>
                {dialog.description && (
                  <p id="confirm-description" className="mt-1 text-sm leading-relaxed text-ink-muted">{dialog.description}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button ref={cancelRef} type="button" className="btn-secondary" onClick={() => settle(false)}>
                {dialog.cancelText}
              </button>
              <button ref={confirmRef} type="button" className={tone.button} onClick={() => settle(true)} data-confirm>
                {dialog.confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
