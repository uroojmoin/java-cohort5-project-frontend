import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ContactTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
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
        {contacts.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center">No contacts found.</td>
          </tr>
        ) : (
          contacts.map((contact, index) => (
            <tr key={contact.id || index}>
              <td>{index + 1}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.title}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(contact)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => onDelete(contact.id)}>Delete</Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ContactTable;
