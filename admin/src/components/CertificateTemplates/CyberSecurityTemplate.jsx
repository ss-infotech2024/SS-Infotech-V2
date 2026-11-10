import React from "react";
import CertificateFrame from "../CertificateFrame";

const CyberSecurityTemplate = ({ data = {}, type = "Internship Offer Letter" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "SS Infotech Pvt. Ltd.",
    position = "Cyber Security Intern",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    issuedDate = "[Issued Date]",
    supervisorName = "Mr Viraj Patle",
  } = data;

  return (
    <CertificateFrame>
    <div className="relative h-full w-full p-8">
      <div className="absolute right-8 text-sm pt-44">
        Date: <strong>{issuedDate}</strong>
      </div>

      <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        {type === "Internship Offer Letter" ? (
          <>
            <p className="mb-3">
              We are pleased to offer you the position of{" "}
              <strong>{position}</strong> at{" "}
              <strong>{companyName}</strong>. Your passion for cybersecurity and
              enthusiasm for securing digital infrastructures make you an ideal
              candidate for this internship.
            </p>

            <p className="mb-3">
              As a <strong>{position}</strong>, you will gain practical
              experience in the following areas:
            </p>
            <ul className="list-disc pl-6 mb-3">
              <li>
                Performing vulnerability assessments and penetration testing.
              </li>
              <li>
                Monitoring network activity for suspicious patterns and security
                breaches.
              </li>
              <li>
                Analyzing malware, phishing threats, and intrusion attempts.
              </li>
              <li>
                Implementing security policies and encryption techniques.
              </li>
              <li>
                Collaborating with the team to design secure system
                architectures.
              </li>
            </ul>

            <p className="mb-3">
              The internship will commence on <strong>{internshipFrom}</strong>{" "}
              and conclude on <strong>{internshipTo}</strong>. Please confirm
              your acceptance by replying to this email or submitting a signed
              copy of this offer.
            </p>

            <p className="mb-6">
              We look forward to having you as part of our Cyber Security team
              and are confident that this experience will significantly enhance
              your technical expertise.
            </p>
          </>
        ) : (
          <>
            <p className="mb-3">
              This certifies that <strong>{candidateName}</strong> successfully completed an internship with{" "}
              <strong>{companyName}</strong> as a <strong>{position}</strong> from{" "}
              <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
            </p>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">Internship Details:</p>
              <p><strong>Intern Name:</strong> {candidateName}</p>
              <p><strong>Position:</strong> {position}</p>
              <p><strong>Department:</strong> Cyber Security & Network Defense</p>
              <p>
                <strong>Internship Duration:</strong> {internshipFrom} to {internshipTo}
              </p>
            </div>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">
                Responsibilities Undertaken:
              </p>
              <div className="pl-0">
                <p>
                  Reviewing approved security configurations and documenting potential risks.
                </p>
                <p>
                  Analyzing sample or authorized logs to recognize suspicious activity.
                </p>
                <p>
                  Learning access control, network defense, and secure configuration practices.
                </p>
                <p>
                  Organizing findings by evidence and potential impact for supervisor review.
                </p>
                <p>
                  Supporting security awareness, incident response exercises, and clear reporting.
                </p>
                <p>
                  Researching cybersecurity practices and documenting findings for the team.
                </p>
              </div>
            </div>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">Program Learning Overview:</p>
              <p>
                The program covered security fundamentals, risk documentation, safe log analysis, access controls, and responsible handling of information. Assignments emphasized staying within approved scope, preserving evidence, and communicating observations clearly so they can be reviewed. This certificate recognizes completion of the internship in cybersecurity.
              </p>
              <p>
                The intern also practiced separating verified indicators from assumptions, recording the context of observations, and escalating concerns through the appropriate team channels. These habits support careful review and help ensure that security work is performed responsibly and within authorized boundaries.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
    </CertificateFrame>
  );
};

export default CyberSecurityTemplate;
