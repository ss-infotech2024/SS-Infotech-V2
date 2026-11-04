import React from "react";
import CertificateFrame from "../CertificateFrame";

const DataAnalystTemplate = ({ data = {}, type = "Internship Offer Letter" }) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "SS Infotech Pvt. Ltd.",
    position = "Data Analyst Intern",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    issuedDate = "[Date]",
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
              We are pleased to offer you the position of <strong>{position}</strong> at{" "}
              <strong>{companyName}</strong>. Your internship will focus on data analysis,
              business intelligence, and related tasks. Internship Details:
            </p>

            <p className="mb-3">
              Internship Duration: <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>.
              Please confirm your acceptance by replying to this email or returning a signed copy of this letter.
            </p>

            <p className="mb-2">
              We look forward to your contributions and growth during the internship.
            </p>
          </>
        ) : (
          <>
            <p className="mb-3">
              This certifies that <strong>{candidateName}</strong> successfully completed an internship with{" "}
              <strong>{companyName}</strong> as a <strong>{position}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>, under the supervision of <strong>{supervisorName || "Mr Viraj Patle"}</strong>.
            </p>

            <div className="mt-4 mb-1">
              <p className="font-semibold underline">Internship Details:</p>
              <p>Intern Name: {candidateName}</p>
              <p>Position: {position}</p>
              <p>Department: Data Analytics</p>
              <p>Internship Duration: {internshipFrom} to {internshipTo}</p>
            </div>

            <div className="mt-4 mb-1">
              <p className="font-semibold underline">Responsibilities Undertaken:</p>
              <p>
                The internship provided practical experience in data analysis and reporting. Responsibilities included:
              </p>
              <p>Preparing, checking, and cleaning datasets for analysis.</p>
              <p>Writing queries and organizing information from data sources.</p>
              <p>Using descriptive analysis to identify patterns, trends, and unusual values.</p>
              <p>Creating clear charts, tables, and summaries to communicate findings.</p>
              <p>Checking that calculations and visualizations match the source data.</p>
              <p>Documenting analysis steps and noting assumptions or data limitations.</p>
            </div>

            <div className="mt-4 mb-1">
              <p className="font-semibold underline">Program Learning Overview:</p>
              <p>
                The program covered data quality, analysis, visualization, and clear reporting. The workflow included clarifying questions, preparing data, checking results, and presenting findings in a form that supports review. This certificate recognizes completion of the internship in data analytics.
              </p>
              <p>
                The intern also practiced distinguishing observations from assumptions, documenting transformations, and explaining how missing or inconsistent values can affect conclusions. These steps helped make analysis easier to reproduce and gave reviewers useful context for interpreting reported findings.
              </p>
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

export default DataAnalystTemplate;
