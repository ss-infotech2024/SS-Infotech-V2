import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiFileText,
  FiRotateCcw,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import CollegeNameField from "../CollegeNameField";
import PagePreview from "./PagePreview";
import StatusBadge from "./StatusBadge";
import {
  DATE_FIELDS,
  DOC_TYPES,
  FIELD_LABELS,
  datesFromInternshipStart,
  toTitleCase,
} from "../../lib/letters";

const INPUT =
  "w-full rounded-xl border border-purple-100 bg-white/80 px-3 py-2 text-sm text-gray-800 shadow-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200";

const EDITABLE_FIELDS = ["collegeName", "position", "companyName", "internshipFrom", "internshipTo", "issuedDate", "supervisorName"];

function isTyping(target) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/**
 * Large preview of one certificate with its own editable details. Edited fields are
 * stored as overrides on that student only; everything else follows the shared details.
 */
export default function CertificateLightbox({
  row,
  position,
  total,
  sharedLetter,
  busy,
  onClose,
  onPrev,
  onNext,
  onChangeItem,
  onDelete,
  onDownload,
}) {
  const { item, letter, previewKey, status } = row;
  const overrides = item.overrides || {};
  const customCount = Object.keys(overrides).length;
  const fields = EDITABLE_FIELDS.filter((key) => key !== "supervisorName" || sharedLetter.docType === DOC_TYPES.completion);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      } else if (!isTyping(event.target) && event.key === "ArrowLeft") {
        onPrev();
      } else if (!isTyping(event.target) && event.key === "ArrowRight") {
        onNext();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [onClose, onPrev, onNext]);

  const setOverrides = (patch) => {
    onChangeItem(item.id, (current) => {
      const next = { ...(current.overrides || {}) };
      Object.entries(patch).forEach(([key, value]) => {
        if (value === sharedLetter.data[key]) delete next[key];
        else next[key] = value;
      });
      return { ...current, overrides: next };
    });
  };

  const setField = (key, value) => {
    if (key === "internshipFrom" && value) {
      setOverrides(datesFromInternshipStart(value));
      return;
    }
    setOverrides({ [key]: value });
  };

  const resetField = (key) => {
    onChangeItem(item.id, (current) => {
      const next = { ...(current.overrides || {}) };
      delete next[key];
      return { ...current, overrides: next };
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1b0b33]/40 p-2 backdrop-blur-sm sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate for ${item.name}`}
    >
      <motion.div
        className="flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_30px_80px_-20px_rgba(43,10,85,0.45)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <header className="flex items-center gap-3 border-b border-purple-100/70 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
              Certificate {position} of {total}
            </p>
            <h3 className="truncate text-lg font-bold text-gray-900">{item.name || "Unnamed student"}</h3>
          </div>
          <StatusBadge status={status} />
          <div className="flex items-center gap-1">
            <button type="button" onClick={onPrev} className="bulk-icon-btn" aria-label="Previous certificate" title="Previous (←)">
              <FiChevronLeft />
            </button>
            <button type="button" onClick={onNext} className="bulk-icon-btn" aria-label="Next certificate" title="Next (→)">
              <FiChevronRight />
            </button>
            <button type="button" onClick={onClose} className="bulk-icon-btn" aria-label="Close preview" title="Close (Esc)">
              <FiX />
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_360px] lg:overflow-hidden">
          <div className="min-h-0 bg-gradient-to-br from-purple-50/80 via-white/40 to-indigo-50/80 p-4 sm:p-6 lg:overflow-y-auto">
            <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(43,10,85,0.35)] ring-1 ring-black/5">
              <PagePreview
                docType={letter.docType}
                templateName={letter.templateName}
                previewKey={previewKey}
                lazy={false}
              />
            </div>
          </div>

          <aside className="min-h-0 space-y-5 border-t border-purple-100/70 p-4 sm:p-6 lg:overflow-y-auto lg:border-l lg:border-t-0">
            <div className="space-y-1.5">
              <label htmlFor={`item-name-${item.id}`} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Student name
              </label>
              <input
                id={`item-name-${item.id}`}
                value={item.name}
                onChange={(event) => onChangeItem(item.id, (current) => ({ ...current, name: event.target.value }))}
                onBlur={(event) => onChangeItem(item.id, (current) => ({ ...current, name: toTitleCase(event.target.value) }))}
                className={INPUT}
              />
            </div>

            <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-3 text-sm text-purple-900">
              {customCount ? (
                <div className="flex items-start justify-between gap-3">
                  <p>
                    <span className="font-semibold">{customCount} custom {customCount === 1 ? "field" : "fields"}</span> for
                    this student. Other fields follow the shared details.
                  </p>
                  <button
                    type="button"
                    onClick={() => onChangeItem(item.id, (current) => ({ ...current, overrides: {} }))}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-purple-700 transition hover:bg-white"
                  >
                    <FiRotateCcw /> Reset all
                  </button>
                </div>
              ) : (
                <p>Uses the shared details. Change a field below to customise it for this student only.</p>
              )}
            </div>

            <div className="space-y-3">
              {fields.map((key) => {
                const custom = Object.prototype.hasOwnProperty.call(overrides, key);
                const inputId = `item-${key}-${item.id}`;
                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor={key === "collegeName" ? `college-${inputId}` : inputId} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {FIELD_LABELS[key]}
                      </label>
                      {custom && (
                        <button
                          type="button"
                          onClick={() => resetField(key)}
                          className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-semibold text-purple-700 transition hover:bg-purple-200"
                          title="Use the shared value again"
                        >
                          Custom <FiRotateCcw size={10} />
                        </button>
                      )}
                    </div>
                    {key === "collegeName" ? (
                      <CollegeNameField
                        inputId={`college-${inputId}`}
                        value={letter.data.collegeName || ""}
                        onChange={(value) => setField("collegeName", value)}
                        inputClassName={INPUT}
                      />
                    ) : (
                      <input
                        id={inputId}
                        type={DATE_FIELDS.has(key) ? "date" : "text"}
                        value={letter.data[key] || ""}
                        onChange={(event) => setField(key, event.target.value)}
                        className={INPUT}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {status?.state === "error" && status.error && (
              <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{status.error}</p>
            )}

            <div className="grid grid-cols-2 gap-2 border-t border-purple-100/70 pt-4">
              <button type="button" onClick={() => onDownload(item.id, "pdf")} disabled={busy} className="bulk-btn-primary">
                <FiDownload /> PDF
              </button>
              <button type="button" onClick={() => onDownload(item.id, "word")} disabled={busy} className="bulk-btn-secondary">
                <FiFileText /> Word
              </button>
              <button
                type="button"
                onClick={() => onDelete([item.id])}
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <FiTrash2 /> Delete this certificate
              </button>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
