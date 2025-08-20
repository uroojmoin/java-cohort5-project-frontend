import React, { useEffect, useState, useCallback } from 'react';
import { Container, Button, Table, Form } from 'react-bootstrap';
import AddContactModal from '../Components/dashboard/AddContactModal';
import EditContactModal from '../Components/dashboard/EditContactModal';
import NavbarComponent from '../Components/common/NavbarComponent';
import axios from "axios";

const DashboardPage = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const userId = localStorage.getItem('userId');

  // 🔄 Fetch contacts from backend (memoized with useCallback)
  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(`/contacts/user/${userId}`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ➕ Add new contact
  const handleAddContact = async (newContact) => {
    try {
      await axios.post(`/contacts/${userId}`, newContact);
      fetchContacts();
      setShowAddModal(false);
    } catch (err) {
      alert('Failed to add contact');
    }
  };

  // ✏️ Update contact
  const handleUpdateContact = async (updatedContact) => {
    try {
      await axios.put(`/contacts/${updatedContact.id}`, updatedContact);
      fetchContacts();
      setShowEditModal(false);
    } catch (err) {
      alert('Failed to update contact');
    }
  };

  // 🗑️ Delete contact
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      try {
        await axios.delete(`/contacts/${id}`);
        fetchContacts();
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavbarComponent />
      <Container className="mt-3">
        <h2>Contact Management Dashboard</h2>
        <div className="d-flex justify-content-between my-3">
          <Form.Control
            type="text"
            placeholder="Search contacts..."
            style={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            + Add Contact
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No contacts found.
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}</td>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.title}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <AddContactModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddContact}
        />
        <EditContactModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          contact={selectedContact}
          onSave={handleUpdateContact}
        />
      </Container>
    </>
  );
};

export default DashboardPage;