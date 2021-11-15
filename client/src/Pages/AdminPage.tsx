import React, { useEffect, useState, useContext } from 'react';
import { myContext } from './Context';
import axios from 'axios';

export default function AdminPage() {
  const ctx = useContext(myContext);
  const [data, setData] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<string>();
  useEffect(() => {
    axios
      .get('http://localhost:4000/getallusers', {
        withCredentials: true,
      })
      .then((res: any) => {
        setData(
          res.data.filter((item: any) => {
            return item.username !== ctx.username;
          })
        );
      });
  }, []);
  if (!data) {
    return null;
  }

  const deleteUser = () => {
    let userId: any;
    data.forEach((item: any) => {
      if (item.username === selectedUser) {
        userId = item._id;
      }
    });

    axios.post(
      'http://localhost:4000/deleteUser',
      { id: userId },
      { withCredentials: true }
    );
  };

  console.log('selected', selectedUser);
  return (
    <div>
      <h1>Admin Page</h1>
      <select
        onChange={(e) => setSelectedUser(e.target.value)}
        name="deleteUser"
        id="deleteUser"
      >
        <option id="selectAUser">Select A User</option>
        {data.map((item: any) => {
          return (
            <option key={item.username} id={item.username}>
              {item.username}
            </option>
          );
        })}
      </select>
      <button onClick={deleteUser}> Delete User</button>
    </div>
  );
}
