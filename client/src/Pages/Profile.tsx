import React, { useContext } from 'react';
import { myContext } from './Context';

export default function Profile() {
  const ctx = useContext(myContext);
  console.log(ctx);
  return (
    <div>
      <h1>Profile</h1>
      <h3>Username: {ctx.username}</h3>
      <h3>email: {ctx.email}</h3>
    </div>
  );
}
