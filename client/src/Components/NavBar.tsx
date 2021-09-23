import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className="NavContainer">
      <Link to="/logout">Log out</Link>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/register">Sign up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}
