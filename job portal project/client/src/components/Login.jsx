import { useState } from "react";
import axios from "axios";
import "./style.css";

const Login = ({ setPage, setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
        { withCredentials: true }
      );

      setUser(res.data.user);
      setPage("dashboard");   // ✅ lowercase
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="center">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Email"
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <button>Login</button>
        </form>

        <div
          className="switch"
          onClick={() => setPage("register")}
        >
          New user? Register
        </div>
      </div>
    </div>
  );
};

export default Login;
