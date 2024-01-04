import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Header } from './components/Header.jsx';
import { Users } from './components/Users.jsx';
import { TransitionContext } from './context/index.jsx';
import { getUsers } from './repositories/users.js';

export function App() {
  const [isColored, setIsColored] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [users, setUsers] = useState(/** @param {any[]}  */ []);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const originalUsers = useRef(/** @param {any[]}  */ []);
  const { transitionState, setTransitionState } = useContext(TransitionContext);

  useEffect(() => {
    setTransitionState((prev) => ({ ...prev, isLoading: true }));
    getUsers(page).then((data) => {
      const finalUsers = users.concat(data);
      setUsers(finalUsers);
      originalUsers.current = finalUsers;
      setTransitionState((prev) => ({
        ...prev,
        isLoading: false,
        loaded: true,
      }));
    });
  }, [page]);

  const resetUsers = () => {
    setActiveFilter('');
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

  const getMoreResults = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      <Header
        toggleColor={toggleColor}
        changeFilter={changeFilter}
        reset={resetUsers}
        searchByCountry={searchByCountry}
      />
      <main className="flex flex-col justify-center gap-y-6">
        <Users
          users={sortedUsers}
          deleteOne={deleteUser}
          isColored={isColored}
          changeFilter={changeFilter}
        />

        {transitionState.isLoading && <p> Loading ...</p>}

        <button
          className="rounded bg-gray-700 text-gray-100 py-3 px-6 mx-auto my-6"
          disabled={transitionState.isLoading}
          onClick={getMoreResults}
        >
          Load more ...
        </button>
      </main>
    </>
  );
}
