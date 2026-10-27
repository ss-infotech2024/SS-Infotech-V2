import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { App as AntApp, Button, message } from "antd";
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

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "/api/applications/recive-applications"
      );
      setApplications(res.data.applications || []);
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

  const handleGenerateCertificate = (app) => {
    const job = jobsById[app.jobId];
    const internship = internshipById[app.jobId];
    const resolvedTitle = titleFor(app);
    const templateName = templateFromJobTitle(resolvedTitle !== "—" ? resolvedTitle : job?.category || internship?.category || "");
    const today = new Date();
    const issuedDate = [
      String(today.getDate()).padStart(2, "0"),
      String(today.getMonth() + 1).padStart(2, "0"),
      today.getFullYear(),
    ].join("/");

    navigate("/certificates", {
      state: {
        fromApplication: true,
        docType: DOC_TYPES.offer,
        templateName,
        candidateName: (app.name || "").trim(),
        collegeName: (app.college || "").trim(),
        companyName: job?.company || "SS Infotech Pvt. Ltd.",
        position: ROLE_BY_TEMPLATE[templateName] || (resolvedTitle !== "—" ? resolvedTitle : ""),
        issuedDate,
      },
    });
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

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Phone</th>
              <th className="border px-3 py-2 text-left">College</th>
              <th className="border px-3 py-2 text-left">Job</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
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

            {applications.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
