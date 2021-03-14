import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Form, Button, FormControl } from "react-bootstrap";

function Header() {
  return (
    <div className="header">
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Candidate_Interview</Navbar.Brand>
        <Nav className="mr-auto">
          <Link to="/home">
            <Nav.Link>Home</Nav.Link>
          </Link>
        </Nav>

        <Link to="/">
          <Button variant="outline-light">Logout</Button>
        </Link>
      </Navbar>
    </div>
  );
}

export default Header;
