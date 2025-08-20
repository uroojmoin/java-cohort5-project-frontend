import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', form);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px', padding: '2rem' }}>
        <h3 className="text-center mb-4">Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={form.username} onChange={handleChange} placeholder="Enter your username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">Register</Button>
          <div className="text-center mt-3">
            <a href="/">Already have an account? Login</a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterForm;