import React from "react";
import CertificateFrame from "../CertificateFrame";

const MarketingCompletionCertificate = ({ data = {}, type = "Certificate" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "[Company Name]",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    department = "Marketing",
    position = "Marketing Intern",
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
        <p className="mb-3">
          This certifies that <strong>{candidateName}</strong> successfully completed an internship with <strong>{companyName}</strong> as a <strong>{position}</strong> in the <strong>{department}</strong> department from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
        </p>

        {/* Internship Details */}
        <p className="mb-3 font-semibold">Internship Details:</p>
        <div className="pl-4 mb-3">
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
        <p className="mb-3 font-semibold">Responsibilities Undertaken:</p>
        <p className="mb-3">
          The internship provided practical experience in marketing and communications. Responsibilities included:
        </p>
        <div className="pl-4 mb-3">
          <p>
            Supporting the planning and coordination of marketing campaigns.
          </p>
          <p>
            Researching audiences, markets, and competitor communications.
          </p>
          <p>
            Preparing draft content for social media and other promotional materials.
          </p>
          <p>
            Coordinating campaign materials and event communications with relevant teams.
          </p>
          <p>
            Organizing engagement results and campaign summaries for review.
          </p>
          <p>Maintaining content calendars and coordinating review of campaign materials.</p>
          <p>Checking that communications follow the approved brand tone and audience brief.</p>
        </div>

        {/* Overview & Evaluation */}
        <p className="mb-2 font-semibold">
          Program Learning Overview:
        </p>
        <p className="mb-3">
          The program covered campaign support, audience research, content preparation, brand consistency, and communications reporting. Activities included planning work against a brief, preparing materials for review, and organizing results for discussion. This certificate recognizes completion of the internship in marketing.
        </p>
        <p className="mb-1">
          The intern also practiced adapting messages for different audiences, checking materials against approved guidelines, and incorporating review feedback before publication. Campaign observations were organized to help the team discuss engagement and identify useful considerations for future planning.
        </p>

      </div>
    </div>
    </CertificateFrame>
  );
};

export default MarketingCompletionCertificate;
