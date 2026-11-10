import CollegeNameField from "./CollegeNameField";
import {
  DATE_FIELDS,
  DOC_TYPES,
  FIELD_LABELS,
  ROLE_BY_TEMPLATE,
  datesFromInternshipStart,
  templateSetFor,
} from "../lib/letters";

// Both variants use the design-system controls; "glass" stacks the selects for narrow panels.
const STYLES = {
  default: {
    selects: "grid gap-3",
    select: "select",
    grid: "grid grid-cols-1 gap-4 sm:grid-cols-2",
    label: "label",
    input: "input",
    collegeInput: "input",
  },
  glass: {
    selects: "grid gap-3",
    select: "select",
    grid: "grid grid-cols-1 gap-3 sm:grid-cols-2",
    label: "label",
    input: "input",
    collegeInput: "input",
  },
};

// Document type, role, and detail fields for one letter. Shared by the letter
// cards and the Bulk Generator so both collect exactly the same details.
export default function LetterDetailsForm({
  letter,
  onChange,
  idPrefix,
  hideCandidateName = false,
  variant = "default",
}) {
  const { docType, templateName, data } = letter;
  const templateSet = templateSetFor(docType);
  const collegeInputId = `college-${idPrefix}`;
  const styles = STYLES[variant] || STYLES.default;

  const updateData = (nextData) => {
    onChange({ ...letter, data: typeof nextData === "function" ? nextData(letter.data) : nextData });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "internshipFrom") {
      const dates = value ? datesFromInternshipStart(value) : {
        internshipFrom: "",
        internshipTo: "",
        issuedDate: "",
      };
      updateData((prev) => ({ ...prev, ...dates }));
      return;
    }
    updateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocTypeChange = (value) => {
    const nextSet = templateSetFor(value);
    const nextTemplate = nextSet[templateName] ? templateName : Object.keys(nextSet)[0];
    onChange({ ...letter, docType: value, templateName: nextTemplate });
  };

  const handleTemplateChange = (value) => {
    const knownRoles = Object.values(ROLE_BY_TEMPLATE);
    const nextRole = ROLE_BY_TEMPLATE[value];
    const position = !nextRole || (data.position.trim() && !knownRoles.includes(data.position))
      ? data.position
      : nextRole;
    onChange({
      ...letter,
      templateName: value,
      data: { ...data, position },
    });
  };

  return (
    <>
      <div className={styles.selects}>
        <select
          value={docType}
          onChange={(event) => handleDocTypeChange(event.target.value)}
          className={styles.select}
          aria-label="Document type"
        >
          <option value={DOC_TYPES.offer}>{DOC_TYPES.offer}</option>
          <option value={DOC_TYPES.completion}>{DOC_TYPES.completion}</option>
        </select>

        <select
          value={templateName}
          onChange={(event) => handleTemplateChange(event.target.value)}
          className={styles.select}
          aria-label="Role template"
        >
          {Object.keys(templateSet).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {Object.keys(data)
          .filter((key) => key !== "supervisorName" && !(hideCandidateName && key === "candidateName"))
          .map((key) => (
          <div key={key} className="flex flex-col">
            <label className={styles.label} htmlFor={key === "collegeName" ? collegeInputId : `${key}-${idPrefix}`}>
              {FIELD_LABELS[key] || key}
            </label>
            {key === "collegeName" ? (
              <CollegeNameField
                inputId={collegeInputId}
                value={data.collegeName}
                onChange={(collegeName) => updateData((prev) => ({ ...prev, collegeName }))}
                inputClassName={styles.collegeInput}
              />
            ) : (
              <input
                id={`${key}-${idPrefix}`}
                type={DATE_FIELDS.has(key) ? "date" : "text"}
                name={key}
                value={data[key]}
                onChange={handleChange}
                className={styles.input}
                placeholder={DATE_FIELDS.has(key) ? undefined : `Enter ${FIELD_LABELS[key] || key}`}
              />
            )}
          </div>
        ))}
        {docType === DOC_TYPES.completion && (
          <div className="flex flex-col">
            <label className={styles.label} htmlFor={`supervisor-${idPrefix}`}>
              Supervisor Name
            </label>
            <input
              id={`supervisor-${idPrefix}`}
              type="text"
              name="supervisorName"
              value={data.supervisorName || ""}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter supervisor name"
            />
          </div>
        )}
      </div>
    </>
  );
}
