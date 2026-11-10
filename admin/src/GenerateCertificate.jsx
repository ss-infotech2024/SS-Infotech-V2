import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Copy, Download, FileText, Info, PenLine, Plus, Trash2 } from "lucide-react";
import LetterDetailsForm from "./components/LetterDetailsForm";
import { IconButton, PageHeader, Spinner } from "./components/ui/kit";
import { toast } from "./components/ui/toast";
import { confirmDialog } from "./components/ui/confirm";
import BulkGenerator from "./components/BulkGenerator/BulkGenerator";
import { downloadLetterAsWord } from "./lib/wordExport";
import {
  DOC_TYPES,
  ROLE_BY_TEMPLATE,
  createLetter,
  createLetterPdf,
  datesFromInternshipStart,
  parseISODate,
  safeFileName,
  saveCertificateLog,
  templateFromJobTitle,
  templateSetFor,
  toPreviewData,
} from "./lib/letters";

// Re-exported for existing importers (e.g. pages/AdminApplications.jsx).
export { DOC_TYPES, ROLE_BY_TEMPLATE, templateFromJobTitle };
export { parseBulkNames, toTitleCase } from "./lib/letters";

const EditableOfferPreview = React.memo(function EditableOfferPreview({ Template, previewKey, docType }) {
  const sourceRef = useRef(null);
  const hostRef = useRef(null);
  const data = useMemo(() => JSON.parse(previewKey), [previewKey]);

  useEffect(() => {
    if (!sourceRef.current || !hostRef.current || !Template) return;
    hostRef.current.innerHTML = sourceRef.current.innerHTML;
  }, [Template, docType, previewKey]);

  if (!Template) {
    return <p className="text-red-500 text-center">Selected template not found!</p>;
  }

  return (
    <>
      <div ref={sourceRef} aria-hidden="true" style={{ display: "none" }}>
        <Template data={data} type={docType} />
      </div>
      <div
        ref={hostRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        className="letter-editor bg-white outline-none"
        style={{ width: 794, minHeight: 1123 }}
        onKeyDown={(event) => {
          if (event.key !== "Enter" || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
          event.preventDefault();
          document.execCommand("insertLineBreak");
        }}
      />
    </>
  );
});

function certificateStateFromLocation(state) {
  const templateName = ROLE_BY_TEMPLATE[state?.templateName]
    ? state.templateName
    : "Web Developer";
  const docType = Object.values(DOC_TYPES).includes(state?.docType)
    ? state.docType
    : DOC_TYPES.offer;
  const dates = datesFromInternshipStart(state?.internshipFrom);
  const initialLetters = Array.isArray(state?.applications)
    ? state.applications.map((application) => {
        const applicationTemplate = ROLE_BY_TEMPLATE[application?.templateName]
          ? application.templateName
          : templateFromJobTitle(application?.position || "");
        const applicationDates = datesFromInternshipStart(application?.internshipFrom);
        return {
          docType: DOC_TYPES.offer,
          templateName: applicationTemplate,
          data: {
            candidateName: (application?.candidateName || "").trim(),
            companyName: application?.companyName || "SS Infotech Pvt. Ltd.",
            internshipFrom: applicationDates.internshipFrom,
            internshipTo: applicationDates.internshipTo,
            issuedDate: parseISODate(application?.issuedDate) ? application.issuedDate : applicationDates.issuedDate,
            position: application?.position || ROLE_BY_TEMPLATE[applicationTemplate],
            collegeName: application?.collegeName || "",
            supervisorName: "Mr Viraj Patle",
          },
        };
      })
    : [];

  return {
    docType,
    templateName,
    fromApplication: Boolean(state?.fromApplication),
    initialLetters,
    data: {
      candidateName: (state?.candidateName || "").trim(),
      companyName: state?.companyName || "SS Infotech Pvt. Ltd.",
      internshipFrom: dates.internshipFrom,
      internshipTo: parseISODate(state?.internshipTo) ? state.internshipTo : dates.internshipTo,
      position: state?.position || ROLE_BY_TEMPLATE[templateName],
      issuedDate: parseISODate(state?.issuedDate) ? state.issuedDate : dates.issuedDate,
      collegeName: state?.collegeName || "",
      supervisorName: state?.supervisorName || "Mr Viraj Patle",
    },
  };
}

function ScaledLetterPreview({ captureRef, children }) {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const update = () => {
      const style = getComputedStyle(frame);
      const available = frame.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setScale(available > 0 ? Math.min(1, available / 794) : 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="w-full overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#f1ecfb,#e9eefb)] px-3 py-5 shadow-inner sm:px-5">
      <div className="mx-auto overflow-hidden rounded-lg shadow-[0_24px_60px_-28px_rgba(43,10,85,0.45)] ring-1 ring-black/5" style={{ width: 794 * scale, height: 1123 * scale }}>
        <div data-letter-scale="" style={{ width: 794, height: 1123, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <div ref={captureRef}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function LetterCard({ letter, index, total, canRemove, onChange, onDuplicate, onRemove }) {
  const ref = useRef(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [wordBusy, setWordBusy] = useState(false);
  const { docType, templateName, data } = letter;
  const TemplateComponent = templateSetFor(docType)[templateName];
  const previewData = toPreviewData(data);
  const isOffer = docType === DOC_TYPES.offer;
  const kind = isOffer ? "offer letter" : "completion certificate";

  const downloadFileName = () => safeFileName(data.candidateName);

  const logDownload = async () => {
    try {
      await saveCertificateLog(letter);
    } catch (error) {
      console.error(error);
      toast.warning("Downloaded, but not added to Certificate logs", {
        description: "The letter was downloaded, but it could not be added to Certificate logs.",
      });
    }
  };

  const downloadPdf = async () => {
    if (!ref.current || pdfBusy) return;
    setPdfBusy(true);
    const id = toast.loading(`Creating ${kind} PDF…`);
    try {
      const pdf = await createLetterPdf(ref.current);
      pdf.save(`${downloadFileName()}.pdf`);
      toast.update(id, { type: "success", message: `Downloaded ${downloadFileName()}.pdf` });
      await logDownload();
    } catch (error) {
      console.error(error);
      toast.update(id, { type: "error", message: "Could not create the PDF. Please try again." });
    } finally {
      setPdfBusy(false);
    }
  };

  const downloadWord = async () => {
    if (!ref.current || wordBusy) return;
    setWordBusy(true);
    const id = toast.loading(`Creating ${kind} Word file…`);
    try {
      await downloadLetterAsWord(ref.current, downloadFileName());
      toast.update(id, { type: "success", message: `Downloaded ${downloadFileName()}.docx` });
      await logDownload();
    } catch (error) {
      console.error(error);
      toast.update(id, { type: "error", message: "Could not create the Word document. Please try again." });
    } finally {
      setWordBusy(false);
    }
  };

  const remove = async () => {
    const ok = await confirmDialog({
      title: "Remove this letter?",
      description: data.candidateName ? `The letter for ${data.candidateName} will be removed from this page.` : "This letter will be removed from this page.",
      confirmText: "Remove letter",
    });
    if (ok) onRemove();
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card overflow-hidden"
      aria-label={`Letter ${index + 1}${data.candidateName ? ` for ${data.candidateName}` : ""}`}
    >
      <div className="grid xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        {/* Details */}
        <div className="space-y-5 border-b border-[#ebe6f7] p-5 sm:p-6 xl:border-b-0 xl:border-r">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#c084fc] text-sm font-extrabold text-white shadow-glow-sm">
                {index + 1}
              </span>
              <div className="leading-tight">
                <p className="font-bold text-ink">{data.candidateName || "New letter"}</p>
                <p className="text-xs text-ink-muted">{isOffer ? "Offer letter" : "Completion certificate"} · {templateName}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <IconButton label="Duplicate letter" icon={Copy} onClick={onDuplicate} />
              {canRemove && <IconButton label="Remove letter" icon={Trash2} tone="danger" onClick={remove} />}
            </div>
          </div>

          <LetterDetailsForm letter={letter} onChange={onChange} idPrefix={letter.id} />

          <div className="grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={downloadPdf} disabled={pdfBusy} className="btn-primary" data-tooltip={`Download this ${kind} as a PDF`}>
              {pdfBusy ? <Spinner /> : <Download size={16} aria-hidden="true" />}
              {isOffer ? "Download offer letter" : "Download completion certificate"}
            </button>
            <button type="button" onClick={downloadWord} disabled={wordBusy} className="btn-secondary" data-tooltip="Download an editable Word (.docx) file">
              {wordBusy ? <Spinner /> : <FileText size={16} aria-hidden="true" />}
              {wordBusy ? "Preparing Word file…" : "Download as Word"}
            </button>
          </div>
          {total > 1 && <p className="text-center text-[11px] text-ink-faint">Letter {index + 1} of {total}</p>}
        </div>

        {/* Preview */}
        <div className="min-w-0 space-y-3 bg-white/30 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-bold text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live preview
            </p>
            <span className="badge-neutral">A4 · 794 × 1123</span>
          </div>
          {isOffer && (
            <p className="flex items-start gap-2 rounded-xl bg-sky-500/[0.08] px-3 py-2 text-xs text-sky-900">
              <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                Click the offer letter and type to change the wording. Those edits are included in the download.
                Changing the form, role, or document type rebuilds the letter, so set the details first.
              </span>
            </p>
          )}
          <ScaledLetterPreview captureRef={ref}>
            {isOffer ? (
              <EditableOfferPreview
                Template={TemplateComponent}
                previewKey={JSON.stringify(previewData)}
                docType={docType}
              />
            ) : TemplateComponent ? (
              <TemplateComponent key={`${docType}-${templateName}`} data={previewData} type={docType} />
            ) : (
              <p className="text-red-500 text-center">Selected template not found!</p>
            )}
          </ScaledLetterPreview>
        </div>
      </div>
    </motion.section>
  );
}

const GenerateCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = certificateStateFromLocation(location.state);
  const [letters, setLetters] = useState(() =>
    initial.initialLetters.length
      ? initial.initialLetters.map((letter) => createLetter(letter))
      : [createLetter(initial)]
  );
  const [bulkOpen, setBulkOpen] = useState(() => Boolean(location.state?.openBulk));

  // Open the Bulk Generator when navigated here with { openBulk: true } (sidebar, dashboard, ⌘K).
  useEffect(() => {
    if (location.state?.openBulk) setBulkOpen(true);
  }, [location.key, location.state]);

  const closeBulk = useCallback(() => {
    setBulkOpen(false);
    if (location.state?.openBulk) {
      navigate(location.pathname, { replace: true, state: { ...location.state, openBulk: false } });
    }
  }, [location.pathname, location.state, navigate]);

  const updateLetter = (id, nextLetter) => {
    setLetters((current) => current.map((letter) => (letter.id === id ? nextLetter : letter)));
  };

  const addLetter = () => {
    setLetters((current) => [...current, createLetter()]);
    requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  };

  const duplicateLetter = (id) => {
    setLetters((current) => {
      const index = current.findIndex((letter) => letter.id === id);
      if (index === -1) return current;
      const copy = createLetter(current[index]);
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
    toast.success("Letter duplicated");
  };

  const removeLetter = (id) => {
    setLetters((current) => (current.length <= 1 ? current : current.filter((letter) => letter.id !== id)));
  };

  return (
    <div className="page">
      <PageHeader
        icon={Award}
        eyebrow="Certificates"
        title="Letters"
        description="Create offer letters and completion certificates with a live A4 preview, then download PDF or Word."
        actions={
          <>
            <button type="button" onClick={addLetter} className="btn-primary" data-tooltip="Add another letter to this page">
              <Plus size={16} aria-hidden="true" />
              Add another letter
            </button>
          </>
        }
      />

      {initial.fromApplication && (
        <p className="flex items-start gap-2 rounded-2xl border border-[#ddd6fe] bg-[#7c3aed]/[0.06] px-4 py-3 text-sm text-[#4c1d95]">
          <PenLine size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            {initial.initialLetters.length > 1
              ? `Filled from ${initial.initialLetters.length} selected job applications.`
              : `Filled from the job application for ${letters[0]?.data.candidateName || "this applicant"}.`}{" "}
            Internship dates are prefilled and can be changed.
          </span>
        </p>
      )}

      <BulkGenerator open={bulkOpen} onClose={closeBulk} />

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {letters.map((letter, index) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              index={index}
              total={letters.length}
              canRemove={letters.length > 1}
              onChange={(nextLetter) => updateLetter(letter.id, nextLetter)}
              onDuplicate={() => duplicateLetter(letter.id)}
              onRemove={() => removeLetter(letter.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GenerateCertificate;
