import React from "react";
import CertificateFrame from "../CertificateFrame";

const AIMLOfferLetter = ({ data = {} }) => {
  const {
    candidateName = "Candidate Name",
    collegeName = "College Name",
    companyName = "SS Infotech Pvt. Ltd.",
    position = "AI/ML Intern",
    internshipFrom = "DD/MM/YYYY",
    internshipTo = "DD/MM/YYYY",
    issuedDate = "DD/MM/YYYY",
  } = data;
  const name = candidateName || "Candidate Name";

  return (
    <CertificateFrame>
      <div className="relative h-full w-full text-[14px] leading-snug">
        <div className="absolute left-8 right-8 pt-40">
          <p className="mb-2 text-right font-medium">Date: {issuedDate}</p>
          <p>To,</p>
          <p className="font-semibold">{name}</p>
          <p>{collegeName || "College Name"}, Nagpur</p>
          <p className="mt-1 font-semibold">Subject: Offer for Internship in Artificial Intelligence and Machine Learning</p>
          <p className="mt-1">Dear {name},</p>
          <p className="mt-1 text-justify">We are pleased to offer you an internship as a <strong>{position}</strong> with <strong>{companyName}</strong>. The role will provide supervised experience exploring how data and machine learning methods can help address practical problems.</p>
          <p className="mt-1"><strong>Internship / Training Details:</strong><br />Role: {position}<br />Location: Nagpur<br />Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />End Date: {internshipTo || "DD/MM/YYYY"}</p>
          <p className="mt-1 text-justify">Your assignments may include preparing and exploring datasets, learning supervised or unsupervised model workflows, comparing evaluation results, documenting experiments, and communicating limitations. Work will be completed under team guidance and must follow privacy, security, and responsible AI practices.</p>
          <p className="mt-1 text-justify">You may also learn to establish simple baselines, select evaluation measures suited to the task, and compare experiments using consistent data and settings. Results should be recorded so that the team can understand what was tested, what changed, and where a model may not perform reliably.</p>
          <p className="mt-1 text-justify">Please protect source data, avoid using information outside its approved purpose, and discuss potential bias, uncertainty, or unexpected results with your supervisor. Do not deploy or present experimental outputs as production-ready without the required review and authorization.</p>
          <p className="mt-1 text-justify">Upon successful completion of the internship and its required evaluation, a certificate of completion will be issued. This internship is intended for learning and skill development and does not constitute an offer of employment.</p>
          <p className="mt-1">Please confirm your acceptance by replying to this letter or submitting a signed copy. We look forward to supporting your growth in AI and machine learning.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default AIMLOfferLetter;


