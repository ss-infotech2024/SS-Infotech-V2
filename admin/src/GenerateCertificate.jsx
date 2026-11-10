import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCopy, FaFileWord, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import LetterDetailsForm from "./components/LetterDetailsForm";
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
      const available = frame.clientWidth;
      setScale(available > 0 ? Math.min(1, available / 794) : 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="w-full overflow-hidden bg-gray-100 py-6">
      <div className="mx-auto" style={{ width: 794 * scale, height: 1123 * scale }}>
        <div style={{ width: 794, height: 1123, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <div ref={captureRef}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function LetterCard({ letter, canRemove, sideBySide, onChange, onDuplicate, onRemove }) {
  const ref = useRef(null);
  const [downloadError, setDownloadError] = useState("");
  const [logNote, setLogNote] = useState("");
  const [wordBusy, setWordBusy] = useState(false);
  const { docType, templateName, data } = letter;
  const TemplateComponent = templateSetFor(docType)[templateName];
  const previewData = toPreviewData(data);
  const isOffer = docType === DOC_TYPES.offer;

  const downloadPdf = async () => {
    if (!ref.current) return;
    setDownloadError("");
    setLogNote("");
    try {
      const pdf = await createLetterPdf(ref.current);
      pdf.save(`${downloadFileName()}.pdf`);
      await logDownload();
    } catch (error) {
      console.error(error);
      setDownloadError("Could not create the PDF. Please try again.");
    }
  };

  const downloadFileName = () => safeFileName(data.candidateName);

  const logDownload = async () => {
    try {
      await saveCertificateLog(letter);
    } catch (error) {
      console.error(error);
      setLogNote("The letter was downloaded, but it could not be added to Certificate logs.");
    }
  };

  const downloadWord = async () => {
    if (!ref.current || wordBusy) return;
    setDownloadError("");
    setLogNote("");
    setWordBusy(true);
    try {
      await downloadLetterAsWord(ref.current, downloadFileName());
      await logDownload();
    } catch (error) {
      console.error(error);
      setDownloadError("Could not create the Word document. Please try again.");
    } finally {
      setWordBusy(false);
    }
  };

  return (
    <section className={`${sideBySide ? "min-w-0" : "max-w-4xl mx-auto"} space-y-6 border rounded-lg p-4 bg-white`}>
      {canRemove && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove letter"
            title="Remove"
            className="text-gray-500 hover:text-red-600 p-2 rounded"
          >
            <FaTrash size={14} />
          </button>
        </div>
      )}

      <LetterDetailsForm letter={letter} onChange={onChange} idPrefix={letter.id} />

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onDuplicate}
          aria-label="Duplicate letter"
          title="Duplicate"
          className="border border-[#552586] text-[#552586] p-2 rounded"
        >
          <FaCopy size={14} />
        </button>
        <button
          type="button"
          onClick={downloadPdf}
          className="bg-[#552586] text-white py-2 px-4 rounded"
        >
          {isOffer ? "Download offer letter" : "Download completion certificate"}
        </button>
        <button
          type="button"
          onClick={downloadWord}
          disabled={wordBusy}
          className="inline-flex items-center gap-2 border border-[#552586] text-[#552586] py-2 px-4 rounded disabled:opacity-60"
        >
          <FaFileWord size={14} />
          {wordBusy ? "Preparing Word file…" : "Download as Word"}
        </button>
      </div>
      {downloadError && (
        <p className="text-center text-sm text-red-600">{downloadError}</p>
      )}
      {logNote && (
        <p className="text-center text-sm text-gray-700">{logNote}</p>
      )}

      {isOffer && (
        <p className="text-sm text-gray-600">
          Click the offer letter and type to change the wording. Those edits are included in the download.
          Changing the form, role, or document type rebuilds the letter, so set the details first.
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
    </section>
  );
}

const GenerateCertificate = () => {
  const location = useLocation();
  const initial = certificateStateFromLocation(location.state);
  const [letters, setLetters] = useState(() =>
    initial.initialLetters.length
      ? initial.initialLetters.map((letter) => createLetter(letter))
      : [createLetter(initial)]
  );
  const [bulkOpen, setBulkOpen] = useState(false);
  const closeBulk = useCallback(() => setBulkOpen(false), []);

  const updateLetter = (id, nextLetter) => {
    setLetters((current) => current.map((letter) => (letter.id === id ? nextLetter : letter)));
  };

  const addLetter = () => {
    setLetters((current) => [...current, createLetter()]);
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
  };

  const removeLetter = (id) => {
    setLetters((current) => (current.length <= 1 ? current : current.filter((letter) => letter.id !== id)));
  };

  const sideBySide = letters.length > 1;

  return (
    <div className="p-6 space-y-6">
      <div className={`${sideBySide ? "" : "max-w-4xl mx-auto"} flex flex-wrap justify-between items-center gap-4`}>
        <h1 className="text-2xl font-bold text-gray-800">Letters</h1>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setBulkOpen(true)}
            className="inline-flex items-center gap-2 border border-[#552586] text-[#552586] py-2 px-4 rounded"
          >
            <FaUsers size={14} />
            Bulk Generator
          </button>
          <button
            type="button"
            onClick={addLetter}
            className="inline-flex items-center gap-2 bg-[#552586] text-white py-2 px-4 rounded"
          >
            <FaPlus size={12} />
            Add another letter
          </button>
        </div>
      </div>

      {initial.fromApplication && (
        <p className={`${sideBySide ? "" : "max-w-4xl mx-auto"} text-sm text-gray-600`}>
          {initial.initialLetters.length > 1
            ? `Filled from ${initial.initialLetters.length} selected job applications.`
            : `Filled from the job application for ${letters[0]?.data.candidateName || "this applicant"}.`}
          Internship dates are prefilled and can be changed.
        </p>
      )}

      <BulkGenerator open={bulkOpen} onClose={closeBulk} />

      <div
        className={sideBySide ? "grid items-start gap-6" : undefined}
        style={sideBySide ? { gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 560px), 1fr))" } : undefined}
      >
        {letters.map((letter) => (
          <LetterCard
            key={letter.id}
            letter={letter}
            canRemove={letters.length > 1}
            sideBySide={sideBySide}
            onChange={(nextLetter) => updateLetter(letter.id, nextLetter)}
            onDuplicate={() => duplicateLetter(letter.id)}
            onRemove={() => removeLetter(letter.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenerateCertificate;
