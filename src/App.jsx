import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Users } from './components/Users.jsx';
import { getUsers } from './repositories/users.js';

export function App() {
  const [isColored, setIsColored] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [users, setUsers] = useState(/** @param {any[]}  */ []);
  const [search, setSearch] = useState('');
  const originalUsers = useRef(/** @param {any[]}  */ []);

  useEffect(() => {
    getUsers().then((d) => {
      setUsers(d);
      originalUsers.current = d;
    });
  }, []);

  const resetUsers = () => {
    setUsers(originalUsers.current);
  };

  const deleteUser = (id) => {
    const newUsers = users.filter((user) => user.login.uuid !== id);

    setUsers(newUsers);
  };

  const changeFilter = (filter) => {
    setActiveFilter((prevState) => {
      if (prevState === filter) {
        return '';
      }

      return filter;
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.location.country
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    );
  }, [search, users]);

  const sortedUsers = useMemo(() => {
    const newUsers = [...filteredUsers];

    if (activeFilter === 'country') {
      newUsers.sort((a, b) =>
        a.location.country.localeCompare(b.location.country),
      );

      return newUsers;
    }

    if (activeFilter === 'firstname') {
      newUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));

      return newUsers;
    }

    if (activeFilter === 'lastname') {
      newUsers.sort((a, b) => a.name.last.localeCompare(b.name.last));

      return newUsers;
    }

    return filteredUsers;
  }, [activeFilter, filteredUsers]);

  const searchByCountry = (partialCountry) => {
    setSearch(partialCountry);
  };

  const toggleColor = () => {
    setIsColored(!isColored);
  };
  return (
    <>
      <Header
        toggleColor={toggleColor}
        changeFilter={changeFilter}
        reset={resetUsers}
        searchByCountry={searchByCountry}
      />
      <main>
        <Users
          users={sortedUsers}
          deleteOne={deleteUser}
          isColored={isColored}
          changeFilter={changeFilter}
        />
      </main>
    </>
  );
}
