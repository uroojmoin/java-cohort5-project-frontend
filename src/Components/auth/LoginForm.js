import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Corrected endpoint (added /api)
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        credentials
      );

      // ✅ Save data in localStorage
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("userEmail", res.data.email);

      alert("✅ Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Unknown error";

      alert("❌ Login failed: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{ width: "400px", padding: "2rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        <h3 className="text-center mb-4">Login</h3>

        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-3">
            <a href="/register">Don't have an account? Register</a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginForm;