import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import Background from "../components/layout/Background";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Background />
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-white bg-white/80 text-[#7c3aed] shadow-glass">
        <Compass size={28} aria-hidden="true" />
      </span>
      <p className="text-gradient text-6xl font-extrabold tracking-tight">404</p>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">Oops! The page you’re looking for doesn’t exist or has moved.</p>
      <Link to="/dashboard" className="btn-primary mt-6">
        <ArrowLeft size={16} aria-hidden="true" /> Back to dashboard
      </Link>
    </div>
  );
}
