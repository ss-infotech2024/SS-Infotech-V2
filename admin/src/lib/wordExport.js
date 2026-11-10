import certificateBg from "../assets/certificate-bg.png";

// Letters are designed on a 794 x 1123 px canvas, which is A4 at 96 dpi.
const PAGE_WIDTH_PX = 794;
const PAGE_HEIGHT_PX = 1123;
// The letterhead artwork covers these bands at the top and bottom of every page.
const HEADER_BAND_PX = 148;
const FOOTER_BAND_PX = 158;
const DEFAULT_SIDE_MARGIN_PX = 32;

const TWIPS_PER_PX = 15; // 1440 twips per inch / 96 px per inch

const BLOCK_DISPLAYS = new Set(["block", "flex", "grid", "list-item", "table", "flow-root"]);
const GENERIC_FONTS = new Set([
  "ui-sans-serif", "system-ui", "sans-serif", "-apple-system", "blinkmacsystemfont",
  "ui-serif", "serif", "ui-monospace", "monospace", "segoe ui", "apple color emoji",
  "segoe ui emoji", "segoe ui symbol", "noto color emoji",
]);

// Word paragraph alignment values (docx AlignmentType).
const ALIGN = { left: "left", center: "center", right: "right", justified: "both" };

const px = (value) => Math.round(value * TWIPS_PER_PX);

function isHidden(element) {
  const style = getComputedStyle(element);
  return style.display === "none" || style.visibility === "hidden";
}

function isBlock(node) {
  return node.nodeType === Node.ELEMENT_NODE && BLOCK_DISPLAYS.has(getComputedStyle(node).display);
}

function wordFont(fontFamily) {
  const families = fontFamily.split(",").map((f) => f.trim().replace(/^["']|["']$/g, ""));
  return families.find((f) => !GENERIC_FONTS.has(f.toLowerCase())) || "Arial";
}

function wordColor(cssColor) {
  const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(cssColor);
  if (!match) return undefined;
  return match.slice(1, 4).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
}

// Collects paragraphs in reading order. Each paragraph is a run of inline
// content that sits directly inside a block element.
function collectParagraphs(root) {
  const paragraphs = [];

  const flush = (container, nodes) => {
    if (!nodes.length) return;
    const hasContent = nodes.some((node) =>
      node.nodeType === Node.TEXT_NODE ? node.textContent.trim() : node.textContent.trim() || node.querySelector?.("br"),
    );
    if (!hasContent) return;
    const range = document.createRange();
    range.setStartBefore(nodes[0]);
    range.setEndAfter(nodes[nodes.length - 1]);
    paragraphs.push({ container, nodes: [...nodes], rects: range.getClientRects(), rect: range.getBoundingClientRect() });
  };

  const walk = (element) => {
    let inline = [];
    for (const child of element.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (isHidden(child) || child.tagName === "IMG" || child.tagName === "SCRIPT" || child.tagName === "STYLE") continue;
        if (isBlock(child)) {
          flush(element, inline);
          inline = [];
          walk(child);
          continue;
        }
      } else if (child.nodeType !== Node.TEXT_NODE) {
        continue;
      }
      inline.push(child);
    }
    flush(element, inline);
  };

  walk(root);
  return paragraphs;
}

// Text runs as plain data: { text, bold, italics, underline, size, font, color } or { break: true }.
function captureRuns(nodes) {
  const runs = [];
  // True at the start of a line or after text that ended in a space, so that
  // collapsed whitespace never produces a leading or doubled space.
  let skipLeadingSpace = true;

  const visit = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent.replace(/\s+/g, " ");
      if (skipLeadingSpace) text = text.replace(/^ /, "");
      if (!text) return;
      const style = getComputedStyle(node.parentElement);
      runs.push({
        text,
        bold: Number(style.fontWeight) >= 600 || style.fontWeight === "bold",
        italics: style.fontStyle === "italic",
        underline: style.textDecorationLine.includes("underline"),
        size: Math.round(parseFloat(style.fontSize) * 0.75 * 2),
        font: wordFont(style.fontFamily),
        color: wordColor(style.color),
      });
      skipLeadingSpace = text.endsWith(" ");
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || isHidden(node)) return;
    if (node.tagName === "BR") {
      runs.push({ break: true });
      skipLeadingSpace = true;
      return;
    }
    if (node.tagName === "IMG") return;
    node.childNodes.forEach(visit);
  };

  nodes.forEach(visit);
  return runs;
}

function alignmentFor(container, rect, frameLeft, scale) {
  const textAlign = getComputedStyle(container).textAlign;
  if (textAlign === "center") return ALIGN.center;
  if (textAlign === "right" || textAlign === "end") return ALIGN.right;
  if (textAlign === "justify") return ALIGN.justified;
  // Short text pushed to the right half of the page (for example an absolutely
  // positioned date) reads as right-aligned.
  if ((rect.left - frameLeft) / scale > PAGE_WIDTH_PX / 2) return ALIGN.right;
  return ALIGN.left;
}

async function loadLetterhead() {
  const response = await fetch(certificateBg);
  if (!response.ok) throw new Error("Could not load the letterhead image.");
  return response.arrayBuffer();
}

/**
 * Reads a rendered letter into plain layout data (paragraphs, runs, spacing) that can be
 * turned into Word later, alone or combined with other letters. Must run while the letter
 * is on screen. `frame` is the element that contains the 794 x 1123 letter preview.
 */
export function captureLetterLayout(frame) {
  const frameRect = frame.getBoundingClientRect();
  const scale = frameRect.width / PAGE_WIDTH_PX || 1;
  const toPage = (value, origin) => (value - origin) / scale;

  const collected = collectParagraphs(frame)
    .map((p) => ({ ...p, top: toPage(p.rect.top, frameRect.top), bottom: toPage(p.rect.bottom, frameRect.top) }))
    .sort((a, b) => a.top - b.top);

  const lefts = collected
    .filter((p) => getComputedStyle(p.container).textAlign !== "center")
    .map((p) => toPage(p.rect.left, frameRect.left))
    .filter((left) => left < PAGE_WIDTH_PX / 2);
  const sideMargin = lefts.length ? Math.max(0, Math.min(...lefts)) : DEFAULT_SIDE_MARGIN_PX;

  let previousBottom = HEADER_BAND_PX;
  const paragraphs = collected.map((p) => {
    const style = getComputedStyle(p.container);
    const alignment = alignmentFor(p.container, p.rect, frameRect.left, scale);
    const firstLine = p.rects[0];
    const lineHeight = firstLine ? firstLine.height / scale : parseFloat(style.lineHeight) || 20;
    const before = Math.max(0, p.top - previousBottom);
    previousBottom = Math.max(previousBottom, p.bottom);
    const indent = alignment === ALIGN.left || alignment === ALIGN.justified
      ? Math.max(0, toPage(p.rect.left, frameRect.left) - sideMargin)
      : 0;
    return { runs: captureRuns(p.nodes), alignment, indent, before, lineHeight };
  });

  return { sideMargin, paragraphs };
}

/**
 * Builds one Word document from one or more captured letters. Each letter starts on a
 * new page; the letterhead is stored once and repeats behind every page.
 */
export async function buildLettersDocx(layouts) {
  const docx = await import("docx");
  const {
    Document, Packer, Paragraph, TextRun, Header, ImageRun, LineRuleType,
    HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  } = docx;

  const toRun = (run) => (run.break
    ? new TextRun({ break: 1 })
    : new TextRun({
        text: run.text,
        bold: run.bold,
        italics: run.italics,
        underline: run.underline ? {} : undefined,
        size: run.size,
        font: run.font,
        color: run.color,
      }));

  const children = layouts.flatMap((layout, letterIndex) => {
    const startsNewPage = letterIndex > 0;
    if (!layout.paragraphs.length) {
      return [new Paragraph({ children: [], pageBreakBefore: startsNewPage })];
    }
    const paragraphs = layout.paragraphs.map((p, index) => new Paragraph({
      children: p.runs.map(toRun),
      alignment: p.alignment,
      indent: p.indent > 2 ? { left: px(p.indent) } : undefined,
      // Word drops "space before" on the first paragraph after a page break, so later
      // letters get that gap from a spacer line instead (below).
      spacing: {
        before: startsNewPage && index === 0 ? 0 : px(p.before),
        after: 0,
        line: px(p.lineHeight),
        lineRule: LineRuleType.AT_LEAST,
      },
    }));
    if (!startsNewPage) return paragraphs;
    // Empty line of exactly the original top gap, starting the new page, so the letter
    // begins at the same height below the letterhead as it does on its own.
    const spacer = new Paragraph({
      children: [],
      pageBreakBefore: true,
      spacing: { before: 0, after: 0, line: Math.max(px(layout.paragraphs[0].before), 15), lineRule: LineRuleType.EXACT },
    });
    return [spacer, ...paragraphs];
  });

  const letterhead = new ImageRun({
    type: "png",
    data: await loadLetterhead(),
    transformation: { width: PAGE_WIDTH_PX, height: PAGE_HEIGHT_PX },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
      verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
      behindDocument: true,
      allowOverlap: true,
    },
  });

  const sideMargin = layouts[0]?.sideMargin ?? DEFAULT_SIDE_MARGIN_PX;
  const wordDocument = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: px(PAGE_WIDTH_PX), height: px(PAGE_HEIGHT_PX) },
          margin: {
            top: px(HEADER_BAND_PX),
            bottom: px(FOOTER_BAND_PX),
            left: px(sideMargin),
            right: px(sideMargin),
            header: 0,
            footer: 0,
          },
        },
      },
      headers: { default: new Header({ children: [new Paragraph({ children: [letterhead] })] }) },
      children: children.length ? children : [new Paragraph("")],
    }],
  });

  return Packer.toBlob(wordDocument);
}

/**
 * Builds an editable Word document from a rendered letter and returns it as a Blob.
 * `frame` is the element that contains the 794 x 1123 letter preview.
 */
export async function createLetterDocx(frame) {
  return buildLettersDocx([captureLetterLayout(frame)]);
}

export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Builds an editable Word document from a rendered letter and downloads it. */
export async function downloadLetterAsWord(frame, fileName) {
  downloadBlob(await createLetterDocx(frame), `${fileName || "document"}.docx`);
}
