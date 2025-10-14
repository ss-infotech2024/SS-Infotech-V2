// import { Label } from "../components/UI/Lable ";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Textarea } from "../components/UI/Textarea";
import { Label } from "../components/UI/Lable ";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { toast } from "../Hooks/use-toast";
import {
  Code,
  Cpu,
  Smartphone,
  Megaphone,
  BookOpen,
  Users,
  Briefcase,
  Layers,
  CheckCircle,
  Globe,
  Database,
  Server,
} from "lucide-react";

export default function ServicePage() {
  const services = [
    {
      id: "real-time",
      title: "Real Time Project Development",
      icon: Layers,
      description:
        "Complete real-world project development with end-to-end delivery — architecture, implementation, deployment and monitoring.",
      highlights: ["Product scoping", "MVP delivery", "Real-time systems", "Post-launch support"],
    },
    {
      id: "software",
      title: "Software Development",
      icon: Server,
      description: "Bespoke software engineering for web, mobile and backend systems with modern engineering practices.",
      highlights: ["API design", "Microservices", "Testing & QA", "CI/CD"],
    },
    {
      id: "web-app",
      title: "Web & App Development",
      icon: Code,
      description: "Responsive websites and native-like mobile apps built with React, React Native and cross-platform tools.",
      highlights: ["UI/UX focus", "PWA & Mobile", "Performance tuning", "Accessibility"],
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      icon: Megaphone,
      description: "Data driven marketing: SEO, paid ads, content and growth experiments to increase conversions and users.",
      highlights: ["SEO & Content", "Paid Social", "Analytics & CRO", "Growth experiments"],
    },
    {
      id: "ielts",
      title: "IELTS / GRE / TOEFL Training",
      icon: BookOpen,
      description: "Exam-focused training programs with practice tests, strategies and one-on-one mentoring to maximize scores.",
      highlights: ["Personalized coaching", "Mock tests", "Score improvement plan", "Flexible batches"],
    },
    {
      id: "campus-hiring",
      title: "Campus Hiring Program",
      icon: Users,
      description: "Structured campus drives and hiring partnerships to connect talent with hiring companies.",
      highlights: ["Drive coordination", "Screening & tests", "Interview support", "Offer management"],
    },
    {
      id: "career-consult",
      title: "Jobs & Career Consultant",
      icon: Briefcase,
      description: "Career counselling, resume building, interview coaching and placement assistance for students and professionals.",
      highlights: ["Resume review", "Mock interviews", "Job matching", "Career roadmap"],
    },
  ];

  const products = [
    {
      id: "ecom",
      name: "E‑commerce Platform",
      description: "Scalable storefronts with cart, checkout, payments and admin dashboards for merchants.",
      tech: ["React", "Node.js", "Postgres"],
      image: "/placeholder.svg",
    },
    {
      id: "edtech",
      name: "EdTech LMS",
      description: "Learning management system for courses, assessments, student tracking and certifications.",
      tech: ["Next.js", "Firebase", "Stripe"],
      image: "/placeholder.svg",
    },
    {
      id: "recruit",
      name: "Recruitment Portal",
      description: "End-to-end recruitment product with job listings, applicant tracking and campus drive integration.",
      tech: ["React", "GraphQL", "Postgres"],
      image: "/placeholder.svg",
    },
    {
      id: "analytics",
      name: "Analytics Dashboard",
      description: "Operational dashboards with real-time metrics, alerts and role based access.",
      tech: ["D3", "Node.js", "TimescaleDB"],
      image: "/placeholder.svg",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "development", label: "Development" },
    { id: "training", label: "Training" },
    { id: "hiring", label: "Hiring & Careers" },
    { id: "marketing", label: "Marketing" },
  ];

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", service: "" });
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (activeCategory !== "all") {
        if (activeCategory === "development" && !["real-time", "software", "web-app"].includes(s.id)) return false;
        if (activeCategory === "training" && s.id === "ielts") return true;
        if (activeCategory === "hiring" && ["campus-hiring", "career-consult"].indexOf(s.id) === -1) return false;
        if (activeCategory === "marketing" && s.id !== "digital-marketing") return false;
      }
      if (!q) return true;
      return (s.title + " " + s.description + " " + s.highlights.join(" ")).toLowerCase().includes(q);
    });
  }, [query, activeCategory]);

  const canSubmit = form.name.trim() && form.email.includes("@") && form.service;

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSelect(value) {
    setForm((s) => ({ ...s, service: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      toast({ title: "Request sent", description: `We'll contact you at ${form.email} regarding ${form.service}.` });
      setForm({ name: "", email: "", message: "", service: "" });
    } finally {
      setSubmitting(false);
    }
  }

  const cardRefs = useRef([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            if (entry.target.classList.contains("card-animate")) {
              entry.target.classList.add("slide-up");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filtered]);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-purple-700 to-purple-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-purple-500 text-white">Our Services</Badge>
          <h1 ref={(el) => (sectionRefs.current[0] = el)} className="text-4xl lg:text-5xl font-bold mt-4 fade-in-initial">
            Product engineering, education and hiring services that accelerate careers
          </h1>
          <p ref={(el) => (sectionRefs.current[1] = el)} className="text-lg text-purple-100 max-w-3xl mx-auto mt-4 fade-in-initial">
            From building production-grade products to training and campus hiring — we partner with students and
            companies to create impact.
          </p>
          {/* <div className="mt-6 flex justify-center gap-3">
            <Link to="/contact">
              <Button className="bg-purple-100 text-purple-900 hover:bg-purple-200">Talk to an Expert</Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" className="text-purple-100 border-purple-100/20 hover:bg-purple-900/20">See Our Work</Button>
            </Link>
          </div> */}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Search services, e.g. ‘mobile app’, ‘campus’"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search services"
                className="border-purple-300 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    activeCategory === c.id ? "bg-purple-700 text-white" : "bg-purple-100 text-purple-900"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, index) => (
              <Card
                key={s.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden fade-in-initial card-animate"
              >
                <div className="h-36 bg-gradient-to-br from-purple-100 to-white flex items-center justify-center">
                  <s.icon className="h-20 w-20 text-purple-700" />
                </div>
                <CardContent>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                  <CardDescription className="text-sm text-purple-600">{s.description}</CardDescription>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.highlights.map((h, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-200 text-purple-800">{h}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to="/contact">
                      <Button className="bg-purple-700 text-white">Explore</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={(el) => (sectionRefs.current[2] = el)} className="text-center mb-8 fade-in-initial">
            <h2 className="text-3xl font-bold text-purple-900">Products we build</h2>
            <p className="text-purple-600 mt-2">A selection of product types we deliver end-to-end for startups and enterprises.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-36 bg-gradient-to-br from-purple-100 to-white flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="h-20 w-auto" />
                </div>
                <CardContent>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <CardDescription className="text-sm text-purple-600">{p.description}</CardDescription>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="bg-purple-200 text-purple-800">{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link to="/projects">
                      <Button className="bg-purple-700 text-white">Explore</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div ref={(el) => (sectionRefs.current[3] = el)} className="fade-in-initial">
              <h2 className="text-2xl font-bold text-purple-900">Why choose SS Infotech for services?</h2>
              <p className="text-purple-600 mt-4">
                We combine deep technical expertise with practical delivery experience. From prototyping to maintained
                production systems and training, our teams focus on measurable outcomes and knowledge transfer.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-purple-700 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-900">Dedicated teams</h4>
                    <p className="text-sm text-purple-600">Experienced engineers aligned to your product goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-purple-700 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-900">Transparent pricing</h4>
                    <p className="text-sm text-purple-600">Clear scope, predictable costs, and flexible engagement models.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card ref={(el) => (sectionRefs.current[4] = el)} className="border-0 shadow-lg fade-in-initial">
              <CardHeader>
                <CardTitle className="text-purple-900">Request a Consultation</CardTitle>
                <CardDescription className="text-purple-600">Share your details and we'll reach out within one business day.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name" className="text-purple-900">Name</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleFormChange} className="border-purple-300 focus:border-purple-500" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-purple-900">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleFormChange} className="border-purple-300 focus:border-purple-500" />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-purple-900">Interested Service</Label>
                    <Select onValueChange={handleSelect}>
                      <SelectTrigger className="border-purple-300 focus:border-purple-500 bg-white">
                        <SelectValue placeholder="Choose a service"  className="bg-white"/>
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.title} className="text-purple-900 bg-white">
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-purple-900">Message</Label>
                    <Textarea id="message" name="message" rows={4} value={form.message} onChange={handleFormChange} className="border-purple-300 focus:border-purple-500" />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={!canSubmit || submitting} className="bg-purple-700 text-white">
                      {submitting ? "Sending..." : "Request Consultation"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}