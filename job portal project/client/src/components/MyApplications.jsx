import { useEffect, useState } from "react";
import axios from "axios";
import "../components/afterLogin.css";

const MyApplications = ({ setPage, user }) => {
  const [apps, setApps] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [job, setJob] = useState({ title: "", role: "Frontend" });

  useEffect(() => {
    // 1. Fetch My Applications
    axios
      .get(`http://localhost:5000/api/application/my/${user._id}`)
      .then(res => setApps(res.data))
      .catch(() => { });

    // 2. Fetch My Company & Posted Jobs
    const fetchCompanyJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/company", { withCredentials: true });
        if (res.data.company) {
          setCompany(res.data.company);
          const jobRes = await axios.get(`http://localhost:5000/api/job/company/${res.data.company._id}`);
          setPostedJobs(jobRes.data);
        }
      } catch (err) { }
    };

    fetchCompanyJobs();
  }, [user._id]);

  const postJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/job",
        { ...job, companyId: company._id },
        { withCredentials: true }
      );
      setShowJobForm(false);
      setJob({ title: "", role: "Frontend" });

      // Refresh jobs
      const res = await axios.get(`http://localhost:5000/api/job/company/${company._id}`);
      setPostedJobs(res.data);
    } catch (err) { }
  };

  return (
    <div className="center-box">
      <div className="card">
        <h2>My Applications</h2>

        {apps.length === 0 ? (
          <p>No applications found</p>
        ) : (
          apps.map(app => (
            <div key={app._id} style={{ marginBottom: "10px", borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
              <p><b>{app.jobTitle}</b></p>
              <p>Status: {app.status}</p>
            </div>
          ))
        )}

        <hr style={{ margin: "20px 0" }} />

        <hr style={{ margin: "20px 0" }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Posted Jobs</h2>
          {company && (
            <button onClick={() => setShowJobForm(!showJobForm)} style={{ fontSize: '14px', padding: '5px 10px' }}>
              + Post New Job
            </button>
          )}
        </div>

        {showJobForm && (
          <form onSubmit={postJob} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
            <input placeholder="Job Title" value={job.title} onChange={e => setJob({ ...job, title: e.target.value })} required />
            <select value={job.role} onChange={e => setJob({ ...job, role: e.target.value })}>
              <option>Frontend</option>
              <option>Backend</option>
              <option>UI/UX</option>
              <option>Design</option>
            </select>
            <button type="submit">Post Job</button>
          </form>
        )}
        {!company ? (
          <p>You haven't created a company yet.</p>
        ) : postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          postedJobs.map(j => (
            <div key={j._id} style={{ marginBottom: "10px", borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
              <b>{j.title}</b> – {j.role}
            </div>
          ))
        )}

        <button className="back" onClick={() => setPage("dashboard")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default MyApplications;
