import { useEffect, useId, useRef, useState } from "react";
import { NAGPUR_COLLEGES } from "../data/nagpurColleges";

const EXTRA_COLLEGES_KEY = "ss-extra-colleges";

function readExtraColleges() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(EXTRA_COLLEGES_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((name) => typeof name === "string" && name.trim()) : [];
  } catch {
    return [];
  }
}

function normalizeName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CollegeNameInput({ value, onChange, disabled }) {
  const listId = useId();
  const rootRef = useRef(null);
  const [colleges, setColleges] = useState(() =>
    [...NAGPUR_COLLEGES, ...readExtraColleges()].sort((a, b) => a.localeCompare(b)),
  );
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);

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
  const exactMatch = colleges.find(
    (college) => normalizeName(college) === normalizeName(trimmedQuery),
  );
  const showAdd = Boolean(trimmedQuery) && !exactMatch;

  const selectCollege = (name) => {
    onChange(name);
    setQuery(name);
    setOpen(false);
  };

  const addCollege = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const existing = colleges.find(
      (college) => normalizeName(college) === normalizeName(trimmed),
    );
    if (existing) {
      selectCollege(existing);
      return;
    }
    const extras = readExtraColleges();
    if (!extras.some((college) => normalizeName(college) === normalizeName(trimmed))) {
      sessionStorage.setItem(EXTRA_COLLEGES_KEY, JSON.stringify([...extras, trimmed]));
    }
    setColleges((current) => [...current, trimmed].sort((a, b) => a.localeCompare(b)));
    selectCollege(trimmed);
  };

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    onChange(nextQuery);
    setOpen(true);
  };

  return (
    <div ref={rootRef} className="relative mt-1">
      <input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        value={query}
        required
        disabled={disabled}
        placeholder="full college name"
        onChange={(event) => handleQueryChange(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key !== "Enter") return;
          event.preventDefault();
          if (exactMatch) selectCollege(exactMatch);
          else if (matches.length === 1) selectCollege(matches[0]);
          else if (trimmedQuery) addCollege(trimmedQuery);
        }}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
      />
      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg"
        >
          {matches.map((college) => (
            <li key={college}>
              <button
                type="button"
                role="option"
                className="block w-full px-3 py-2 text-left text-sm text-slate-800 hover:bg-purple-50"
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
                className="block w-full px-3 py-2 text-left text-sm font-medium text-purple-700 hover:bg-purple-50"
                onClick={() => addCollege(trimmedQuery)}
              >
                Add "{trimmedQuery}"
              </button>
            </li>
          )}
          {!matches.length && !showAdd && (
            <li className="px-3 py-2 text-sm text-slate-500">Type a college name</li>
          )}
        </ul>
      )}
    </div>
  );
}
