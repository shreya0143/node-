import { useState } from "react";
import axios from "axios";
import "./auth.css";



const Register = ({ setPage }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered successfully");
      setPage("login");
    } catch (error) {
      alert("Register failed");
      console.log(error);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          placeholder="Full Name"
          onChange={e =>
            setForm({ ...form, fullname: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone Number"
          onChange={e =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Register</button>

        <p onClick={() => setPage("login")}>
          Already have an account? <span>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
