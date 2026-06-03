export default function UserRow({ user }) {
  return (
    <tr className="user-row">
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>

      <td>
        <span className="role">{user.role}</span>
      </td>

      <td>
        <span className={`status ${user.isActive ? "active" : "block"}`}>
          {user.isActive ? "Active" : "Blocked"}
        </span>
      </td>

      <td className="actions">
        <button>Edit</button>
        <button className="danger">Ban</button>
      </td>
    </tr>
  );
}
