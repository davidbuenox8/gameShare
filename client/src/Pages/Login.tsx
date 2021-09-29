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
      .then((res) => {
        console.log(res.data);
      });
  };

  const getUser = () => {
    axios
      .get('http://localhost:4000/user', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <>
      <div className="formContainer">
        <Container className="Container">
          <h1>Login</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
      <button onClick={getUser}>Get User Thats Logged In</button>
    </>
  );
}
