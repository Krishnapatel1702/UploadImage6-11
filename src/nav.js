<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link>
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="nav-link" to="/recently_added">
            Recently added
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="nav-link" to="/top_rated">
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
      <Button type="submit" variant="primary" onClick={() => handleLogout()}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>
</Navbar>;
