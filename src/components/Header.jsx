export function Header({ toggleColor, changeFilter, reset, searchByCountry }) {
  const searchBy = (e) => {
    const { value } = e.target;
    searchByCountry(value);
  };

  return (
    <header>
      <h1 className="text-xl text-center font-semibold mb-6">Users List</h1>

      <nav className="w-full text-center">
        <ul className="flex gap-x-6 py-2 mb-6 items-center justify-center w-full">
          <li>
            <button
              className="rounded py-3 px-6 bg-blue-200"
              onClick={toggleColor}
            >
              colors
            </button>
          </li>
          <li>
            <button
              className="rounded py-3 px-6 bg-blue-200"
              onClick={() => changeFilter('country')}
            >
              country sort
            </button>
          </li>
          <li>
            <button className="rounded py-3 px-6 bg-blue-200" onClick={reset}>
              Reset
            </button>
          </li>
          <li>
            <input
              onChange={searchBy}
              className="rounded py-3 px-6 border border-blue-200"
              type="text"
              name="search"
              id="search"
              placeholder="search..."
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
