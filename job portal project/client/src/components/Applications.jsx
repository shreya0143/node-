import { useState } from "react";
import axios from "axios";
import "../components/afterLogin.css";

const Applications = ({ setPage, selectedJob, user }) => {
  const [form, setForm] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    coverLetter: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  const applyJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/application/apply", {
        userId: user._id,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        name: form.name,
        email: form.email,
        coverLetter: form.coverLetter
      });
      setMessage("Applied successfully!");
      setType("success");
      setTimeout(() => setPage("myApplications"), 1500); // Redirect to My Applications
    } catch (err) {
      setMessage(err.response?.data?.message || "Application failed");
      setType("error");
    }
  };

  return (
    <div className="center-box">
      <div className="card">
        <h2>Apply for {selectedJob.title}</h2>

        {message && (
          <div className={`alert alert-${type}`}>
            {message}
          </div>
        )}

        <form onSubmit={applyJob} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Cover Letter / Why should we hire you?"
            value={form.coverLetter}
            onChange={e => setForm({ ...form, coverLetter: e.target.value })}
            rows="4"
            required
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />

          <button type="submit">
            Apply Now
          </button>
        </form>

        <button className="back" onClick={() => setPage("jobs")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default Applications;
