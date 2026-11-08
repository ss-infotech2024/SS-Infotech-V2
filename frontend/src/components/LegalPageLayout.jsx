import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";

const LegalSection = ({ number, title, content, icon: Icon }) => (
  <section className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg sm:p-6">
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition group-hover:bg-purple-700 group-hover:text-white">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-purple-700">{number}</p>
        <h2 className="mb-2 text-lg font-bold text-slate-900">{title}</h2>
        <p className="leading-7 text-slate-600">{content}</p>
      </div>
    </div>
  </section>
);

export default function LegalPageLayout({ title, eyebrow, intro, sections, related, relatedLabel }) {
  const HeaderIcon = title === "Privacy Policy" ? ShieldCheck : FileText;

  return (
    <div className="relative overflow-hidden bg-slate-50 px-4 py-10 sm:py-16">
      <div className="pointer-events-none absolute -left-24 top-44 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-fuchsia-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#3d126e] via-[#5b218b] to-[#8b35c5] px-6 py-9 text-white shadow-xl sm:px-10 sm:py-12">
          <div className="absolute -right-8 -top-12 h-56 w-56 rounded-full border-[28px] border-white/5" />
          <div className="absolute bottom-0 right-28 h-28 w-28 rounded-full bg-fuchsia-400/10 blur-2xl" />
          <div className="relative flex items-start gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner sm:h-16 sm:w-16">
              <HeaderIcon size={30} strokeWidth={1.7} aria-hidden="true" />
            </div>
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-purple-200">{eyebrow}</p>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl leading-7 text-purple-100">{intro}</p>
              <span className="mt-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
                Effective November 5, 2026
              </span>
            </div>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Page sections">
          {sections.map((section, index) => (
            <a key={section.title} href={`#legal-section-${index + 1}`} className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-purple-300 hover:text-purple-700">
              {section.title}
            </a>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {sections.map((section, index) => (
            <div id={`legal-section-${index + 1}`} key={section.title} className="scroll-mt-24">
              <LegalSection number={`0${index + 1}`} {...section} />
            </div>
          ))}
        </div>

        <aside className="mt-8 flex flex-col gap-5 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-white p-2 text-purple-700 shadow-sm"><ShieldCheck size={19} aria-hidden="true" /></div>
            <div>
              <h2 className="font-bold text-slate-900">Have a question?</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">Our team can help with questions about this page or information submitted on the website.</p>
            </div>
          </div>
          <a href="mailto:hr@ssinfotech.co.in" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-purple-800">
            Contact SS Infotech <ArrowRight size={16} aria-hidden="true" />
          </a>
        </aside>

        <div className="mt-6 text-center text-sm text-slate-600">
          Also read our <Link className="font-semibold text-purple-700 hover:underline" to={related}>{relatedLabel}</Link>.
        </div>
      </div>
    </div>
  );
}
