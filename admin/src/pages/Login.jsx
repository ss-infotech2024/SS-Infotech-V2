import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BadgeCheck, Eye, EyeOff, FileStack, Lock, ShieldCheck, Sparkles, User } from "lucide-react";
import { apiUrl } from "../lib/api";
import Background from "../components/layout/Background";
import { Field, Spinner, cx } from "../components/ui/kit";
import { toast } from "../components/ui/toast";

function FloatingCard({ className, icon: Icon, title, text, delay = 0, tint }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={cx("glass-strong absolute flex items-center gap-3 rounded-2xl px-4 py-3", className)}
    >
      <span className={cx("flex h-10 w-10 items-center justify-center rounded-xl text-white", tint)}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold text-ink">{title}</p>
        <p className="text-xs text-ink-muted">{text}</p>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const missing = {};
    if (!username.trim()) missing.username = "Enter your username.";
    if (!password) missing.password = "Enter your password.";
    setFieldErrors(missing);
    if (Object.keys(missing).length) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        const message = response.status === 401
          ? "The backend rejected these login details. Check ADMIN_USER and ADMIN_PASSWORD in the deployed backend settings."
          : result.message || "Could not sign in. Please try again.";
        throw new Error(message);
      }
      if (result.token) sessionStorage.setItem("adminApiToken", result.token);
      localStorage.setItem("isAdminLoggedIn", "true");
      toast.success("Welcome back", { description: "You're signed in to the admin console." });
      navigate("/");
    } catch (loginError) {
      const message = loginError.message === "Failed to fetch"
        ? "Can't reach the server. Check your connection and try again."
        : loginError.message || "Could not sign in. Please try again.";
      setError(message);
      toast.error("Sign-in failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <Background />

      {/* Brand side */}
      <section className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-white shadow-glass">
            <img src="/ssinfotech-logo.png" alt="" className="h-10 w-10 object-contain" />
          </span>
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight text-ink">SS Infotech</p>
            <p className="text-sm text-ink-muted">Admin Console</p>
          </div>
        </motion.div>

        <div className="relative mx-auto my-10 h-[380px] w-full max-w-[520px]">
          {/* 3D composition */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-float-slow rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#efe4ff_16%,#b79cff_50%,#6d28d9_90%)] shadow-[inset_-30px_-40px_70px_rgba(76,29,149,0.5),0_60px_90px_-40px_rgba(76,29,149,0.55)]" />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 [perspective:900px]" aria-hidden="true">
            <div className="h-full w-full animate-spin-slow rounded-full bg-[conic-gradient(from_90deg,#c4b5fd,#f0abfc,#93c5fd,#a78bfa,#c4b5fd)] opacity-60 [mask:radial-gradient(circle,transparent_60%,black_61%,black_66%,transparent_67%)] [transform:rotateX(70deg)]" />
          </div>
          <FloatingCard className="left-0 top-6" icon={BadgeCheck} title="Certificate issued" text="Gouri Patil · Software Development" delay={0.3} tint="bg-gradient-to-br from-emerald-500 to-teal-400" />
          <FloatingCard className="bottom-10 right-0" icon={FileStack} title="Bulk ZIP ready" text="48 certificates · 31 MB" delay={0.5} tint="bg-gradient-to-br from-[#7c3aed] to-[#c084fc]" />
          <FloatingCard className="bottom-0 left-8" icon={ShieldCheck} title="Secure session" text="Encrypted admin access" delay={0.7} tint="bg-gradient-to-br from-sky-500 to-indigo-400" />
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="max-w-lg text-4xl font-extrabold leading-[1.1] tracking-tight text-ink xl:text-5xl">
            Issue beautiful certificates <span className="text-gradient">in seconds.</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-muted">
            Offer letters, completion certificates, bulk generation and your website content — managed from one calm, fast workspace.
          </p>
        </motion.div>
      </section>

      {/* Form side */}
      <section className="relative flex items-center justify-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="glass-strong w-full max-w-[440px] rounded-[32px] p-7 sm:p-9"
        >
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white bg-white shadow-glass">
              <img src="/ssinfotech-logo.png" alt="" className="h-9 w-9 object-contain" />
            </span>
            <div className="leading-tight">
              <p className="font-extrabold tracking-tight text-ink">SS Infotech</p>
              <p className="text-xs text-ink-muted">Admin Console</p>
            </div>
          </div>

          <span className="badge-violet">
            <Sparkles size={12} aria-hidden="true" /> Admin access
          </span>
          <h2 className="mt-3 text-[28px] font-extrabold tracking-tight text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-ink-muted">Sign in to manage certificates, recruitment and your website.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5" noValidate>
            <Field label="Username" htmlFor="login-username" error={fieldErrors.username} required>
              <div className="relative">
                <User size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
                <input
                  id="login-username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setFieldErrors((current) => ({ ...current, username: undefined }));
                  }}
                  autoComplete="username"
                  aria-invalid={Boolean(fieldErrors.username)}
                  className={cx("input pl-10", fieldErrors.username && "input-error")}
                />
              </div>
            </Field>

            <Field label="Password" htmlFor="login-password" error={fieldErrors.password} required>
              <div className="relative">
                <Lock size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((current) => ({ ...current, password: undefined }));
                  }}
                  className={cx("input pl-10 pr-11", fieldErrors.password && "input-error")}
                  autoComplete="current-password"
                  aria-invalid={Boolean(fieldErrors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-1 my-auto flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition hover:bg-black/5 hover:text-[#6d28d9]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  data-tooltip={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
                </button>
              </div>
            </Field>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-700"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary btn-lg w-full">
              {isSubmitting ? (
                <>
                  <Spinner size={18} /> Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-faint">© {new Date().getFullYear()} SS Infotech · IT Research &amp; Products Development</p>
        </motion.div>
      </section>
    </div>
  );
}
