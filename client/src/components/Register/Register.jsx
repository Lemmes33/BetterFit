import { useState } from "react";
import "./register.css";
import { wrappedFetch } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await wrappedFetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password, username, age }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        // Save token or session data

        // Redirect to dashboard
        navigate("/login");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="box">
      <div className="">
        <img
          style={{ width: "100%" }}
          src="https://i.pinimg.com/564x/17/f8/e3/17f8e3f10beff261370824382c6cf7d2.jpg"
          alt="Background"
        />
      </div>
      <div id="signup-tab" className="right-side">
        <form onSubmit={handleSubmit}>
          <div className="login-prompt-field">USERNAME</div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="login-name"
            className="login-input-field"
            placeholder="Create a username"
          />
          <div className="login-prompt-field">PASSWORD</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="login-password"
            className="login-input-field"
            placeholder="*****"
          />
          <div className="login-prompt-field">E-MAIL</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="login-email"
            className="login-input-field"
            placeholder="Enter your e-mail address"
          />
          <div className="login-prompt-field">AGE</div>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            name="age"
            className="login-input-field"
            placeholder="Age"
          />
          <div className="login-terms-container">
            <input
              type="checkbox"
              className="login-terms-checkbox"
              value="terms_checkbox"
            />
            <label className="login-terms-prompt">
              I accept the{" "}
              <span style={{ borderBottom: "1px solid #47C1B9" }}>
                terms and conditions
              </span>
            </label>
          </div>
          <button className="login-btn-signup" type="submit">
            SIGN UP <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
