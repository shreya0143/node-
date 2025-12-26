import "./style.css";

const JobDetails = ({ job, setPage, applications, setApplications }) => {

  const applyJob = () => {
    if (applications.includes(job)) {
      alert("Already applied");
      return;
    }

    setApplications([...applications, job]); // ✅ SAVE JOB
    alert("Applied Successfully!");
    setPage("applications");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>{job}</h2>
        <p>This is a great opportunity for {job}</p>

        <button onClick={applyJob}>Apply Job</button>

        <button className="back" onClick={() => setPage("jobs")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
