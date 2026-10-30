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
            This is to formally certify that <strong>{candidateName}</strong> successfully completed an internship at <strong>{companyName}</strong> as a <strong>{position}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
          </p>
          <p className="mb-1 font-semibold">Internship Details:</p>
          <div className="pl-4 mb-3">
            <p><strong>Intern Name:</strong> {candidateName}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Duration:</strong> {internshipFrom} to {internshipTo}</p>
          </div>
          <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
          <div className="pl-4 mb-3">
            <p>Prepared and validated datasets for analysis and model development.</p>
            <p>Explored machine learning workflows and evaluated model performance.</p>
            <p>Documented findings and communicated data-informed recommendations.</p>
          </div>
          <p>{candidateName} demonstrated analytical thinking, curiosity, and professionalism. We appreciate their contribution and wish them success in AI and machine learning.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default AIMLCompletionCertificate;
