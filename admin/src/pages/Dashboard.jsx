import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Images,
  Inbox,
  PenLine,
  ScrollText,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardHeader, EmptyState, Skeleton, StatCard } from "../components/ui/kit";
import { toast } from "../components/ui/toast";

const SERIES = [
  { key: "applications", label: "Applications", color: "#7c3aed" },
  { key: "candidates", label: "Candidates", color: "#38bdf8" },
  { key: "certificates", label: "Certificates", color: "#f472b6" },
];

function listFrom(data, key) {
  if (Array.isArray(data)) return data;
  return data?.[key] || data?.data || [];
}

function monthCounts(items, year, dateOf = (item) => item.createdAt) {
  const counts = Array(12).fill(0);
  items.forEach((item) => {
    const date = new Date(dateOf(item));
    if (!Number.isNaN(date.getTime()) && date.getFullYear() === year) counts[date.getMonth()] += 1;
  });
  return counts;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function relativeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/80 bg-white/95 px-3.5 py-2.5 shadow-glass-lg backdrop-blur-xl">
      <p className="mb-1 text-xs font-bold text-ink">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2 text-xs text-ink-soft">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
          {entry.name}: <span className="font-bold text-ink">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [applications, setApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [slides, setSlides] = useState([]);
  const [logs, setLogs] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    let active = true;
    const failed = [];
    const load = (url, label) =>
      axios.get(url).catch((err) => {
        console.error(`${label} fetch error:`, err);
        failed.push(label);
        return { data: [] };
      });

    Promise.all([
      load("/api/albums/album-getall", "albums"),
      load("/api/applications/recive-applications", "applications"),
      load("/api/candidate/candidates", "candidates"),
      load("/api/jobs/show-jobs", "jobs"),
      load("/api/slides", "slides"),
      load("/api/certificate-logs", "certificate logs"),
    ]).then(([albumRes, appRes, candRes, jobRes, slideRes, logRes]) => {
      if (!active) return;
      setAlbums(listFrom(albumRes.data, "albums"));
      setApplications(listFrom(appRes.data, "applications"));
      setCandidates(listFrom(candRes.data, "candidates"));
      setJobs(listFrom(jobRes.data, "jobs"));
      setSlides(listFrom(slideRes.data, "slides"));
      setLogs(listFrom(logRes.data, "logs"));
      setLoading(false);
      if (failed.length) {
        toast.warning("Some dashboard data couldn't be loaded", { description: `Unavailable: ${failed.join(", ")}.` });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const chartData = useMemo(() => {
    const apps = monthCounts(applications, year);
    const cands = monthCounts(candidates, year, (c) => c.createdAt || c.uploadDate);
    const certs = monthCounts(logs, year);
    // Stop at the current month so future (empty) months don't read as a drop to zero.
    return Array.from({ length: new Date().getMonth() + 1 }, (_, month) => ({
      month: new Date(year, month, 1).toLocaleString("en-US", { month: "short" }),
      applications: apps[month],
      candidates: cands[month],
      certificates: certs[month],
    }));
  }, [applications, candidates, logs, year]);

  const typeSplit = useMemo(() => {
    const counts = {};
    logs.forEach((log) => {
      const type = log.letterType || "Other";
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [logs]);

  const thisMonth = useMemo(() => {
    const now = new Date();
    return logs.filter((log) => {
      const date = new Date(log.createdAt);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length;
  }, [logs]);

  const recentLogs = useMemo(
    () => [...logs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6),
    [logs],
  );
  const recentApplications = useMemo(
    () => [...applications].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5),
    [applications],
  );

  const stats = [
    { label: "Applications", value: applications.length, icon: Inbox, accent: "violet", hint: "Total received", to: "/job-applications" },
    { label: "Certificates issued", value: logs.length, icon: Award, accent: "pink", hint: `${thisMonth} this month`, to: "/certificate-logs" },
    { label: "Candidates", value: candidates.length, icon: Users, accent: "sky", hint: "From Excel imports", to: "/candidate-excel" },
    { label: "Open jobs", value: jobs.length, icon: Briefcase, accent: "indigo", hint: `${albums.length} albums · ${slides.length} slides`, to: "/job-listings" },
  ];

  const pieColors = ["#7c3aed", "#f472b6", "#38bdf8", "#fbbf24"];

  return (
    <div className="page">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1d1736] via-[#3b1f78] to-[#7c3aed] p-6 text-white shadow-glass-lg sm:p-8"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#e9d5ff_15%,#a78bfa_45%,rgba(124,58,237,0)_72%)] opacity-70" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-40 h-56 w-56 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#f0abfc,#93c5fd,#c4b5fd,#f0abfc)] opacity-40 [mask:radial-gradient(circle,transparent_55%,black_56%,black_68%,transparent_69%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent,black)]" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 ring-1 ring-inset ring-white/20 backdrop-blur">
              <Sparkles size={13} aria-hidden="true" />
              {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{greeting()}, Admin</h1>
            <p className="mt-2 text-sm text-white/75 sm:text-base">
              {loading ? "Gathering today's numbers…" : (
                <>
                  <span className="font-bold text-white">{thisMonth}</span> {thisMonth === 1 ? "certificate has" : "certificates have"} been issued this month and{" "}
                  <span className="font-bold text-white">{applications.length}</span> applications are waiting in your inbox.
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => navigate("/certificates")} className="btn bg-white text-[#3b1f78] shadow-lg hover:-translate-y-px hover:bg-white/95" data-tooltip="Create a single offer letter or certificate">
              <PenLine size={16} aria-hidden="true" /> New letter
            </button>
            <button type="button" onClick={() => navigate("/job-applications")} className="btn bg-white/[0.12] text-white ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/20" data-tooltip="Review new applicants">
              <Inbox size={16} aria-hidden="true" /> Applications
            </button>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            index={index}
            loading={loading}
            onClick={() => navigate(stat.to)}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="card-pad xl:col-span-2">
          <CardHeader
            title="Activity this year"
            subtitle={`Monthly applications, candidates and certificates in ${year}`}
            actions={
              <div className="flex flex-wrap gap-3">
                {SERIES.map((series) => (
                  <span key={series.key} className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: series.color }} /> {series.label}
                  </span>
                ))}
              </div>
            }
          />
          <div className="mt-6 h-72">
            {loading ? (
              <Skeleton className="h-full w-full rounded-2xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ left: -18, right: 8, top: 6 }}>
                  <defs>
                    {SERIES.map((series) => (
                      <linearGradient key={series.key} id={`fill-${series.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={series.color} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={series.color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid vertical={false} stroke="#ebe6f7" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#7a7395", fontSize: 12 }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#7a7395", fontSize: 12 }} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#c4b5fd", strokeDasharray: "4 4" }} />
                  {SERIES.map((series) => (
                    <Area
                      key={series.key}
                      type="monotone"
                      dataKey={series.key}
                      name={series.label}
                      stroke={series.color}
                      strokeWidth={2.4}
                      fill={`url(#fill-${series.key})`}
                      activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="card-pad">
          <CardHeader title="Certificates by type" subtitle="All letters issued so far" />
          <div className="relative mt-4 h-56">
            {loading ? (
              <Skeleton className="mx-auto h-48 w-48 rounded-full" />
            ) : typeSplit.length === 0 ? (
              <EmptyState icon={Award} title="No certificates yet" description="Issued letters will appear here." className="py-6" />
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={typeSplit} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="88%" paddingAngle={3} cornerRadius={8} stroke="none">
                      {typeSplit.map((entry, index) => (
                        <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-extrabold text-ink">{logs.length}</p>
                  <p className="text-xs font-semibold text-ink-muted">issued</p>
                </div>
              </>
            )}
          </div>
          {!loading && typeSplit.length > 0 && (
            <ul className="mt-4 space-y-2">
              {typeSplit.map((entry, index) => (
                <li key={entry.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ink-soft">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: pieColors[index % pieColors.length] }} />
                    {entry.name}
                  </span>
                  <span className="font-bold text-ink">{entry.value}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Recent */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="card-pad">
          <CardHeader
            icon={ScrollText}
            title="Recently issued"
            subtitle="Latest certificates and offer letters"
            actions={<Link to="/certificate-logs" className="btn-ghost btn-sm">View all <ArrowUpRight size={14} aria-hidden="true" /></Link>}
          />
          <ul className="mt-4 divide-y divide-[#f0ecf9]">
            {loading && Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex items-center gap-3 py-3"><Skeleton className="h-9 w-9 rounded-xl" /><Skeleton className="h-4 flex-1" /></li>
            ))}
            {!loading && recentLogs.length === 0 && (
              <li><EmptyState icon={Award} title="Nothing issued yet" description="Generate your first letter to see it here." action={<Link to="/certificates" className="btn-primary btn-sm">Create a letter</Link>} className="py-8" /></li>
            )}
            {!loading && recentLogs.map((log) => (
              <li key={log._id} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f472b6]/12 text-[#db2777]">
                  <Award size={16} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{log.candidateName || "—"}</p>
                  <p className="truncate text-xs text-ink-muted">{log.letterType}{log.role ? ` · ${log.role}` : ""}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-ink-faint">{relativeDate(log.createdAt)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="card-pad">
          <CardHeader
            icon={Inbox}
            title="New applications"
            subtitle="Most recent applicants"
            actions={<Link to="/job-applications" className="btn-ghost btn-sm">Open inbox <ArrowUpRight size={14} aria-hidden="true" /></Link>}
          />
          <ul className="mt-4 divide-y divide-[#f0ecf9]">
            {loading && Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex items-center gap-3 py-3"><Skeleton className="h-9 w-9 rounded-full" /><Skeleton className="h-4 flex-1" /></li>
            ))}
            {!loading && recentApplications.length === 0 && (
              <li><EmptyState icon={Inbox} title="Inbox is clear" description="New job applications will show up here." className="py-8" /></li>
            )}
            {!loading && recentApplications.map((app) => (
              <li key={app._id} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#c4b5fd] to-[#93c5fd] text-xs font-bold text-[#3b1f78]">
                  {(app.name || "?").trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{app.name || "—"}</p>
                  <p className="truncate text-xs text-ink-muted">{app.jobTitle || app.email || ""}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-ink-faint">{relativeDate(app.createdAt)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { to: "/gallery", icon: Images, title: "Gallery", text: `${albums.length} albums on the website` },
          { to: "/hero-banner", icon: Sparkles, title: "Hero banner", text: `${slides.length} homepage slides` },
          { to: "/job-listings", icon: Briefcase, title: "Job listings", text: `${jobs.length} positions published` },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="card group flex items-center gap-4 p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-glass-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7c3aed]/10 text-[#6d28d9] transition group-hover:bg-gradient-to-br group-hover:from-[#7c3aed] group-hover:to-[#a855f7] group-hover:text-white">
              <item.icon size={19} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-ink">{item.title}</span>
              <span className="block truncate text-xs text-ink-muted">{loading ? "Loading…" : item.text}</span>
            </span>
            <ArrowUpRight size={18} className="text-ink-faint transition group-hover:text-[#6d28d9]" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
