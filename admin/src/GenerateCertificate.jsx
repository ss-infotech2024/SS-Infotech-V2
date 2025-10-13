import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { templates } from "../../admin/src/components/CertificateTemplates"
import { offerLetterTemplates } from "../../admin/src/components/OfferLetterTemplates"

const GenerateCertificate = () => {
  const ref = useRef(null);
  const [docType, setDocType] = useState("Internship Certificate");
  const [templateName, setTemplateName] = useState("Web Developer");

  const [data, setData] = useState({
    candidateName: "",
    companyName: "",
    internshipFrom: "",
    internshipTo: "",
    position: "",
    issuedDate: "",
    collegeName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const downloadPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123] });
    pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
    pdf.save(`${data.candidateName || "document"}.pdf`);
  };

  // Decide which template set to use
  const templateSet = docType === "Internship Offer Letter" ? offerLetterTemplates : templates;

  // Fetch the correct component
  const TemplateComponent = templateSet[templateName];

  return (
    <div className="p-6 space-y-6">
      {/* Select Document Type */}
      <div className="flex gap-4 max-w-4xl mx-auto">
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Internship Offer Letter</option>
          <option>Internship Completion Certificate</option>
        </select>

        <select
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(templateSet).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {Object.keys(data).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize text-sm font-semibold mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              name={key}
              value={data[key]}
              onChange={handleChange}
              className="border rounded p-2"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={downloadPdf}
          className="bg-[#552586] hover:bg-[#552586] text-white py-2 px-4 rounded"
        >
          Download {docType}
        </button>
      </div>

      {/* Preview */}
      <div className="flex justify-center items-center bg-gray-100 py-10">
        <div ref={ref}>
          {TemplateComponent ? (
            <TemplateComponent data={data} type={docType} />
          ) : (
            <p className="text-red-500 text-center">Selected template not found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;
