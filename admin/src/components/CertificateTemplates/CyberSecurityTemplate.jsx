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
              This is to formally certify that <strong>{candidateName}</strong>{" "}
              has successfully completed an internship at{" "}
              <strong>{companyName}</strong> from{" "}
              <strong>{internshipFrom}</strong> to{" "}
              {<strong>{internshipTo}</strong>} Under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
            </p>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">Internship Details:</p>
              <p>Intern Name: {candidateName}</p>
              <p>Position: {position}</p>
              <p>Department: Cyber Security & Network Defense</p>
              <p>
                Internship Duration: {internshipFrom} to {internshipTo}
              </p>
            </div>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">
                Responsibilities Undertaken:
              </p>
              <div className="pl-0">
                <p>
                  Conducting vulnerability assessments and penetration testing
                  on internal systems.
                </p>
                <p>
                  Assisting in incident response and forensic investigation
                  exercises.
                </p>
                <p>
                  Implementing firewall configurations and access control
                  measures.
                </p>
                <p>
                  Monitoring and analyzing network logs for potential security
                  threats.
                </p>
                <p>
                  Researching and documenting cybersecurity best practices and
                  emerging threats.
                </p>
              </div>
            </div>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">
                Internship Overview & Performance Evaluation:
              </p>
              <p>
                Throughout the internship, {candidateName} demonstrated
                excellent analytical thinking, attention to detail, and a
                strong understanding of cybersecurity principles. Their
                contributions to system hardening and vulnerability mitigation
                were highly valuable to the team.
              </p>
            </div>
            <div className="mt-4 mb-3">
            </div>
          </>
        )}

      </div>
      {type !== "Internship Offer Letter" && (
        <p ></p>
      )}
    </div>
    </CertificateFrame>
  );
};

export default CyberSecurityTemplate;
