import React from "react";
import CertificateFrame from "../CertificateFrame";

const HRCompletionCertificate = ({ data = {}, type = "Certificate" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "[Company Name]",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    department = "Human Resources",
    position = "Human Resources Intern",
    issuedDate = "[Date]",
    supervisorName = "Mr Viraj Patle",
  } = data;

  return (
    <CertificateFrame>
    <div className="relative h-full w-full p-8">
      {/* Date top-right */}
      <div className="absolute right-8 text-sm pt-44">
        Date: <strong>{issuedDate}</strong>
      </div>

      {/* Title */}
      <div className="text-center font-bold text-[20px] underline pt-52">
        INTERNSHIP COMPLETION CERTIFICATE
      </div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        {/* Main Content */}
        <p className="mb-1">
          This certifies that <strong>{candidateName}</strong> successfully completed an internship with <strong>{companyName}</strong> as a <strong>{position}</strong> in the <strong>{department}</strong> department from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
        </p>

        {/* Internship Details */}
        <p className="mb-1 font-semibold">Internship Details:</p>
        <div className="pl-4 mb-1">
          <p>
            <strong>Intern Name:</strong> {candidateName}
          </p>
          <p>
            <strong>Position:</strong> {position}
          </p>
          <p>
            <strong>Internship Duration:</strong> {internshipFrom} to {internshipTo}
          </p>
        </div>

        {/* Responsibilities Undertaken */}
        <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
        <p className="mb-1">
          The internship provided practical experience in Human Resources operations. Responsibilities included:
        </p>
        <div className="pl-4 mb-1">
          <p>
            Supporting recruitment coordination, candidate communication, and interview scheduling.
          </p>
          <p>
            Organizing employee records and maintaining confidential documentation.
          </p>
          <p>
            Assisting with onboarding and orientation activities.
          </p>
          <p>
            Helping coordinate internal communications and employee engagement activities.
          </p>
          <p>
            Preparing administrative information and summaries for HR review.
          </p>
          <p>Coordinating routine follow-ups and directing questions to the appropriate HR contact.</p>
          <p>Applying care when handling personal, employment, and candidate information.</p>
        </div>

        {/* Overview & Evaluation */}
        <p className="mb-1 font-semibold">
          Program Learning Overview:
        </p>
        <p className="mb-1">
          The program covered recruitment support, onboarding, records management, and workplace communication. The work emphasized accurate documentation, respectful communication, privacy, and following established procedures. This certificate recognizes completion of the internship in Human Resources.
        </p>
        <p className="mb-1">
          The intern also gained familiarity with coordinating routine HR processes, maintaining organized records for review, and directing questions to the appropriate contact. Activities reinforced discretion, consistency, and timely communication when supporting candidates and employees.
        </p>

        <p className="">
          We wish {candidateName} success in their future career.
        </p>
      </div>
    </div>
    </CertificateFrame>
  );
};

export default HRCompletionCertificate;
