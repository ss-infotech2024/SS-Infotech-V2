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
  } = data;
  const name = candidateName || "Candidate Name";

  return (
    <CertificateFrame>
      <div className="relative h-full w-full text-[14px] leading-relaxed">
        <div className="absolute left-8 right-8 pt-40">
          <p>To,</p>
          <p className="font-semibold">{name}</p>
          <p>{collegeName || "College Name"}, Nagpur</p>
          <p className="mt-6 font-semibold">Subject: Offer for Internship in Artificial Intelligence and Machine Learning</p>
          <p className="mt-5">Dear {name},</p>
          <p className="mt-4 text-justify">We are pleased to offer you the position of <strong>{position}</strong> at <strong>{companyName}</strong>. We look forward to supporting your learning and contributions to our team.</p>
          <p className="mt-4"><strong>Internship / Training Details:</strong><br />Role: {position}<br />Location: Nagpur<br />Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />End Date: {internshipTo || "DD/MM/YYYY"}</p>
          <p className="mt-4 text-justify">During the internship, you will gain experience with data preparation, exploratory analysis, machine learning workflows, model evaluation, and documenting results under team guidance. Please follow company policies and protect confidential information.</p>
          <p className="mt-4 text-justify">A completion certificate will be issued after successful completion of the internship and required evaluation. This internship supports academic and skill development and does not constitute an offer of employment.</p>
          <p className="mt-4">Please confirm your acceptance by replying to this letter or submitting a signed copy. We look forward to welcoming you.</p>
        </div>
      </div>
    </CertificateFrame>
  );
};

export default AIMLOfferLetter;
