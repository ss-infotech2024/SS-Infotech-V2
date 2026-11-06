import React from "react";
import CertificateFrame from "../CertificateFrame";

const WebDeveloperOfferLetter = ({ data }) => {
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
  const role = position || "Web Development Intern";
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
          We are pleased to offer you an internship with <b>{company}</b> as a <b>{role}</b>. The internship will provide supervised, practical experience in designing, building, and maintaining web applications.
        </p>

        <p className="mt-1 text-justify">
          <b>Internship / Training Details:</b><br />
          Role: {role}<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}
          {internshipTo ? <><br />End Date: {internshipTo}</> : null}
        </p>

        <p className="mt-1 text-justify">
          Under the guidance of the development team, your work may include building responsive interfaces, connecting application features to APIs and databases, testing and debugging code, and using version control to collaborate. You are expected to follow project standards and protect confidential information.
        </p>

        <p className="mt-1 text-justify">
          Assignments may also involve reviewing project requirements, organizing interface components, checking how pages behave on different screen sizes, and documenting implementation decisions. Changes will be reviewed with the team so that you can learn from feedback and understand how individual features fit into a larger application.
        </p>

        <p className="mt-1 text-justify">
          Please communicate progress and blockers promptly, ask questions when requirements are unclear, and use only the tools and environments approved for your work. Do not share source code, credentials, or project information outside the company.
        </p>

        <p className="mt-1 text-justify">
          Upon successful completion of the internship and its required evaluation, a certificate of completion will be issued. This internship is intended for learning and skill development and does not constitute an offer of employment.
        </p>

        <p className="mt-1 text-justify">
          Kindly confirm your acceptance of this offer by replying to this email or submitting a signed copy of this letter.
        </p>

        <p className="mt-1 text-justify">
          We look forward to supporting your growth in web development.
        </p>

        
      </div>
    </div>
    </CertificateFrame>
  );
};

export default WebDeveloperOfferLetter;


