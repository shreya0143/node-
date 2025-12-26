import { useState } from "react";
import axios from "axios";
import "./style.css";

const CreateCompany = ({ setPage, setCompany }) => {
  const [form, setForm] = useState({
    name: "",
    descripation: "",
    website: "",
    location: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/company",
      form,
      { withCredentials: true }
    );

    setCompany(res.data.company);
    setPage("company");
  };

  return (
    <div className="center">
      <div className="card">
        <h2>Create Company</h2>

        <form onSubmit={submit}>
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Description" onChange={e => setForm({ ...form, descripation: e.target.value })} />
          <input placeholder="Website" onChange={e => setForm({ ...form, website: e.target.value })} />
          <input placeholder="Location" onChange={e => setForm({ ...form, location: e.target.value })} />
          <input placeholder="Logo URL" onChange={e => setForm({ ...form, logo: e.target.value })} />

          <button>Create</button>
        </form>

        <button className="back" onClick={() => setPage("dashboard")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default CreateCompany;
