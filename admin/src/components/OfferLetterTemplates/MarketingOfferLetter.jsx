import React from "react";
import CertificateFrame from "../CertificateFrame";

const MarketingOfferLetter = ({ data }) => {
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
    const role = position || "Marketing Intern";
    const company = companyName || "SS Infotech Pvt. Ltd.";

    return (
        <CertificateFrame>
        <div className="relative h-full w-full text-[14px] leading-snug">
            <div className="absolute left-8 right-8 pt-40">
                <p className="mb-2 text-right font-medium">Date: <b>{issuedDate || "DD/MM/YYYY"}</b></p>
                <p>To,</p>
                <p className="font-semibold">{name}</p>
                <p className="font-semibold">{collegeName || "College Name"}</p>

                <p className="mt-1 font-semibold">Subject: Offer for {role}</p>

                <p className="mt-1">Dear <b>{name}</b>,</p>

                <p className="mt-1 text-justify">
                    We are pleased to offer you an internship with <b>{company}</b> as a <b>{role}</b>. The role will provide supervised experience supporting marketing research, campaign work, and communications.
                </p>

                <p className="mt-1 text-justify">
                    <b>Internship / Training Details:</b><br />
                    Internship Role: <b>{role}</b><br />
                    Location: <b>Nagpur</b><br />
                    Start Date: <b>{internshipFrom || "DD/MM/YYYY"}</b>
                    {internshipTo ? <><br />End Date: <b>{internshipTo}</b></> : null}
                </p>

                <p className="mt-1 text-justify">
                    Your assignments may include researching audiences and competitors, preparing campaign materials, supporting social media and other communications, and organizing results for review. You are expected to follow brand guidance and protect confidential information.
                </p>

                <p className="mt-1 text-justify">
                    You may also help maintain content calendars, adapt draft messages for different audiences, and review campaign materials for clarity and consistency. Recommendations should be supported by the research available, and campaign results should be summarized accurately for the team.
                </p>

                <p className="mt-1 text-justify">
                    Please obtain the required review before publishing or distributing materials, respect privacy and intellectual property, and communicate task progress and questions to your supervisor. Final priorities may vary with the company’s ongoing marketing work.
                </p>

                <p className="mt-1 text-justify">
                    Upon successful completion of the internship and its required evaluation, a <b>certificate of completion</b> will be issued. This internship is intended for learning and skill development and <b>does not constitute an offer of employment</b>.
                </p>

                <p className="mt-1 text-justify">
                    Kindly confirm your acceptance of this offer by replying to this email or submitting a signed copy of this letter.
                </p>

                <p className="mt-1 text-justify">
                    We look forward to supporting your growth in marketing.
                </p>


            </div>
        </div>
        </CertificateFrame>
    );
};

export default MarketingOfferLetter;


