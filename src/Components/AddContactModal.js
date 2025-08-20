import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddContactModal = ({ show, handleClose, handleAdd }) => {
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = () => {
    handleAdd(newContact);
    handleClose();
    setNewContact({ firstName: '', lastName: '', title: '', email: '', phone: '' });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={newContact.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={newContact.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newContact.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newContact.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add Contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactModal;