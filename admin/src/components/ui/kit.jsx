import { forwardRef } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Page title block with optional eyebrow, description, and actions on the right. */
export function PageHeader({ icon: Icon, eyebrow, title, description, actions, children }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-4">
        {Icon && (
          <span className="relative hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#c084fc] text-white shadow-glow sm:flex">
            <Icon size={22} aria-hidden="true" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30" />
          </span>
        )}
        <div className="min-w-0">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7c3aed]/80">{eyebrow}</p>}
          <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p>}
          {children}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.header>
  );
}

export function Card({ className, children, as: Tag = "section", ...rest }) {
  return (
    <Tag className={cx("card", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function CardHeader({ icon: Icon, title, subtitle, actions, className }) {
  return (
    <div className={cx("flex flex-wrap items-start justify-between gap-3", className)}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 text-[#6d28d9]">
            <Icon size={17} aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="card-title">{title}</h2>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Label + control + hint/error, wired for accessibility. */
export function Field({ label, htmlFor, hint, error, required, className, children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="label">
          {label}
          {required && <span className="ml-0.5 text-rose-500" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="field-error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">
          <AlertCircle size={13} aria-hidden="true" /> {error}
        </p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}

export const IconButton = forwardRef(function IconButton(
  { label, icon: Icon, tone = "default", size = 17, className, tooltipSide, ...rest },
  ref,
) {
  const base = tone === "danger" ? "icon-btn-danger" : tone === "solid" ? "icon-btn-solid" : "icon-btn";
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      data-tooltip={label}
      data-tooltip-side={tooltipSide}
      className={cx(base, className)}
      {...rest}
    >
      <Icon size={size} aria-hidden="true" />
    </button>
  );
});

export function Spinner({ size = 16, className }) {
  return <Loader2 size={size} className={cx("animate-spin", className)} aria-hidden="true" />;
}

export function SearchInput({ value, onChange, placeholder = "Search", label, className, ...rest }) {
  return (
    <div className={cx("relative", className)}>
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label || placeholder}
        className="input pl-10 pr-9 [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-faint transition hover:bg-black/5 hover:text-ink"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cx("flex flex-col items-center justify-center px-6 py-14 text-center", className)}>
      {Icon && (
        <div className="relative mb-4">
          <span className="absolute inset-0 -z-10 scale-150 rounded-full bg-[#c084fc]/25 blur-2xl" aria-hidden="true" />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white/80 text-[#7c3aed] shadow-glass">
            <Icon size={24} aria-hidden="true" />
          </span>
        </div>
      )}
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-ink-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cx("skeleton", className)} aria-hidden="true" />;
}

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="space-y-3 p-5" role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex items-center gap-4">
          {Array.from({ length: columns }, (_, col) => (
            <Skeleton key={col} className={cx("h-4", col === 0 ? "w-1/5" : "flex-1")} />
          ))}
        </div>
      ))}
    </div>
  );
}

const ACCENTS = {
  violet: "from-[#7c3aed] to-[#c084fc]",
  indigo: "from-[#4f46e5] to-[#818cf8]",
  sky: "from-[#0284c7] to-[#38bdf8]",
  pink: "from-[#db2777] to-[#f472b6]",
  emerald: "from-[#059669] to-[#34d399]",
  amber: "from-[#d97706] to-[#fbbf24]",
};

export function StatCard({ label, value, icon: Icon, accent = "violet", hint, loading, index = 0, onClick }) {
  const Tag = onClick ? motion.button : motion.div;
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="card group relative overflow-hidden p-5 text-left transition-shadow duration-300 hover:shadow-glass-lg"
    >
      <span
        aria-hidden="true"
        className={cx("absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br opacity-[0.16] blur-xl transition-opacity duration-300 group-hover:opacity-30", ACCENTS[accent])}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-ink-muted">{label}</p>
          {loading ? (
            <Skeleton className="mt-3 h-8 w-20" />
          ) : (
            <p className="mt-2 text-[32px] font-extrabold leading-none tracking-tight text-ink tabular-nums">{value}</p>
          )}
          {hint && <p className="mt-2 text-xs text-ink-muted">{hint}</p>}
        </div>
        {Icon && (
          <span className={cx("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-glow-sm", ACCENTS[accent])}>
            <Icon size={20} aria-hidden="true" />
          </span>
        )}
      </div>
    </Tag>
  );
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange, pageSizeOptions = [10, 20, 50, 100] }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pages);
  const from = total ? (current - 1) * pageSize + 1 : 0;
  const to = Math.min(current * pageSize, total);
  const numbers = [];
  for (let n = Math.max(1, current - 2); n <= Math.min(pages, current + 2); n += 1) numbers.push(n);

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-5 py-4 text-sm text-ink-muted sm:flex-row">
      <p aria-live="polite">
        Showing <span className="font-semibold text-ink">{from}–{to}</span> of <span className="font-semibold text-ink">{total}</span>
      </p>
      <div className="flex items-center gap-2">
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="select w-auto py-1.5 pl-3 text-xs"
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>{size} / page</option>
            ))}
          </select>
        )}
        <IconButton label="Previous page" icon={ChevronLeft} tone="solid" disabled={current <= 1} onClick={() => onPageChange(current - 1)} />
        {numbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === current ? "page" : undefined}
            className={cx(
              "h-9 min-w-[2.25rem] rounded-xl px-2 text-sm font-semibold transition",
              n === current ? "bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white shadow-glow-sm" : "text-ink-soft hover:bg-[#7c3aed]/[0.07]",
            )}
          >
            {n}
          </button>
        ))}
        <IconButton label="Next page" icon={ChevronRight} tone="solid" disabled={current >= pages} onClick={() => onPageChange(current + 1)} />
      </div>
    </div>
  );
}
