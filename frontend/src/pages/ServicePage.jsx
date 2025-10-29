import React, { useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { Textarea } from "../components/UI/Textarea";
import { Label } from "../components/UI/Lable ";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { toast } from "../Hooks/use-toast";
import emailjs from '@emailjs/browser';
import {
  Code, Cpu, Smartphone, Megaphone, Stars, Sparkles, Globe, Mail,
  Share2, Network, Search, ShoppingCart, MessageCircle, BarChart3,
  Cloud, Phone, MapPin, Clock, Send, ArrowRight, CheckCircle,
  Rocket, Target, Users, Award, Zap, Shield, TrendingUp
} from "lucide-react";
import bgPattern from '../../public/service/service/bg.png';

// Initialize EmailJS outside the component
emailjs.init('uo8vZ7IYM4nQArKtj');

export default function ServicePage() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Enhanced Animation Variants
  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const bounceAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Company Stats Data
  const companyStats = useMemo(() => [
    { icon: Users, value: "50+", label: "Happy Clients", color: "from-blue-500 to-cyan-500" },
    { icon: Award, value: "100+", label: "Projects Completed", color: "from-purple-500 to-pink-500" },
    { icon: Zap, value: "24/7", label: "Support", color: "from-green-500 to-emerald-500" },
    { icon: TrendingUp, value: "98%", label: "Success Rate", color: "from-orange-500 to-red-500" }
  ], []);

  // Enhanced Services Data with Company Focus
  const services = useMemo(() => [
    {
      id: "website-development",
      title: "Enterprise Website Development",
      icon: Globe,
      description: "Scalable web solutions for businesses of all sizes with enterprise-grade security and performance.",
      highlights: ["Corporate Websites", "E-commerce", "Web Applications", "Enterprise Solutions"],
      gradient: "from-blue-500 to-purple-600",
      features: ["SEO Optimized", "Mobile Responsive", "Fast Loading", "Secure Hosting"],
      details: [
        {
          title: "Corporate Website Development",
          description: "Professional websites that represent your brand and drive business growth."
        },
        {
          title: "E-commerce Solutions",
          description: "Complete online store development with payment integration and inventory management."
        },
        {
          title: "Web Application Development",
          description: "Custom web applications tailored to your business processes and requirements."
        }
      ]
    },
    {
      id: "mobile-app",
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Native and cross-platform mobile applications that drive user engagement and business growth.",
      highlights: ["iOS & Android", "Enterprise Apps", "Cross-platform", "Performance"],
      gradient: "from-green-500 to-teal-600",
      features: ["Native Performance", "Offline Capability", "Push Notifications", "App Store Deployment"],
      details: [
        {
          title: "Enterprise Mobile Applications",
          description: "Secure and scalable mobile solutions for your workforce and customers."
        },
        {
          title: "Consumer-Facing Apps",
          description: "Engaging mobile experiences that connect you with your customers."
        }
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      icon: Megaphone,
      description: "Data-driven marketing strategies that increase brand visibility and drive qualified leads.",
      highlights: ["SEO", "Social Media", "PPC", "Content Marketing"],
      gradient: "from-orange-500 to-red-600",
      features: ["ROI Tracking", "Analytics", "Campaign Management", "Lead Generation"],
      details: [
        {
          title: "Search Engine Optimization",
          description: "Improve your search rankings and drive organic traffic to your website."
        },
        {
          title: "Social Media Marketing",
          description: "Build brand awareness and engage with your audience across social platforms."
        }
      ]
    },
    {
      id: "cloud-services",
      title: "Cloud Solutions",
      icon: Cloud,
      description: "Scalable cloud infrastructure and services to support your business growth and digital transformation.",
      highlights: ["Cloud Migration", "Infrastructure", "Security", "Scalability"],
      gradient: "from-indigo-500 to-blue-600",
      features: ["Cloud Migration", "Infrastructure Setup", "Security", "24/7 Monitoring"],
      details: [
        {
          title: "Cloud Infrastructure",
          description: "Reliable and scalable cloud infrastructure to support your business operations."
        },
        {
          title: "Cloud Security",
          description: "Comprehensive security measures to protect your data and applications."
        }
      ]
    },
    {
      id: "software-development",
      title: "Custom Software",
      icon: Code,
      description: "Bespoke software solutions that automate processes and improve business efficiency.",
      highlights: ["Custom ERP", "CRM Systems", "Automation", "Integration"],
      gradient: "from-purple-500 to-pink-600",
      features: ["Custom Development", "System Integration", "API Development", "Maintenance"],
      details: [
        {
          title: "Business Process Automation",
          description: "Automate repetitive tasks and streamline your business operations."
        },
        {
          title: "System Integration",
          description: "Connect your existing systems and create a unified workflow."
        }
      ]
    },
    {
      id: "consulting",
      title: "IT Consulting",
      icon: Users,
      description: "Strategic IT consulting to align technology with your business objectives and drive digital transformation.",
      highlights: ["Strategy", "Planning", "Implementation", "Support"],
      gradient: "from-cyan-500 to-blue-600",
      features: ["IT Strategy", "Digital Transformation", "Technology Audit", "Implementation Support"],
      details: [
        {
          title: "Digital Transformation",
          description: "Guide your business through digital transformation with expert consulting."
        },
        {
          title: "Technology Strategy",
          description: "Develop a comprehensive technology strategy aligned with business goals."
        }
      ]
    }
  ], []);

  // Company Products
  const products = useMemo(() => [
    {
      id: "ecom",
      name: "Enterprise E-commerce Platform",
      description: "A scalable e-commerce solution for businesses with advanced inventory and order management.",
      tech: ["React", "Node.js", "MongoDB", "AWS"],
      image: "/imgs/bookmyfarm.jpg",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "crm",
      name: "Business CRM System",
      description: "Comprehensive customer relationship management system with analytics and automation.",
      tech: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      image: "/imgs/onlinekharida.jpg",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: "analytics",
      name: "Business Intelligence Dashboard",
      description: "Real-time analytics and reporting platform for data-driven decision making.",
      tech: ["React", "TypeScript", "GraphQL", "Azure"],
      image: "/imgs/analytics.jpg",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "mobile",
      name: "Enterprise Mobile Suite",
      description: "Cross-platform mobile applications for field service and customer engagement.",
      tech: ["Flutter", "Firebase", "Node.js", "Redis"],
      image: "/imgs/mobile.jpg",
      gradient: "from-purple-500 to-pink-600"
    }
  ], []);

  // State management
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [form, setForm] = useState({
    name: "", email: "", message: "", service: "", phone: "", company: "", budget: "", timeline: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [errors, setErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced filtering
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (activeCategory !== "all") {
        if (activeCategory === "development" && !["website-development", "software-development", "mobile-app"].includes(s.id)) return false;
        if (activeCategory === "marketing" && s.id !== "digital-marketing") return false;
        if (activeCategory === "cloud" && s.id !== "cloud-services") return false;
      }
      if (!q) return true;
      return (s.title + " " + s.description + " " + s.highlights.join(" ")).toLowerCase().includes(q);
    });
  }, [query, activeCategory, services]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+91\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must start with +91 and be 12 digits total";
    }
    if (!form.service) newErrors.service = "Service is required";
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

    // EmailJS implementation
    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formRef.current
    )
      .then(() => {
        toast({
          title: "Request sent successfully!",
          description: `We'll contact you at ${form.email} regarding ${form.service}.`
        });
        setForm({
          name: "", email: "", message: "", service: "", phone: "", company: "", budget: "", timeline: ""
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive"
        });
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSelect = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const toggleServiceDetails = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="space-y-0" ref={sectionRef}>
      {/* Enhanced Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden text-white">
  {/* Background Video */}
  <div className="absolute inset-0 w-full h-full">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
      poster="/services.jpg"   // Fixed: poster should be image, not video
    >
      <source src="/services.mp4" type="video/mp4" />
      <source src="/services.webm" type="video/webm" />
    </video>
  </div>

  {/* GRADIENT OVERLAY (Your Requested Color) */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-700/90 " />
  
  {/* Optional: Subtle blur for glass effect */}
  <div className="absolute inset-0 backdrop-blur-[1px]" />

  {/* Animated Background Elements */}
  <div className="absolute inset-0">
    <motion.div
      className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  {/* Floating Icons */}
  <motion.div className="absolute top-20 left-20" variants={floatingAnimation} animate="animate">
    <Rocket className="h-8 w-8 text-purple-300" />
  </motion.div>
  <motion.div className="absolute top-40 right-32" variants={floatingAnimation} animate="animate" transition={{ delay: 1 }}>
    <Target className="h-6 w-6 text-blue-300" />
  </motion.div>
  <motion.div className="absolute bottom-40 left-32" variants={floatingAnimation} animate="animate" transition={{ delay: 2 }}>
    <Shield className="h-7 w-7 text-green-300" />
  </motion.div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Badge */}
      <motion.div variants={scaleIn}>
        <Badge className="bg-white/20 backdrop-blur-md text-white px-8 py-4 text-lg border border-white/30 shadow-2xl font-semibold">
          <Sparkles className="w-6 h-6 mr-2" />
          Enterprise-Grade Solutions
        </Badge>
      </motion.div>
      
      {/* Heading */}
      <motion.div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight">
          Transform Your{" "}
          <motion.span
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Business
          </motion.span>
        </h1>
      </motion.div>
      
      {/* Subtitle */}
      <motion.div>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed max-w-5xl mx-auto font-medium drop-shadow-lg">
          We deliver <span className="font-bold">cutting-edge digital solutions</span> that drive 
          growth, efficiency, and innovation for forward-thinking companies.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl">
            <Rocket className="w-6 h-6 mr-3" />
            Start Your Project
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="border-2 border-white text-white hover:bg-white/20 px-10 py-6 text-xl font-semibold rounded-2xl backdrop-blur-sm">
            View Our Work
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* Company Stats Section */}
      <motion.section
        className="py-16 bg-gradient-to-br from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={index}
                className="text-center group"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`bg-gradient-to-r ${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Services Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-[#4B0082] to-[#6A0DAD] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-white/5 to-transparent"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="text-center space-y-6 mb-16" variants={staggerContainer}>
            <motion.div variants={scaleIn}>
              <Badge className="bg-purple-500/20 text-purple-300 px-6 py-2 text-sm border border-purple-500/30">
                Our Services
              </Badge>
            </motion.div>
            <motion.h2 variants={scaleIn} className="text-4xl sm:text-5xl font-bold text-white">
              Enterprise Solutions
            </motion.h2>
            <motion.p variants={scaleIn} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital services designed to scale with your business and drive measurable results.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                custom={index}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{ scale: hoveredCard === service.id ? 1.02 : 1 }}
                />
                
                <Card className="border-0 bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden  border-white/10 group-hover:border-white/20 transition-all duration-500">
                  <CardContent className="p-8 space-y-6 relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`bg-gradient-to-r ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.1 }}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Button
                        onClick={() => toggleServiceDetails(service.id)}
                        variant="outline"
                        className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40"
                      >
                        {expandedService === service.id ? 'Hide Details' : 'Explore Service'}
                      </Button>
                    </motion.div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expandedService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4 border-t border-white/10 pt-4"
                        >
                          {service.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="space-y-2"
                            >
                              <h4 className="font-semibold text-white text-sm">{detail.title}</h4>
                              <p className="text-xs text-gray-300">{detail.description}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Products Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center space-y-6 mb-16" variants={staggerContainer}>
            <motion.div variants={scaleIn}>
              <Badge className="bg-blue-500/20 text-blue-700 px-6 py-2 text-sm border border-blue-500/30">
                Our Products
              </Badge>
            </motion.div>
            <motion.h2 variants={scaleIn} className="text-4xl sm:text-5xl font-bold text-gray-900">
              Business Solutions
            </motion.h2>
            <motion.p variants={scaleIn} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative products built to solve complex business challenges and drive digital transformation.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerContainer}>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                custom={index}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group"
              >
                <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-3xl">
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${product.gradient} h-48 flex items-center justify-center relative overflow-hidden`}>
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        whileHover={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="h-32 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{product.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {product.tech.map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold">
                        View Case Study
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Inquiry Form Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-[#4B0082] to-[#6A0DAD] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center space-y-6 mb-12" variants={staggerContainer}>
            <motion.div variants={scaleIn}>
              <Badge className="bg-blue-500/20 text-blue-300 px-6 py-2 text-sm border border-blue-500/30">
                Get In Touch
              </Badge>
            </motion.div>
            <motion.h2 variants={scaleIn} className="text-4xl sm:text-5xl font-bold text-white">
              Start Your Project
            </motion.h2>
            <motion.p variants={scaleIn} className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to transform your business? Let's discuss your project and create something amazing together.
            </motion.p>
          </motion.div>

          <motion.div variants={scaleIn}>
            <Card className="border-0 bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border-white/10">
              <CardContent className="p-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="Enter your full name"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="+91 1234567890"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleFormChange}
                        placeholder="Your company name"
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-white">Service Interested In *</Label>
                      <Select value={form.service} onValueChange={(value) => handleSelect('service', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="text-red-400 text-sm">{errors.service}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-white">Budget Range</Label>
                      <Select value={form.budget} onValueChange={(value) => handleSelect('budget', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20 text-white">
                          <SelectItem value="5k-20k">₹5K - ₹20K</SelectItem>
                          <SelectItem value="20k-50k">₹20K - ₹50K</SelectItem>
                          <SelectItem value="50k-1L">₹50K - ₹1L</SelectItem>
                          <SelectItem value="1L+">₹1L+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Project Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your project requirements, goals, and any specific details..."
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 resize-none"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold text-lg"
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}