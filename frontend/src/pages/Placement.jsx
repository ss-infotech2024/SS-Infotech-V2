import { useRef } from "react"; // Import useRef from React
import { Button } from "../components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Input } from "../components/UI/Input";

import { Label } from "../components/UI/Lable ";

import { Textarea } from "../components/UI/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/UI/Tabs";
import { 
  Building, 
  Calendar, 
  Clock, 
  Users,
  MapPin,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  Target,
  FileText,
  Download,
  ExternalLink,
  ArrowRight,
  Phone,
  Mail,
  IndianRupee,
  BookOpen,
  Laptop,
  Code,
  Brain,
  Cloud,
  Database
} from "lucide-react";

export default function Placements() {
  // Create a ref for the registration form section
  const registrationFormRef = useRef(null);

  // Function to scroll to the registration form
  const scrollToForm = () => {
    registrationFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const upcomingDrives = [
    {
      company: "Tata Consultancy Services (TCS)",
      logo: "/placeholder.svg",
      date: "March 15, 2024",
      time: "10:00 AM",
      venue: "SS Infotech Campus",
      positions: ["Software Engineer", "System Engineer"],
      package: "₹4.0 - 6.0 LPA",
      eligibility: "All branches with 60%+ aggregate",
      requirements: ["B.Tech/B.E/MCA", "No active backlogs", "Good communication skills"],
      registrationDeadline: "March 12, 2024",
      status: "Registration Open",
      description: "TCS is conducting campus recruitment for multiple positions across various technologies."
    },
    {
      company: "Infosys Limited",
      logo: "/placeholder.svg", 
      date: "March 22, 2024",
      time: "9:30 AM",
      venue: "SS Infotech Campus",
      positions: ["System Engineer", "Power Programmer"],
      package: "₹3.5 - 5.2 LPA",
      eligibility: "CSE/IT/ECE with 65%+ aggregate",
      requirements: ["Strong programming skills", "CGPA 6.5+", "No year gaps"],
      registrationDeadline: "March 19, 2024",
      status: "Registration Open",
      description: "Infosys campus drive for fresher positions with comprehensive training programs."
    },
    {
      company: "Wipro Technologies",
      logo: "/placeholder.svg",
      date: "April 5, 2024", 
      time: "11:00 AM",
      venue: "SS Infotech Campus",
      positions: ["Project Engineer", "Software Developer"],
      package: "₹3.8 - 5.5 LPA",
      eligibility: "All branches with 55%+ aggregate",
      requirements: ["Good analytical skills", "Flexible to relocate", "Team player"],
      registrationDeadline: "April 2, 2024",
      status: "Coming Soon",
      description: "Wipro is hiring for various technology roles with growth opportunities."
    },
    {
      company: "Accenture",
      logo: "/placeholder.svg",
      date: "April 18, 2024",
      time: "10:30 AM", 
      venue: "SS Infotech Campus",
      positions: ["Associate Software Engineer", "Analyst"],
      package: "₹4.5 - 6.5 LPA",
      eligibility: "CSE/IT/ECE with 70%+ aggregate",
      requirements: ["Strong communication", "Problem-solving skills", "Willingness to learn"],
      registrationDeadline: "April 15, 2024",
      status: "Coming Soon", 
      description: "Accenture campus recruitment for technology and consulting roles."
    }
  ];

  const successStories = [
    {
      name: "Rahul Sharma",
      company: "Microsoft",
      package: "₹18.0 LPA",
      role: "Software Engineer",
      batch: "2023",
      program: "Full Stack Development",
      image: "/placeholder.svg",
      story: "SS Infotech's comprehensive training and mock interviews prepared me perfectly for Microsoft's rigorous interview process."
    },
    {
      name: "Priya Patel",
      company: "Google",
      package: "₹22.0 LPA", 
      role: "Software Engineer",
      batch: "2023",
      program: "AI/ML",
      image: "/placeholder.svg",
      story: "The AI/ML program and placement guidance helped me crack Google's technical interviews and land my dream job."
    },
    {
      name: "Amit Kumar",
      company: "Amazon",
      package: "₹16.5 LPA",
      role: "Cloud Engineer",
      batch: "2023", 
      program: "Cloud Computing",
      image: "/placeholder.svg",
      story: "The cloud computing specialization and industry projects made me stand out in Amazon's interview process."
    },
    {
      name: "Sneha Desai",
      company: "Flipkart",
      package: "₹12.0 LPA",
      role: "Frontend Developer",
      batch: "2024",
      program: "Web Development",
      image: "/placeholder.svg",
      story: "Excellent placement support and technical preparation helped me secure a great role at Flipkart."
    },
    {
      name: "Kiran Joshi",
      company: "Zomato",
      package: "₹10.5 LPA",
      role: "Full Stack Developer", 
      batch: "2024",
      program: "Full Stack Development",
      image: "/placeholder.svg",
      story: "The comprehensive full-stack curriculum and placement training prepared me for success at Zomato."
    },
    {
      name: "Anita Singh",
      company: "Paytm",
      package: "₹11.0 LPA",
      role: "Data Scientist",
      batch: "2024",
      program: "AI/ML",
      image: "/placeholder.svg",
      story: "The practical approach to AI/ML and interview preparation helped me transition into a data science role."
    }
  ];

  const placementStats = [
    { label: "Placement Success Rate", value: "85%", icon: Target },
    { label: "Average Package", value: "₹6.2 LPA", icon: IndianRupee },
    { label: "Highest Package", value: "₹22.0 LPA", icon: TrendingUp },
    { label: "Partner Companies", value: "200+", icon: Building },
    { label: "Students Placed", value: "2500+", icon: Users },
    { label: "Average Hike", value: "150%", icon: Award }
  ];

  const partnerCompanies = [
    { name: "TCS", logo: "/placeholder.svg", type: "Mass Recruiter" },
    { name: "Infosys", logo: "/placeholder.svg", type: "Mass Recruiter" },
    { name: "Wipro", logo: "/placeholder.svg", type: "Mass Recruiter" },
    { name: "Accenture", logo: "/placeholder.svg", type: "Consulting" },
    { name: "Microsoft", logo: "/placeholder.svg", type: "Product" },
    { name: "Google", logo: "/placeholder.svg", type: "Product" },
    { name: "Amazon", logo: "/placeholder.svg", type: "Product" },
    { name: "IBM", logo: "/placeholder.svg", type: "Technology" },
    { name: "Cognizant", logo: "/placeholder.svg", type: "IT Services" },
    { name: "HCL", logo: "/placeholder.svg", type: "IT Services" },
    { name: "Tech Mahindra", logo: "/placeholder.svg", type: "IT Services" },
    { name: "Capgemini", logo: "/placeholder.svg", type: "Consulting" }
  ];

  const placementProcess = [
    {
      step: "1",
      title: "Pre-Placement Training",
      description: "Comprehensive training on aptitude, technical skills, and soft skills",
      duration: "2 weeks"
    },
    {
      step: "2", 
      title: "Resume Building",
      description: "Professional resume creation and review by industry experts",
      duration: "3 days"
    },
    {
      step: "3",
      title: "Mock Interviews",
      description: "Practice sessions with HR, technical, and group discussion rounds",
      duration: "1 week"
    },
    {
      step: "4",
      title: "Company Registration",
      description: "Registration for placement drives based on eligibility and interest",
      duration: "Ongoing"
    },
    {
      step: "5",
      title: "Interview Process", 
      description: "Actual company interviews with our support and guidance",
      duration: "As scheduled"
    },
    {
      step: "6",
      title: "Offer & Onboarding",
      description: "Offer negotiation support and onboarding assistance",
      duration: "Post-selection"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-brand-accent text-white">Placement Drives</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Your Gateway to
              <span className="text-brand-accent"> Dream Careers</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Join our exclusive placement drives and get hired by top companies. With 85% placement success rate 
              and 200+ partner companies, your career success is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Placement Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our track record speaks for itself - helping students achieve their career goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {placementStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="bg-brand-blue/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                      <IconComponent className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-blue">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Placement Drives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Upcoming Placement Drives</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Register for upcoming placement opportunities with top companies
            </p>
          </div>

          <div className="space-y-6">
            {upcomingDrives.map((drive, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={drive.logo} 
                          alt={drive.company}
                          className="w-16 h-16 object-contain border rounded-lg p-2"
                        />
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">{drive.company}</h3>
                          <div className="flex flex-wrap gap-2">
                            {drive.positions.map((position, posIndex) => (
                              <Badge key={posIndex} className="bg-brand-blue text-white">
                                {position}
                              </Badge>
                            ))}
                          </div>
                          <Badge 
                            className={
                              drive.status === "Registration Open" 
                                ? "bg-success text-white" 
                                : "bg-warning text-white"
                            }
                          >
                            {drive.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{drive.description}</p>
                    </div>

                    {/* Drive Details */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{drive.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{drive.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{drive.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-brand-blue">{drive.package}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Registration Deadline: </span>
                        <span className="font-medium">{drive.registrationDeadline}</span>
                      </div>
                    </div>

                    {/* Eligibility & Actions */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Eligibility:</h4>
                        <p className="text-sm text-muted-foreground mb-2">{drive.eligibility}</p>
                        <div className="space-y-1">
                          {drive.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-success" />
                              <span className="text-muted-foreground">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button 
                          className={
                            drive.status === "Registration Open"
                              ? "w-full bg-brand-blue hover:bg-brand-blue-dark"
                              : "w-full bg-gray-400 cursor-not-allowed"
                          }
                          disabled={drive.status !== "Registration Open"}
                          onClick={scrollToForm} // Add onClick to scroll to form
                        >
                          {drive.status === "Registration Open" ? "Register Now" : "Coming Soon"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories and Placement Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="success-stories" className="space-y-8">
            <div className="text-center">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
                <TabsTrigger value="placement-process">Placement Process</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="success-stories" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Student Success Stories</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Celebrating our alumni who are now working in top companies worldwide
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-foreground">{story.name}</h3>
                          <p className="text-sm text-muted-foreground">{story.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Company:</span>
                          <span className="font-medium text-brand-blue">{story.company}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Package:</span>
                          <span className="font-medium text-success">{story.package}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Program:</span>
                          <span className="font-medium">{story.program}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Batch:</span>
                          <span className="font-medium">{story.batch}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground italic">"{story.story}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="placement-process" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Our Placement Process</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive support from training to placement - your success journey with us
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-brand-blue/20"></div>
                <div className="space-y-8">
                  {placementProcess.map((step, index) => (
                    <div key={index} className="relative flex items-start space-x-6">
                      <div className="relative z-10 w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                      <Card className="flex-1 border-0 shadow-md">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                            <Badge variant="outline">{step.duration}</Badge>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Registration Form */}
      <section ref={registrationFormRef} className="py-20"> {/* Add ref to the section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">Register for Placement Drives</h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below to register for upcoming placement opportunities
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center bg-brand-blue text-white rounded-t-lg">
              <CardTitle className="text-2xl">Placement Registration Form</CardTitle>
              <CardDescription className="text-blue-100">
                Complete your profile to get matched with relevant opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 xxxxx xxxxx" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech/B.E</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="aggregate">Aggregate Percentage</Label>
                  <Input id="aggregate" type="number" placeholder="Enter percentage" />
                </div>
                <div>
                  <Label htmlFor="passoutYear">Passout Year</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="skills">Technical Skills</Label>
                <Textarea 
                  id="skills" 
                  placeholder="List your technical skills (e.g., Java, Python, React, etc.)" 
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="experience">Work/Internship Experience</Label>
                <Textarea 
                  id="experience" 
                  placeholder="Describe any work experience or internships (if any)" 
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="companies">Preferred Companies</Label>
                <Textarea 
                  id="companies" 
                  placeholder="List companies you're most interested in (optional)" 
                  rows={2}
                />
              </div>
              
              <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white">
                Submit Registration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Our placement team will review your application and contact you for suitable opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Launch Your Career?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join our placement program and get access to exclusive job opportunities with top companies. 
              Your dream job is just one step away.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white">
              Register for Placements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-blue">
              Talk to Placement Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}