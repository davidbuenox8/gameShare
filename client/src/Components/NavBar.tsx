import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../Pages/Context';
import { Navbar, Container } from 'react-bootstrap';

export default function NavBar() {
  const ctx = useContext(myContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">GameShare</Navbar.Brand>
        {ctx ? (
          <>
            <Link to="/logout">Log out</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link>
          </>
        ) : (
          <>
            <Link to="/register">Sign up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </Container>
    </Navbar>
  );
}
