import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search contacts..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      style={{ width: '300px' }}
    />
  );
};

export default SearchBar;