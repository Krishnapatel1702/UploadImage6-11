import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Header() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location.pathname.includes("/home"));

  const handleClose = () => setShow(false);
  const handleLogout = () => {
    setShow(false);
    localStorage.setItem("email", null);
    navigate("/login");
  };
  const handleShow = () => {
    setShow(true);
    localStorage.setItem("email", null);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className={
                  location.pathname.includes("/home")
                    ? "nav-link active bg-col"
                    : "nav-link"
                }
                to="/home"
              >
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className={
                  location.pathname.includes("/recently_added")
                    ? "nav-link active bg-col"
                    : "nav-link"
                }
                to="/recently_added"
              >
                Recently Added
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className={
                  location.pathname.includes("/top_rated")
                    ? "nav-link active bg-col"
                    : "nav-link"
                }
                to="/top_rated"
              >
                Top Rated
              </Link>
            </Nav.Link>
          </Nav>
          <Link
            className="link"
            onClick={() => {
              handleShow();
            }}
          >
            Logout
          </Link>
        </Navbar.Collapse>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Do you want to Logout?</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="me-3" onClick={handleClose}>
            No
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => handleLogout()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;
