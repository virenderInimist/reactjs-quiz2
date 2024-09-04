import React from 'react';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { FaTh, FaList } from 'react-icons/fa';

function Header() {
  return (
    <div className="top-nav-bar d-flex justify-content-between align-items-center p-3 border-bottom">
      <h2 className="mb-0">My workspace</h2>
      <div>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            Date created
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Responses</Dropdown.Item>
            <Dropdown.Item>Completion</Dropdown.Item>
            <Dropdown.Item>Updated</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonGroup className="ml-2">
          <Button variant="outline-secondary"><FaList /></Button>
          <Button variant="outline-secondary"><FaTh /></Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Header;
