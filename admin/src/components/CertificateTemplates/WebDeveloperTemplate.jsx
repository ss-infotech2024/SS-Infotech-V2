import React from "react";
import CertificateFrame from "../CertificateFrame";

const WebDeveloperTemplate = ({ data = {}, type = "Certificate" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "[Company Name]",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    department = "[Department]",
    position = "Web Development Intern",
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

      <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        {/* Main Content */}
        <p className="mb-1">
          This is to formally certify that <strong>{candidateName}</strong> has successfully completed an internship at <strong>{companyName}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>. During the tenure of the internship, {candidateName} was assigned to the <strong>{position}</strong> role Under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
        </p>

        <p className="mb-1 font-semibold">Internship Details:</p>
        <div className="pl-2 mb-1">
          <p><strong>Intern Name:</strong> {candidateName}</p>
          <p><strong>Position:</strong> {position}</p>
          <p><strong>Internship Duration:</strong> {internshipFrom} to {internshipTo}</p>
        </div>

        <p className="mb-1 font-semibold">Responsibilities Undertaken:</p>
        <p className="mb-1">
          During the internship, {candidateName} actively contributed to the development of web applications and software solutions. Key responsibilities included:
        </p>
        <div className="pl-2 mb-1">
          <p>Frontend Development: Implementing responsive UI designs using HTML, CSS, JavaScript, React.js.</p>
          <p>Backend Development: Developing and integrating APIs using Node.js, Express.js, and managing databases with MongoDB/MySQL.</p>
          <p>Debugging & Optimization: Identifying and fixing bugs, optimizing application performance.</p>
          <p>Version Control: Collaborating with teams using Git & GitHub.</p>
          {/* <p>Deployment & Testing: Assisting in deployment of web applications and conducting testing for functionality and security.</p> */}
        </div>

        <p className="mb-1 font-semibold">Internship Overview & Performance Evaluation:</p>
        <p className="mb-1">
          Throughout the internship, {candidateName} exhibited exceptional problem-solving skills, adaptability, and enthusiasm in learning new technologies. Their contributions to project development and teamwork were highly commendable.
        </p>
      </div>
    </div>
    </CertificateFrame>
  );
};

export default WebDeveloperTemplate;
