import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Film, ImageIcon, MonitorPlay, Plug, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { apiAuthHeaders, apiUrl } from "../lib/api";
import { Card, CardHeader, EmptyState, Field, IconButton, PageHeader, Skeleton, Spinner, cx } from "../components/ui/kit";
import { message } from "../components/ui/toast";
import { confirmDialog } from "../components/ui/confirm";

const ACCEPTED = [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"];
const MAX_BYTES = 30 * 1024 * 1024;
const BROKEN_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2U0ZTVlNiIvPjx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzkzOTQ5NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgRXJyb3I8L3RleHQ+PC9zdmc+";

function fileProblem(file) {
  if (!file) return "";
  const name = file.name.toLowerCase();
  if (!ACCEPTED.some((ext) => name.endsWith(ext))) return "Use a JPG, PNG, WEBP, MP4 or WEBM file.";
  if (file.size > MAX_BYTES) return `This file is ${(file.size / 1024 / 1024).toFixed(1)} MB; the limit is 30 MB.`;
  return "";
}

const AdminSlides = () => {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    cta: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);
  const [testing, setTesting] = useState(false);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  useEffect(() => () => previewUrl && URL.revokeObjectURL(previewUrl), [previewUrl]);

  // Fetch slides on mount
  useEffect(() => {
    fetchSlides();
  }, []);

  // Fetch slides
  const fetchSlides = async () => {
    try {
      setFetchError("");
      const res = await fetch(apiUrl("/api/slides"), {
        method: "GET",
        headers: apiAuthHeaders(),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setSlides(data.slides || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      setFetchError(`Failed to fetch slides: ${error.message}`);
      message.error("Couldn't load hero slides");
      setSlides([]);
    } finally {
      setFetching(false);
    }
  };

  const chooseFile = (next) => {
    const problem = fileProblem(next);
    setErrors((prev) => ({ ...prev, file: problem || undefined }));
    if (problem) {
      message.warning(problem);
      return;
    }
    setFile(next || null);
  };

  // Handle file change
  const handleFileChange = (e) => {
    chooseFile(e.target.files?.[0] || null);
  };

  const clearFile = () => {
    setFile(null);
    const input = document.getElementById("file-input");
    if (input) input.value = "";
  };

  const handleDownload = (slide) => {
    if (!slide.url) {
      message.error("This slide does not have a downloadable media URL.");
      return;
    }

    const downloadUrl = slide.url.replace("/upload/", "/upload/fl_attachment/");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${(slide.title || "hero-slide").replace(/[^a-z0-9-_]/gi, "_")}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    message.info("Download started");
  };

  // Submit new slide
  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = {};
    if (!file) next.file = "Choose an image or video for the slide.";
    if (!form.title.trim()) next.title = "Give the slide a title.";
    setErrors(next);
    if (next.file) return message.error("Please select a file");
    if (next.title) return message.error("Please provide a title");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("url", file);
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("cta", form.cta);

      const res = await fetch(apiUrl("/api/slides"), {
        method: "POST",
        body: formData,
        headers: apiAuthHeaders(),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
      }

      await res.json();
      setForm({ title: "", subtitle: "", cta: "" });
      clearFile();
      await fetchSlides();
      message.success("Slide created successfully!");
    } catch (error) {
      console.error("Error creating slide:", error);
      message.error(`Error creating slide: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete slide
  const handleDelete = async (slide) => {
    const ok = await confirmDialog({
      title: "Delete this slide?",
      description: `“${slide.title || "Untitled slide"}” will be removed from the homepage hero. This can't be undone.`,
      confirmText: "Delete slide",
    });
    if (!ok) return;

    try {
      const res = await fetch(apiUrl(`/api/slides/delete/${slide._id}`), {
        method: "DELETE",
        headers: apiAuthHeaders(),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
      }

      await res.json();
      await fetchSlides();
      message.success("Slide deleted successfully!");
    } catch (error) {
      console.error("Error deleting slide:", error);
      message.error(`Error deleting slide: ${error.message}`);
    }
  };

  // Test backend connection
  const testConnection = async () => {
    setTesting(true);
    try {
      const res = await fetch(apiUrl("/api/slides"), {
        headers: apiAuthHeaders(),
      });
      if (res.status === 200) {
        message.success("Backend connection successful!");
      } else {
        message.error("Backend connection failed!");
      }
    } catch (error) {
      message.error(`Backend connection failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  const isVideo = file && /\.(mp4|webm)$/i.test(file.name);

  return (
    <div className="page">
      <PageHeader
        icon={MonitorPlay}
        eyebrow="Website"
        title="Hero banner"
        description="Images and videos that rotate in the homepage hero."
        actions={
          <button type="button" onClick={testConnection} className="btn-secondary" disabled={testing} data-tooltip="Check that the server responds">
            {testing ? <Spinner /> : <Plug size={16} aria-hidden="true" />} Test connection
          </button>
        }
      />

      {fetchError && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-700" role="alert">
          <X size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span className="flex-1">{fetchError}</span>
          <button type="button" className="font-semibold underline underline-offset-2" onClick={fetchSlides}>Retry</button>
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Add slide */}
        <Card className="card-pad xl:sticky xl:top-24">
          <CardHeader icon={Plus} title="Add a slide" subtitle="Supported: JPG, PNG, WEBP, MP4, WEBM · up to 30 MB" />
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Field label="Media file" htmlFor="file-input" required error={errors.file}>
              <label
                htmlFor="file-input"
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  chooseFile(event.dataTransfer.files?.[0] || null);
                }}
                className={cx(
                  "relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed px-4 text-center transition",
                  file ? "aspect-video border-transparent p-0" : "py-10",
                  dragging ? "border-[#a78bfa] bg-[#7c3aed]/[0.06]" : errors.file ? "border-rose-300 bg-rose-50/40" : "border-[#d9cff3] bg-white/50 hover:border-[#b9a6ef] hover:bg-white/80",
                )}
              >
                {file ? (
                  <>
                    {isVideo ? (
                      <video src={previewUrl} className="h-full w-full object-cover" muted autoPlay loop playsInline />
                    ) : (
                      <img src={previewUrl} alt="Selected slide preview" className="h-full w-full object-cover" />
                    )}
                    <span className="absolute bottom-2 left-2 right-2 truncate rounded-xl bg-black/55 px-3 py-1.5 text-left text-xs font-medium text-white backdrop-blur">
                      {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c3aed]/10 text-[#6d28d9]">
                      <UploadCloud size={22} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-ink">Drop a file here or <span className="text-[#6d28d9]">browse</span></span>
                    <span className="mt-1 text-xs text-ink-muted">Wide 16:9 media looks best</span>
                  </>
                )}
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
                  className="sr-only"
                />
              </label>
              {file && (
                <button type="button" onClick={clearFile} className="btn-ghost btn-sm mt-2">
                  <X size={14} aria-hidden="true" /> Remove file
                </button>
              )}
            </Field>

            <Field label="Title" htmlFor="slide-title" required error={errors.title}>
              <input
                id="slide-title"
                type="text"
                placeholder="Slide title"
                value={form.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                aria-invalid={Boolean(errors.title)}
                className={cx("input", errors.title && "input-error")}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Subtitle" htmlFor="slide-subtitle" hint="Optional">
                <input
                  id="slide-subtitle"
                  type="text"
                  placeholder="Supporting line"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="input"
                />
              </Field>
              <Field label="Call to action" htmlFor="slide-cta" hint="Optional button text">
                <input
                  id="slide-cta"
                  type="text"
                  placeholder="e.g. Explore courses"
                  value={form.cta}
                  onChange={(e) => setForm({ ...form, cta: e.target.value })}
                  className="input"
                />
              </Field>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
              {loading ? <><Spinner /> Uploading…</> : <><Plus size={16} aria-hidden="true" /> Add slide</>}
            </button>
          </form>
        </Card>

        {/* Slides */}
        <Card className="card-pad">
          <CardHeader
            icon={MonitorPlay}
            title="Current slides"
            subtitle={fetching ? "Loading…" : `${slides.length} ${slides.length === 1 ? "slide" : "slides"} on the homepage`}
          />
          {fetching ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="aspect-video rounded-2xl" />)}
            </div>
          ) : slides.length === 0 ? (
            <EmptyState
              icon={ImageIcon}
              title={fetchError ? "Slides unavailable" : "No slides yet"}
              description={fetchError ? "Cannot load slides — check the backend connection." : "Add your first slide with the form."}
            />
          ) : (
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {slides.map((slide) => (
                  <motion.li
                    key={slide._id || slide.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="group overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-sm transition duration-300 hover:shadow-glass-lg"
                  >
                    <div className="relative aspect-video overflow-hidden bg-[#ece7f8]">
                      {slide.type === "video" ? (
                        <video src={slide.url} className="h-full w-full object-cover" muted autoPlay loop playsInline />
                      ) : (
                        <img
                          src={slide.url}
                          alt={slide.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                          onError={(e) => {
                            e.target.src = BROKEN_IMAGE;
                          }}
                        />
                      )}
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold capitalize text-white backdrop-blur">
                        {slide.type === "video" ? <Film size={12} aria-hidden="true" /> : <ImageIcon size={12} aria-hidden="true" />}
                        {slide.type}
                      </span>
                      <div className="absolute right-3 top-3 flex gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                        <IconButton label={`Download ${slide.title || "slide"}`} icon={Download} className="bg-white/90 shadow" onClick={() => handleDownload(slide)} />
                        <IconButton label={`Delete ${slide.title || "slide"}`} icon={Trash2} tone="danger" className="bg-white/90 shadow" onClick={() => handleDelete(slide)} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="truncate font-bold text-ink">{slide.title || "Untitled Slide"}</h4>
                      {slide.subtitle && <p className="mt-0.5 line-clamp-2 text-sm text-ink-muted">{slide.subtitle}</p>}
                      <div className="mt-2 flex items-center justify-between text-xs text-ink-faint">
                        <span>{slide.createdAt ? new Date(slide.createdAt).toLocaleDateString() : ""}</span>
                        {slide.cta && <span className="badge-violet">{slide.cta}</span>}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminSlides;
