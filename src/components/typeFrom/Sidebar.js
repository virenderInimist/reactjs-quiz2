import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { FaPlus, FaSearch, FaFolder } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar p-3 bg-white">
      <Link variant="primary" className="btn  btn-success w-100 mb-3" to="/new-quiz">
        <FaPlus /> Create a new form
      </Link>
      <div className="mb-3 d-flex align-items-center">
        <FaSearch className="mr-2" /> 
        <input type="text" placeholder="Search" className="form-control" />
      </div>
      <ListGroup variant="flush">
        <ListGroup.Item className="d-flex align-items-center">
          <FaFolder className="mr-2" /> <strong>Workspaces</strong>
        </ListGroup.Item>
        <ListGroup.Item className="pl-4">Private</ListGroup.Item>
        <ListGroup.Item className="pl-4">My workspace</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
