export function Users({ users, isColored, deleteOne, changeFilter }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-center" colSpan={1}>
            Image
          </th>
          <th className="text-center" colSpan={2}>
            <button onClick={() => changeFilter('firstname')}>Name</button>
          </th>
          <th className="text-center" colSpan={2}>
            <button onClick={() => changeFilter('lastname')}>Last name</button>
          </th>
          <th className="text-center" colSpan={3}>
            <button onClick={() => changeFilter('country')}>Country</button>
          </th>
          <th className="text-center" colSpan={2}>
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => {
          return (
            <tr
              key={user.login.uuid}
              className={
                isColored
                  ? '[&:nth-child(2n-1)]:bg-gray-300 [&:nth-child(2n)]:bg-gray-200/80'
                  : ''
              }
            >
              <td className="text-center border-2 border-white" colSpan={1}>
                <img
                  className="rounded-sm mx-auto"
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                />
              </td>
              <td className="text-center border-2 border-white" colSpan={2}>
                {user.name.first}
              </td>
              <td className="text-center border-2 border-white" colSpan={2}>
                {user.name.last}
              </td>
              <td className="text-center border-2 border-white" colSpan={3}>
                {user.location.country}
              </td>
              <td className="text-center border-2 border-white" colSpan={2}>
                <button
                  className="rounded bg-gray-800 text-gray-200 py-2 px-4"
                  onClick={() => deleteOne(user.login.uuid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
