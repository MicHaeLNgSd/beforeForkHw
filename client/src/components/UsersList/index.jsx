import React, { useState } from 'react';

const UsersList = ({ users }) => {
  const usersItems = users.map((user) => (
    <UserItem key={user.id} user={user} />
  ));

  return <div>{usersItems}</div>;
};

function UserItem({ user }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article
      style={{
        border: '5px solid',
        borderColor: isFavorite ? 'green' : 'black',
      }}
    >
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        Toggle Favorite
      </button>
    </article>
  );
}

export default UsersList;
