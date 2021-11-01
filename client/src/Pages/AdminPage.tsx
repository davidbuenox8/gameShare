import React, { useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  useEffect(() => {
    axios
      .get('http://localhost:4000/getallusers', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return <div>Admin</div>;
}
