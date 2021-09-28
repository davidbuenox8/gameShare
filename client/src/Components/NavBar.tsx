import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Pages/Context';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function NavBar() {
  const ctx = useContext(myContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">GameShare</Navbar.Brand>
        {ctx ? (
          <Nav>
            <Nav.Link href="/logout">Log out</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Button variant="outline-warning" href="/register">
              Sign up
            </Button>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
