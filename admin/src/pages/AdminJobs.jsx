import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building2, Clock, Edit3, IndianRupee, MapPin, Plus, Save, Tag, Trash2, X } from "lucide-react";
import { apiAuthHeaders, apiUrl } from "../lib/api";
import { Card, CardHeader, EmptyState, Field, IconButton, PageHeader, SearchInput, Skeleton, Spinner, cx } from "../components/ui/kit";
import { message } from "../components/ui/toast";
import { confirmDialog } from "../components/ui/confirm";

const EMPTY_FORM = {
  title: "",
  company: "",
  location: "",
  experience: "",
  type: "Full-time",
  skills: "",
  description: "",
  salary: "",
  category: "",
};

const TEXT_FIELDS = [
  { name: "title", label: "Job title", placeholder: "e.g. React Developer", required: true },
  { name: "company", label: "Company", placeholder: "e.g. SS Infotech Pvt. Ltd.", required: true },
  { name: "location", label: "Location", placeholder: "e.g. Nagpur / Remote" },
  { name: "experience", label: "Experience", placeholder: "e.g. 0–2 years" },
  { name: "salary", label: "Salary", placeholder: "e.g. ₹3–5 LPA" },
  { name: "category", label: "Category", placeholder: "e.g. Software Development" },
];

const TYPE_BADGE = { "Full-time": "badge-violet", "Part-time": "badge-info", Internship: "badge-success" };

export default function AdminJobs() {
  const BASE_URL = apiUrl("/api/jobs");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const formRef = useRef(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/show-jobs`);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err) {
      message.error(err.message === "Failed to fetch" ? "Can't reach the server to load jobs" : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!jobForm.title.trim()) next.title = "Job title is required.";
    if (!jobForm.company.trim()) next.company = "Company is required.";
    if (!jobForm.description.trim()) next.description = "Add a short description of the role.";
    setErrors(next);
    if (Object.keys(next).length) message.warning("Please fill in the highlighted fields");
    return !Object.keys(next).length;
  };

  const resetForm = () => {
    setJobForm(EMPTY_FORM);
    setEditingJob(null);
    setErrors({});
  };

  // Add or Update Job
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const jobData = {
        ...jobForm,
        skills: jobForm.skills.split(",").map((s) => s.trim()),
      };

      const url = editingJob
        ? `${BASE_URL}/update-jobs/${editingJob._id}`
        : `${BASE_URL}/add-jobs`;
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: apiAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save job");

      message.success(editingJob ? "Job updated successfully!" : "Job added successfully!");
      resetForm();
      fetchJobs();
    } catch (err) {
      message.error(err.message === "Failed to fetch" ? "Can't reach the server. The job was not saved." : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete job
  const handleDelete = async (job) => {
    const ok = await confirmDialog({
      title: `Delete “${job.title}”?`,
      description: "The listing will be removed from the careers page. This can't be undone.",
      confirmText: "Delete job",
    });
    if (!ok) return;
    try {
      const res = await fetch(`${BASE_URL}/delete-jobs/${job._id}`, { method: "DELETE", headers: apiAuthHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete job");

      message.success("Job deleted successfully!");
      setJobs((prev) => prev.filter((item) => item._id !== job._id));
      if (editingJob?._id === job._id) resetForm();
    } catch (err) {
      message.error(err.message === "Failed to fetch" ? "Can't reach the server. The job was not deleted." : err.message);
    }
  };

  // Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setErrors({});
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      type: job.type,
      skills: (job.skills || []).join(", "),
      description: job.description,
      salary: job.salary,
      category: job.category,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visibleJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((job) => [job.title, job.company, job.location, job.category, ...(job.skills || [])]
      .some((value) => String(value || "").toLowerCase().includes(q)));
  }, [jobs, search]);

  return (
    <div className="page">
      <PageHeader
        icon={Briefcase}
        eyebrow="Recruitment"
        title="Job listings"
        description="Publish open positions to the careers page and keep them up to date."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Form */}
        <Card className="card-pad xl:sticky xl:top-24">
          <div ref={formRef} className="scroll-mt-24" />
          <CardHeader
            icon={editingJob ? Edit3 : Plus}
            title={editingJob ? "Edit job" : "Add a new job"}
            subtitle={editingJob ? `Editing “${editingJob.title}”` : "Fields marked * are required."}
            actions={editingJob && (
              <button type="button" onClick={resetForm} className="btn-ghost btn-sm" data-tooltip="Discard changes and start a new job">
                <X size={14} aria-hidden="true" /> Cancel edit
              </button>
            )}
          />
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              {TEXT_FIELDS.map((field) => (
                <Field key={field.name} label={field.label} htmlFor={`job-${field.name}`} required={field.required} error={errors[field.name]}>
                  <input
                    id={`job-${field.name}`}
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={jobForm[field.name] || ""}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors[field.name])}
                    className={cx("input", errors[field.name] && "input-error")}
                  />
                </Field>
              ))}
              <Field label="Job type" htmlFor="job-type">
                <select id="job-type" name="type" value={jobForm.type} onChange={handleInputChange} className="select">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                </select>
              </Field>
              <Field label="Skills" htmlFor="job-skills" hint="Separate skills with commas.">
                <input
                  id="job-skills"
                  type="text"
                  name="skills"
                  placeholder="React, Node.js, SQL"
                  value={jobForm.skills}
                  onChange={handleInputChange}
                  className="input"
                />
              </Field>
            </div>
            <Field label="Description" htmlFor="job-description" required error={errors.description}>
              <textarea
                id="job-description"
                name="description"
                placeholder="What will this person do? What do they need to know?"
                value={jobForm.description}
                onChange={handleInputChange}
                rows={4}
                aria-invalid={Boolean(errors.description)}
                className={cx("textarea", errors.description && "input-error")}
              />
            </Field>
            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
              {submitting ? <Spinner /> : editingJob ? <Save size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
              {editingJob ? "Update job" : "Create job"}
            </button>
          </form>
        </Card>

        {/* List */}
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-[#ebe6f7] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="card-title">Published jobs</h2>
              <p className="card-subtitle">{loading ? "Loading…" : `${jobs.length} ${jobs.length === 1 ? "listing" : "listings"}`}</p>
            </div>
            <SearchInput value={search} onChange={setSearch} placeholder="Search jobs" className="sm:w-64" />
          </div>

          {loading ? (
            <div className="grid gap-3 p-4 sm:p-5">
              {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
            </div>
          ) : jobs.length === 0 ? (
            <EmptyState icon={Briefcase} title="No jobs published" description="Create your first listing with the form." />
          ) : visibleJobs.length === 0 ? (
            <EmptyState icon={Briefcase} title="No matches" description="Try a different search." />
          ) : (
            <ul className="grid gap-3 p-4 sm:p-5">
              <AnimatePresence initial={false}>
                {visibleJobs.map((job) => (
                  <motion.li
                    key={job._id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className={cx(
                      "group rounded-2xl border bg-white/70 p-4 transition duration-200 hover:bg-white hover:shadow-glass",
                      editingJob?._id === job._id ? "border-[#a78bfa] ring-4 ring-[#8b5cf6]/10" : "border-white/80",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate font-bold text-ink">{job.title}</h3>
                          {job.type && <span className={TYPE_BADGE[job.type] || "badge-neutral"}>{job.type}</span>}
                        </div>
                        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                          {job.company && <span className="flex items-center gap-1"><Building2 size={13} aria-hidden="true" />{job.company}</span>}
                          {job.location && <span className="flex items-center gap-1"><MapPin size={13} aria-hidden="true" />{job.location}</span>}
                          {job.experience && <span className="flex items-center gap-1"><Clock size={13} aria-hidden="true" />{job.experience}</span>}
                          {job.salary && <span className="flex items-center gap-1"><IndianRupee size={13} aria-hidden="true" />{job.salary}</span>}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <IconButton label={`Edit ${job.title}`} icon={Edit3} onClick={() => handleEdit(job)} />
                        <IconButton label={`Delete ${job.title}`} icon={Trash2} tone="danger" onClick={() => handleDelete(job)} />
                      </div>
                    </div>
                    {job.skills?.filter(Boolean).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.skills.filter(Boolean).map((skill) => (
                          <span key={skill} className="badge-neutral"><Tag size={10} aria-hidden="true" />{skill}</span>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
