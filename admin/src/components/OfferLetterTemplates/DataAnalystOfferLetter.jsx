import React from "react";
import CertificateFrame from "../CertificateFrame";

const DataAnalystOfferLetter = ({ data }) => {
  const {
    candidateName,
    collegeName,
    companyName,
    position,
    internshipFrom,
    internshipTo,
    issuedDate,
  } = data;
  const name = candidateName || "Candidate Name";
  const role = position || "Data Analyst Intern";
  const company = companyName || "SS Infotech Pvt. Ltd.";

  return (
    <CertificateFrame>
    <div className="relative h-full w-full text-[14px] leading-snug">
      <div className="absolute left-8 right-8 pt-40">
        <p className="mb-2 text-right font-medium">Date: {issuedDate || "DD/MM/YYYY"}</p>
        <p>To,</p>
        <p className="font-semibold">{name}</p>
        <p>{collegeName || "College Name"}</p>

        <p className="mt-1 font-semibold">Subject: Offer for {role}</p>

        <p className="mt-1">Dear {name},</p>

        <p className="mt-1 text-justify">
          We are pleased to offer you an internship with <b>{company}</b> as a <b>{role}</b>. You will gain supervised experience turning raw information into clear, useful analysis.
        </p>

        <p className="mt-1 text-justify">
          <b>Internship / Training Details:</b><br />
          Role: {role}<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}
          {internshipTo ? <><br />End Date: {internshipTo}</> : null}
        </p>

        <p className="mt-1 text-justify">
          Your assignments may include collecting and validating data, cleaning datasets, writing basic queries, preparing charts and reports, and explaining findings to the team. You will follow guidance on data quality, privacy, and documentation.
        </p>

        <p className="mt-1 text-justify">
          You may also practice checking the source and completeness of information, choosing summaries that match the question being investigated, and distinguishing observed patterns from assumptions. Analysis and visualizations should be clearly labeled so another team member can understand how the results were prepared.
        </p>

        <p className="mt-1 text-justify">
          Please keep working files organized, document the steps used in your analysis, and raise questions about data quality or access before proceeding. Candidate or business information must be handled only for approved work and kept confidential.
        </p>

        <p className="mt-1 text-justify">
          Upon successful completion of the internship and its required evaluation, a certificate of completion will be issued. This internship is intended for learning and skill development and does not constitute an offer of employment. Please confirm your acceptance by replying to this email or returning a signed copy of this letter.
        </p>

        <p className="mt-1 text-justify">
          We look forward to supporting your growth in data analysis.
        </p>

      </div>
    </div>
    </CertificateFrame>
  );
};

export default DataAnalystOfferLetter;


