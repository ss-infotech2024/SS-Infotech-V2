import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { App as AntApp, Button, Input, message, Pagination } from "antd";
import { Award, Download, Trash2 } from "lucide-react";
import { DOC_TYPES, ROLE_BY_TEMPLATE, templateFromJobTitle } from "../GenerateCertificate";

function shortText(value, limit) {
  const text = String(value || "").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit)}....`;
}
import { internships } from "../../../frontend/src/data/internships.js";

export default function AdminApplications() {
  const navigate = useNavigate();
  const { message: toast } = AntApp.useApp();
  const [applications, setApplications] = useState([]);
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
      message.error("Failed to load applications.");
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
    if (!window.confirm(`Delete ${selectedApplications.length} selected application${selectedApplications.length === 1 ? "" : "s"}?`)) return;

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
    if (!resumePath) return alert("Resume URL not found");
    const filename = name.replace(/\s+/g, "_") + "_resume.pdf"; // optional custom name
    const a = document.createElement("a");
    a.href = resumePath;
    a.target = "_blank";  // open in new tab
    a.download = filename; // browser may ignore for cross-origin URLs, still opens fine
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Delete single application
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      await axios.delete(`/api/applications/delete/${id}`);
      message.success("Application deleted successfully!");
      setSelectedIds((current) => current.filter((selectedId) => selectedId !== id));
      fetchApplications();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete application.");
    }
  };

  // Delete all applications
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete ALL applications?")) return;
    try {
      await axios.delete("/api/applications/delete-all");
      message.success("All applications deleted successfully!");
      setSelectedIds([]);
      fetchApplications();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete all applications.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
        <Button danger onClick={handleDeleteAll}>
          Delete All
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Input.Search
          allowClear
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCurrentPage(1);
          }}
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          placeholder="Search by name, email, or phone"
          aria-label="Search job applications by name, email, or phone"
          className="w-full sm:max-w-md"
        />
        <span className="text-sm text-gray-500" aria-live="polite">
          {filteredApplications.length} {filteredApplications.length === 1 ? "application" : "applications"}
        </span>
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-3">
          <span className="mr-2 text-sm font-medium text-purple-900">
            {selectedIds.length} selected
          </span>
          <Button type="primary" icon={<Award size={16} />} onClick={handleGenerateSelectedCertificates}>
            Generate certificates
          </Button>
          <Button icon={<Download size={16} />} onClick={handleOpenSelectedResumes}>
            Open selected resumes
          </Button>
          <Button danger icon={<Trash2 size={16} />} onClick={handleDeleteSelected}>
            Delete selected
          </Button>
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-center">
                <input
                  ref={pageSelectRef}
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={(event) => {
                    setSelectedIds((current) => event.target.checked
                      ? [...new Set([...current, ...visibleIds])]
                      : current.filter((id) => !visibleIds.includes(id))
                    );
                  }}
                  aria-label="Select all applications on this page"
                  title="Select all applications on this page"
                />
              </th>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Phone</th>
              <th className="border px-3 py-2 text-left">College</th>
              <th className="border px-3 py-2 text-left">Job</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleApplications.map((app) => (
              <tr key={app._id} className={`hover:bg-gray-50 ${selectedIds.includes(app._id) ? "bg-purple-50" : ""}`}>
                <td className="border px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app._id)}
                    onChange={(event) => setSelectedIds((current) => event.target.checked
                      ? [...new Set([...current, app._id])]
                      : current.filter((id) => id !== app._id)
                    )}
                    aria-label={`Select ${app.name}'s application`}
                  />
                </td>
                <td className="border px-3 py-2">{app.name}</td>
                <td className="border px-3 py-2 whitespace-nowrap">
                  <button
                    type="button"
                    title={`${app.email} — click to copy`}
                    onClick={() => copyText(app.email)}
                    className="text-left text-[#552586] hover:underline"
                  >
                    {shortText(app.email, 5)}
                  </button>
                </td>
                <td className="border px-3 py-2 whitespace-nowrap">
                  <button
                    type="button"
                    title={`${app.phone} — click to copy`}
                    onClick={() => copyText(app.phone)}
                    className="text-left text-[#552586] hover:underline"
                  >
                    {app.phone}
                  </button>
                </td>
                <td className="border px-3 py-2 whitespace-nowrap" title={app.college || ""}>
                  {app.college ? shortText(app.college, 12) : "—"}
                </td>
                <td className="border px-3 py-2">{titleFor(app)}</td>
                <td className="border px-3 py-2 text-center whitespace-nowrap">
                  <div className="inline-flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<Download size={16} aria-hidden="true" />}
                      aria-label={`Download ${app.name}'s resume`}
                      title="Download resume"
                      onClick={() => handleDownload(app.resumePath, app.name)}
                      className="bg-[#552586]"
                    />
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<Award size={16} aria-hidden="true" />}
                      aria-label={`Generate certificate for ${app.name}`}
                      title="Generate certificate"
                      onClick={() => handleGenerateCertificate(app)}
                      className="bg-[#552586]"
                    />
                    <Button
                      danger
                      shape="circle"
                      icon={<Trash2 size={16} aria-hidden="true" />}
                      aria-label={`Delete ${app.name}'s application`}
                      title="Delete"
                      onClick={() => handleDelete(app._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {filteredApplications.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  {applications.length === 0
                    ? "No applications found."
                    : "No applications match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredApplications.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={Math.min(currentPage, totalPages)}
            pageSize={pageSize}
            pageSizeOptions={["10", "20", "50", "100"]}
            total={filteredApplications.length}
            showSizeChanger
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
          />
        </div>
      )}
    </div>
  );
}
