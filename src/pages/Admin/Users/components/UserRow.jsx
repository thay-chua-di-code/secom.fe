import { adminService } from "../../../../service/adminService";
import toast from "react-hot-toast";
export default function UserRow({ user }) {
  const handleBanUser = async () => {
    try {
      const result = user.isActive
        ? await adminService.banUser(user.id)
        : await adminService.unBanUser(user.id);

      if (result?.data?.success) {
        toast.success("User status updated successfully");
      } else {
        toast.error(result?.data?.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
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
        {/* <button>Edit</button> */}
        <button className="danger" onClick={handleBanUser}>
          {user.isActive ? "Ban" : "Unban"}
        </button>
      </td>
    </tr>
  );
}
