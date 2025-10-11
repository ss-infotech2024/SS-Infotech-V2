import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Progress from "../components/ui/Progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/Chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { DollarSign, Users, ShoppingBag, TrendingUp } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import axios from 'axios';

export default function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [applications, setApplications] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('albums'); // Default to 'albums'
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Fetch data for each section
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumRes, appRes, candRes, jobRes, slideRes] = await Promise.all([
          axios.get('http://localhost:3000/api/albums/album-getall').catch(() => ({ data: [] })),
          axios.get('http://localhost:3000/api/applications/recive-applications').catch(() => ({ data: [] })),
          axios.get('http://localhost:3000/api/candidate/candidates').catch(() => ({ data: [] })),
          axios.get('http://localhost:3000/api/jobs/show-jobs').catch(() => ({ data: [] })),
          axios.get('http://localhost:3000/api/slides').catch(() => ({ data: [] })),
        ]);
        setAlbums(Array.isArray(albumRes.data) ? albumRes.data : []);
        setApplications(Array.isArray(appRes.data) ? appRes.data : []);
        setCandidates(Array.isArray(candRes.data) ? candRes.data : []);
        setJobs(Array.isArray(jobRes.data) ? jobRes.data : []);
        setSlides(Array.isArray(slideRes.data) ? slideRes.data : []);
      } catch (err) {
        setError('Failed to load data. Please try again.');
      }
    };
    fetchData();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => [
    {
      label: "Total Albums",
      value: albums.length,
      delta: albums.length > 0 ? "+5.2%" : "0%",
      icon: ShoppingBag,
      trend: albums.length > 0 ? "up" : "down",
    },
    {
      label: "Total Applications",
      value: applications.length,
      delta: applications.length > 0 ? "+3.8%" : "0%",
      icon: Users,
      trend: applications.length > 0 ? "up" : "down",
    },
    {
      label: "Total Candidates",
      value: candidates.length,
      delta: candidates.length > 0 ? "+2.1%" : "0%",
      icon: Users,
      trend: candidates.length > 0 ? "up" : "down",
    },
    {
      label: "Total Jobs",
      value: jobs.length,
      delta: jobs.length > 0 ? "+4.5%" : "0%",
      icon: FaBriefcase,
      trend: jobs.length > 0 ? "up" : "down",
    },
  ], [albums.length, applications.length, candidates.length, jobs.length]);

  // Data for charts
  const albumsData = useMemo(() => {
    const monthlyData = Array(12).fill(0).map((_, i) => {
      const month = new Date(currentYear, i, 1).toLocaleString('en-US', { month: 'short' });
      const count = albums.filter(a => new Date(a.createdAt || Date.now()).getMonth() === i).length;
      return { month, value: count };
    });
    return monthlyData;
  }, [albums]);

  const applicationsData = useMemo(() => {
    const monthlyData = Array(12).fill(0).map((_, i) => {
      const month = new Date(currentYear, i, 1).toLocaleString('en-US', { month: 'short' });
      const count = applications.filter(a => new Date(a.createdAt || Date.now()).getMonth() === i).length;
      return { month, value: count };
    });
    return monthlyData;
  }, [applications]);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (activeSection === 'albums' && files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    if (activeSection === 'albums' && !isEditing && files.length < 5) {
      setError('Minimum 5 images required for new albums');
      return;
    }
    setFormData((prev) => ({ ...prev, files }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'files') {
        let fieldName;
        switch (activeSection) {
          case 'albums':
            fieldName = 'images';
            break;
          case 'applications':
            fieldName = 'resume';
            break;
          case 'candidates':
            fieldName = 'file';
            break;
          case 'slides':
            fieldName = 'url';
            break;
          default:
            return;
        }
        value.forEach((file) => data.append(fieldName, file));
      } else {
        data.append(key, value);
      }
    });

    try {
      if (activeSection === 'albums') {
        if (isEditing) {
          const res = await axios.patch(`http://localhost:3000/api/albums/album/${editId}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setAlbums((prev) => prev.map((item) => (item._id === editId ? res.data.album : item)));
        } else {
          const res = await axios.post('http://localhost:3000/api/albums/album-post', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setAlbums((prev) => [...prev, res.data.album]);
        }
      } else if (activeSection === 'applications') {
        if (isEditing) {
          setError('Editing applications is not supported.');
          return;
        }
        const res = await axios.post('http://localhost:3000/api/applications/fill-applications', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setApplications((prev) => [...prev, res.data]);
      } else if (activeSection === 'candidates') {
        if (isEditing) {
          setError('Editing candidates is not supported.');
          return;
        }
        const res = await axios.post('http://localhost:3000/api/candidate/upload-excel', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCandidates((prev) => [...prev, ...res.data]);
      } else if (activeSection === 'jobs') {
        if (isEditing) {
          const res = await axios.put(`http://localhost:3000/api/jobs/update-jobs/${editId}`, formData);
          setJobs((prev) => prev.map((item) => (item._id === editId ? res.data : item)));
        } else {
          const res = await axios.post('http://localhost:3000/api/jobs/add-jobs', formData);
          setJobs((prev) => [...prev, res.data]);
        }
      } else if (activeSection === 'slides') {
        if (isEditing) {
          setError('Editing slides is not supported.');
          return;
        }
        const res = await axios.post('http://localhost:3000/api/slides', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSlides((prev) => [...prev, res.data]);
      }
      setFormData({});
      setIsEditing(false);
      setEditId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || `Failed to save ${activeSection.slice(0, -1)}`);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditId(item._id);
    setFormData({
      ...item,
      files: [],
      resume: undefined,
      url: undefined,
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete this ${activeSection.slice(0, -1)}?`)) return;
    try {
      if (activeSection === 'albums') {
        await axios.delete(`http://localhost:3000/api/albums/album/${id}`);
        setAlbums((prev) => prev.filter((item) => item._id !== id));
      } else if (activeSection === 'applications') {
        await axios.delete(`http://localhost:3000/api/applications/delete/${id}`);
        setApplications((prev) => prev.filter((item) => item._id !== id));
      } else if (activeSection === 'candidates') {
        await axios.delete(`http://localhost:3000/api/candidate/candidate/${id}`);
        setCandidates((prev) => prev.filter((item) => item._id !== id));
      } else if (activeSection === 'jobs') {
        await axios.delete(`http://localhost:3000/api/jobs/delete-jobs/${id}`);
        setJobs((prev) => prev.filter((item) => item._id !== id));
      } else if (activeSection === 'slides') {
        await axios.delete(`http://localhost:3000/api/slides/delete/${id}`);
        setSlides((prev) => prev.filter((item) => item._id !== id));
      }
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || `Failed to delete ${activeSection.slice(0, -1)}`);
    }
  };

  const handleDownloadResume = async (publicId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/applications/download/${publicId}`, {
        headers: { Authorization: 'Bearer YOUR_TOKEN_HERE' },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${publicId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download resume. Ensure you are authenticated.');
    }
  };

  const fields = {
    albums: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'fullTitle', label: 'Full Title', type: 'text', required: true },
      { name: 'color', label: 'Color (e.g., from-purple-500 to-indigo-600)', type: 'text', required: true },
      { name: 'images', label: 'Images (5-10, JPEG/PNG/WEBP)', type: 'file', accept: 'image/jpeg,image/png,image/webp', multiple: true, required: !isEditing },
    ],
    applications: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'resume', label: 'Resume (PDF)', type: 'file', accept: 'application/pdf', multiple: false, required: !isEditing },
    ],
    candidates: [
      { name: 'file', label: 'Excel File', type: 'file', accept: '.xlsx,.xls', multiple: false, required: !isEditing },
    ],
    jobs: [
      { name: 'title', label: 'Job Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'location', label: 'Location', type: 'text', required: true },
    ],
    slides: [
      { name: 'url', label: 'Image/Video (JPEG/PNG/WEBP/MP4)', type: 'file', accept: 'image/jpeg,image/png,image/webp,video/mp4', multiple: false, required: !isEditing },
    ],
  };

  const renderRecentItems = () => {
    let data = [];
    switch (activeSection) {
      case 'albums':
        data = albums.slice(0, 4);
        return (
          <>
            <CardHeader>
              <CardTitle>Recent Albums</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">Title</th>
                      <th className="py-3 font-medium">Full Title</th>
                      <th className="py-3 font-medium">Images</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-3">{item.title}</td>
                        <td className="py-3">{item.fullTitle}</td>
                        <td className="py-3">{item.images?.length || 0}</td>
                        <td className="py-3 text-right font-medium">
                          <Button variant="outline" size="sm" onClick={() => {
                            setActiveSection('albums');
                            handleEdit(item);
                          }}>Edit</Button>
                          <Button variant="destructive" size="sm" className="ml-2" onClick={() => {
                            setActiveSection('albums');
                            handleDelete(item._id);
                          }}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </>
        );
      case 'applications':
        data = applications.slice(0, 4);
        return (
          <>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Email</th>
                      <th className="py-3 font-medium">Phone</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.email}</td>
                        <td className="py-3">{item.phone}</td>
                        <td className="py-3 text-right font-medium">
                          <Button variant="destructive" size="sm" onClick={() => {
                            setActiveSection('applications');
                            handleDelete(item._id);
                          }}>Delete</Button>
                          <Button variant="secondary" size="sm" className="ml-2" onClick={() => handleDownloadResume(item.resume)}>Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </>
        );
      case 'candidates':
        data = candidates.slice(0, 4);
        return (
          <>
            <CardHeader>
              <CardTitle>Recent Candidates</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Email</th>
                      <th className="py-3 font-medium">Phone</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.email}</td>
                        <td className="py-3">{item.phone}</td>
                        <td className="py-3 text-right font-medium">
                          <Button variant="destructive" size="sm" onClick={() => {
                            setActiveSection('candidates');
                            handleDelete(item._id);
                          }}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </>
        );
      case 'jobs':
        data = jobs.slice(0, 4);
        return (
          <>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">Title</th>
                      <th className="py-3 font-medium">Location</th>
                      <th className="py-3 font-medium">Description</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-3">{item.title}</td>
                        <td className="py-3">{item.location}</td>
                        <td className="py-3">{item.description?.slice(0, 50)}...</td>
                        <td className="py-3 text-right font-medium">
                          <Button variant="outline" size="sm" onClick={() => {
                            setActiveSection('jobs');
                            handleEdit(item);
                          }}>Edit</Button>
                          <Button variant="destructive" size="sm" className="ml-2" onClick={() => {
                            setActiveSection('jobs');
                            handleDelete(item._id);
                          }}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </>
        );
      case 'slides':
        data = slides.slice(0, 4);
        return (
          <>
            <CardHeader>
              <CardTitle>Recent Slides</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">URL</th>
                      <th className="py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-t">
                        <td className="py-3">{item.url}</td>
                        <td className="py-3 text-right font-medium">
                          <Button variant="destructive" size="sm" onClick={() => {
                            setActiveSection('slides');
                            handleDelete(item._id);
                          }}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 p-6">
      {/* Section Selector */}
      <div className="flex gap-4 mb-6">
        {['albums', 'applications', 'candidates', 'jobs', 'slides'].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? 'default' : 'outline'}
            onClick={() => {
              setActiveSection(section);
              setFormData({});
              setIsEditing(false);
              setEditId(null);
              setError('');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const isUp = s.trend === "up";
          return (
            <Card key={s.label} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {/* <span className={isUp ? "text-emerald-600" : "text-rose-600"}>{s.delta}</span> vs last month */}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Albums Over Time</CardTitle>
              <Badge variant="secondary">{currentYear}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{ value: { label: "Albums", color: "hsl(var(--primary))" } }}
              className="h-64"
            >
              <AreaChart data={albumsData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area dataKey="value" type="monotone" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/.15)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer config={{ value: { label: "Applications", color: "hsl(var(--accent))" } }} className="h-64">
              <LineChart data={applicationsData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          {renderRecentItems()}
        </Card>

        {/* <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Albums Target</span>
                <span className="text-muted-foreground">{Math.min(100, (albums.length / 10) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(100, (albums.length / 10) * 100)} />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Applications Target</span>
                <span className="text-muted-foreground">{Math.min(100, (applications.length / 20) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={Math.min(100, (applications.length / 20) * 100)} />
            </div>
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">View full report</Button>
          </CardContent>
        </Card> */}
      </div>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? `Update ${activeSection.slice(0, -1)}` : `Create ${activeSection.slice(0, -1)}`}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
            {fields[activeSection]?.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required={field.required}
                  />
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    name={field.name}
                    multiple={field.multiple}
                    accept={field.accept}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            {error && <p className="text-purple-600 text-sm" role="alert">{error}</p>}
            <div className="flex gap-4">
              <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">Submit</Button>
              {isEditing && (
                <Button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditId(null);
                    setFormData({});
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    setError('');
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}