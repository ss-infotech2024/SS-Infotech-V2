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
          This is to formally certify that <strong>{candidateName}</strong> has successfully
          completed an internship at <strong>{companyName}</strong> from{" "}
          <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>. During the
          tenure of the internship, {candidateName} was assigned to the{" "}
            <strong>{position}</strong> role in the <strong>{department}</strong> department working under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
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
          During the internship, {candidateName} actively supported HR and administrative
          operations within the company. Key responsibilities included:
        </p>
        <div className="pl-4 mb-1">
          <p>
            Assisting in recruitment processes including screening resumes and scheduling interviews.
          </p>
          <p>
            Maintaining employee records and supporting documentation management.
          </p>
          <p>
            Coordinating onboarding and orientation sessions for new hires.
          </p>
          <p>
            Supporting internal communications and employee engagement initiatives.
          </p>
          <p>
            Assisting in performance tracking, attendance management, and reporting tasks.
          </p>
        </div>

        {/* Overview & Evaluation */}
        <p className="mb-1 font-semibold">
          Internship Overview & Performance Evaluation:
        </p>
        <p className="mb-1">
          Throughout the internship, {candidateName} displayed strong communication,
          organizational, and interpersonal skills. Their dedication to learning and
          professionalism in handling HR-related activities were commendable.
        </p>

        {/* Closing */}
        <p className="">
          We appreciate {candidateName}’s efforts and wish them success in building a
          promising career in Human Resources.
        </p>
      </div>
    </div>
    </CertificateFrame>
  );
};

export default HRCompletionCertificate;
