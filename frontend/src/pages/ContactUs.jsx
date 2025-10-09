import { Button } from "../components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Input } from "../components/UI/Input";

import { Label } from "../components/UI/Lable ";


import { Textarea } from "../components/UI/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Send,
  Calendar,
  Users,
  Building,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Navigation,
  MessageSquare,
  HeadphonesIcon,
  FileText,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with admissions team",
      primary: "+91 20 1234 5678",
      secondary: "+91 98765 43210",
      available: "Mon-Sat, 9 AM - 6 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed information via email",
      primary: "info@ssinfotech.co",
      secondary: "admissions@ssinfotech.co",
      available: "24/7 Response"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Quick support on WhatsApp",
      primary: "+91 98765 43210",
      secondary: "Quick Response",
      available: "Mon-Sun, 9 AM - 9 PM"
    },
    {
      icon: MapPin,
      title: "Visit Our Campus",
      description: "Come and see our facilities",
      primary: "Plot No. 45, Hinjewadi Phase 2",
      secondary: "Pune, Maharashtra 411057",
      available: "Mon-Sat, 9 AM - 6 PM"
    }
  ];

  const departments = [
    {
      name: "Admissions & Counseling",
      email: "admissions@ssinfotech.co",
      phone: "+91 20 1234 5678",
      description: "Course information, admissions, and career counseling"
    },
    {
      name: "Training Support",
      email: "training@ssinfotech.co", 
      phone: "+91 20 1234 5679",
      description: "Technical support for ongoing training programs"
    },
    {
      name: "Placement Assistance",
      email: "placements@ssinfotech.co",
      phone: "+91 20 1234 5680",
      description: "Job placement support and career guidance"
    },
    {
      name: "Internship Programs",
      email: "internships@ssinfotech.co",
      phone: "+91 20 1234 5681",
      description: "Internship opportunities and project guidance"
    },
    {
      name: "Corporate Training",
      email: "corporate@ssinfotech.co",
      phone: "+91 20 1234 5682",
      description: "Custom training solutions for organizations"
    },
    {
      name: "Technical Support",
      email: "support@ssinfotech.co",
      phone: "+91 20 1234 5683",
      description: "Technical issues and platform support"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "https://facebook.com/ssinfotech", followers: "15K" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com/company/ssinfotech", followers: "25K" },
    { icon: Twitter, name: "Twitter", url: "https://twitter.com/ssinfotech", followers: "8K" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com/ssinfotech", followers: "12K" },
    { icon: Youtube, name: "YouTube", url: "https://youtube.com/ssinfotech", followers: "50K" }
  ];

  const faqs = [
    {
      question: "What are your office hours?",
      answer: "We are open Monday to Saturday from 9:00 AM to 6:00 PM. Sunday is closed. However, our support team is available via email and WhatsApp for urgent queries."
    },
    {
      question: "How can I schedule a campus visit?",
      answer: "You can schedule a campus visit by calling us, filling out the contact form, or sending us a WhatsApp message. We'll arrange a convenient time for you to tour our facilities."
    },
    {
      question: "Do you provide online consultations?",
      answer: "Yes, we offer online consultations via video calls. This is perfect for students who cannot visit our campus in person. Schedule an appointment through our contact form."
    },
    {
      question: "How quickly do you respond to queries?",
      answer: "We typically respond to email queries within 24 hours on business days. Phone calls and WhatsApp messages are answered during office hours, usually within a few hours."
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-brand-accent text-white">Contact Us</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Let's Start Your
              <span className="text-brand-accent"> Success Journey</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Have questions about our programs? Need guidance on your career path? 
              Our team is here to help you every step of the way. Get in touch with us today.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to reach us - we're here to help with all your questions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-brand-blue/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                    <method.icon className="h-8 w-8 text-brand-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium text-brand-blue">{method.primary}</div>
                    <div className="text-sm text-muted-foreground">{method.secondary}</div>
                    <div className="text-xs text-muted-foreground">{method.available}</div>
                  </div>
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark">
                    Contact Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Send us a Message</h2>
                <p className="text-xl text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Contact Form</span>
                  </CardTitle>
                  <CardDescription>
                    Please provide as much detail as possible so we can assist you better
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+91 xxxxx xxxxx" required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select>
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
                    </div>
                    <div>
                      <Label htmlFor="program">Interested Program</Label>
                      <Select>
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
                      placeholder="Please describe your inquiry in detail..." 
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newsletter" className="rounded" />
                    <Label htmlFor="newsletter" className="text-sm">
                      I would like to receive updates about courses and events
                    </Label>
                  </div>
                  
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    We'll respond to your inquiry within 24 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Map and Location Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Visit Our Campus</h2>
                <p className="text-xl text-muted-foreground">
                  Come and experience our state-of-the-art facilities and meet our expert team
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <MapPin className="h-12 w-12 text-brand-blue mx-auto" />
                        <p className="text-muted-foreground">Interactive Map</p>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open in Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Campus Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-brand-blue mt-0.5" />
                      <div>
                        <div className="font-medium">Address</div>
                        <div className="text-sm text-muted-foreground">
                          SS Infotech Campus<br/>
                          Plot No. 45, Hinjewadi Phase 2<br/>
                          Pune, Maharashtra 411057<br/>
                          India
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-brand-blue mt-0.5" />
                      <div>
                        <div className="font-medium">Campus Hours</div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                          <div>Saturday: 10:00 AM - 4:00 PM</div>
                          <div>Sunday: Closed</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Navigation className="h-5 w-5 text-brand-blue mt-0.5" />
                      <div>
                        <div className="font-medium">How to Reach</div>
                        <div className="text-sm text-muted-foreground">
                          5 minutes walk from Hinjewadi Phase 2 bus stop<br/>
                          Parking available on campus<br/>
                          Nearest metro: Shivajinagar (25 km)
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Campus Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Department Contacts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect directly with the right department for faster and more specific assistance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-brand-blue" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-brand-blue" />
                      <span>{dept.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-brand-blue hover:bg-brand-blue-dark">
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="mr-1 h-3 w-3" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media and FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Social Media */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Follow Us</h2>
                <p className="text-muted-foreground">
                  Stay connected with us on social media for updates, tips, and success stories
                </p>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-brand-blue/10 p-2 rounded-lg">
                            <social.icon className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <div className="font-medium">{social.name}</div>
                            <div className="text-sm text-muted-foreground">{social.followers} followers</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-brand-blue text-white">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
                  <p className="text-blue-100">Get updates on new courses, events, and career opportunities</p>
                  <div className="flex space-x-2">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="bg-white/10 border-white/30 text-white placeholder-white/70"
                    />
                    <Button className="bg-brand-accent hover:bg-brand-accent/90">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Quick answers to common questions about contacting us
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-bold text-foreground">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency and Support */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <HeadphonesIcon className="h-12 w-12 mx-auto" />
                <h2 className="text-3xl font-bold">Need Immediate Assistance?</h2>
                <p className="text-red-100 max-w-2xl mx-auto">
                  For urgent matters or emergency support, our team is available to help you right away.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="bg-white text-red-600 hover:bg-gray-100">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Hotline: +91 98765 43210
                </Button>
                <Button className="bg-white text-red-600 hover:bg-gray-100">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Support
                </Button>
              </div>
              
              <p className="text-sm text-red-100">
                Available 24/7 for current students and urgent inquiries
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your Career?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Don't wait any longer. Get in touch with us today and take the first step towards your successful tech career.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
              Download Course Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}