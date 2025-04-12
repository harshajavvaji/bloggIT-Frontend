import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaRegCircleUser } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import { FaBlogger } from "react-icons/fa";

const BlogsNavbar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3">
      <Container fluid>
        <FaBlogger size={30} className="text-primary me-2" />
        <Navbar.Brand href="/dashboard" className="fw-bold text-primary">
          BloggIT
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
          </Nav>
          <Button
          className="m-3"
            variant="outline-danger"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
              localStorage.removeItem('user')
            }}
          >
            Sign Out
          </Button>
          <img className="rounded-circle" style={{'width'
            :'50px', 'height': '50px'
          }} src={ localStorage.getItem('user') ? JSON.parse(localStorage?.getItem('user'))?.profilePic : FaRegCircleUser}   alt="" />
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BlogsNavbar;
