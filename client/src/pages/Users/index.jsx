import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import UsersList from '../../components/UsersList';
import { getUsers } from '../../api';

const UsersPage = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(response => {
      setUsers(response.data.data);
    })
  }, []);

  return (
    <>
    <Header />
    <section >
      <h1>Active users </h1>
      <button onClick={() => {
        const newUsers = [...users];
        setUsers(newUsers.reverse());
      }}>Change order</button>

      <UsersList users={users} />
    </section>
  </>
  );
}

export default UsersPage;
