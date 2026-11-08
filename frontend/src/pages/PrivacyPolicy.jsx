import { Database, FileCheck2, Mail, Shield, UserRound } from "lucide-react";
import LegalPageLayout from "../components/LegalPageLayout";

const sections = [
  {
    title: "Information we collect",
    content: "When you apply for an internship or other role through our website, we collect the information you provide: your full name, email address, phone number, selected role, college name when requested, and the resume file you upload. If you contact us through another channel, we may also receive the details you choose to share in that communication.",
    icon: UserRound,
  },
  {
    title: "How we use application information",
    content: "We use these details to receive and review applications, contact applicants, coordinate recruitment or internship steps, and maintain related application records. The website submits the application to our application system. For internship applications, it may also open your email application with a message addressed to hr@ssinfotech.co.in; you control whether to send that email. A resume is not automatically attached to that email, so attach it if requested.",
    icon: Database,
  },
  {
    title: "Sharing and protection",
    content: "We limit access to application information to people who need it for recruitment, internship administration, or related business operations. We do not publish applicant resumes on the website. We use reasonable administrative and technical measures to protect information, though no online transmission or storage method can be guaranteed completely secure.",
    icon: Shield,
  },
  {
    title: "Retention and your choices",
    content: "We keep application information for as long as it is reasonably needed to assess and manage the application, meet record-keeping needs, and address related enquiries. You may ask us to correct or delete information, or raise a privacy concern, by contacting hr@ssinfotech.co.in. We may need to retain some records where required for legitimate operational or legal purposes.",
    icon: FileCheck2,
  },
  {
    title: "Updates and contact",
    content: "We may update this notice when our services or practices change. The current version will be posted on this page. For privacy questions, contact SS Infotech at hr@ssinfotech.co.in or visit our Contact page.",
    icon: Mail,
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      eyebrow="Your information, handled with care"
      intro="SS Infotech provides innovative IT solutions, software development, digital services, training, and technology-driven solutions to help businesses grow. This policy explains how information submitted through this website, including internship applications, is used."
      sections={sections}
      related="/terms-of-service"
      relatedLabel="Terms of Service"
    />
  );
}
