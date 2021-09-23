import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    axios
      .post('http://localhost:4000/login', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button>Get User Thats Logged In</button>
    </div>
  );
}
