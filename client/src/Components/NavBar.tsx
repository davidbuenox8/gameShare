import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Pages/Context';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import axios from 'axios';

export default function NavBar() {
  const ctx = useContext(myContext);
  const logout = () => {
    axios
      .get('http://localhost:4000/logout', { withCredentials: true })
      .then((res) => {
        if (res.data === 'Success') {
          window.location.href = '/';
        }
      });
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          {' '}
          <b>GameShare</b>
        </Navbar.Brand>
        {ctx ? (
          <Nav>
            <Nav.Link href="#">News</Nav.Link>
            {ctx.isAdmin ? <Nav.Link href="/admin">Admin</Nav.Link> : null}
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Button onClick={logout} variant="outline-warning" href="/logout">
              Log Out
            </Button>
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
