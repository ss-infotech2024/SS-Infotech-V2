// Shared letter/certificate helpers used by the single-letter page and the Bulk Generator.
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { templates } from "../components/CertificateTemplates";
import { offerLetterTemplates } from "../components/OfferLetterTemplates";

export const DOC_TYPES = {
  offer: "Internship Offer Letter",
  completion: "Internship Completion Certificate",
};

export const ROLE_BY_TEMPLATE = {
  "Web Developer": "Web Development Intern",
  "Data Analyst": "Data Analyst Intern",
  "Cyber Security": "Cyber Security Intern",
  Marketing: "Marketing Intern",
  "Human Resources": "Human Resources Intern",
  "AI/ML": "AI/ML Intern",
  "Software Development": "Software Development Intern",
};

export function templateFromJobTitle(title = "") {
  const value = String(title).toLowerCase();
  if (/(artificial intelligence|machine learning|\bai\s*\/\s*ml\b)/.test(value)) return "AI/ML";
  if (/(data|analyst|analytics)/.test(value)) return "Data Analyst";
  if (/(cyber|security)/.test(value)) return "Cyber Security";
  if (/market/.test(value)) return "Marketing";
  if (/(human resource|\bhr\b)/.test(value)) return "Human Resources";
  if (/software/.test(value)) return "Software Development";
  return "Web Developer";
}

export const DATE_FIELDS = new Set(["internshipFrom", "internshipTo", "issuedDate"]);

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== Number(match[1]) ||
    date.getMonth() !== Number(match[2]) - 1 ||
    date.getDate() !== Number(match[3])
  ) {
    return null;
  }
  return date;
}

function addMonths(iso, months) {
  const date = parseISODate(iso);
  if (!date) return "";
  date.setMonth(date.getMonth() + months);
  return toISODate(date);
}

function addDays(iso, days) {
  const date = parseISODate(iso);
  if (!date) return "";
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function formatDisplayDate(iso) {
  const date = parseISODate(iso);
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function datesFromInternshipStart(fromIso) {
  const internshipFrom = parseISODate(fromIso) ? fromIso : toISODate(new Date());
  return {
    internshipFrom,
    internshipTo: addMonths(internshipFrom, 6),
    issuedDate: addDays(internshipFrom, -3),
  };
}

export const LETTER_TYPE_LABEL = {
  [DOC_TYPES.offer]: "Offer letter",
  [DOC_TYPES.completion]: "Completion certificate",
};

export const FIELD_LABELS = {
  candidateName: "Candidate Name",
  companyName: "Company Name",
  internshipFrom: "Internship From",
  internshipTo: "Internship To",
  position: "Position",
  issuedDate: "Issued Date",
  collegeName: "College Name",
  supervisorName: "Supervisor Name",
};

export function blankLetterData() {
  const dates = datesFromInternshipStart();
  return {
    candidateName: "",
    companyName: "SS Infotech Pvt. Ltd.",
    internshipFrom: dates.internshipFrom,
    internshipTo: dates.internshipTo,
    position: ROLE_BY_TEMPLATE["Web Developer"],
    issuedDate: dates.issuedDate,
    collegeName: "",
    supervisorName: "Mr Viraj Patle",
  };
}

export function createLetter(source) {
  return {
    id: crypto.randomUUID(),
    docType: source?.docType || DOC_TYPES.offer,
    templateName: source?.templateName || "Web Developer",
    data: source?.data ? { ...source.data } : blankLetterData(),
  };
}

export async function saveCertificateLog(letter) {
  await axios.post(
    "/api/certificate-logs",
    {
      candidateName: letter.data.candidateName,
      collegeName: letter.data.collegeName,
      letterType: LETTER_TYPE_LABEL[letter.docType] || letter.docType,
      role: letter.data.position,
      internshipFrom: formatDisplayDate(letter.data.internshipFrom),
      internshipTo: formatDisplayDate(letter.data.internshipTo),
      issuedDate: formatDisplayDate(letter.data.issuedDate),
    },
    { timeout: 20000 },
  );
}

// Captures a rendered letter as a PNG data URL at 2x resolution.
// `options` are extra html2canvas options (e.g. ignoreElements to skip cloning unrelated UI).
export async function captureLetterImage(element, options = {}) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    ...options,
  });
  return canvas.toDataURL("image/png");
}

// One A4 page per captured letter image, in order.
export function createPdfFromImages(images) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123] });
  images.forEach((imgData, index) => {
    if (index > 0) pdf.addPage([794, 1123], "portrait");
    // "FAST" is lossless Flate compression; without it jsPDF stores raw pixels (~10 MB per page).
    pdf.addImage(imgData, "PNG", 0, 0, 794, 1123, undefined, "FAST");
  });
  return pdf;
}

export async function createLetterPdf(element, options = {}) {
  return createPdfFromImages([await captureLetterImage(element, options)]);
}

// "Software Development Completion certificates - 2026-11-10" (no extension).
export function bulkFileBase(letter) {
  const label = `${letter.templateName} ${LETTER_TYPE_LABEL[letter.docType] || letter.docType}s`;
  return `${safeFileName(label)} - ${toISODate(new Date())}`;
}

export function safeFileName(name) {
  return (name || "document").replace(/[\\/:*?"<>|]/g, "").trim() || "document";
}

// "  gouri   PATIL " -> "Gouri Patil"; also capitalizes after hyphens and apostrophes.
export function toTitleCase(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s\-'’.])(\p{L})/gu, (_, separator, letter) => separator + letter.toUpperCase());
}

export function parseBulkNames(text) {
  return String(text)
    .split(/\r?\n/)
    .map(toTitleCase)
    .filter(Boolean);
}

export function templateSetFor(docType) {
  return docType === DOC_TYPES.offer ? offerLetterTemplates : templates;
}

// Turns form values into what the templates expect: display dates and no empty values.
export function toPreviewData(data) {
  return Object.fromEntries(
    Object.entries(data)
      .map(([key, value]) => [
        key,
        DATE_FIELDS.has(key) ? formatDisplayDate(value) : value,
      ])
      .filter(([, value]) => String(value).trim() !== "")
  );
}

export function zipFileName(letter) {
  return `${bulkFileBase(letter)}.zip`;
}

// Gives every student a distinct file name: "Name.pdf", "Name (2).pdf", ...
export function uniqueFileNames(names, extension) {
  const used = new Map();
  return names.map((name) => {
    const base = safeFileName(name);
    const count = (used.get(base.toLowerCase()) || 0) + 1;
    used.set(base.toLowerCase(), count);
    return count === 1 ? `${base}.${extension}` : `${base} (${count}).${extension}`;
  });
}

// Fields a bulk document must have before it can be generated.
export function missingLetterFields(letter) {
  const required = ["candidateName", "companyName", "collegeName", "position", "internshipFrom", "internshipTo", "issuedDate"];
  if (letter.docType === DOC_TYPES.completion) required.push("supervisorName");
  return required.filter((key) => !String(letter.data[key] || "").trim()).map((key) => FIELD_LABELS[key]);
}

export function waitForImages(element) {
  return Promise.all(
    [...element.querySelectorAll("img")].map((img) =>
      img.complete && img.naturalWidth ? null : img.decode().catch(() => null),
    ),
  );
}
