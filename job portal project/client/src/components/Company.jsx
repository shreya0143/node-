import { useEffect, useState } from "react";
import axios from "axios";
import "../components/afterLogin.css";

const Company = ({ setPage }) => {
  const [company, setCompany] = useState(null);
  const [applications, setApplications] = useState([]);

  const [companyForm, setCompanyForm] = useState({
    name: "",
    descripation: "",
    website: "",
    location: "",
    logo: "",
  });

  /* ===== GET COMPANY ===== */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/company", { withCredentials: true })
      .then(res => setCompany(res.data.company))
      .catch(() => { });
  }, []);

  /* ===== GET COMPANY ===== */




  /* ===== CREATE COMPANY ===== */
  const createCompany = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:5000/api/company",
      companyForm,
      { withCredentials: true }
    );
    setCompany(res.data.company);
  };

  useEffect(() => {
    if (company?._id) {
      axios
        .get(`http://localhost:5000/api/application/company/${company._id}`)
        .then((res) => setApplications(res.data))
        .catch(() => { });
    }
  }, [company]);


  /* Removed postJob function */

  return (
    <div className="center-box">
      <div className="card">
        <h2>Company</h2>

        {!company && (
          <form onSubmit={createCompany}>
            <input placeholder="Company Name" onChange={e => setCompanyForm({ ...companyForm, name: e.target.value })} />
            <input placeholder="Description" onChange={e => setCompanyForm({ ...companyForm, descripation: e.target.value })} />
            <input placeholder="Website" onChange={e => setCompanyForm({ ...companyForm, website: e.target.value })} />
            <input placeholder="Location" onChange={e => setCompanyForm({ ...companyForm, location: e.target.value })} />
            <input placeholder="Logo URL" onChange={e => setCompanyForm({ ...companyForm, logo: e.target.value })} />
            <button>Create Company</button>
          </form>
        )}

        {company && (
          <>
            <h3>{company.name}</h3>
            {company.logo && <img src={company.logo} alt="logo" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
            <p>{company.descripation}</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCompany(null)}>
                Edit Company
              </button>
            </div>
          </>
        )}


        {/* ================= APPLICANTS ================= */}
        {company && (
          <>
            <h3 style={{ marginTop: "15px" }}>Applicants</h3>

            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              applications.map((app) => (
                <div
                  key={app._id}
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    marginBottom: "8px",
                  }}
                >
                  <p><b>Job:</b> {app.jobTitle}</p>
                  <p><b>Name:</b> {app.userId?.fullname}</p>
                  <p><b>Email:</b> {app.userId?.email}</p>
                  <p><b>Status:</b> {app.status}</p>
                </div>
              ))
            )}
          </>
        )}


        {/* Job Form Removed */}

        {/* Posted Jobs removed as per request */}

        <button className="back" onClick={() => setPage("dashboard")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default Company;
