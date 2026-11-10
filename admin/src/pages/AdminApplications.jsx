import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Award, Copy, Download, FileText, GraduationCap, Inbox, Mail, Phone, RefreshCw, Trash2, X } from "lucide-react";
import { DOC_TYPES, ROLE_BY_TEMPLATE, templateFromJobTitle } from "../GenerateCertificate";
import { Card, EmptyState, IconButton, PageHeader, Pagination, SearchInput, TableSkeleton, cx } from "../components/ui/kit";
import { toast } from "../components/ui/toast";
import { confirmDialog } from "../components/ui/confirm";
import { internships } from "../../../frontend/src/data/internships.js";

function shortText(value, limit) {
  const text = String(value || "").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}…`;
}

function initials(name = "") {
  return name.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "?";
}

export default function AdminApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsById, setJobsById] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const pageSelectRef = useRef(null);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "/api/applications/recive-applications"
      );
      const nextApplications = res.data.applications || [];
      setApplications(nextApplications);
      setSelectedIds((current) =>
        current.filter((id) => nextApplications.some((app) => app._id === id))
      );
    } catch (err) {
      console.error("Failed to load applications:", err);
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("/api/jobs/show-jobs");
      const jobs = res.data.jobs || [];
      setJobsById(Object.fromEntries(jobs.map((job) => [job._id, job])));
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const internshipById = useMemo(
    () => Object.fromEntries(internships.map((item) => [item.id, item])),
    []
  );

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLocaleLowerCase();
    if (!query) return applications;

    return applications.filter((app) =>
      [app.name, app.email, app.phone].some((value) =>
        String(value || "").toLocaleLowerCase().includes(query)
      )
    );
  }, [applications, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / pageSize));
  const visibleApplications = filteredApplications.slice(
    (Math.min(currentPage, totalPages) - 1) * pageSize,
    Math.min(currentPage, totalPages) * pageSize
  );
  const visibleIds = visibleApplications.map((app) => app._id);
  const selectedOnPageCount = visibleIds.filter((id) => selectedIds.includes(id)).length;
  const allVisibleSelected = visibleIds.length > 0 && selectedOnPageCount === visibleIds.length;

  useEffect(() => {
    if (pageSelectRef.current) {
      pageSelectRef.current.indeterminate = selectedOnPageCount > 0 && !allVisibleSelected;
    }
  }, [selectedOnPageCount, allVisibleSelected]);

  const selectedApplications = applications.filter((app) => selectedIds.includes(app._id));

  const toggleOne = (id, checked) => setSelectedIds((current) => checked
    ? [...new Set([...current, id])]
    : current.filter((selectedId) => selectedId !== id));

  const copyText = async (value) => {
    const text = String(value || "").trim();
    if (!text) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard unavailable");
      }
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand("copy");
      area.remove();
      if (!copied) {
        toast.error("Could not copy to clipboard");
        return;
      }
    }
    toast.success(`${text} copied to clipboard`);
  };

  const titleFor = (app) =>
    app.jobTitle ||
    jobsById[app.jobId]?.title ||
    internshipById[app.jobId]?.title ||
    "—";

  const certificateDataFor = (app) => {
    const job = jobsById[app.jobId];
    const internship = internshipById[app.jobId];
    const resolvedTitle = titleFor(app);
    const templateName = templateFromJobTitle(
      resolvedTitle !== "—" ? resolvedTitle : job?.category || internship?.category || ""
    );
    const today = new Date();
    const issuedDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      candidateName: (app.name || "").trim(),
      collegeName: (app.college || "").trim(),
      companyName: job?.company || "SS Infotech Pvt. Ltd.",
      templateName,
      position: ROLE_BY_TEMPLATE[templateName] || (resolvedTitle !== "—" ? resolvedTitle : ""),
      issuedDate,
    };
  };

  const handleGenerateCertificate = (app) => {
    navigate("/certificates", {
      state: {
        fromApplication: true,
        docType: DOC_TYPES.offer,
        ...certificateDataFor(app),
      },
    });
  };

  const handleGenerateSelectedCertificates = () => {
    if (!selectedApplications.length) return;
    navigate("/certificates", {
      state: {
        fromApplication: true,
        applications: selectedApplications.map(certificateDataFor),
      },
    });
  };

  const handleOpenSelectedResumes = () => {
    const withResumes = selectedApplications.filter((app) => app.resumePath);
    if (!withResumes.length) {
      toast.warning("The selected applications do not have resume files.");
      return;
    }

    withResumes.forEach((app) => {
      const link = document.createElement("a");
      link.href = app.resumePath;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

    const missingCount = selectedApplications.length - withResumes.length;
    toast.success(`Opened ${withResumes.length} resume${withResumes.length === 1 ? "" : "s"}${missingCount ? `; ${missingCount} unavailable` : ""}.`);
  };

  const handleDeleteSelected = async () => {
    if (!selectedApplications.length) return;
    const count = selectedApplications.length;
    const ok = await confirmDialog({
      title: `Delete ${count} selected application${count === 1 ? "" : "s"}?`,
      description: "The applicants and their resume links will be removed. This can't be undone.",
      confirmText: `Delete ${count}`,
    });
    if (!ok) return;

    const results = await Promise.allSettled(
      selectedApplications.map((app) => axios.delete(`/api/applications/delete/${app._id}`))
    );
    const deletedIds = selectedApplications
      .filter((_, index) => results[index].status === "fulfilled")
      .map((app) => app._id);

    if (deletedIds.length) {
      setSelectedIds((current) => current.filter((id) => !deletedIds.includes(id)));
      await fetchApplications();
    }

    const failedCount = results.length - deletedIds.length;
    if (!failedCount) {
      toast.success(`Deleted ${deletedIds.length} application${deletedIds.length === 1 ? "" : "s"}.`);
    } else {
      toast.error(`Deleted ${deletedIds.length}; ${failedCount} could not be deleted.`);
    }
  };

  // Open resume directly using resumePath
  const handleDownload = (resumePath, name) => {
    if (!resumePath) {
      toast.error("Resume URL not found");
      return;
    }
    const filename = name.replace(/\s+/g, "_") + "_resume.pdf";
    const a = document.createElement("a");
    a.href = resumePath;
    a.target = "_blank";
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Delete single application
  const handleDelete = async (app) => {
    const ok = await confirmDialog({
      title: `Delete ${app.name || "this"}'s application?`,
      description: "This can't be undone.",
      confirmText: "Delete application",
    });
    if (!ok) return;
    try {
      await axios.delete(`/api/applications/delete/${app._id}`);
      toast.success("Application deleted successfully!");
      setSelectedIds((current) => current.filter((selectedId) => selectedId !== app._id));
      fetchApplications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete application.");
    }
  };

  // Delete all applications
  const handleDeleteAll = async () => {
    const ok = await confirmDialog({
      title: "Delete ALL applications?",
      description: `All ${applications.length} applications will be permanently removed. This can't be undone.`,
      confirmText: "Delete everything",
    });
    if (!ok) return;
    try {
      await axios.delete("/api/applications/delete-all");
      toast.success("All applications deleted successfully!");
      setSelectedIds([]);
      fetchApplications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete all applications.");
    }
  };

  const rowActions = (app) => (
    <div className="inline-flex items-center gap-1">
      <IconButton label={`Download ${app.name}'s resume`} icon={Download} onClick={() => handleDownload(app.resumePath, app.name)} />
      <IconButton label={`Generate certificate for ${app.name}`} icon={Award} onClick={() => handleGenerateCertificate(app)} className="text-[#6d28d9]" />
      <IconButton label={`Delete ${app.name}'s application`} icon={Trash2} tone="danger" onClick={() => handleDelete(app)} />
    </div>
  );

  return (
    <div className="page">
      <PageHeader
        icon={Inbox}
        eyebrow="Recruitment"
        title="Job applications"
        description="Review applicants, open resumes and issue offer letters in one click."
        actions={
          <>
            <button type="button" className="btn-secondary" onClick={() => { setLoading(true); fetchApplications(); }} data-tooltip="Reload applications">
              <RefreshCw size={16} className={loading ? "animate-spin" : undefined} aria-hidden="true" /> Refresh
            </button>
            <button type="button" className="btn-danger-soft" onClick={handleDeleteAll} disabled={!applications.length} data-tooltip="Permanently delete every application">
              <Trash2 size={16} aria-hidden="true" /> Delete all
            </button>
          </>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[#ebe6f7] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <SearchInput
            value={searchTerm}
            onChange={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, or phone"
            label="Search job applications by name, email, or phone"
            className="sm:max-w-md sm:flex-1"
          />
          <span className="badge-neutral self-start sm:self-auto" aria-live="polite">
            {filteredApplications.length} {filteredApplications.length === 1 ? "application" : "applications"}
          </span>
        </div>

        {loading ? (
          <TableSkeleton rows={6} columns={6} />
        ) : filteredApplications.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title={applications.length === 0 ? "No applications found." : "No applications match your search."}
            description={applications.length === 0 ? "New applicants from the careers page will appear here." : "Try a different name, email or phone number."}
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="table-wrap hidden lg:block">
              <table className="table-ui">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input
                        ref={pageSelectRef}
                        type="checkbox"
                        className="checkbox"
                        checked={allVisibleSelected}
                        onChange={(event) => {
                          setSelectedIds((current) => event.target.checked
                            ? [...new Set([...current, ...visibleIds])]
                            : current.filter((id) => !visibleIds.includes(id))
                          );
                        }}
                        aria-label="Select all applications on this page"
                        data-tooltip="Select all on this page"
                      />
                    </th>
                    <th>Applicant</th>
                    <th>Contact</th>
                    <th>College</th>
                    <th>Job</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleApplications.map((app) => {
                    const selected = selectedIds.includes(app._id);
                    return (
                      <tr key={app._id} className={selected ? "!bg-[#7c3aed]/[0.06]" : undefined}>
                        <td>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selected}
                            onChange={(event) => toggleOne(app._id, event.target.checked)}
                            aria-label={`Select ${app.name}'s application`}
                          />
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ddd6fe] to-[#bae6fd] text-xs font-bold text-[#3b1f78]">{initials(app.name)}</span>
                            <span className="font-semibold text-ink">{app.name}</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-start gap-0.5">
                            <button type="button" onClick={() => copyText(app.email)} data-tooltip={`${app.email} — click to copy`} className="inline-flex items-center gap-1.5 text-[13px] text-[#6d28d9] hover:underline">
                              <Mail size={13} aria-hidden="true" /> {shortText(app.email, 22)}
                            </button>
                            <button type="button" onClick={() => copyText(app.phone)} data-tooltip={`${app.phone} — click to copy`} className="inline-flex items-center gap-1.5 text-[13px] text-ink-soft hover:text-[#6d28d9] hover:underline">
                              <Phone size={13} aria-hidden="true" /> {app.phone}
                            </button>
                          </div>
                        </td>
                        <td className="max-w-[200px]" data-tooltip={app.college || undefined}>
                          <span className="block truncate">{app.college || "—"}</span>
                        </td>
                        <td><span className="badge-violet max-w-[220px] truncate">{titleFor(app)}</span></td>
                        <td className="text-right">{rowActions(app)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / tablet cards */}
            <ul className="divide-y divide-[#f0ecf9] lg:hidden">
              {visibleApplications.map((app) => {
                const selected = selectedIds.includes(app._id);
                return (
                  <li key={app._id} className={cx("flex gap-3 p-4", selected && "bg-[#7c3aed]/[0.05]")}>
                    <input
                      type="checkbox"
                      className="checkbox mt-2.5"
                      checked={selected}
                      onChange={(event) => toggleOne(app._id, event.target.checked)}
                      aria-label={`Select ${app.name}'s application`}
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-semibold text-ink">{app.name}</p>
                      <span className="badge-violet">{titleFor(app)}</span>
                      <button type="button" onClick={() => copyText(app.email)} className="flex max-w-full items-center gap-1.5 truncate text-xs text-[#6d28d9]"><Copy size={12} aria-hidden="true" />{app.email}</button>
                      <button type="button" onClick={() => copyText(app.phone)} className="flex items-center gap-1.5 text-xs text-ink-soft"><Phone size={12} aria-hidden="true" />{app.phone}</button>
                      {app.college && <p className="flex items-center gap-1.5 text-xs text-ink-muted"><GraduationCap size={12} aria-hidden="true" />{app.college}</p>}
                    </div>
                    <div className="flex flex-col">{rowActions(app)}</div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[#ebe6f7]">
              <Pagination
                page={Math.min(currentPage, totalPages)}
                pageSize={pageSize}
                total={filteredApplications.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          </>
        )}
      </Card>

      {/* Floating selection bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="sticky bottom-4 z-20 mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/80 bg-[#1d1736]/90 p-2 pl-4 text-white shadow-glass-lg backdrop-blur-xl"
            role="region"
            aria-label="Selected applications"
          >
            <span className="mr-1 text-sm font-semibold">{selectedIds.length} selected</span>
            <button type="button" className="btn btn-sm bg-gradient-to-br from-[#7c3aed] to-[#a855f7] text-white" onClick={handleGenerateSelectedCertificates} data-tooltip="Open the selected applicants as letters">
              <Award size={14} aria-hidden="true" /> Generate certificates
            </button>
            <button type="button" className="btn btn-sm bg-white/10 text-white hover:bg-white/20" onClick={handleOpenSelectedResumes}>
              <FileText size={14} aria-hidden="true" /> Open selected resumes
            </button>
            <button type="button" className="btn btn-sm bg-rose-500/90 text-white hover:bg-rose-500" onClick={handleDeleteSelected}>
              <Trash2 size={14} aria-hidden="true" /> Delete selected
            </button>
            <IconButton label="Clear selection" icon={X} className="text-white/70 hover:bg-white/10 hover:text-white" onClick={() => setSelectedIds([])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
