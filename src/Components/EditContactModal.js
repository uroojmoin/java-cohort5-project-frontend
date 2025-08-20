import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditContactModal = ({ show, handleClose, contact, handleUpdate }) => {
  const [formData, setFormData] = useState(contact);

  useEffect(() => {
    setFormData(contact); // Pre-fill when modal opens
  }, [contact]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    handleUpdate(formData);
    handleClose();
  };

  if (!formData) return null; // avoid rendering if no data yet

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Update Contact</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditContactModal;