import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Download, ExternalLink, FileSpreadsheet, Trash2, UploadCloud, Users, X } from "lucide-react";
import { Card, EmptyState, IconButton, PageHeader, Pagination, SearchInput, Spinner, TableSkeleton, cx } from "../components/ui/kit";
import { message, toast } from "../components/ui/toast";
import { confirmDialog } from "../components/ui/confirm";

const COLUMNS = [
  { title: "Full name", key: "fullName" },
  { title: "Phone", key: "phoneNumber" },
  { title: "Email", key: "emailAddress" },
  { title: "Location", key: "currentLocation" },
  { title: "DOB / Age", key: "dateOfBirth" },
  { title: "Post grad", key: "postGraduationDegree" },
  { title: "Under grad", key: "underGraduationDegree" },
];

export default function CandidateManager() {
  const [candidates, setCandidates] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const fileInputRef = useRef(null);

  const API_BASE = "/api/candidate";

  // Fetch all candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidates`);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.candidates || [];

        // Add "uploadDate" field (mock if missing)
        const updated = data.map((c) => ({
          ...c,
          uploadDate: c.uploadDate
            ? new Date(c.uploadDate).toLocaleDateString()
            : new Date().toLocaleDateString(), // fallback
        }));

        setCandidates(updated);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
        message.error("Failed to fetch candidates");
      } finally {
        setFetching(false);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = useMemo(() => {
    const lower = searchText.toLowerCase();
    if (!lower) return candidates;
    return candidates.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(lower) ||
        c.phoneNumber?.toLowerCase().includes(lower) ||
        c.emailAddress?.toLowerCase().includes(lower) ||
        c.dateOfBirth?.toLowerCase().includes(lower) ||
        c.uploadDate?.toLowerCase().includes(lower)
    );
  }, [candidates, searchText]);

  useEffect(() => setPage(1), [searchText, pageSize]);
  const visible = filteredCandidates.slice((page - 1) * pageSize, page * pageSize);

  const pickFile = (next) => {
    if (next && !/\.(xlsx|xls)$/i.test(next.name)) {
      message.warning("Choose an Excel file (.xlsx or .xls)");
      return;
    }
    setFile(next || null);
  };

  // Upload Excel
  const handleUpload = async () => {
    if (!file) return message.warning("Please select an Excel file to upload");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/upload-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success(`Uploaded ${res.data.count} candidates successfully`);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Refresh list
      const fetchRes = await axios.get(`${API_BASE}/candidates`);
      const updated = (fetchRes.data.candidates || fetchRes.data || []).map(
        (c) => ({
          ...c,
          uploadDate: new Date().toLocaleDateString(),
        })
      );

      setCandidates(updated);
    } catch (err) {
      console.error("Failed to upload Excel:", err);
      message.error(err.response?.data?.message || "Failed to upload Excel file");
    } finally {
      setLoading(false);
    }
  };

  // Delete a candidate
  const handleDelete = async (candidate) => {
    const ok = await confirmDialog({
      title: "Delete this candidate?",
      description: `${candidate.fullName || "This candidate"} will be removed from the list.`,
      confirmText: "Delete candidate",
    });
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/candidate/${candidate._id}`);
      message.success("Candidate deleted");
      setCandidates((current) => current.filter((c) => c._id !== candidate._id));
    } catch (err) {
      console.error("Failed to delete candidate:", err);
      message.error("Failed to delete candidate");
    }
  };

  // Delete all candidates
  const handleDeleteAll = async () => {
    const ok = await confirmDialog({
      title: "Delete all candidates?",
      description: `All ${candidates.length} imported candidates will be permanently removed. This can't be undone.`,
      confirmText: "Delete everything",
    });
    if (!ok) return;
    try {
      await axios.delete(`${API_BASE}/candidates`);
      message.success("All candidates deleted");
      setCandidates([]);
    } catch (err) {
      console.error("Failed to delete all candidates:", err);
      message.error("Failed to delete all candidates");
    }
  };

  // Download Excel
  const handleDownload = async () => {
    setDownloading(true);
    const id = toast.loading("Preparing Excel export…");
    try {
      const response = await axios.get(`${API_BASE}/download-excel`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `candidates_export_${new Date().toISOString().split("T")[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.update(id, { type: "success", message: "Excel file downloaded successfully" });
    } catch (err) {
      console.error("Failed to download Excel:", err);
      toast.update(id, { type: "error", message: "Failed to download Excel file" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        icon={Users}
        eyebrow="Recruitment"
        title="Candidates"
        description="Import candidate sheets from Excel, search them, and export the full list."
        actions={
          <>
            <button type="button" className="btn-secondary" onClick={handleDownload} disabled={downloading} data-tooltip="Export every candidate to an .xlsx file">
              {downloading ? <Spinner /> : <Download size={16} aria-hidden="true" />} Download Excel
            </button>
            <button type="button" className="btn-danger-soft" onClick={handleDeleteAll} disabled={!candidates.length} data-tooltip="Permanently delete every candidate">
              <Trash2 size={16} aria-hidden="true" /> Delete all
            </button>
          </>
        }
      />

      {/* Import */}
      <Card className="card-pad">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <label
            htmlFor="candidate-file"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              pickFile(event.dataTransfer.files?.[0]);
            }}
            className="flex flex-1 cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-[#d9cff3] bg-white/50 px-4 py-4 transition hover:border-[#b9a6ef] hover:bg-white/80"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
              <FileSpreadsheet size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              {file ? (
                <>
                  <span className="block truncate text-sm font-semibold text-ink">{file.name}</span>
                  <span className="block text-xs text-ink-muted">{(file.size / 1024).toFixed(1)} KB · ready to upload</span>
                </>
              ) : (
                <>
                  <span className="block text-sm font-semibold text-ink">Drop an Excel sheet or <span className="text-[#6d28d9]">browse</span></span>
                  <span className="block text-xs text-ink-muted">.xlsx or .xls</span>
                </>
              )}
            </span>
            <input
              id="candidate-file"
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx"
              className="sr-only"
              onChange={(event) => pickFile(event.target.files?.[0])}
            />
          </label>
          <div className="flex gap-2">
            {file && <IconButton label="Remove selected file" icon={X} tone="solid" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} />}
            <button type="button" className="btn-primary" onClick={handleUpload} disabled={loading}>
              {loading ? <Spinner /> : <UploadCloud size={16} aria-hidden="true" />} Upload
            </button>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-[#ebe6f7] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder="Search by name, number, email, DOB, or upload date"
            className="sm:max-w-md sm:flex-1"
          />
          <span className="badge-neutral self-start sm:self-auto">{filteredCandidates.length} candidates</span>
        </div>

        {fetching ? (
          <TableSkeleton rows={6} columns={7} />
        ) : filteredCandidates.length === 0 ? (
          <EmptyState
            icon={Users}
            title={candidates.length ? "No matches" : "No candidates yet"}
            description={candidates.length ? "Try a different search." : "Upload an Excel sheet to import candidates."}
          />
        ) : (
          <>
            <div className="table-wrap max-h-[640px]">
              <table className="table-ui">
                <thead>
                  <tr>
                    {COLUMNS.map((column) => <th key={column.key}>{column.title}</th>)}
                    <th>Resume</th>
                    <th>Uploaded</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((candidate) => (
                    <tr key={candidate._id}>
                      {COLUMNS.map((column) => (
                        <td key={column.key} className={cx("whitespace-nowrap", column.key === "fullName" && "font-semibold text-ink")}>
                          {candidate[column.key] || "—"}
                        </td>
                      ))}
                      <td>
                        {candidate.resumeLink ? (
                          <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#6d28d9] hover:underline">
                            View <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        ) : "—"}
                      </td>
                      <td className="whitespace-nowrap text-xs text-ink-muted">{candidate.uploadDate}</td>
                      <td className="text-right">
                        <IconButton label={`Delete ${candidate.fullName || "candidate"}`} icon={Trash2} tone="danger" onClick={() => handleDelete(candidate)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#ebe6f7]">
              <Pagination page={page} pageSize={pageSize} total={filteredCandidates.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
