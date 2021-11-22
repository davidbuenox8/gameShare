import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const register = () => {
    axios
      .post(
        'http://localhost:4000/register',
        {
          email,
          username,
          password,
        },
        { withCredentials: true }
      )
      .then((res: AxiosResponse) => {
        if (res.data === 'success') {
          window.location.href = 'http://localhost:3000/login';
        }
      });
  };
  return (
    <div className="formContainer">
      <Container className="Container">
        <h1>Sign Up</h1>
        <Form>
          <Form.Group className="mb-3 input" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
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
          <Button onClick={register} variant="warning" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </div>
  );
}
