import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Upload, Table, message, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function CandidateManager() {
  const [candidates, setCandidates] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:3000/api/candidate"; // change if needed

  // ✅ Fetch all candidates
  useEffect(() => {
    let isMounted = true; // prevent state update after unmount

    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidates`);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.candidates || [];
        if (isMounted) setCandidates(data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
        message.error("Failed to fetch candidates");
        if (isMounted) setCandidates([]);
      }
    };

    fetchCandidates();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, []);

  // ✅ Upload Excel
// Frontend handleUpload
const handleUpload = async () => {
  if (!file) return message.warning("Please select an Excel file to upload");

  const formData = new FormData();
  formData.append("file", file); // must match `req.file` in multer

  try {
    setLoading(true);
    const res = await axios.post(`${API_BASE}/upload-excel`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    message.success(`Uploaded ${res.data.count} candidates successfully`);
    setFile(null);
    // refresh candidate list
    const fetchRes = await axios.get(`${API_BASE}/candidates`);
    setCandidates(Array.isArray(fetchRes.data) ? fetchRes.data : fetchRes.data.candidates || []);
  } catch (err) {
    console.error("Failed to upload Excel:", err);
    message.error(err.response?.data?.message || "Failed to upload Excel file");
  } finally {
    setLoading(false);
  }
};


  // ✅ Delete a candidate
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/candidate/${id}`);
      message.success("Candidate deleted");
      setCandidates((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete candidate:", err);
      message.error("Failed to delete candidate");
    }
  };

  // ✅ Delete all candidates
  const handleDeleteAll = async () => {
    try {
      await axios.delete(`${API_BASE}/candidates`);
      message.success("All candidates deleted");
      setCandidates([]);
    } catch (err) {
      console.error("Failed to delete all candidates:", err);
      message.error("Failed to delete all candidates");
    }
  };

  // ✅ Table columns
  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Phone", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "emailAddress", key: "emailAddress" },
    { title: "Location", dataIndex: "currentLocation", key: "currentLocation" },
    { title: "DOB / Age", dataIndex: "dateOfBirth", key: "dateOfBirth" },
    { title: "Post Grad", dataIndex: "postGraduationDegree", key: "postGraduationDegree" },
    { title: "Under Grad", dataIndex: "underGraduationDegree", key: "underGraduationDegree" },
    { 
      title: "Resume", 
      dataIndex: "resumeLink", 
      key: "resumeLink",
      render: (link) => link ? <a href={link} target="_blank" rel="noopener noreferrer">View</a> : "-" 
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure delete this candidate?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Candidate Manager</h2>

      <div className="flex items-center gap-4 mb-6">
        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false; // prevent auto upload
          }}
          accept=".xls,.xlsx"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select Excel</Button>
        </Upload>
        <Button type="primary" onClick={handleUpload} loading={loading}>
          Upload
        </Button>
        <Button danger onClick={handleDeleteAll}>
          Delete All
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={Array.isArray(candidates) ? candidates.map((c) => ({ ...c, key: c._id })) : []}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
