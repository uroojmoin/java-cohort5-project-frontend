import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // clear auth token if implemented
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          📇 Contact Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;