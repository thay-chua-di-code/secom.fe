import UserRow from "./UserRow";


export default function UserTable({ users, loading }) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="loading">
              Loading...
            </td>
          </tr>
        ) : (
          users.map((u) => <UserRow key={u.id} user={u} />)
        )}
      </tbody>
    </table>
  );
}
