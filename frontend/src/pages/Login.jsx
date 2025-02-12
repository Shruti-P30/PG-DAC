import { useState } from "react";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    setSuccessMessage("");

    if (isSignUp && !formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (isSignUp && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage(isSignUp ? "Account created successfully!" : "Login successful!");
      console.log(isSignUp ? "Sign Up Data:" : "Login Data:", formData);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>{isSignUp ? "Create Account" : "Login"}</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        {isSignUp && (
          <>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px" }}
            />
            {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        {isSignUp && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ marginBottom: "10px", padding: "8px" }}
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
          </>
        )}

        <button type="submit" style={{ padding: "10px", background: isSignUp ? "green" : "blue", color: "white" }}>
          {isSignUp ? "Create Account" : "Login"}
        </button>
      </form>

      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignUp(!isSignUp)} style={{ border: "none", background: "none", color: "blue", cursor: "pointer" }}>
          {isSignUp ? "Login here" : "Sign up here"}
        </button>
      </p>
    </div>
  );
}

export default App;
