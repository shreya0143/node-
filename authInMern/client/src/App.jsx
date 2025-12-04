import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {/* FORM */}
        <form>
          {!isLogin && (
            <div className="input-group">
              <input type="text" placeholder="First Name" required />
            </div>
          )}

          {!isLogin && (
            <div className="input-group">
              <input type="text" placeholder="Last Name" required />
            </div>
          )}

          <div className="input-group">
            <input type="email" placeholder="Email" required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>

          <button className="btn">{isLogin ? "Login" : "Register"}</button>
        </form>

        {/* Toggle Section */}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
