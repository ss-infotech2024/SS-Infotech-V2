import React from "react";
import CertificateFrame from "../CertificateFrame";

const HumanResourcesTemplate = ({ data }) => {
  const {
    candidateName,
    collegeName,
    companyName,
    position,
    internshipFrom,
    internshipTo,
    issuedDate,
  } = data;

  return (
    <CertificateFrame>
    <div className="relative h-full w-full text-[14px] leading-snug">
      <div className="absolute left-8 right-8 pt-40">
        <p className="mb-2 text-right font-medium">Date: {issuedDate || "DD/MM/YYYY"}</p>
        <p>To,</p>
        <p className="font-semibold">{candidateName || "candidate Name"}</p>
        <p>{collegeName || "College Name"}</p>

        <p className="mt-1 font-semibold">Subject: Offer for Internship in Human Resources</p>

        <p className="mt-1">Dear {candidateName || "Candidate Name"},</p>

        <p className="mt-1 text-justify">
          We are pleased to offer you an opportunity to join{" "}
          <b>{companyName || "SS Infotech Pvt. Ltd."}</b> as a{" "}
          <b>{position || "Human Resources Intern"}</b>. The role will provide supervised experience
          supporting recruitment coordination, employee records, onboarding, and internal
          communications while following confidentiality requirements.
        </p>

        <p className="mt-1 text-justify">
          <b>Internship Details:</b>
          <br />
          Internship Role: {position || "Human Resources Intern"}
          <br />
          Location: Nagpur
          <br />
          Start Date: {internshipFrom || "DD/MM/YYYY"}
          {internshipTo ? (
            <>
              <br />
              End Date: {internshipTo}
            </>
          ) : null}
        </p>

        <p className="mt-1 text-justify">
          During your internship, you will work with the Human Resources team of{" "}
          {companyName || "SS Infotech Pvt. Ltd."}. Assignments may include organizing recruitment
          information, maintaining records, supporting onboarding, and helping coordinate employee
          communications. You must handle personal and company information confidentially.
        </p>

        <p className="mt-1 text-justify">
          You may also assist with preparing interview schedules, organizing onboarding materials,
          updating approved records, and coordinating routine employee communications. Any records
          or reports you handle should be accurate, stored in approved locations, and shared only
          with people authorized to receive them.
        </p>

        <p className="mt-1 text-justify">
          Please refer employee or candidate questions to the appropriate HR contact, follow the
          company’s privacy and record-handling procedures, and raise any uncertainty before
          changing or sharing information. Your assigned work will be completed with team guidance.
        </p>

        <p className="mt-1 text-justify">
          Upon successful completion of the internship and its required evaluation, a certificate
          of completion will be issued. This internship is intended for learning and skill development
          and does not constitute an offer of employment.
        </p>

        <p className="mt-1 text-justify">
          Kindly confirm your acceptance of this offer by replying to this email or submitting a
          signed copy of this letter.
        </p>

        <p className="mt-1 text-justify">
          We look forward to supporting your growth in Human Resources.
        </p>
        <div className="h-16" aria-hidden="true" />

      </div>
    </div>
    </CertificateFrame>
  );
};

export default HumanResourcesTemplate;



