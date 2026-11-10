import React from "react";
import CertificateFrame from "../CertificateFrame";

const SoftwareDevelopmentOfferLetter = ({ data = {} }) => {
  const {
    candidateName = "Candidate Name",
    collegeName = "College Name",
    companyName = "SS Infotech Pvt. Ltd.",
    position = "Software Development Intern",
    internshipFrom = "DD/MM/YYYY",
    internshipTo = "DD/MM/YYYY",
    issuedDate = "DD/MM/YYYY",
  } = data;
  const name = candidateName || "Candidate Name";
  const domain = "Software Development";

  return (
    <CertificateFrame>
      <div className="relative h-full w-full text-[14px] leading-snug">
        <div className="absolute left-8 right-8 pt-40">
          <p className="mb-2 text-right font-medium">Date: <b>{issuedDate}</b></p>
          <p>To,</p>
          <p className="font-semibold">{name}</p>
          <p className="font-semibold">{collegeName || "College Name"}</p>
          <p className="mt-1 font-semibold">Subject: Offer for Internship in {domain}</p>
          <p className="mt-1">Dear <b>{name}</b>,</p>
          <p className="mt-1 text-justify">We are pleased to inform you that you have been selected for the internship / training program in <strong>{domain}</strong> with <strong>{companyName}</strong> as a <strong>{position}</strong>. The program will provide supervised, practical experience across the software development lifecycle.</p>
          <p className="mt-1"><strong>Internship / Training Details:</strong><br />Domain: <b>{domain}</b><br />Role: <b>{position}</b><br />Location: <b>Nagpur</b><br />Joining Date: <b>{internshipFrom || "DD/MM/YYYY"}</b><br />End Date: <b>{internshipTo || "DD/MM/YYYY"}</b></p>
          <p className="mt-1 text-justify">Under the guidance of the development team, your assignments may include analysing requirements, designing and writing modular code, working with databases and APIs, writing and running tests, debugging issues, and using version control to collaborate on shared codebases.</p>
          <p className="mt-1 text-justify">You may also take part in code reviews, follow coding standards and documentation practices, and learn how features move from planning to development, testing, and release. Feedback from reviews is intended to help you understand how individual changes fit into a larger application.</p>
          <p className="mt-1 text-justify">Please communicate progress and blockers promptly, use only the tools and environments approved for your work, and do not share source code, credentials, or project information outside the company.</p>
          <p className="mt-1 text-justify">Upon successful completion of the internship and its required evaluation, a <b>certificate of completion</b> will be issued. This internship is intended for learning and skill development and <b>does not constitute an offer of employment</b>.</p>
          <p className="mt-1">Please confirm your acceptance by replying to this letter or submitting a signed copy. We look forward to supporting your growth in software development.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default SoftwareDevelopmentOfferLetter;
