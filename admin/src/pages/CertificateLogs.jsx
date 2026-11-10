import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Award, CalendarDays, GraduationCap, RefreshCw, ScrollText } from "lucide-react";
import { Card, EmptyState, PageHeader, Pagination, SearchInput, TableSkeleton, cx } from "../components/ui/kit";
import { toast } from "../components/ui/toast";

function formatCreatedOn(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}, ${hours}:${minutes}`;
}

function typeBadge(type = "") {
  return /offer/i.test(type) ? "badge-violet" : /completion/i.test(type) ? "badge-success" : "badge-neutral";
}

export default function CertificateLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const load = useCallback((signal) => {
    setLoading(true);
    setError("");
    axios
      .get("/api/certificate-logs", { timeout: 20000, signal })
      .then((response) => setLogs(response.data.logs || []))
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError("Certificate logs could not be loaded. Please try again.");
        toast.error("Couldn't load certificate logs");
      })
      .finally(() => {
        if (!signal?.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  const types = useMemo(() => [...new Set(logs.map((log) => log.letterType).filter(Boolean))], [logs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return logs.filter((log) =>
      (type === "all" || log.letterType === type) &&
      (!q || [log.candidateName, log.collegeName, log.role].some((value) => String(value || "").toLowerCase().includes(q))),
    );
  }, [logs, search, type]);

  useEffect(() => setPage(1), [search, type, pageSize]);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="page">
      <PageHeader
        icon={ScrollText}
        eyebrow="Certificates"
        title="Certificate logs"
        description="Every offer letter and certificate downloaded from the console, newest first."
        actions={
          <>
            <button type="button" onClick={() => load()} className="btn-secondary" disabled={loading} data-tooltip="Reload the log">
              <RefreshCw size={16} className={loading ? "animate-spin" : undefined} aria-hidden="true" /> Refresh
            </button>
            <Link to="/certificates" className="btn-primary" data-tooltip="Create a new letter">
              <Award size={16} aria-hidden="true" /> New letter
            </Link>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[#ebe6f7] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <SearchInput value={search} onChange={setSearch} placeholder="Search name, college or role" className="sm:max-w-sm sm:flex-1" />
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by letter type">
            {["all", ...types].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                aria-pressed={type === value}
                className={cx(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  type === value ? "bg-[#1d1736] text-white shadow" : "bg-white/70 text-ink-soft ring-1 ring-inset ring-[#e4ddf5] hover:bg-white",
                )}
              >
                {value === "all" ? `All (${logs.length})` : `${value} (${logs.filter((log) => log.letterType === value).length})`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={6} columns={6} />
        ) : error ? (
          <EmptyState
            icon={ScrollText}
            title="Couldn't load the log"
            description={error}
            action={<button type="button" className="btn-primary" onClick={() => load()}><RefreshCw size={16} aria-hidden="true" /> Try again</button>}
          />
        ) : logs.length === 0 ? (
          <EmptyState
            icon={Award}
            title="No letters yet"
            description="Letters appear here as soon as they are downloaded."
            action={<Link to="/certificates" className="btn-primary">Create the first letter</Link>}
          />
        ) : filtered.length === 0 ? (
          <EmptyState icon={ScrollText} title="No matches" description="Try a different name or clear the filters." />
        ) : (
          <>
            {/* Desktop table */}
            <div className="table-wrap hidden md:block">
              <table className="table-ui">
                <thead>
                  <tr>
                    <th>Created on</th>
                    <th>Candidate</th>
                    <th>College</th>
                    <th>Letter type</th>
                    <th>Role</th>
                    <th>Internship</th>
                    <th>Issued</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((log) => (
                    <tr key={log._id}>
                      <td className="whitespace-nowrap text-xs text-ink-muted">{formatCreatedOn(log.createdAt)}</td>
                      <td className="whitespace-nowrap font-semibold text-ink">{log.candidateName || "—"}</td>
                      <td className="max-w-[200px] truncate" data-tooltip={log.collegeName || undefined}>{log.collegeName || "—"}</td>
                      <td><span className={typeBadge(log.letterType)}>{log.letterType}</span></td>
                      <td className="whitespace-nowrap">{log.role || "—"}</td>
                      <td className="whitespace-nowrap text-xs tabular-nums">{log.internshipFrom || "—"} → {log.internshipTo || "—"}</td>
                      <td className="whitespace-nowrap text-xs tabular-nums">{log.issuedDate || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-[#f0ecf9] md:hidden">
              {visible.map((log) => (
                <li key={log._id} className="space-y-1.5 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-ink">{log.candidateName || "—"}</p>
                    <span className={typeBadge(log.letterType)}>{log.letterType}</span>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-ink-muted"><GraduationCap size={13} aria-hidden="true" /> {log.collegeName || "—"}</p>
                  <p className="text-xs text-ink-soft">{log.role || "—"} · {log.internshipFrom || "—"} → {log.internshipTo || "—"}</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-ink-faint"><CalendarDays size={12} aria-hidden="true" /> {formatCreatedOn(log.createdAt)}</p>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#ebe6f7]">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={filtered.length}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
