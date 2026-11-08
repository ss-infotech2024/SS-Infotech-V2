import { BriefcaseBusiness, FileText, Globe2, Handshake, RefreshCw, Send } from "lucide-react";
import LegalPageLayout from "../components/LegalPageLayout";

const sections = [
  {
    title: "Using this website",
    content: "You may use this website to learn about SS Infotech, explore our services and opportunities, and contact us. Please use the site lawfully and do not attempt to disrupt its operation, gain unauthorized access, or submit misleading, unlawful, or harmful material.",
    icon: Globe2,
  },
  {
    title: "Applications and submitted materials",
    content: "When applying for a role or internship, provide accurate information and upload only materials you are entitled to share. Submitting an application does not guarantee an interview, selection, internship placement, job, or other engagement. We may contact you using the details you provide to discuss your application.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Services and information",
    content: "Our work includes IT solutions, software development, digital services, training, and technology-driven solutions. Website descriptions are general information about our offerings and do not create a separate service agreement, guarantee a particular result, or replace the terms agreed for a specific project or training program.",
    icon: Handshake,
  },
  {
    title: "Website content",
    content: "Unless stated otherwise, website text, graphics, branding, and other materials are owned by SS Infotech or used with permission. You may view the site for personal or business information, but may not copy, alter, republish, or commercially use protected materials without permission, except where the law allows.",
    icon: FileText,
  },
  {
    title: "Availability and changes",
    content: "We work to keep the website useful and available, but features or content may change and uninterrupted access is not guaranteed. We may revise these terms by publishing an updated version on this page. Continued use after an update means you are using the site under the revised terms.",
    icon: RefreshCw,
  },
  {
    title: "Contact",
    content: "Questions about these terms can be sent to hr@ssinfotech.co.in or raised through our Contact page.",
    icon: Send,
  },
];

export default function TermsOfService() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      eyebrow="Clear terms for using our website"
      intro="These terms apply to your use of the SS Infotech website. By using the site, you agree to use it in line with these terms and applicable law."
      sections={sections}
      related="/privacy-policy"
      relatedLabel="Privacy Policy"
    />
  );
}
