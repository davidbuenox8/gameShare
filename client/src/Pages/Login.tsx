import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    axios
      .post(
        'http://localhost:4000/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(
        (res) => {
          if (res.data === 'success') {
            window.location.href = 'http://localhost:3000/';
          }
        },
        () => {
          console.log('Failure');
        }
      );
  };

  return (
    <>
      <div className="formContainer">
        <Container className="Container">
          <h1>Login</h1>
          <Form>
            <Form.Group className="mb-3 input" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" onClick={login} type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}
