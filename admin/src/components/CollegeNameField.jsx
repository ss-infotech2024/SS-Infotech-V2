import { useEffect, useId, useRef, useState } from "react";

const NAGPUR_COLLEGES = [
  "Visvesvaraya National Institute of Technology, Nagpur",
  "Indian Institute of Management Nagpur",
  "Indian Institute of Information Technology Nagpur",
  "Laxminarayan Institute of Technology, Nagpur",
  "Yeshwantrao Chavan College of Engineering, Nagpur",
  "Shri Ramdeobaba College of Engineering and Management, Nagpur",
  "G. H. Raisoni College of Engineering, Nagpur",
  "Priyadarshini College of Engineering, Nagpur",
  "St. Vincent Pallotti College of Engineering and Technology, Nagpur",
  "K. D. K. College of Engineering, Nagpur",
  "S. B. Jain Institute of Technology, Management and Research, Nagpur",
  "Cummins College of Engineering for Women, Nagpur",
  "Government Medical College and Hospital, Nagpur",
  "Hislop College, Nagpur",
  "Dr. Ambedkar College, Nagpur",
];

function normalizeName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(left, right) {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let col = 0; col < cols; col += 1) matrix[0][col] = col;
  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }
  return matrix[left.length][right.length];
}

function similarity(left, right) {
  const a = normalizeName(left);
  const b = normalizeName(right);
  const maxLength = Math.max(a.length, b.length);
  if (!maxLength) return 1;
  return 1 - levenshtein(a, b) / maxLength;
}

function findExact(colleges, name) {
  const normalized = normalizeName(name);
  if (!normalized) return "";
  return colleges.find((college) => normalizeName(college) === normalized) || "";
}

function findSimilar(colleges, name) {
  let best = null;
  colleges.forEach((college) => {
    const score = similarity(name, college);
    if (!best || score > best.score) best = { name: college, score };
  });
  if (!best || best.score < 0.6) return null;
  return best;
}

export default function CollegeNameField({ value, onChange, inputId = "collegeName", inputClassName }) {
  const listId = useId();
  const rootRef = useRef(null);
  const [colleges, setColleges] = useState(NAGPUR_COLLEGES);
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const trimmedQuery = query.trim();
  const matches = colleges.filter((college) =>
    college.toLowerCase().includes(trimmedQuery.toLowerCase()),
  );
  const exactMatch = findExact(colleges, trimmedQuery);
  const showAdd = Boolean(trimmedQuery) && !exactMatch;

  const selectCollege = (name) => {
    onChange(name);
    setQuery(name);
    setWarning(null);
    setOpen(false);
  };

  const addCollege = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setColleges((current) => (
      findExact(current, trimmed) ? current : [...current, trimmed]
    ));
    selectCollege(trimmed);
  };

  const requestAdd = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const existing = findExact(colleges, trimmed);
    if (existing) {
      selectCollege(existing);
      return;
    }
    const similar = findSimilar(colleges, trimmed);
    if (similar) {
      setWarning({ pending: trimmed, match: similar.name });
      setOpen(false);
      return;
    }
    addCollege(trimmed);
  };

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    setWarning(null);
    setOpen(true);
  };

  return (
    <div ref={rootRef} className="relative">
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        value={query}
        onChange={(event) => handleQueryChange(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            requestAdd(query);
          }
          if (event.key === "Escape") setOpen(false);
        }}
        className={inputClassName || "w-full border rounded p-2"}
        placeholder="Search or enter a college"
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1.5 max-h-64 w-full overflow-auto rounded-2xl border border-white/80 bg-white/95 p-1.5 font-ui shadow-glass-lg backdrop-blur-xl"
        >
          {matches.map((college) => (
            <li key={college}>
              <button
                type="button"
                role="option"
                className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition hover:bg-[#7c3aed]/[0.07] hover:text-[#5b21b6] ${college === value ? "bg-[#7c3aed]/[0.08] font-semibold text-[#5b21b6]" : "text-ink-soft"}`}
                onClick={() => selectCollege(college)}
              >
                {college}
              </button>
            </li>
          ))}
          {showAdd && (
            <li>
              <button
                type="button"
                className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-[#6d28d9] transition hover:bg-[#7c3aed]/[0.07]"
                onClick={() => requestAdd(trimmedQuery)}
              >
                + Add "{trimmedQuery}" <span className="font-normal text-ink-faint">(or press Enter)</span>
              </button>
            </li>
          )}
          {!matches.length && !showAdd && (
            <li className="px-3 py-2 text-sm text-ink-muted">No colleges found.</li>
          )}
        </ul>
      )}
      {warning && (
        <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-900" role="alert">
          <p className="font-semibold">A similar college already exists.</p>
          <p className="mt-0.5 text-amber-800">{warning.match}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="btn-secondary btn-sm" onClick={() => selectCollege(warning.match)}>
              Use this college
            </button>
            <button type="button" className="btn-ghost btn-sm" onClick={() => addCollege(warning.pending)}>
              Add anyway
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
