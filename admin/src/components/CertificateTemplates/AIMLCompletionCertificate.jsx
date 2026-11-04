import React from "react";
import CertificateFrame from "../CertificateFrame";

const AIMLCompletionCertificate = ({ data = {} }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "SS Infotech Pvt. Ltd.",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    position = "AI/ML Intern",
    issuedDate = "[Date]",
    supervisorName = "Mr Viraj Patle",
  } = data;

  return (
    <CertificateFrame>
      <div className="relative h-full w-full p-8">
        <div className="absolute right-8 text-sm pt-44">Date: <strong>{issuedDate}</strong></div>
        <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>
        <div className="absolute left-8 right-8 text-[14px] pt-4">
          <p className="mb-3">
            This certifies that <strong>{candidateName}</strong> successfully completed an internship with <strong>{companyName}</strong> as a <strong>{position}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
          </p>
          <p className="mb-1 font-semibold">Internship Details:</p>
          <div className="pl-4 mb-3">
            <p><strong>Intern Name:</strong> {candidateName}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Duration:</strong> {internshipFrom} to {internshipTo}</p>
          </div>
          <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
          <div className="pl-4 mb-3">
            <p>Prepared and explored datasets for analysis and experimentation.</p>
            <p>Reviewed machine learning workflows and compared model evaluation results.</p>
            <p>Recorded experimental settings and maintained clear notes on methods used.</p>
            <p>Considered data quality, limitations, and responsible handling of model outputs.</p>
            <p>Documented experiments, findings, and limitations for team review.</p>
          </div>
          <p className="mb-2 font-semibold">Program Learning Overview:</p>
          <p className="mb-1">The program covered data preparation, model experimentation, evaluation, and responsible communication of results. Activities included defining an experiment, comparing outputs against an evaluation method, and recording observations for review. This certificate recognizes completion of the internship in AI and machine learning.</p>
          <p>The intern also practiced comparing a baseline with later experiments, noting limitations in the available data, and summarizing results in clear language. Attention was given to reproducible methods and to communicating uncertainty so that model outputs could be considered with appropriate context.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default AIMLCompletionCertificate;
