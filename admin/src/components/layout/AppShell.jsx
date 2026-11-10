import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronRight, CornerDownLeft, LogOut, Menu, Search, Sparkles } from "lucide-react";
import AdminSidebar from "../AdminSidebar";
import Background from "./Background";
import { BULK_ACTION, NAV_ITEMS, pageFor } from "./navigation";
import { confirmDialog } from "../ui/confirm";
import { logout } from "../../lib/auth";
import { cx } from "../ui/kit";

const COLLAPSE_KEY = "ssinfotech.sidebarCollapsed";

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === "1";
  } catch {
    return false;
  }
}

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || "");

/* ---------------------------------------------------------------- Command palette */

function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => {
    const pages = [...NAV_ITEMS, BULK_ACTION].map((item) => ({
      id: item.key || item.path,
      label: item.label,
      hint: item.description,
      group: item.state ? "Actions" : "Go to",
      icon: item.icon,
      run: () => navigate(item.path, { state: item.state }),
    }));
    return [
      ...pages,
      {
        id: "logout",
        label: "Log out",
        hint: "End this admin session",
        group: "Account",
        icon: LogOut,
        run: async () => {
          const ok = await confirmDialog({ title: "Log out of the admin console?", confirmText: "Log out", tone: "logout" });
          if (ok) await logout(navigate);
        },
      },
    ];
  }, [navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) => `${command.label} ${command.hint} ${command.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (command) => {
    onClose();
    command?.run();
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((value) => Math.min(results.length - 1, value + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((value) => Math.max(0, value - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-[#1b0b33]/30 px-3 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-glass-lg backdrop-blur-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <div className="flex items-center gap-3 border-b border-[#ebe6f7] px-4">
              <Search size={18} className="shrink-0 text-ink-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a page or action…"
                aria-label="Search pages and actions"
                className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
              />
              <span className="kbd">Esc</span>
            </div>
            <ul ref={listRef} className="max-h-[50vh] overflow-y-auto p-2" role="listbox" aria-label="Results">
              {results.length === 0 && <li className="px-4 py-8 text-center text-sm text-ink-muted">No matches for “{query}”.</li>}
              {results.map((command, i) => {
                const Icon = command.icon;
                const selected = i === index;
                return (
                  <li key={command.id} data-index={i} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(command)}
                      className={cx(
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                        selected ? "bg-[#7c3aed]/[0.08]" : "hover:bg-black/[0.03]",
                      )}
                    >
                      <span className={cx("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", selected ? "bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white shadow-glow-sm" : "bg-[#7c3aed]/[0.08] text-[#6d28d9]")}>
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-ink">{command.label}</span>
                        <span className="block truncate text-xs text-ink-muted">{command.hint}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-ink-faint">{command.group}</span>
                      {selected && <CornerDownLeft size={14} className="text-[#7c3aed]" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-[#ebe6f7] px-4 py-2.5 text-[11px] text-ink-muted">
              <span className="flex items-center gap-1"><span className="kbd">↑</span><span className="kbd">↓</span> Navigate</span>
              <span className="flex items-center gap-1"><span className="kbd">↵</span> Open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

/* ---------------------------------------------------------------- Top bar */

function Topbar({ onOpenMenu, onOpenPalette }) {
  const location = useLocation();
  const navigate = useNavigate();
  const page = pageFor(location.pathname);
  const bulk = location.pathname === "/certificates" && location.state?.openBulk;
  const today = new Date().toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="sticky top-0 z-30 px-3 pt-3 sm:px-4 lg:px-6">
      <div className="glass flex h-14 items-center gap-2 rounded-2xl px-2 sm:px-3">
        <button type="button" onClick={onOpenMenu} className="icon-btn lg:hidden" aria-label="Open menu" data-tooltip="Menu" data-tooltip-side="bottom">
          <Menu size={19} />
        </button>
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
          <button type="button" onClick={() => navigate("/dashboard")} className="hidden shrink-0 font-medium text-ink-muted transition hover:text-[#6d28d9] sm:inline">
            Console
          </button>
          <ChevronRight size={14} className="hidden shrink-0 text-ink-faint sm:inline" aria-hidden="true" />
          <span className="truncate font-bold text-ink">{bulk ? "Bulk Generator" : page?.label || "Page"}</span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#e4ddf5] bg-white/70 px-3 text-sm text-ink-muted transition hover:border-[#cfc2ef] hover:bg-white hover:text-ink sm:min-w-[220px]"
            aria-label="Search pages and actions"
            data-tooltip="Search pages and actions"
            data-tooltip-side="bottom"
          >
            <Search size={16} aria-hidden="true" />
            <span className="hidden sm:inline">Jump to…</span>
            <span className="ml-auto hidden items-center gap-1 sm:flex">
              <span className="kbd">{isMac ? "⌘" : "Ctrl"}</span>
              <span className="kbd">K</span>
            </span>
          </button>
          <span className="hidden items-center gap-1.5 rounded-xl px-2.5 text-xs font-semibold text-ink-muted md:flex">
            <CalendarDays size={15} aria-hidden="true" /> {today}
          </span>
          <button
            type="button"
            onClick={() => navigate("/certificates", { state: { openBulk: true } })}
            className="btn-primary h-10 px-3 sm:px-4"
            aria-label="Bulk Generator"
            data-tooltip="Create certificates for many students"
            data-tooltip-side="bottom"
          >
            <Sparkles size={16} aria-hidden="true" /> <span className="hidden sm:inline">Bulk Generator</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Shell */

export default function AppShell({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, collapsed ? "1" : "0");
    } catch {
      // Preference only; safe to ignore.
    }
  }, [collapsed]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closePalette = useCallback(() => setPaletteOpen(false), []);

  return (
    <div className="relative min-h-screen">
      <Background />
      <AdminSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={cx("min-w-0 transition-[padding] duration-300 ease-out", collapsed ? "lg:pl-[96px]" : "lg:pl-[276px]")}>
        <Topbar onOpenMenu={() => setMobileOpen(true)} onOpenPalette={() => setPaletteOpen(true)} />
        <main className="min-w-0 pt-5" id="main">
          {/* Opacity only: a transform here would re-anchor pages' own fixed-position modals. */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </div>
  );
}
