import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import "../CSS/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("All fields are mandatory!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          import.meta.env.VITE_FIREBASE_API,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error?.message || "Signup failed");
        console.log("Signup Failed:", data);
        return;
      }

      alert("Signup successful");

      dispatch(
        addUser({
          email: data.email,
          token: data.idToken,
          userId: data.localId,
        }),
      );

      navigate("/home");
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h3 className="signup-title">Sign Up</h3>

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign up
          </button>
        </form>

        <Link to="/login" className="login-link">
          <button className="login-btn">Have an account? Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
