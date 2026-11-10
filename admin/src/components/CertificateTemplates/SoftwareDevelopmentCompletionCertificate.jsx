import React from "react";
import CertificateFrame from "../CertificateFrame";

const SoftwareDevelopmentCompletionCertificate = ({ data = {} }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "SS Infotech Pvt. Ltd.",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    position = "Software Development Intern",
    issuedDate = "[Date]",
    supervisorName = "Mr Viraj Patle",
  } = data;
  const domain = "Software Development";

  return (
    <CertificateFrame>
      <div className="relative h-full w-full p-8">
        <div className="absolute right-8 text-sm pt-44">Date: <strong>{issuedDate}</strong></div>
        <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>
        <div className="absolute left-8 right-8 text-[14px] pt-4">
          <p className="mb-3">
            This certifies that <strong>{candidateName}</strong> has successfully completed an internship in the domain of <strong>{domain}</strong> with <strong>{companyName}</strong> as a <strong>{position}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
          </p>
          <p className="mb-1 font-semibold">Internship Details:</p>
          <div className="pl-4 mb-3">
            <p><strong>Intern Name:</strong> {candidateName}</p>
            <p><strong>Domain:</strong> {domain}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Duration:</strong> {internshipFrom} to {internshipTo}</p>
          </div>
          <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
          <div className="pl-4 mb-3">
            <p>Analysed requirements and contributed to the design of software features.</p>
            <p>Wrote, tested, and debugged modular code following project coding standards.</p>
            <p>Worked with databases and APIs to connect application components.</p>
            <p>Used version control and participated in code reviews with the development team.</p>
            <p>Documented implementation decisions and progress for team review.</p>
          </div>
          <p className="mb-2 font-semibold">Program Learning Overview:</p>
          <p className="mb-1">The program covered the software development lifecycle, including requirement analysis, design, implementation, testing, and maintenance. Activities included breaking down features into tasks, building and verifying functionality, and incorporating review feedback. This certificate recognizes that the intern has successfully completed the <strong>{domain} training program</strong>.</p>
          <p>The intern also practiced writing readable, maintainable code, identifying and resolving defects, and communicating progress clearly within a team. Attention was given to collaborative development practices and to delivering reliable, well-documented work.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default SoftwareDevelopmentCompletionCertificate;
