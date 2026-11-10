import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiFileText,
  FiGrid,
  FiInfo,
  FiInbox,
  FiLayers,
  FiList,
  FiMaximize2,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiTrash2,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";
import LetterDetailsForm from "../LetterDetailsForm";
import { toast as notify } from "../ui/toast";
import PagePreview from "./PagePreview";
import StatusBadge from "./StatusBadge";
import CertificateLightbox from "./CertificateLightbox";
import { buildLettersDocx, captureLetterLayout, downloadBlob } from "../../lib/wordExport";
import {
  DOC_TYPES,
  LETTER_TYPE_LABEL,
  blankLetterData,
  bulkFileBase,
  captureLetterImage,
  createLetter,
  createPdfFromImages,
  missingLetterFields,
  parseBulkNames,
  saveCertificateLog,
  templateSetFor,
  toPreviewData,
  uniqueFileNames,
  waitForImages,
  zipFileName,
} from "../../lib/letters";

const STORAGE_KEY = "ssinfotech.bulkGenerator.v1";
// html2canvas copies the whole page for every capture; skipping the app and the workspace
// (only the hidden render area is needed) roughly halves the time per certificate.
const CAPTURE_OPTIONS = {
  ignoreElements: (element) => element.id === "root" || element.hasAttribute?.("data-bulk-workspace"),
};
const FORMAT_LABEL = { pdf: "PDF", word: "Word" };
const EXTENSION = { pdf: "pdf", word: "docx" };

// ---------- helpers ----------

function effectiveLetter(shared, item) {
  return {
    docType: shared.docType,
    templateName: shared.templateName,
    data: { ...shared.data, ...(item.overrides || {}), candidateName: item.name },
  };
}

function signatureOf(letter) {
  return JSON.stringify([letter.docType, letter.templateName, toPreviewData(letter.data)]);
}

function plural(count, word, many = `${word}s`) {
  return `${count} ${count === 1 ? word : many}`;
}

async function runPool(list, limit, task) {
  let next = 0;
  let failed = 0;
  const worker = async () => {
    while (next < list.length) {
      const entry = list[next++];
      try {
        await task(entry);
      } catch (error) {
        console.error(error);
        failed += 1;
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, list.length) }, worker));
  return failed;
}

function loadDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!draft || typeof draft !== "object") return null;
    const docType = Object.values(DOC_TYPES).includes(draft.letter?.docType) ? draft.letter.docType : DOC_TYPES.offer;
    const templateName = templateSetFor(docType)[draft.letter?.templateName] ? draft.letter.templateName : "Web Developer";
    const items = Array.isArray(draft.items)
      ? draft.items
          .filter((item) => item && typeof item.name === "string")
          .map((item) => ({ id: item.id || crypto.randomUUID(), name: item.name, overrides: item.overrides || {} }))
      : [];
    return {
      letter: { id: "bulk", docType, templateName, data: { ...blankLetterData(), ...(draft.letter?.data || {}) } },
      items,
      view: draft.view === "list" ? "list" : "grid",
    };
  } catch {
    return null;
  }
}

function saveDraft(draft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage can be unavailable (private mode, quota); the workspace still works without it.
  }
}

// Row objects are rebuilt on every change, so compare only what a card actually shows.
function sameCardProps(a, b) {
  return (
    a.row.item === b.row.item &&
    a.row.previewKey === b.row.previewKey &&
    a.row.status === b.row.status &&
    a.row.letter.docType === b.row.letter.docType &&
    a.row.letter.templateName === b.row.letter.templateName &&
    a.number === b.number &&
    a.active === b.active &&
    a.checked === b.checked &&
    a.onOpen === b.onOpen &&
    a.onToggle === b.onToggle &&
    a.onDelete === b.onDelete
  );
}

// ---------- small presentational pieces ----------

function Segmented({ label, value, options, onChange, disabled }) {
  return (
    <div className="bulk-seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
          title={option.title}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

function SelectCheckbox({ checked, indeterminate = false, onChange, label, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      onClick={(event) => event.stopPropagation()}
      aria-label={label}
      className={`h-4 w-4 cursor-pointer rounded border-purple-300 accent-[#6A0DAD] ${className}`}
    />
  );
}

function PanelSection({ icon, title, hint, children }) {
  return (
    <section className="bulk-panel space-y-4 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6A0DAD] to-[#9B59B6] text-white shadow-[0_6px_16px_-6px_rgba(124,58,237,0.7)]">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {hint && <p className="text-xs text-gray-500">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const CertificateCard = memo(function CertificateCard({
  row,
  number,
  active,
  checked,
  onOpen,
  onToggle,
  onDelete,
}) {
  const { item, letter, previewKey, status } = row;
  const custom = Object.keys(item.overrides || {}).length > 0;
  return (
    <div
      className={`group relative rounded-2xl border bg-white/70 p-2 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(85,37,134,0.45)] ${
        active
          ? "border-purple-400 shadow-[0_0_0_3px_rgba(155,89,182,0.35)]"
          : checked
            ? "border-purple-300 shadow-sm"
            : "border-white/80 shadow-sm"
      }`}
      data-cert-card={item.name}
      data-active={active || undefined}
    >
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className="block w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label={`Open certificate for ${item.name}`}
      >
        <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
          <PagePreview docType={letter.docType} templateName={letter.templateName} previewKey={previewKey} />
        </div>
        <div className="mt-2 flex items-center gap-1.5 px-1">
          <span className="truncate text-sm font-semibold text-gray-800" title={item.name}>{item.name || "Unnamed"}</span>
          {custom && (
            <span className="shrink-0 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700" title="Has custom details">
              Custom
            </span>
          )}
        </div>
        <p className="px-1 text-[11px] text-gray-400">#{number}</p>
      </button>


      <div className={`absolute left-4 top-4 transition ${checked ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
        <SelectCheckbox
          checked={checked}
          onChange={() => onToggle(item.id)}
          label={`Select ${item.name}`}
          className="shadow"
        />
      </div>
      <div className="absolute right-4 top-4">
        <StatusBadge status={status} />
      </div>
      <div className="absolute bottom-[3.6rem] right-4 flex gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-600 shadow backdrop-blur transition hover:text-[#552586]"
          aria-label={`Edit ${item.name}`}
          title="Open and edit"
        >
          <FiMaximize2 size={14} />
        </button>
        <button
          type="button"
          onClick={() => onDelete([item.id])}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-600 shadow backdrop-blur transition hover:text-red-600"
          aria-label={`Delete ${item.name}`}
          title="Delete"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}, sameCardProps);

const CertificateRow = memo(function CertificateRow({ row, number, active, checked, onOpen, onToggle, onDelete }) {
  const { item, letter, previewKey, status } = row;
  const custom = Object.keys(item.overrides || {}).length > 0;
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border bg-white/70 px-3 py-2 backdrop-blur transition duration-200 hover:bg-white ${
        active ? "border-purple-400 shadow-[0_0_0_3px_rgba(155,89,182,0.3)]" : "border-white/80 shadow-sm"
      }`}
      data-cert-card={item.name}
      data-active={active || undefined}
    >
      <SelectCheckbox checked={checked} onChange={() => onToggle(item.id)} label={`Select ${item.name}`} />
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label={`Open certificate for ${item.name}`}
      >
        <div className="w-10 shrink-0 overflow-hidden rounded-md ring-1 ring-black/10">
          <PagePreview docType={letter.docType} templateName={letter.templateName} previewKey={previewKey} />
        </div>
        <span className="w-8 shrink-0 text-xs tabular-nums text-gray-400">#{number}</span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-gray-800">{item.name || "Unnamed"}</span>
            {custom && (
              <span className="shrink-0 rounded-full bg-purple-100 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700">Custom</span>
            )}
          </span>
          <span className="block truncate text-xs text-gray-500">
            {[letter.data.collegeName, letter.data.position].filter(Boolean).join(" · ") || "No college selected"}
          </span>
        </span>
      </button>
      <StatusBadge status={status} />
      <button type="button" onClick={() => onOpen(item.id)} className="bulk-icon-btn" aria-label={`Edit ${item.name}`} title="Open and edit">
        <FiMaximize2 size={14} />
      </button>
      <button
        type="button"
        onClick={() => onDelete([item.id])}
        className="bulk-icon-btn hover:!text-red-600"
        aria-label={`Delete ${item.name}`}
        title="Delete"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}, sameCardProps);

// ---------- main component ----------

export default function BulkGenerator({ open, onClose }) {
  const [draft] = useState(loadDraft);
  const [letter, setLetter] = useState(() => draft?.letter || { ...createLetter(), id: "bulk" });
  const [items, setItems] = useState(() => draft?.items || []);
  const [view, setView] = useState(() => draft?.view || "grid");
  const [namesText, setNamesText] = useState("");
  const [search, setSearch] = useState("");
  const [failedOnly, setFailedOnly] = useState(false);
  const [checked, setChecked] = useState(() => new Set());
  const [activeId, setActiveId] = useState(null);
  const [lightboxId, setLightboxId] = useState(null);
  const [statuses, setStatuses] = useState({});
  // Last format used; Regenerate and the progress text refer to it.
  const [format, setFormat] = useState("pdf");
  // "individual" (default): one file per certificate, ZIP for 2+. "combined": one multi-page file.
  const [downloadMode, setDownloadMode] = useState("individual");
  const [scope, setScope] = useState("all");
  const [job, setJob] = useState(null);
  const [notice, setNotice] = useState(null);
  const [mobileTab, setMobileTab] = useState("settings");
  const [renderLetter, setRenderLetter] = useState(null);
  const renderRef = useRef(null);
  const cacheRef = useRef(new Map());
  const cancelRef = useRef(false);
  const restoredNoticeShown = useRef(false);
  const progressToast = useRef(null);

  const busy = Boolean(job);
  const previewLetter = useDeferredValue(letter);
  const RenderTemplate = renderLetter ? templateSetFor(renderLetter.docType)[renderLetter.templateName] : null;

  useEffect(() => saveDraft({ letter, items, view }), [letter, items, view]);

  // Lock page scroll behind the workspace. Locking <html> as well stops a page that is wider
  // than a phone screen from widening the layout viewport (and the fixed workspace with it).
  useEffect(() => {
    if (!open) return undefined;
    const { documentElement: html, body } = document;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.dataset.bulkOpen = "1"; // lets toasts move clear of the download controls
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      delete body.dataset.bulkOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && !lightboxId && !busy) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, lightboxId, busy, onClose]);

  // Uses the app-wide toast system; undoable actions get an "Undo" button.
  const showToast = useCallback((type, text, undo) => {
    notify[type](text, undo ? { action: { label: "Undo", onClick: undo }, duration: 8000 } : undefined);
  }, []);

  useEffect(() => {
    if (!open || restoredNoticeShown.current) return;
    restoredNoticeShown.current = true;
    if (draft?.items?.length) showToast("info", `Restored ${plural(draft.items.length, "certificate")} from your last session.`);
  }, [open, draft, showToast]);

  // The outcome of a download/regenerate settles its progress toast (or shows a new one for errors).
  useEffect(() => {
    if (!notice) return;
    const type = notice.type === "success" ? "success" : notice.type === "error" ? "error" : "info";
    if (progressToast.current) {
      notify.update(progressToast.current, { type, message: notice.text, description: notice.hint || "", progress: undefined });
      progressToast.current = null;
    } else if (type === "error") {
      notify.error(notice.text, { description: notice.hint });
    }
  }, [notice]);

  // Live progress toast while certificates are generated.
  useEffect(() => {
    if (!job) {
      if (progressToast.current) {
        notify.dismiss(progressToast.current);
        progressToast.current = null;
      }
      return;
    }
    if (job.kind === "single") return;
    const progress = job.total ? job.done / job.total : 0;
    if (!progressToast.current) progressToast.current = notify.loading(job.label, { progress });
    else notify.update(progressToast.current, { message: job.label, progress });
  }, [job]);

  // ----- derived rows -----

  const rows = useMemo(
    () =>
      items.map((item) => {
        const previewEffective = effectiveLetter(previewLetter, item);
        const currentSignature = signatureOf(effectiveLetter(letter, item));
        const raw = statuses[item.id];
        return {
          item,
          letter: previewEffective,
          previewKey: JSON.stringify(toPreviewData(previewEffective.data)),
          // A status only applies while the certificate is unchanged since it was generated.
          status: raw && raw.signature === currentSignature ? raw : null,
        };
      }),
    [items, letter, previewLetter, statuses],
  );

  const counts = useMemo(() => {
    const result = { done: 0, error: 0 };
    rows.forEach((row) => {
      if (row.status?.state === "done") result.done += 1;
      if (row.status?.state === "error") result.error += 1;
    });
    return result;
  }, [rows]);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter(
      (row) =>
        (!query || row.item.name.toLowerCase().includes(query)) &&
        (!failedOnly || row.status?.state === "error"),
    );
  }, [rows, search, failedOnly]);

  useEffect(() => {
    if (failedOnly && counts.error === 0) setFailedOnly(false);
  }, [failedOnly, counts.error]);

  const numberById = useMemo(() => new Map(items.map((item, index) => [item.id, index + 1])), [items]);
  const checkedItems = useMemo(() => items.filter((item) => checked.has(item.id)), [items, checked]);
  const effectiveScope = checkedItems.length ? scope : "all";
  const targetItems = effectiveScope === "selected" ? checkedItems : items;
  const visibleCheckedCount = visibleRows.filter((row) => checked.has(row.item.id)).length;
  const allVisibleChecked = visibleRows.length > 0 && visibleCheckedCount === visibleRows.length;
  const parsedNames = useMemo(() => parseBulkNames(namesText), [namesText]);
  const sharedMissing = useMemo(
    () => missingLetterFields({ ...letter, data: { ...letter.data, candidateName: "-" } }),
    [letter],
  );
  const typeLabel = (LETTER_TYPE_LABEL[letter.docType] || "letter").toLowerCase();

  // ----- item actions -----

  const openItem = useCallback((id) => {
    setActiveId(id);
    setLightboxId(id);
  }, []);

  const toggleItem = useCallback((id) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllVisible = () => {
    setChecked((current) => {
      const next = new Set(current);
      visibleRows.forEach((row) => (allVisibleChecked ? next.delete(row.item.id) : next.add(row.item.id)));
      return next;
    });
  };

  const changeItem = useCallback((id, updater) => {
    setItems((current) => current.map((item) => (item.id === id ? updater(item) : item)));
  }, []);

  const deleteItems = useCallback(
    (ids) => {
      const idSet = new Set(ids);
      let removed = [];
      setItems((current) => {
        removed = current.map((item, index) => ({ item, index })).filter(({ item }) => idSet.has(item.id));
        return current.filter((item) => !idSet.has(item.id));
      });
      setChecked((current) => new Set([...current].filter((id) => !idSet.has(id))));
      setLightboxId((current) => (current && idSet.has(current) ? null : current));
      setActiveId((current) => (current && idSet.has(current) ? null : current));
      showToast("info", `Deleted ${plural(ids.length, "certificate")}.`, () => {
        setItems((current) => {
          const next = [...current];
          removed.forEach(({ item, index }) => next.splice(Math.min(index, next.length), 0, item));
          return next;
        });
      });
    },
    [showToast],
  );

  const clearAll = () => {
    const previous = items;
    setItems([]);
    setChecked(new Set());
    setLightboxId(null);
    setActiveId(null);
    setNotice(null);
    showToast("info", `Cleared ${plural(previous.length, "certificate")}.`, () => setItems(previous));
  };

  const generateAll = () => {
    if (!parsedNames.length) {
      showToast("error", "Paste at least one student name, one per line.");
      return;
    }
    const existing = new Set(items.map((item) => item.name.toLowerCase()));
    const repeated = parsedNames.filter((name) => existing.has(name.toLowerCase())).length;
    const created = parsedNames.map((name) => ({ id: crypto.randomUUID(), name, overrides: {} }));
    setItems((current) => [...current, ...created]);
    setNamesText("");
    setNotice(null);
    setMobileTab("certificates");
    showToast(
      "success",
      `Added ${plural(created.length, "certificate")}.${repeated ? ` ${plural(repeated, "name was", "names were")} already in the list.` : ""}`,
    );
  };

  // ----- generation -----

  const setStatus = (id, status) => setStatuses((current) => ({ ...current, [id]: status }));

  // Draws one letter in the hidden render area and waits until it can be captured.
  const renderFor = async (effective) => {
    flushSync(() => setRenderLetter(effective));
    const element = renderRef.current;
    if (!element || !element.textContent.includes(effective.data.candidateName)) {
      throw new Error(`The document for ${effective.data.candidateName} did not render.`);
    }
    await waitForImages(element);
    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    return element;
  };

  // Marks certificates that are missing required details. Returns true when all are complete.
  const checkComplete = (targets, outputFormat) => {
    const incomplete = targets
      .map((item) => {
        const effective = effectiveLetter(letter, item);
        return { item, effective, missing: missingLetterFields(effective) };
      })
      .filter((entry) => entry.missing.length);
    if (!incomplete.length) return true;
    setStatuses((current) => {
      const next = { ...current };
      incomplete.forEach(({ item, effective, missing }) => {
        next[item.id] = { state: "error", format: outputFormat, signature: signatureOf(effective), error: `Missing ${missing.join(", ")}` };
      });
      return next;
    });
    const fields = [...new Set(incomplete.flatMap((entry) => entry.missing))];
    setNotice({
      type: "error",
      text: `${plural(incomplete.length, "certificate is", "certificates are")} missing ${fields.join(", ")}. Nothing was generated.`,
      hint: fields.includes("College Name") ? "For College Name, choose a college from the list or press Enter to add it." : undefined,
      showFailed: true,
    });
    return false;
  };

  // Generates files for the given certificates one by one, reusing unchanged ones from the cache.
  const processItems = async (targets, outputFormat, { force = false, label = "Generating" } = {}) => {
    const snapshot = letter;
    cancelRef.current = false;
    setStatuses((current) => {
      const next = { ...current };
      targets.forEach((item) => {
        next[item.id] = { state: "queued", format: outputFormat, signature: signatureOf(effectiveLetter(snapshot, item)) };
      });
      return next;
    });

    const results = [];
    const failures = [];
    for (const [index, item] of targets.entries()) {
      if (cancelRef.current) break;
      const effective = effectiveLetter(snapshot, item);
      const signature = signatureOf(effective);
      setJob((current) => current && {
        ...current,
        done: index,
        label: `${label} ${index + 1} of ${targets.length}: ${item.name}`,
      });

      const cached = cacheRef.current.get(item.id)?.[outputFormat];
      if (!force && cached?.signature === signature) {
        setStatus(item.id, { state: "done", format: outputFormat, signature });
        results.push({ item, effective, asset: cached });
        continue;
      }

      setStatus(item.id, { state: "working", format: outputFormat, signature });
      try {
        const element = await renderFor(effective);
        // Keep what was captured (page image / Word layout); files are built from it on demand,
        // either one per certificate or all combined into one document.
        const asset = outputFormat === "word"
          ? { signature, layout: captureLetterLayout(element) }
          : { signature, image: await captureLetterImage(element, CAPTURE_OPTIONS) };
        cacheRef.current.set(item.id, { ...cacheRef.current.get(item.id), [outputFormat]: asset });
        setStatus(item.id, { state: "done", format: outputFormat, signature });
        results.push({ item, effective, asset });
      } catch (error) {
        console.error(error);
        const message = error?.message || "Could not generate this certificate.";
        setStatus(item.id, { state: "error", format: outputFormat, signature, error: message });
        failures.push({ item, error: message });
      }
    }

    const cancelled = cancelRef.current;
    if (cancelled) {
      const doneIds = new Set([...results, ...failures].map((entry) => entry.item.id));
      setStatuses((current) => {
        const next = { ...current };
        targets.forEach((item) => {
          if (!doneIds.has(item.id)) delete next[item.id];
        });
        return next;
      });
    }
    setRenderLetter(null);
    setJob((current) => current && { ...current, done: results.length + failures.length });
    return { results, failures, cancelled };
  };

  // The individual file for one certificate, built once from its captured asset and then reused.
  const assetBlob = async (asset, outputFormat) => {
    if (!asset.blob) {
      asset.blob = outputFormat === "word"
        ? await buildLettersDocx([asset.layout])
        : createPdfFromImages([asset.image]).output("blob");
    }
    return asset.blob;
  };

  const download = async (outputFormat) => {
    if (busy) return;
    const targets = targetItems;
    const combine = downloadMode === "combined";
    setFormat(outputFormat);
    setNotice(null);
    if (!targets.length) {
      setNotice({ type: "error", text: "There are no certificates to download. Paste names and click Generate all first." });
      return;
    }
    if (!checkComplete(targets, outputFormat)) return;

    const total = targets.length;
    const formatLabel = FORMAT_LABEL[outputFormat];
    setJob({ kind: "download", format: outputFormat, done: 0, total, label: "Starting…" });
    try {
      const { results, failures, cancelled } = await processItems(targets, outputFormat);
      if (cancelled) {
        setNotice({
          type: "info",
          text: `Stopped after ${results.length} of ${total}. Finished certificates are kept and will be reused next time.`,
        });
        return;
      }
      if (failures.length) {
        setNotice({
          type: "error",
          text: `${plural(failures.length, "certificate")} of ${total} failed, so nothing was downloaded. Select the failed ones and click Regenerate, or try again.`,
          showFailed: true,
        });
        return;
      }
      if (results.length !== total) {
        throw new Error(`Only ${results.length} of ${total} certificates were generated.`);
      }

      let fileName;
      let successText;
      if (combine) {
        // One document, one certificate per page, in list order.
        setJob((current) => ({ ...current, done: total, label: `Combining ${total} certificates into one ${formatLabel} file…` }));
        let blob;
        if (outputFormat === "word") {
          blob = await buildLettersDocx(results.map((entry) => entry.asset.layout));
        } else {
          const pdf = createPdfFromImages(results.map((entry) => entry.asset.image));
          const pages = pdf.getNumberOfPages();
          if (pages !== total) throw new Error(`The PDF has ${pages} pages but ${total} certificates were expected.`);
          blob = pdf.output("blob");
        }
        fileName = `${bulkFileBase(letter)}.${EXTENSION[outputFormat]}`;
        downloadBlob(blob, fileName);
        successText = `Downloaded "${fileName}" with ${plural(total, "certificate")}, one per page.`;
      } else if (total === 1) {
        // A single certificate is downloaded as-is; a ZIP would only add a step.
        const [entry] = results;
        fileName = uniqueFileNames([entry.item.name], EXTENSION[outputFormat])[0];
        downloadBlob(await assetBlob(entry.asset, outputFormat), fileName);
        successText = `Downloaded "${fileName}".`;
      } else {
        setJob((current) => ({ ...current, done: total, label: "Packing the ZIP file…" }));
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        const fileNames = uniqueFileNames(results.map((entry) => entry.item.name), EXTENSION[outputFormat]);
        for (const [index, entry] of results.entries()) {
          zip.file(fileNames[index], await assetBlob(entry.asset, outputFormat));
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Read the finished ZIP back and make sure every certificate is in it.
        const packed = Object.values((await JSZip.loadAsync(zipBlob)).files)
          .filter((file) => !file.dir)
          .map((file) => file.name);
        const absent = fileNames.filter((name) => !packed.includes(name));
        if (packed.length !== total || absent.length) {
          throw new Error(`The ZIP has ${packed.length} of ${total} files. Missing: ${absent.join(", ")}`);
        }
        fileName = zipFileName(letter);
        downloadBlob(zipBlob, fileName);
        successText = `Downloaded "${fileName}" with ${total} ${formatLabel} files.`;
      }

      setJob((current) => ({ ...current, label: "Adding to Certificate logs…" }));
      const failedLogs = await runPool(results, 4, (entry) => saveCertificateLog(entry.effective));
      setNotice({
        type: "success",
        text: successText,
        hint: failedLogs ? `${failedLogs} of ${total} could not be added to Certificate logs.` : undefined,
      });
    } catch (error) {
      console.error(error);
      setNotice({ type: "error", text: `Could not create the download. ${error?.message || "Please try again."}` });
    } finally {
      setJob(null);
    }
  };

  const regenerateSelected = async (outputFormat) => {
    if (busy || !checkedItems.length) return;
    setFormat(outputFormat);
    setNotice(null);
    if (!checkComplete(checkedItems, outputFormat)) return;
    setJob({ kind: "regenerate", format: outputFormat, done: 0, total: checkedItems.length, label: "Starting…" });
    try {
      const { results, failures, cancelled } = await processItems(checkedItems, outputFormat, { force: true, label: "Regenerating" });
      setNotice(
        failures.length
          ? { type: "error", text: `${plural(failures.length, "certificate")} failed to regenerate.`, showFailed: true }
          : {
              type: cancelled ? "info" : "success",
              text: `${cancelled ? "Stopped. " : ""}Regenerated ${plural(results.length, "certificate")} as ${FORMAT_LABEL[outputFormat]}. They will be reused in the next download.`,
            },
      );
    } finally {
      setJob(null);
    }
  };

  const downloadOne = async (id, outputFormat) => {
    const item = items.find((entry) => entry.id === id);
    if (!item || busy) return;
    setNotice(null);
    if (!checkComplete([item], outputFormat)) return;
    setJob({ kind: "single", format: outputFormat, done: 0, total: 1, label: "Starting…" });
    try {
      const { results, failures } = await processItems([item], outputFormat);
      if (failures.length || !results.length) {
        setNotice({ type: "error", text: `Could not create the ${FORMAT_LABEL[outputFormat]} file for ${item.name}.` });
        return;
      }
      const [{ effective, asset }] = results;
      downloadBlob(await assetBlob(asset, outputFormat), uniqueFileNames([item.name], EXTENSION[outputFormat])[0]);
      try {
        await saveCertificateLog(effective);
      } catch (error) {
        console.error(error);
      }
      showToast("success", `Downloaded ${item.name}.`);
    } finally {
      setJob(null);
    }
  };

  // ----- lightbox navigation -----

  const lightboxIndex = visibleRows.findIndex((row) => row.item.id === lightboxId);
  const lightboxRow = lightboxIndex >= 0 ? visibleRows[lightboxIndex] : rows.find((row) => row.item.id === lightboxId);
  const stepLightbox = useCallback(
    (step) => {
      if (!visibleRows.length) return;
      const index = visibleRows.findIndex((row) => row.item.id === lightboxId);
      const next = visibleRows[(Math.max(index, 0) + step + visibleRows.length) % visibleRows.length];
      setLightboxId(next.item.id);
      setActiveId(next.item.id);
    },
    [visibleRows, lightboxId],
  );
  const closeLightbox = useCallback(() => setLightboxId(null), []);
  const prevLightbox = useCallback(() => stepLightbox(-1), [stepLightbox]);
  const nextLightbox = useCallback(() => stepLightbox(1), [stepLightbox]);

  // ----- render -----

  const percent = job ? Math.round((job.done / Math.max(job.total, 1)) * 100) : 0;
  const downloadCount = targetItems.length;
  const downloadSummary = downloadMode === "combined"
    ? `1 file with ${plural(downloadCount, "page")}, one per certificate`
    : downloadCount === 1
      ? "1 file"
      : `${downloadCount} separate files in one ZIP`;

  return createPortal(
    <>
      {/* Hidden render area: each certificate is drawn here at full size, captured, then replaced. */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", left: 0, top: 0, width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        <div ref={renderRef} style={{ width: 794 }}>
          {renderLetter && RenderTemplate && (
            <RenderTemplate
              key={renderLetter.data.candidateName}
              data={toPreviewData(renderLetter.data)}
              type={renderLetter.docType}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="bulk-workspace"
            data-bulk-workspace=""
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-to-br from-[#f4edff] via-[#fbf9ff] to-[#eef0ff] text-gray-800"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bulk-generator-title"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#9B59B6]/25 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-300/25 blur-3xl" />

            {/* Header */}
            <header className="relative z-10 flex items-center gap-3 border-b border-white/70 bg-white/60 px-4 py-3 backdrop-blur-xl sm:px-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6A0DAD] to-[#9B59B6] text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.8)]">
                <FiUsers size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="bulk-generator-title" className="text-lg font-bold leading-tight text-gray-900">Bulk Generator</h2>
                <p className="hidden truncate text-xs text-gray-500 sm:block">
                  Set the details once, add student names, and download every certificate in one ZIP.
                </p>
              </div>
              {items.length > 0 && (
                <button type="button" onClick={clearAll} disabled={busy} className="bulk-btn-secondary hidden !py-2 sm:inline-flex">
                  <FiTrash2 /> Clear all
                </button>
              )}
              <button type="button" onClick={onClose} disabled={busy} className="bulk-icon-btn" aria-label="Close Bulk Generator" title={busy ? "Wait for generation to finish" : "Close (Esc)"}>
                <FiX size={18} />
              </button>
            </header>

            {/* Mobile / tablet tabs */}
            <div className="relative z-10 flex justify-center border-b border-white/70 bg-white/40 px-4 py-2 backdrop-blur lg:hidden">
              <Segmented
                label="Workspace view"
                value={mobileTab}
                onChange={setMobileTab}
                options={[
                  { value: "settings", label: "Details & names", icon: <FiSliders /> },
                  { value: "certificates", label: `Certificates (${items.length})`, icon: <FiGrid /> },
                ]}
              />
            </div>

            <div className="relative z-10 min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
              {/* LEFT: certificate previews */}
              <section
                className={`${mobileTab === "certificates" ? "flex" : "hidden"} h-full min-h-0 flex-col lg:flex`}
                aria-label="Certificate previews"
              >
                <div className="space-y-3 border-b border-white/70 bg-white/40 px-4 py-3 backdrop-blur-xl sm:px-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">Certificates</h3>
                      <span className="rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] px-2.5 py-0.5 text-xs font-bold text-white" data-total-count={items.length}>
                        {items.length}
                      </span>
                    </div>
                    {counts.done > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <FiCheckCircle /> {counts.done} ready
                      </span>
                    )}
                    {counts.error > 0 && (
                      <button
                        type="button"
                        onClick={() => setFailedOnly((value) => !value)}
                        aria-pressed={failedOnly}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                          failedOnly ? "bg-red-600 text-white" : "bg-red-50 text-red-700 hover:bg-red-100"
                        }`}
                        title={failedOnly ? "Show all certificates" : "Show only failed certificates"}
                      >
                        <FiAlertCircle /> {counts.error} failed
                      </button>
                    )}
                    <div className="ml-auto">
                      <Segmented
                        label="Preview layout"
                        value={view}
                        onChange={setView}
                        options={[
                          { value: "grid", label: "Grid", icon: <FiGrid />, title: "Grid view" },
                          { value: "list", label: "List", icon: <FiList />, title: "List view" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                      <SelectCheckbox
                        checked={allVisibleChecked}
                        indeterminate={visibleCheckedCount > 0 && !allVisibleChecked}
                        onChange={toggleAllVisible}
                        label="Select all shown certificates"
                      />
                      Select all
                    </label>
                    <div className="relative min-w-[12rem] flex-1">
                      <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search names"
                        aria-label="Search names"
                        className="w-full rounded-xl border border-purple-100 bg-white/80 py-2 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {checked.size > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-purple-200 bg-purple-50/80 px-3 py-2 text-sm">
                          <span className="font-semibold text-purple-900">{checked.size} selected</span>
                          <span className="hidden text-purple-300 sm:inline">|</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#552586]">
                            <FiRefreshCw aria-hidden="true" /> Regenerate
                          </span>
                          {["pdf", "word"].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => regenerateSelected(value)}
                              disabled={busy}
                              className="rounded-lg border border-purple-200 bg-white/80 px-2 py-0.5 text-xs font-semibold text-[#552586] transition hover:bg-white disabled:opacity-50"
                              title={`Create fresh ${FORMAT_LABEL[value]} files for the selected certificates`}
                              aria-label={`Regenerate selected as ${FORMAT_LABEL[value]}`}
                            >
                              {FORMAT_LABEL[value]}
                            </button>
                          ))}
                          <button type="button" onClick={() => deleteItems([...checked])} disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-semibold text-red-600 transition hover:bg-white disabled:opacity-50">
                            <FiTrash2 /> Delete
                          </button>
                          <button type="button" onClick={() => setChecked(new Set())} className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-gray-500 transition hover:bg-white hover:text-gray-800">
                            <FiX /> Clear selection
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6" data-preview-scroll>
                  {items.length === 0 ? (
                    <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-dashed border-purple-200 bg-white/50 px-6 py-12 text-center backdrop-blur">
                      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-[#6A0DAD]">
                        <FiInbox size={24} />
                      </span>
                      <h4 className="font-semibold text-gray-900">No certificates yet</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Fill in the details, paste student names on the {""}
                        <span className="hidden lg:inline">right</span>
                        <span className="lg:hidden">Details &amp; names tab</span>, then click <strong>Generate all</strong>.
                      </p>
                      <button type="button" onClick={() => setMobileTab("settings")} className="bulk-btn-secondary mt-5 lg:hidden">
                        <FiSliders /> Go to details
                      </button>
                    </div>
                  ) : visibleRows.length === 0 ? (
                    <p className="mt-10 text-center text-sm text-gray-500">No certificates match your search.</p>
                  ) : view === "grid" ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
                      {visibleRows.map((row) => (
                        <CertificateCard
                          key={row.item.id}
                          row={row}
                          number={numberById.get(row.item.id)}
                          active={row.item.id === activeId}
                          checked={checked.has(row.item.id)}
                          onOpen={openItem}
                          onToggle={toggleItem}
                          onDelete={deleteItems}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {visibleRows.map((row) => (
                        <CertificateRow
                          key={row.item.id}
                          row={row}
                          number={numberById.get(row.item.id)}
                          active={row.item.id === activeId}
                          checked={checked.has(row.item.id)}
                          onOpen={openItem}
                          onToggle={toggleItem}
                          onDelete={deleteItems}
                        />
                      ))}
                    </div>
                  )}
                  {items.length > 0 && visibleRows.length !== items.length && (
                    <p className="mt-4 text-center text-xs text-gray-500">
                      Showing {visibleRows.length} of {items.length}
                    </p>
                  )}
                </div>
              </section>

              {/* RIGHT: control panel */}
              <aside
                className={`${mobileTab === "settings" ? "flex" : "hidden"} h-full min-h-0 flex-col border-white/70 lg:flex lg:border-l`}
                aria-label="Bulk generation controls"
              >
                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5" data-controls-scroll>
                  <PanelSection icon={<FiFileText />} title="Certificate details" hint="Shared by every certificate. Previews update as you type.">
                    <LetterDetailsForm
                      letter={letter}
                      onChange={(next) => setLetter({ ...next, id: "bulk" })}
                      idPrefix="bulk"
                      hideCandidateName
                      variant="glass"
                    />
                    {sharedMissing.length > 0 && (
                      <p className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs text-amber-800">
                        <FiInfo className="mt-0.5 shrink-0" />
                        <span>
                          Needed before download: <strong>{sharedMissing.join(", ")}</strong>.
                          {sharedMissing.includes("College Name") && " Choose a college from the list or press Enter to add it."}
                        </span>
                      </p>
                    )}
                  </PanelSection>

                  <PanelSection icon={<FiUsers />} title="Student names" hint="One name per line. Names become Title Case; blank lines and extra spaces are ignored.">
                    <textarea
                      id="bulk-names"
                      rows={6}
                      value={namesText}
                      onChange={(event) => setNamesText(event.target.value)}
                      placeholder={"Gouri Patil\nPrajwal Pachbudhe\nHarshal Ganvir\nArpit Wasnik\nDhruv Gajbhiye"}
                      className="w-full resize-y rounded-xl border border-purple-100 bg-white/80 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-200"
                    />
                    {parsedNames.length > 0 && (
                      <div className="flex flex-wrap gap-1.5" aria-label="Names to add">
                        {parsedNames.slice(0, 12).map((name, index) => (
                          <span key={`${name}-${index}`} className="rounded-full border border-purple-100 bg-white/80 px-2.5 py-0.5 text-xs text-gray-700">
                            {name}
                          </span>
                        ))}
                        {parsedNames.length > 12 && (
                          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                            +{parsedNames.length - 12} more
                          </span>
                        )}
                      </div>
                    )}
                    <button type="button" onClick={generateAll} disabled={!parsedNames.length} className="bulk-btn-primary w-full">
                      <FiZap />
                      {parsedNames.length ? `Generate all (${parsedNames.length})` : "Generate all"}
                    </button>
                  </PanelSection>

                  <PanelSection icon={<FiDownload />} title="Download" hint="Choose how the certificates are delivered, then pick PDF or Word.">
                    <fieldset className="space-y-2" disabled={busy}>
                      <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Download mode</legend>
                      {[
                        {
                          value: "individual",
                          icon: <FiCopy />,
                          title: "Individual certificates",
                          badge: "Default",
                          text: `One file per student. Two or more come packed in one ZIP.`,
                        },
                        {
                          value: "combined",
                          icon: <FiLayers />,
                          title: "Combine all into one file",
                          text: `Every ${typeLabel} on its own page in a single PDF or Word file.`,
                        },
                      ].map((option) => {
                        const selected = downloadMode === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition duration-200 ${
                              selected
                                ? "border-purple-300 bg-purple-50/80 shadow-[0_0_0_3px_rgba(155,89,182,0.18)]"
                                : "border-purple-100 bg-white/60 hover:border-purple-200 hover:bg-white/80"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bulk-download-mode"
                              value={option.value}
                              checked={selected}
                              onChange={() => setDownloadMode(option.value)}
                              className="mt-1 h-4 w-4 accent-[#6A0DAD]"
                            />
                            <span className={`mt-0.5 ${selected ? "text-[#6A0DAD]" : "text-gray-400"}`}>{option.icon}</span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                {option.title}
                                {option.badge && (
                                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-purple-700">
                                    {option.badge}
                                  </span>
                                )}
                              </span>
                              <span className="block text-xs text-gray-500">{option.text}</span>
                            </span>
                          </label>
                        );
                      })}
                    </fieldset>
                    {checkedItems.length > 0 && (
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Include</span>
                        <Segmented
                          label="Certificates to include"
                          value={effectiveScope}
                          onChange={setScope}
                          disabled={busy}
                          options={[
                            { value: "all", label: `All (${items.length})` },
                            { value: "selected", label: `Selected (${checkedItems.length})` },
                          ]}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 px-3 py-2.5" data-download-summary>
                      <span className="flex h-10 min-w-[2.5rem] items-center justify-center rounded-xl bg-gradient-to-br from-[#6A0DAD] to-[#9B59B6] px-2 text-base font-bold text-white">
                        {downloadCount}
                      </span>
                      <span className="min-w-0 text-sm leading-tight">
                        <span className="block font-semibold text-gray-900">
                          {downloadCount === 1 ? `${typeLabel} ready to download` : `${typeLabel}s ready to download`}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {downloadCount ? `You will get ${downloadSummary}.` : "Add names first."}
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => download("pdf")} disabled={busy || !downloadCount} className="bulk-btn-primary" data-download="pdf">
                        <FiDownload /> Download PDF
                      </button>
                      <button type="button" onClick={() => download("word")} disabled={busy || !downloadCount} className="bulk-btn-secondary" data-download="word">
                        <FiFileText /> Download Word
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Unchanged certificates that were already generated are reused, so repeat downloads are faster.
                    </p>
                  </PanelSection>
                </div>

                {/* Sticky status area */}
                <AnimatePresence initial={false}>
                  {(job || notice) && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="border-t border-white/70 bg-white/75 p-4 backdrop-blur-xl sm:px-5"
                    >
                      {job ? (
                        <div className="space-y-2" role="status" aria-live="polite" data-job-progress>
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="min-w-0 truncate font-medium text-gray-800">{job.label}</span>
                            <span className="shrink-0 tabular-nums font-semibold text-[#552586]">{percent}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-purple-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] transition-[width] duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          {job.total > 1 && job.done < job.total && (
                            <button
                              type="button"
                              onClick={() => {
                                cancelRef.current = true;
                              }}
                              className="text-xs font-semibold text-gray-500 transition hover:text-red-600"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      ) : (
                        <div
                          className={`flex items-start gap-2 rounded-xl px-3 py-2 text-sm ${
                            notice.type === "success"
                              ? "bg-emerald-50 text-emerald-800"
                              : notice.type === "error"
                                ? "bg-red-50 text-red-800"
                                : "bg-purple-50 text-purple-900"
                          }`}
                          role={notice.type === "error" ? "alert" : "status"}
                          data-notice={notice.type}
                        >
                          {notice.type === "success" ? <FiCheckCircle className="mt-0.5 shrink-0" /> : notice.type === "error" ? <FiAlertCircle className="mt-0.5 shrink-0" /> : <FiInfo className="mt-0.5 shrink-0" />}
                          <div className="min-w-0 flex-1 space-y-1">
                            <p>{notice.text}</p>
                            {notice.hint && <p className="text-xs opacity-80">{notice.hint}</p>}
                            {notice.showFailed && counts.error > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setFailedOnly(true);
                                  setMobileTab("certificates");
                                }}
                                className="text-xs font-semibold underline underline-offset-2"
                              >
                                Show failed certificates
                              </button>
                            )}
                          </div>
                          <button type="button" onClick={() => setNotice(null)} className="shrink-0 opacity-60 transition hover:opacity-100" aria-label="Dismiss">
                            <FiX />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </aside>
            </div>

            <AnimatePresence>
              {lightboxRow && (
                <CertificateLightbox
                  key="lightbox"
                  row={lightboxRow}
                  position={lightboxIndex >= 0 ? lightboxIndex + 1 : numberById.get(lightboxRow.item.id)}
                  total={lightboxIndex >= 0 ? visibleRows.length : items.length}
                  sharedLetter={letter}
                  busy={busy}
                  onClose={closeLightbox}
                  onPrev={prevLightbox}
                  onNext={nextLightbox}
                  onChangeItem={changeItem}
                  onDelete={deleteItems}
                  onDownload={downloadOne}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
