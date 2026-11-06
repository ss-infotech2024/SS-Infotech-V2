import React from "react";
import CertificateFrame from "../CertificateFrame";

const WebDeveloperTemplate = ({ data = {}, type = "Certificate" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "[Company Name]",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    department = "[Department]",
    position = "Web Development Intern",
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

      <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        {/* Main Content */}
        <p className="mb-1">
          This certifies that <strong>{candidateName}</strong> successfully completed an internship with <strong>{companyName}</strong> as a <strong>{position}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
        </p>

        <p className="mb-1 font-semibold">Internship Details:</p>
        <div className="pl-2 mb-1">
          <p><strong>Intern Name:</strong> {candidateName}</p>
          <p><strong>Position:</strong> {position}</p>
          <p><strong>Internship Duration:</strong> {internshipFrom} to {internshipTo}</p>
        </div>

        <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
        <p className="mb-1">
          The internship provided practical experience with web application development. Responsibilities included:
        </p>
        <div className="pl-2 mb-1">
          <p>Building and refining responsive user interfaces and reusable page components.</p>
          <p>Connecting application features with APIs and data sources while following project requirements.</p>
          <p>Testing functionality across common user flows, diagnosing issues, and improving code quality.</p>
          <p>Considering accessibility, layout behavior, and clear feedback in interface implementation.</p>
          <p>Using version control, documenting changes, and collaborating through code reviews.</p>
          <p>Supporting the team with debugging and maintenance tasks for existing web applications.</p>
        </div>

        <p className="mb-1 font-semibold">Program Learning Overview:</p>
        <p className="mb-1">
          The program covered frontend and backend development practices, application testing, version control, and team collaboration. Work moved from understanding requirements to implementation, review, and refinement under supervision. This certificate recognizes completion of the internship in web development.
        </p>
        <p className="mb-1">
          The experience also included considering maintainability, accessibility, and the effect of code changes on connected features. The intern practiced explaining implementation choices, responding to review feedback, and recording completed work so that another team member could follow the development process.
        </p>
      </div>
    </div>
    </CertificateFrame>
  );
};

export default WebDeveloperTemplate;
