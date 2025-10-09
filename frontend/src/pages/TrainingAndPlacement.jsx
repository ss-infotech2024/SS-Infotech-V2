import { Button } from "../components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/UI/Card";
import { Badge } from "../components/UI/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/UI/Tabs";
import { Input } from "../components/UI/Input";

import { Label } from "../components/UI/Lable ";

import { Textarea } from "../components/UI/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/UI/Select";
import { 
  Code, 
  Brain, 
  Cloud, 
  Database, 
  Download,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  BookOpen,
  Video,
  FileText,
  Laptop,
  Globe,
  Smartphone,
  BarChart3
} from "lucide-react";
import Placements from "./Placement";


export default function Training() {
  const programs = [
    {
      id: "web-development",
      title: "Web Development",
      subtitle: "Full Stack Web Development",
      icon: Code,
      duration: "6 months",
      level: "Beginner to Advanced",
      students: "500+",
      rating: 4.8,
      price: "₹45,000",
      description: "Master modern web development with hands-on projects and industry best practices.",
      highlights: [
        "Frontend: HTML5, CSS3, JavaScript, React.js",
        "Backend: Node.js, Express.js, MongoDB",
        "Tools: Git, VS Code, Postman, Webpack",
        "Deployment: AWS, Netlify, Heroku"
      ],
      curriculum: [
        { week: "Week 1-2", topic: "HTML5 & CSS3 Fundamentals", description: "Semantic HTML, responsive design, CSS Grid & Flexbox" },
        { week: "Week 3-4", topic: "JavaScript Essentials", description: "ES6+, DOM manipulation, async programming" },
        { week: "Week 5-8", topic: "React.js Development", description: "Components, hooks, state management, routing" },
        { week: "Week 9-12", topic: "Backend with Node.js", description: "Express.js, REST APIs, database integration" },
        { week: "Week 13-16", topic: "Database & Authentication", description: "MongoDB, JWT, security best practices" },
        { week: "Week 17-20", topic: "Advanced Topics", description: "Testing, deployment, performance optimization" },
        { week: "Week 21-24", topic: "Capstone Project", description: "Build and deploy a full-stack application" }
      ],
      projects: [
        "Responsive Portfolio Website",
        "E-commerce Shopping Cart",
        "Social Media Dashboard",
        "Real-time Chat Application"
      ]
    },
    {
      id: "ai-ml",
      title: "AI/ML",
      subtitle: "Artificial Intelligence & Machine Learning",
      icon: Brain,
      duration: "8 months",
      level: "Intermediate to Advanced",
      students: "300+",
      rating: 4.9,
      price: "₹65,000",
      description: "Dive deep into AI and ML with practical implementation and real-world datasets.",
      highlights: [
        "Python programming for data science",
        "Machine Learning algorithms & techniques",
        "Deep Learning with TensorFlow & PyTorch",
        "Natural Language Processing & Computer Vision"
      ],
      curriculum: [
        { week: "Week 1-4", topic: "Python for Data Science", description: "NumPy, Pandas, Matplotlib, data preprocessing" },
        { week: "Week 5-8", topic: "Statistics & Probability", description: "Statistical analysis, hypothesis testing" },
        { week: "Week 9-16", topic: "Machine Learning", description: "Supervised & unsupervised learning algorithms" },
        { week: "Week 17-24", topic: "Deep Learning", description: "Neural networks, CNN, RNN, LSTM" },
        { week: "Week 25-28", topic: "NLP & Computer Vision", description: "Text processing, image recognition" },
        { week: "Week 29-32", topic: "MLOps & Deployment", description: "Model deployment, monitoring, scaling" }
      ],
      projects: [
        "Predictive Analytics Model",
        "Image Classification System",
        "Sentiment Analysis Tool",
        "Recommendation Engine"
      ]
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      subtitle: "AWS, Azure & DevOps",
      icon: Cloud,
      duration: "4 months",
      level: "Beginner to Intermediate",
      students: "400+",
      rating: 4.7,
      price: "₹35,000",
      description: "Learn cloud platforms and DevOps practices for modern application deployment.",
      highlights: [
        "AWS Core Services (EC2, S3, RDS, Lambda)",
        "Azure fundamentals and services",
        "Docker containerization",
        "CI/CD pipelines and automation"
      ],
      curriculum: [
        { week: "Week 1-2", topic: "Cloud Fundamentals", description: "Cloud concepts, service models, deployment models" },
        { week: "Week 3-6", topic: "AWS Core Services", description: "EC2, S3, VPC, IAM, RDS" },
        { week: "Week 7-10", topic: "Azure Platform", description: "Virtual machines, storage, networking" },
        { week: "Week 11-12", topic: "Containerization", description: "Docker, Kubernetes basics" },
        { week: "Week 13-14", topic: "DevOps Practices", description: "CI/CD, Git, Jenkins, monitoring" },
        { week: "Week 15-16", topic: "Certification Prep", description: "AWS/Azure certification preparation" }
      ],
      projects: [
        "Multi-tier Web Application on AWS",
        "Containerized Microservices",
        "CI/CD Pipeline Setup",
        "Infrastructure as Code"
      ]
    },
    {
      id: "full-stack",
      title: "Full Stack Development",
      subtitle: "MERN Stack + Advanced Technologies",
      icon: Database,
      duration: "10 months",
      level: "Beginner to Expert",
      students: "600+",
      rating: 4.9,
      price: "₹75,000",
      description: "Comprehensive full-stack development with modern frameworks and best practices.",
      highlights: [
        "MERN Stack (MongoDB, Express, React, Node.js)",
        "TypeScript for type-safe development",
        "GraphQL & REST APIs",
        "Testing, deployment & scaling"
      ],
      curriculum: [
        { week: "Week 1-4", topic: "Frontend Fundamentals", description: "HTML, CSS, JavaScript, responsive design" },
        { week: "Week 5-12", topic: "React.js Mastery", description: "Components, hooks, context, advanced patterns" },
        { week: "Week 13-20", topic: "Backend Development", description: "Node.js, Express, database design" },
        { week: "Week 21-28", topic: "Advanced Topics", description: "TypeScript, GraphQL, microservices" },
        { week: "Week 29-36", topic: "Testing & Quality", description: "Unit testing, integration testing, TDD" },
        { week: "Week 37-40", topic: "Deployment & Scaling", description: "Cloud deployment, performance optimization" }
      ],
      projects: [
        "Social Media Platform",
        "E-learning Management System",
        "Real-time Collaboration Tool",
        "Enterprise Dashboard"
      ]
    }
  ];

  const benefits = [
    { icon: Award, title: "Industry Certification", description: "Get certified upon successful completion" },
    { icon: Users, title: "Expert Mentorship", description: "Learn from industry professionals" },
    { icon: Laptop, title: "Hands-on Projects", description: "Build real-world applications" },
    { icon: Globe, title: "Placement Assistance", description: "100% job placement support" },
    { icon: BookOpen, title: "Updated Curriculum", description: "Latest industry-relevant content" },
    { icon: Video, title: "Recorded Sessions", description: "Access to all recorded lectures" }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <Badge className="bg-brand-accent text-white">Training Programs</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Industry-Ready
              <span className="text-brand-accent"> Training Programs</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Master cutting-edge technologies with our comprehensive training programs designed by industry experts. 
              Get hands-on experience and guaranteed placement assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Why Choose Our Training Programs?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive learning experience with industry-focused curriculum and placement support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Our Training Programs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our specialized programs designed to make you industry-ready
            </p>
          </div>

          <Tabs defaultValue={programs[0].id} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1">
              {programs.map((program) => (
                <TabsTrigger 
                  key={program.id} 
                  value={program.id}
                  className="flex flex-col items-center space-y-2 p-4 data-[state=active]:bg-brand-blue data-[state=active]:text-white"
                >
                  <program.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{program.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id} className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Program Overview */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-3xl">{program.title}</CardTitle>
                            <CardDescription className="text-lg">{program.subtitle}</CardDescription>
                          </div>
                          <program.icon className="h-12 w-12 text-brand-blue" />
                        </div>
                        <p className="text-muted-foreground">{program.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <Clock className="h-5 w-5 text-brand-blue mx-auto mb-1" />
                            <div className="text-sm text-muted-foreground">Duration</div>
                            <div className="font-medium">{program.duration}</div>
                          </div>
                          <div className="text-center">
                            <BarChart3 className="h-5 w-5 text-brand-blue mx-auto mb-1" />
                            <div className="text-sm text-muted-foreground">Level</div>
                            <div className="font-medium text-sm">{program.level}</div>
                          </div>
                          <div className="text-center">
                            <Users className="h-5 w-5 text-brand-blue mx-auto mb-1" />
                            <div className="text-sm text-muted-foreground">Students</div>
                            <div className="font-medium">{program.students}</div>
                          </div>
                          <div className="text-center">
                            <Star className="h-5 w-5 text-brand-blue mx-auto mb-1" />
                            <div className="text-sm text-muted-foreground">Rating</div>
                            <div className="font-medium">{program.rating}/5</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold mb-3">Program Highlights</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {program.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-success" />
                                <span className="text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Curriculum */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5" />
                          <span>Detailed Curriculum</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {program.curriculum.map((item, index) => (
                            <div key={index} className="border-l-4 border-brand-blue pl-4">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="outline">{item.week}</Badge>
                                <h5 className="font-semibold">{item.topic}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6">
                          <Button className="bg-brand-blue hover:bg-brand-blue-dark">
                            <Download className="mr-2 h-4 w-4" />
                            Download Complete Syllabus
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Projects */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Laptop className="h-5 w-5" />
                          <span>Hands-on Projects</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {program.projects.map((project, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-brand-blue" />
                              <span className="text-sm font-medium">{project}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enrollment Card */}
                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg sticky top-8">
                      <CardHeader className="text-center bg-brand-blue text-white rounded-t-lg">
                        <CardTitle className="text-2xl">Enroll Now</CardTitle>
                        <div className="text-3xl font-bold">{program.price}</div>
                        <p className="text-blue-100">One-time payment</p>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your full name" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your.email@example.com" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+91 xxxxx xxxxx" />
                          </div>
                          <div>
                            <Label htmlFor="education">Educational Background</Label>
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
                            <Label htmlFor="experience">Prior Experience</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fresher">Fresher</SelectItem>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3+">3+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="message">Additional Message (Optional)</Label>
                            <Textarea id="message" placeholder="Any specific requirements or questions?" rows={3} />
                          </div>
                        </div>
                        <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white">
                          Submit Enrollment
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Our team will contact you within 24 hours
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>

  );
}