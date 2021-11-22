import React, { useEffect, useState, useContext } from 'react';
import { myContext } from './Context';
import axios, { AxiosResponse } from 'axios';
import { UserInterface } from '../Interfaces/Interfaces';

export default function AdminPage() {
  const ctx = useContext(myContext);
  const [data, setData] = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  useEffect(() => {
    axios
      .get('http://localhost:4000/getallusers', {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        setData(
          res.data.filter((item: UserInterface) => {
            return item.username !== ctx.username;
          })
        );
      });
  }, [ctx]);
  if (!data) {
    return null;
  }

  const deleteUser = () => {
    let userId: string;
    data.forEach((item: UserInterface) => {
      if (item.username === selectedUser) {
        userId = item.id;
      }
    });

    axios.post(
      'http://localhost:4000/deleteUser',
      { id: userId! },
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
        {data.map((item: UserInterface) => {
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
