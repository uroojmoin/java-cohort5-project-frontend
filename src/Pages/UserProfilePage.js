import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import NavbarComponent from '../Components/common/NavbarComponent';
import ChangePasswordModal from '../Components/user/ChangePasswordModal';
import axios from 'axios';

const UserProfilePage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    axios.get('http://localhost:8080/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUser(response.data))
    .catch(error => console.error('Error fetching user profile:', error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-3">
        <Card className="p-4">
          <h3>User Profile</h3>
          <hr />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Card>

        <ChangePasswordModal
          show={showPasswordModal}
          handleClose={() => setShowPasswordModal(false)}
        />
      </Container>
    </>
  );
};

export default UserProfilePage;