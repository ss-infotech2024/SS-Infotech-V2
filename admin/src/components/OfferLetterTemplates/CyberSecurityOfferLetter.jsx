import React from "react";
import CertificateFrame from "../CertificateFrame";

const CyberSecurityOfferLetter = ({ data }) => {
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
  const role = position || "Cyber Security Intern";
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
          We are pleased to offer you an internship with <b>{company}</b> as a <b>{role}</b>. You will gain supervised experience with security practices that help protect systems, networks, and information.
        </p>

        <p className="mt-1 text-justify">
          <b>Internship / Training Details:</b><br />
          Role: {role}<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}
          {internshipTo ? <><br />End Date: {internshipTo}</> : null}
        </p>

        <p className="mt-1 text-justify">
          With appropriate authorization and team supervision, your assignments may include reviewing security configurations, analyzing logs, documenting potential risks, and learning how teams assess and respond to security issues. You must follow access controls and confidentiality requirements at all times.
        </p>

        <p className="mt-1 text-justify">
          You may also study security procedures, help organize assessment evidence, and prepare concise notes that distinguish confirmed observations from items requiring further review. Any security testing must remain within the systems, accounts, and scope specifically approved by the company.
        </p>

        <p className="mt-1 text-justify">
          Please protect credentials and sensitive information, use approved channels to report concerns, and do not access, scan, modify, or disclose systems or data outside your assigned authorization. These expectations apply throughout the internship.
        </p>

        <p className="mt-1 text-justify">
          Upon successful completion of the internship and its required evaluation, a certificate of completion will be issued. This internship is intended for learning and skill development and does not constitute an offer of employment. Please confirm your acceptance by replying to this email or returning a signed copy of this letter.
        </p>

        <p className="mt-1 text-justify">
          We look forward to supporting your growth in cybersecurity.
        </p>

      </div>
    </div>
    </CertificateFrame>
  );
};

export default CyberSecurityOfferLetter;


