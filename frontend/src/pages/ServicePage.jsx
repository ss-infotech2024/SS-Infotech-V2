import React, { useMemo, useState } from "react";
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

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-brand-accent text-white">Our Services</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4">
            Product engineering, education and hiring services that accelerate careers
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mt-4">
            From building production-grade products to training and campus hiring — we partner with students and
            companies to create impact.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/contact">
              <Button className="bg-white text-brand-blue hover:bg-white/90">Talk to an Expert</Button>
            </Link>
            <Link to="/projects">
              <Button variant="ghost" className="text-white border-white/20">See Our Work</Button>
            </Link>
          </div>
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
              />
            </div>
            <div className="flex items-center gap-2">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    activeCategory === c.id ? "bg-brand-blue text-white" : "bg-muted"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <Card
                key={s.id}
                className={`border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                  selectedService === s.id ? "ring-2 ring-brand-blue" : ""
                }`}
                onClick={() => setSelectedService(s.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <s.icon className="h-6 w-6 text-brand-blue" />
                        <CardTitle className="text-lg">{s.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">{s.description}</CardDescription>
                    </div>
                    <div>
                      <Badge className="bg-brand-accent text-white">Top</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {s.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Learn more about delivery & pricing</div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={selectedService === s.id ? "secondary" : "default"}
                        onClick={() => setSelectedService(s.id)}
                        aria-label={`Learn more about ${s.title}`}
                      >
                        Learn More
                      </Button>
                      <Link to="/contact">
                        <Button className="bg-brand-blue text-white">Get Quote</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Products we build</h2>
            <p className="text-muted-foreground mt-2">A selection of product types we deliver end-to-end for startups and enterprises.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="h-36 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
                  <img src={p.image} alt={p.name} className="h-20 w-auto" />
                </div>
                <CardContent>
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{p.description}</CardDescription>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link to="/projects">
                      <Button className="bg-brand-blue text-white">Explore</Button>
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
            <div>
              <h2 className="text-2xl font-bold">Why choose SS Infotech for services?</h2>
              <p className="text-muted-foreground mt-4">
                We combine deep technical expertise with practical delivery experience. From prototyping to maintained
                production systems and training, our teams focus on measurable outcomes and knowledge transfer.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-semibold">Dedicated teams</h4>
                    <p className="text-sm text-muted-foreground">Experienced engineers aligned to your product goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-brand-blue mt-1" />
                  <div>
                    <h4 className="font-semibold">Transparent pricing</h4>
                    <p className="text-sm text-muted-foreground">Clear scope, predictable costs, and flexible engagement models.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Request a Consultation</CardTitle>
                <CardDescription>Share your details and we'll reach out within one business day.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleFormChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleFormChange} />
                  </div>
                  <div>
                    <Label htmlFor="service">Interested Service</Label>
                    <Select onValueChange={handleSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.id} value={s.title}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={4} value={form.message} onChange={handleFormChange} />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={!canSubmit || submitting} className="bg-brand-blue text-white">
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