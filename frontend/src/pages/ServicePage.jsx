import React, { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Textarea } from "../components/UI/Textarea";
import { Label } from "../components/UI/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { toast } from "../Hooks/use-toast";
import emailjs from "@emailjs/browser";
import {
  Code,
  Smartphone,
  Megaphone,
  Sparkles,
  Globe,
  Cloud,
  Send,
  Rocket,
  Target,
  Users,
  Award,
  Zap,
  Shield,
  TrendingUp,
  Search,
  ChevronDown,
  ExternalLink,
  CheckCircle2
} from "lucide-react";

// Initialize EmailJS
emailjs.init("uo8vZ7IYM4nQArKtj");

const floatingAnimation = {
  animate: {
    y: [0, -12, 0],
    x: [0, 6, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function ServicePage() {
  const formRef = useRef(null);

  const companyStats = useMemo(() => [
    { icon: Users, value: "50+", label: "Happy Clients", color: "from-blue-600 to-cyan-500", bg: "bg-blue-50 text-blue-600" },
    { icon: Award, value: "100+", label: "Projects Completed", color: "from-purple-600 to-indigo-500", bg: "bg-purple-50 text-purple-600" },
    { icon: Zap, value: "24/7", label: "Dedicated Support", color: "from-emerald-600 to-teal-500", bg: "bg-emerald-50 text-emerald-600" },
    { icon: TrendingUp, value: "98%", label: "Client Satisfaction", color: "from-amber-500 to-orange-500", bg: "bg-amber-50 text-amber-600" }
  ], []);

  const services = useMemo(() => [
    {
      id: "website-development",
      category: "development",
      title: "Enterprise Web Development",
      icon: Globe,
      description: "High-performance, secure, and scalable web platforms built using modern full-stack architectures.",
      highlights: ["Corporate Portals", "Custom Web Apps", "E-Commerce Engines", "API Integrations"],
      gradient: "from-blue-600 to-indigo-600",
      features: ["SEO Optimized", "Mobile First", "Sub-second Load", "High Security"],
      details: [
        { title: "Corporate Web Apps", description: "Bespoke digital architecture representing your enterprise brand." },
        { title: "E-Commerce Systems", description: "Full-scale storefronts with secure payment gateways and inventory engines." },
        { title: "Custom SaaS Development", description: "Cloud-native web applications built for reliability and scale." }
      ]
    },
    {
      id: "mobile-app",
      category: "development",
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Intuitive cross-platform and native mobile apps designed for seamless user engagement and conversion.",
      highlights: ["iOS & Android", "React Native / Flutter", "Enterprise Mobility", "PWA"],
      gradient: "from-emerald-600 to-teal-600",
      features: ["Offline Support", "Push Notifications", "Biometric Auth", "Store Deployment"],
      details: [
        { title: "Enterprise Apps", description: "Empower field teams and enterprise workflows on mobile." },
        { title: "Customer-Centric Apps", description: "Engaging, responsive UX tailored for app store success." }
      ]
    },
    {
      id: "cloud-services",
      category: "cloud",
      title: "Cloud & DevOps Solutions",
      icon: Cloud,
      description: "Robust cloud infrastructure, automated CI/CD pipelines, and microservices for resilient operations.",
      highlights: ["AWS / Azure Setup", "Cloud Migration", "Containerization", "Cost Optimization"],
      gradient: "from-indigo-600 to-purple-600",
      features: ["Auto Scaling", "24/7 Monitoring", "Zero Downtime", "Data Backup"],
      details: [
        { title: "Cloud Migration", description: "Seamless transition of legacy workloads to modern cloud infrastructure." },
        { title: "DevOps & CI/CD", description: "Automate build, test, and release cycles with enterprise reliability." }
      ]
    },
    {
      id: "digital-marketing",
      category: "marketing",
      title: "Growth & Digital Marketing",
      icon: Megaphone,
      description: "Data-driven organic and paid marketing frameworks engineered to scale inbound acquisition.",
      highlights: ["Technical SEO", "Performance Ads", "Content Strategy", "Conversion Rate Opt."],
      gradient: "from-orange-500 to-rose-600",
      features: ["ROI Focused", "Funnel Analytics", "Lead Attribution", "Multi-Channel"],
      details: [
        { title: "Search Engine Optimization", description: "Rank high for commercial-intent keywords and organic lead generation." },
        { title: "Paid Acquisition", description: "High-yield Google Ads and Meta campaigns targeted to your ideal ICP." }
      ]
    },
    {
      id: "software-development",
      category: "development",
      title: "Custom Software Engineering",
      icon: Code,
      description: "Bespoke internal tools, CRM/ERP systems, and workflow automations to streamline complex business logic.",
      highlights: ["Custom ERP/CRM", "Legacy Modernization", "Workflow Automation", "Microservices"],
      gradient: "from-purple-600 to-pink-600",
      features: ["Tailored Workflows", "Third-party APIs", "Role-Based Access", "Modular Code"],
      details: [
        { title: "Business Automation", description: "Eliminate repetitive tasks and unify operations under single dashboards." },
        { title: "API Ecosystems", description: "Connect heterogeneous services via robust, authenticated endpoints." }
      ]
    },
    {
      id: "consulting",
      category: "cloud",
      title: "IT Strategy & Consulting",
      icon: Users,
      description: "End-to-end technical leadership and roadmap planning aligned with your long-term business goals.",
      highlights: ["Architecture Audit", "Tech Stack Planning", "Security Auditing", "Vendor Assessment"],
      gradient: "from-cyan-600 to-blue-600",
      features: ["Tech Roadmaps", "Security Reviews", "Cost Engineering", "Process Advisory"],
      details: [
        { title: "Digital Roadmapping", description: "Modernize legacy tech debt into scalable, test-covered platforms." },
        { title: "Architecture Reviews", description: "System design evaluations to guarantee multi-tenant resilience." }
      ]
    }
  ], []);

  const products = useMemo(() => [
    {
      id: "bookmyfarm",
      name: "BookMyFarm",
      tagline: "Agri-Tourism & Farm Booking Ecosystem",
      description: "Real-time reservation platform connecting farm stay owners with travellers, featuring calendar sync and automated payouts.",
      tech: ["Java", "SQL", "TypeScript", "React.js", "Tailwind CSS"],
      image: "/s1.png",
      gradient: "from-emerald-500 to-teal-600",
      link: "https://bookmyfarm.co.in/",
      features: ["Real-time Slot Booking", "Gateway Integration", "Host Dashboard", "Verified Reviews"]
    },
    {
      id: "ayurveda",
      name: "Ayurade",
      tagline: "D2C Ayurvedic Commerce Platform",
      description: "High-conversion e-commerce ecosystem with tailored cart flows, variant matrixes, and end-to-end order logistics.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      image: "/s2.png",
      gradient: "from-amber-500 to-orange-500",
      link: "https://ayurade.example.com",
      features: ["Custom Checkout", "Inventory Tracking", "Customer Portal", "Discount Logic"]
    },
    {
      id: "oversease",
      name: "SS Overseas",
      tagline: "Global Education Consultancy Portal",
      description: "Student recruitment and document tracking system connecting overseas aspirants directly with university liaisons.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      image: "/s3.png",
      gradient: "from-blue-600 to-indigo-600",
      link: "https://ssoverseas.in/",
      features: ["Course Matchmaking", "Document Vault", "Status Tracker", "Advisor CRM"]
    },
    {
      id: "daanapaani",
      name: "Daanapaani Foundation",
      tagline: "Non-Profit Transparency & Donor Engine",
      description: "A digital impact tracker and donation portal empowering social programs with real-time audit logging.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      image: "/s4.png",
      gradient: "from-purple-600 to-indigo-600",
      link: "https://daanapaanifoundation.com",
      features: ["Micro-Donations", "Volunteer CRM", "Live Audit Trail", "Impact Metrics"]
    }
  ], []);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [errors, setErrors] = useState({});

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.highlights.some((h) => h.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, services]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(?:\+91|0)?[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!form.service) newErrors.service = "Please select a service";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formRef.current)
      .then(() => {
        toast({
          title: "Inquiry Submitted!",
          description: `Thanks ${form.name}. Our technical team will get back to you within 24 hours.`
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          message: ""
        });
      })
      .catch((error) => {
        toast({
          title: "Submission Error",
          description: "Something went wrong while dispatching your request. Please try again.",
          variant: "destructive"
        });
        console.error("EmailJS Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white font-sans antialiased">
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20 bg-slate-950"
        style={{
          backgroundImage: "url('/hero-tech-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Subtle Ambient Background Gradients */}
        {/* Dark overlay for better text readability */}
<div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />

{/* Purple / Blue atmospheric glow */}
<div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-blue-950/30 to-slate-950/70 pointer-events-none" />

        {/* Floating Badges */}
        <motion.div
          className="hidden lg:flex items-center gap-2 absolute top-24 left-20 px-4 py-2.5 bg-white/10 border border-white/20 rounded-2xl shadow-xl backdrop-blur-xl text-white text-sm font-medium"
          variants={floatingAnimation}
          animate="animate"
        >
          <Rocket className="w-5 h-5 text-purple-400" />
          <span>Agile Delivery</span>
        </motion.div>
        <motion.div className="hidden lg:flex items-center gap-2 absolute top-36 right-24 px-4 py-2.5 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-md backdrop-blur-md text-white text-sm font-medium" variants={floatingAnimation} animate="animate">
          <Target className="w-5 h-5 text-blue-600" />
          <span>Result Focused</span>
        </motion.div>
        <motion.div className="hidden lg:flex items-center gap-2 absolute bottom-24 left-28 px-4 py-2.5 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-md backdrop-blur-md text-white text-sm font-medium" variants={floatingAnimation} animate="animate">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span>Enterprise Secure</span>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-1.5 text-sm font-medium tracking-wide inline-flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Scalable Tech Architecture
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Empower Your Business With{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Modern Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            We design, develop, and deploy scalable web apps, mobile solutions, and cloud architectures built for speed and measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button
              onClick={() => document.getElementById("inquiry-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl text-base font-semibold shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 transition-all duration-300"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Project
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("client-products")?.scrollIntoView({ behavior: "smooth" })}
              className="border-slate-300 bg-white hover:bg-slate-100 text-slate-800 px-8 py-6 rounded-xl text-base font-semibold shadow-sm"
            >
              View Our Work
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="flex flex-col items-center text-center group"
              >
                <div className={`p-4 rounded-2xl ${stat.bg} mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-24 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3.5 py-1 text-sm font-medium">
              Core Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              End-to-End Digital Services
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              High-impact development, performance marketing, and enterprise IT strategy.
            </p>

            {/* Filter & Search Bar */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                {[
                  { key: "all", label: "All Services" },
                  { key: "development", label: "Development" },
                  { key: "cloud", label: "Cloud & Ops" },
                  { key: "marketing", label: "Marketing" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === tab.key
                        ? "bg-purple-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search capabilities..."
                  className="pl-10 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl focus-visible:ring-purple-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  layout
                  key={service.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  custom={index}
                >
                  <Card className="h-full bg-white border border-slate-200/90 hover:border-purple-400/80 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                    <CardContent className="p-7 space-y-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 text-white`}>
                        <service.icon className="w-7 h-7" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.features.map((feat) => (
                          <span
                            key={feat}
                            className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Expandable Technical Details */}
                      {expandedService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-slate-100 space-y-3"
                        >
                          {service.details.map((d, i) => (
                            <div key={i} className="text-xs space-y-1">
                              <span className="font-semibold text-purple-700">{d.title}</span>
                              <p className="text-slate-600">{d.description}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </CardContent>

                    <div className="p-7 pt-0">
                      <Button
                        variant="ghost"
                        onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                        className="w-full justify-between text-slate-700 hover:text-purple-700 hover:bg-purple-50 text-sm font-medium rounded-lg border border-slate-200"
                      >
                        <span>{expandedService === service.id ? "Hide Details" : "View Scope & Details"}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedService === service.id ? "rotate-180 text-purple-600" : ""}`} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="client-products" className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3.5 py-1 text-sm font-medium">
              Featured Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Client Projects & Platforms
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Enterprise software platforms and client solutions delivered with modern architecture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <Card className="h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className={`h-52 bg-gradient-to-r ${product.gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-44 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                      />
                    </div>
                    <CardContent className="p-8 space-y-6">
                      <div>
                        <div className="text-xs uppercase tracking-wider font-semibold text-purple-700 mb-1">
                          {product.tagline}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
                        <p className="text-slate-600 text-sm mt-2 leading-relaxed">{product.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Key Features</div>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feat) => (
                            <span key={feat} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200 font-medium">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Tech Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {product.tech.map((t) => (
                            <span key={t} className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-8 pt-0">
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button className="w-full bg-slate-900 hover:bg-purple-600 text-white rounded-xl py-6 flex items-center justify-center gap-2 transition-colors duration-300 font-medium shadow-sm">
                        <span>Visit Live Platform</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-section" className="py-24 bg-gradient-to-b from-slate-50 to-purple-50/50 border-t border-slate-200 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3.5 py-1 text-sm font-medium">
              Start a Conversation
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Let's Build Something Great
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Share your project requirements to receive a detailed scope and technical consultation.
            </p>
          </div>

          <Card className="bg-white border border-slate-200/80 rounded-3xl shadow-xl p-6 sm:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="service" value={form.service} />
              <input type="hidden" name="budget" value={form.budget} />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-800 text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    className="bg-slate-50/50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 rounded-xl"
                  />
                  {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-800 text-sm font-medium">
                    Work Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="john@company.com"
                    className="bg-slate-50/50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 rounded-xl"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-800 text-sm font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                    className="bg-slate-50/50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 rounded-xl"
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-slate-800 text-sm font-medium">
                    Company / Organization
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleFormChange}
                    placeholder="Your Company Name"
                    className="bg-slate-50/50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-slate-800 text-sm font-medium">
                    Service Required *
                  </Label>
                  <Select value={form.service} onValueChange={(val) => handleSelect("service", val)}>
                    <SelectTrigger className="bg-slate-50/50 border-slate-300 text-slate-900 rounded-xl focus:ring-purple-500">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.title}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && <p className="text-xs text-rose-600 mt-1">{errors.service}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-slate-800 text-sm font-medium">
                    Estimated Budget
                  </Label>
                  <Select value={form.budget} onValueChange={(val) => handleSelect("budget", val)}>
                    <SelectTrigger className="bg-slate-50/50 border-slate-300 text-slate-900 rounded-xl focus:ring-purple-500">
                      <SelectValue placeholder="Select Budget Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900">
                      <SelectItem value="₹25k - ₹50k">₹25K – ₹50K</SelectItem>
                      <SelectItem value="₹50k - ₹1.5L">₹50K – ₹1.5L</SelectItem>
                      <SelectItem value="₹1.5L - ₹5L">₹1.5L – ₹5L</SelectItem>
                      <SelectItem value="₹5L+">₹5L+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-800 text-sm font-medium">
                  Project Overview
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleFormChange}
                  placeholder="Tell us about your project goals, scope, timeline, and expectations..."
                  className="bg-slate-50/50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl text-base font-semibold shadow-lg shadow-purple-600/20 transition-all"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Project Request</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}