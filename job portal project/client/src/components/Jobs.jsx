import { useEffect, useState } from "react";
import axios from "axios";
import "../components/afterLogin.css";

const Jobs = ({ setPage, setSelectedJob }) => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/job")
      .then(res => setJobs(res.data))
      .catch(() => { });
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchRole =
      role === "All" ? true : job.role === role;

    return matchSearch && matchRole;
  });

  return (
    <div className="center-box">
      <div className="card">
        <h2>Jobs</h2>

        <div className="search-box">
          <input
            placeholder="Search job..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="All">All</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Design">Design</option>
          </select>
        </div>

        {filteredJobs.map(job => (
          <button
            key={job._id}
            className="job-btn"
            onClick={() => {
  setSelectedJob({
    id: job._id,
    title: job.title,
  });
  setPage("applications");
}}
          >
            {job.title}
          </button>
        ))}

        <button onClick={() => setPage("myApplications")}>
          My Applications
        </button>


        <button className="back" onClick={() => setPage("dashboard")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default Jobs;
