import "../components/afterLogin.css";

const Dashboard = ({ setPage }) => {
  return (
    <div className="center-box">
      <div className="card">
        <h2>Dashboard</h2>

        <button onClick={() => setPage("jobs")}>
          <i className="fa-solid fa-briefcase"></i>
          Jobs
        </button>

        <button onClick={() => setPage("applications")}>
          <i className="fa-solid fa-file-lines"></i>
          Applications
        </button>

        <button onClick={() => setPage("myApplications")}>
          My Applications
        </button>

        <button onClick={() => setPage("company")}>
          <i className="fa-solid fa-building"></i>
          Company
        </button>

        <button className="back" onClick={() => setPage("login")}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
