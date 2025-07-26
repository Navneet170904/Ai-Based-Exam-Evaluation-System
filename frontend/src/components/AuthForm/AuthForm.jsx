import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/api";
import useAuth from "../../context/useAuth";
import "./AuthForm.css";

const AuthForm = ({ isLogin = true }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      try {
        if (isLogin) {
          const response = await authService.login(
            formData.email,
            formData.password
          );
          if (response.success) {
            login(response.user); // Use context login
            navigate("/dashboard");
          }
        } else {
            const response = await authService.register(
              formData.name,
              formData.email,
              formData.password
            );
            if (response.success) {
              // Use context login here too
              login(response.user);
              navigate("/dashboard");
            }
          }
      } catch (error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? "Login to Your Account" : "Create New Account"}</h2>
      {apiError && <div className="api-error">{apiError}</div>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            {isLogin ? "Password" : "Create Password"}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={`Enter your ${isLogin ? "password" : "new password"}`}
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
