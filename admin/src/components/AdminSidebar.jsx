import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsLeft, LogOut, X } from "lucide-react";
import { NAV_GROUPS } from "./layout/navigation";
import { confirmDialog } from "./ui/confirm";
import { logout } from "../lib/auth";
import { cx } from "./ui/kit";

function Brand({ collapsed }) {
  return (
    <div className={cx("flex items-center gap-3 px-3 pt-4", collapsed && "justify-center px-0")}>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white bg-white shadow-glass">
        <img src="/ssinfotech-logo.png" alt="" className="h-9 w-9 object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />
      </span>
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[15px] font-extrabold tracking-tight text-ink">SS Infotech</p>
          <p className="truncate text-xs font-medium text-ink-muted">Admin Console</p>
        </div>
      )}
    </div>
  );
}

function NavList({ collapsed, onNavigate }) {
  const location = useLocation();

  return (
    <nav className="mt-6 flex-1 space-y-5 overflow-y-auto px-3 pb-4" aria-label="Main navigation">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          {!collapsed ? (
            <p className="mb-1.5 px-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-faint">{group.label}</p>
          ) : (
            <div className="mx-auto mb-2 h-px w-8 bg-[#e4ddf5]" aria-hidden="true" />
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/");
              return (
                <li key={item.key || item.path}>
                  <Link
                    to={item.path}
                    state={item.state}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    data-tooltip={collapsed ? item.label : undefined}
                    data-tooltip-side="right"
                    className={cx(
                      "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold outline-none transition-colors duration-200",
                      collapsed && "justify-center px-0",
                      active ? "text-white" : "text-ink-soft hover:bg-[#7c3aed]/[0.06] hover:text-[#5b21b6]",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c3aed] via-[#8b3df0] to-[#a855f7] shadow-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon size={18} className={cx("relative shrink-0 transition-transform duration-200", !active && "group-hover:scale-110")} aria-hidden="true" />
                    {!collapsed && <span className="relative truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function AccountCard({ collapsed, onAfterLogout }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const ok = await confirmDialog({
      title: "Log out of the admin console?",
      description: "You will need to sign in again to manage certificates and content.",
      confirmText: "Log out",
      tone: "logout",
    });
    if (!ok) return;
    onAfterLogout?.();
    await logout(navigate);
  };

  return (
    <div className={cx("m-3 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-2.5 shadow-sm", collapsed && "flex-col p-2")}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1d1736] to-[#4b3a8a] text-xs font-bold text-white">AD</span>
      {!collapsed && (
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-bold text-ink">Administrator</p>
          <p className="flex items-center gap-1.5 truncate text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Signed in
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={handleLogout}
        className="icon-btn hover:bg-rose-50 hover:text-rose-600"
        aria-label="Log out"
        data-tooltip="Log out"
        data-tooltip-side={collapsed ? "right" : "top"}
      >
        <LogOut size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

export default function AdminSidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Desktop: floating glass panel */}
      <aside
        className={cx(
          "glass-strong fixed bottom-3 left-3 top-3 z-40 hidden flex-col rounded-[28px] transition-[width] duration-300 ease-out lg:flex",
          collapsed ? "w-[84px]" : "w-[264px]",
        )}
        aria-label="Sidebar"
      >
        <Brand collapsed={collapsed} />
        <NavList collapsed={collapsed} />
        <AccountCard collapsed={collapsed} />
        <button
          type="button"
          onClick={onToggleCollapse}
          className="absolute -right-3 top-8 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-white text-ink-muted shadow-glass transition hover:text-[#6d28d9]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-tooltip={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-tooltip-side="right"
        >
          <ChevronsLeft size={15} className={cx("transition-transform duration-300", collapsed && "rotate-180")} aria-hidden="true" />
        </button>
      </aside>

      {/* Mobile / tablet: slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-[#1b0b33]/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              className="glass-strong fixed bottom-2 left-2 top-2 z-50 flex w-[min(300px,calc(100vw-1rem))] flex-col rounded-[28px] lg:hidden"
              initial={{ x: "-110%" }}
              animate={{ x: 0 }}
              exit={{ x: "-110%" }}
              transition={{ type: "spring", stiffness: 360, damping: 36 }}
              aria-label="Sidebar"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between pr-3">
                <Brand collapsed={false} />
                <button type="button" onClick={onCloseMobile} className="icon-btn mt-4" aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <NavList collapsed={false} onNavigate={onCloseMobile} />
              <AccountCard collapsed={false} onAfterLogout={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
