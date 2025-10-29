import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Phone, Mail, MessageCircle, MapPin, ExternalLink, Building,
  Clock, Navigation, Calendar, Facebook, Linkedin, Instagram,
  Send, FileText, HeadphonesIcon, Stars, Sparkles
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { Button } from "../components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Lable ";
import { Textarea } from "../components/UI/Textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "../components/UI/Select";
import bgPattern from '../../public/service/service/bg.png';

// Initialize EmailJS outside the component to avoid reinitialization
emailjs.init('uo8vZ7IYM4nQArKtj');

export default function ContactUs() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]); // Reduced amplitude
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]); // Smoother opacity transition
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]); // Subtler scale

  // Animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -15, 0], // Reduced amplitude for smoother motion
      transition: {
        duration: 5, // Faster for snappier feel
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.03, 1], // Subtler scale for less CPU strain
      opacity: [0.2, 0.4, 0.2],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Tighter stagger
        duration: 0.6, // Faster for smoother flow
        ease: "easeOut",
      },
    }),
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Tighter stagger
        when: "beforeChildren"
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Memoized data to prevent re-computation
  const contactMethods = useMemo(() => [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with admissions team",
      primary: "+91 7720846048",
      secondary: "+91 77199 27774",
      available: "Mon-Sat, 9 AM - 6 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed information via email",
      primary: "hr@ssinfo.co",
      secondary: "Our official mail id",
      available: "24/7 Response"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Quick support on WhatsApp",
      primary: "+91 77199 27774",
      secondary: "Quick Response",
      available: "Mon-Sun, 9 AM - 9 PM"
    },
    {
      icon: MapPin,
      title: "Visit Our Campus",
      description: "Come and see our facilities",
      primary: "Plot No.26, Khandwekar Bunglow, 2nd Floor,",
      secondary: "Near Lendra park, Nagpur - 440012",
    }
  ], []);

  const departments = useMemo(() => [
    {
      name: "Training Support",
      email: "hr@ssinfo.co",
      phone: "+91 77199 27774",
      description: "Technical support for ongoing training programs"
    },
    {
      name: "Internship Programs",
      email: "hr@ssinfo.co",
      phone: "+91 77199 27774",
      description: "Internship opportunities and project guidance"
    },
    {
      name: "Corporate Training",
      email: "hr@ssinfo.co",
      phone: "+91 77199 27774",
      description: "Custom training solutions for organizations"
    }
  ], []);

  const socialLinks = useMemo(() => [
    { icon: Linkedin, name: "LinkedIn", url: "https://www.linkedin.com/company/ss-infotech-co/" },
    { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/ss.infotech_?igsh=MTJvNHVqdGZ0aXM2bA==" },
    { icon: Facebook, name: "Facebook", url: "https://www.facebook.com/share/19mkLDmfgH/" },
  ], []);

  const faqs = useMemo(() => [
    {
      question: "What are your office hours?",
      answer: "We are open Monday to Saturday from 9:00 AM to 6:00 PM. Sunday is closed. However, our support team is available via email and WhatsApp for urgent queries."
    },
    {
      question: "How can I schedule a company visit?",
      answer: "You can schedule a company visit by calling us, filling out the contact form, or sending us a WhatsApp message. We'll arrange a convenient time for you to tour our facilities."
    },
    {
      question: "Do you provide online consultations?",
      answer: "Yes, we offer online consultations via video calls. This is perfect for students who cannot visit our company in person. Schedule an appointment through our contact form."
    },
    {
      question: "How quickly do you respond to queries?",
      answer: "We typically respond to email queries within 24 hours on business days. Phone calls and WhatsApp messages are answered during office hours, usually within a few hours."
    }
  ], []);

  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    const formData = new FormData(formRef.current);

    const firstName = formData.get('firstName')?.trim();
    const lastName = formData.get('lastName')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const subject = formData.get('subject');
    const message = formData.get('message')?.trim();

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!phone) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+91\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone must start with +91 and be 12 digits total';
    }
    if (!subject) newErrors.subject = 'Subject is required';
    if (!message) newErrors.message = 'Message is required';

    return newErrors;
  };

  // EmailJS form submission handler
  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);
    setErrors({});

    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
      formRef.current
    )
      .then(() => {
        setFormStatus({ type: 'success', message: 'Your message has been sent successfully!' });
        formRef.current.reset();
      })
      .catch((error) => {
        setFormStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
        console.error('EmailJS error:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="space-y-0" ref={sectionRef}>
      {/* Hero Section */}
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden text-white">
  {/* Video Background */}
  <div className="absolute inset-0 overflow-hidden">
    <video
      src="/contactus.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      style={{ filter: 'brightness(0.6) contrast(1.1)' }}
    />
  </div>

  {/* Professional Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-pink-900/70" />

  {/* Animated Blur Orbs (Subtle Glow) */}
  <motion.div
    className="absolute top-20 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ repeat: Infinity, duration: 6 }}
  />
  <motion.div
    className="absolute bottom-32 right-20 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl"
    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ repeat: Infinity, duration: 8, delay: 1 }}
  />

  {/* Content */}
  <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-8"
    >
      {/* Professional Glass Badge */}
      <div className="inline-flex items-center bg-white/15 backdrop-blur-xl border border-white/40 rounded-full px-8 py-3.5 text-lg font-bold text-white shadow-2xl shadow-purple-900/50">
        <Sparkles className="w-5 h-5 mr-2 text-yellow-300" />
        Contact Us
      </div>

      {/* Hero Heading */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
        Let's Start Your{" "}
        <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient">
          Success Journey
        </span>
      </h1>

      {/* Paragraph */}
      <p className="text-lg sm:text-xl md:text-2xl text-purple-50 leading-relaxed max-w-3xl mx-auto font-medium drop-shadow-md">
        Have questions about our programs? Need guidance on your career path?{" "}
        <span className="text-white font-bold animate-pulse">
          Our team is here to help you every step of the way.
        </span>{" "}
        Get in touch with us today.
      </p>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.8, repeat: Infinity }}
  >
    <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
      <motion.div
        className="w-1.5 h-3 bg-white rounded-full mt-1.5"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    </div>
  </motion.div>
  <style>{`
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}`}</style>
</section>

      {/* Quick Contact Methods */}
      <motion.section
        className="py-16 bg-background relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full will-change-transform"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="text-center space-y-4 mb-12" variants={item}>
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-foreground" variants={item}>
              Get in Touch
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto" variants={item}>
              Choose the best way to reach us — we're here to help with all your questions
            </motion.p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={container}>
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-b from-white to-purple-50">
                  <CardContent className="p-6 space-y-4 text-center">
                    <motion.div
                      className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors will-change-transform"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <method.icon className="h-6 w-6 text-purple-600" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-purple-600">{method.primary}</div>
                      <div className="text-sm text-muted-foreground">{method.secondary}</div>
                      {method.available && (
                        <div className="text-xs text-muted-foreground">{method.available}</div>
                      )}
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-transform">
                      Contact Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form & Map Section */}
      <motion.section
        className="py-16 bg-gray-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full will-change-transform"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div className="grid lg:grid-cols-2 gap-8" variants={container}>
            {/* Contact Form */}
            <motion.div className="space-y-6" variants={fadeUp} custom={0}>
              <motion.div className="space-y-4" variants={fadeUp} custom={0.1}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Send us a Message</h2>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={0.2}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                      <span>Contact Form</span>
                    </CardTitle>
                    <CardDescription>
                      Please provide as much detail as possible so we can assist you better
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form ref={formRef} onSubmit={sendEmail}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" placeholder="Enter first name" required />
                          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" placeholder="Enter last name" required />
                          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" name="phone" type="tel" placeholder="+91 xxxxx xxxxx" required />
                          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Select name="subject" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admissions">Course Admissions</SelectItem>
                              <SelectItem value="placement">Placement Assistance</SelectItem>
                              <SelectItem value="internship">Internship Programs</SelectItem>
                              <SelectItem value="corporate">Corporate Training</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="general">General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
                        </div>
                        <div>
                          <Label htmlFor="program">Interested Program</Label>
                          <Select name="program">
                            <SelectTrigger>
                              <SelectValue placeholder="Select program (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="web-dev">Web Development</SelectItem>
                              <SelectItem value="ai-ml">AI/ML</SelectItem>
                              <SelectItem value="cloud">Cloud Computing</SelectItem>
                              <SelectItem value="fullstack">Full Stack Development</SelectItem>
                              <SelectItem value="data-science">Data Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your inquiry in detail..."
                          rows={5}
                          required
                        />
                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="newsletter" name="newsletter" className="rounded" />
                        <Label htmlFor="newsletter" className="text-sm">
                          I would like to receive updates about courses and events
                        </Label>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white group"
                        disabled={isSubmitting}
                      >
                        <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                      {formStatus && (
                        <p
                          className={`text-sm text-center mt-4 ${
                            formStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {formStatus.message}
                        </p>
                      )}
                    </form>
                    <p className="text-sm text-muted-foreground text-center">
                      We'll respond to your inquiry within 24 hours during business days.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            {/* Map and Location Info */}
            <motion.div className="space-y-6" variants={fadeUp} custom={0.4}>
              <motion.div variants={fadeUp} custom={0.5}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-64 w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29771.212060529924!2d79.078761!3d21.136414000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1000c0583e5%3A0x2a9d4b509fe5934e!2sSS%20Infotech%20Nagpur!5e0!3m2!1sen!2sin!4v1760439349843!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="SS Infotech company Location"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <MapPin className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">SS Infotech</h3>
                            <p className="text-sm text-muted-foreground">Plot No.26, Khandwekar Bunglow, Nagpur</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                          asChild
                        >
                          <a
                            href="https://www.google.com/maps/place/SS+Infotech/@21.119862,79.084258,17z/data=!3m1!4b1!4m6!3m5!1s0x3bd4c0c12f994cdd:0x26c0b7811b1f0f0f!8m2!3d21.119862!4d79.084258!16s%2Fg%2F11g6v7d6?entry=ttu"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="mr-2 h-4 w-4" />
                            Directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeUp} custom={0.6}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-purple-600" />
                      <span>company Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Address</div>
                          <div className="text-sm text-muted-foreground">
                            Plot No.26, Khandwekar Bunglow, 2nd Floor,<br />
                            Near Lendra park, Nagpur - 440012<br />
                            Maharashtra, India
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="font-medium">company Hours</div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Monday - Saturday: 9:00 AM - 6:00 PM</div>
                            <div>Sunday: Closed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <a
                        href="https://wa.link/njdbdn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white group">
                          <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          Schedule company Visit
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Department Contacts */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center space-y-4 mb-12" variants={item}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Department Contacts</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect directly with the right department for faster and more specific assistance
            </p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container}>
            {departments.map((dept, index) => (
              <motion.div key={index} variants={fadeUp} custom={index}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <span>{dept.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-purple-600" />
                        <span>{dept.email}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                        <Phone className="mr-1 h-3 w-3" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                        <Mail className="mr-1 h-3 w-3" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Social Media and FAQs */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid lg:grid-cols-2 gap-8" variants={container}>
            <motion.div className="space-y-6" variants={item}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Follow Us</h2>
                <p className="text-muted-foreground">
                  Stay connected with us on social media for updates, tips, and success stories
                </p>
              </div>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.div key={index} variants={fadeUp} custom={index}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <social.icon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium">{social.name}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                            asChild
                          >
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Follow
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={item}>
                <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardContent className="p-6 text-center space-y-4">
                    <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
                    <p className="text-purple-100">Get updates on new courses, events, and career opportunities</p>
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/30 text-white placeholder-white/70"
                      />
                      <Button className="bg-white hover:bg-purple-800 text-purple-700 hover:text-white">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            <motion.div className="space-y-6" variants={item}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Quick answers to common questions about contacting us
                </p>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div key={index} variants={fadeUp} custom={index}>
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <h3 className="font-bold text-foreground">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                <FileText className="mr-2 h-4 w-4" />
                View All FAQs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Emergency and Support */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={item}>
            <Card className="border-0 shadow-lg bg-red-500 text-white">
              <CardContent className="p-8 text-center space-y-6">
                <div className="space-y-4">
                  <HeadphonesIcon className="h-12 w-12 mx-auto" />
                  <h2 className="text-3xl font-bold">Need Immediate Assistance?</h2>
                  <p className="text-red-100 max-w-2xl mx-auto">
                    For urgent matters or emergency support, our team is available to help you right away.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="tel:+9177199 27774" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white text-red-600 hover:bg-gray-100">
                      <Phone className="mr-2 h-4 w-4" />
                      Emergency Number: +91 77199 27774
                    </Button>
                  </a>
                  <a href="https://wa.link/rck1ie" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-white text-red-600 hover:bg-gray-100">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Support
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-red-100">
                  Available 24/7 for current students and urgent inquiries
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}