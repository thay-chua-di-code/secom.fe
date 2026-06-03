import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../../../redux/slice/admin/users/userThunk";
import UserToolbar from "./components/UserToolbar";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";

import "./style.scss";

export default function UsersPage() {
  const dispatch = useDispatch();

  const { users, loading, pageNumber, pageSize, totalPages } = useSelector(
    (state) => state?.usersAdmin,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminUsers({ pageNumber: 1, pageSize: 10 }));
  }, []);

  const handlePageChange = (page) => {
    dispatch(fetchAdminUsers({ pageNumber: page, pageSize }));
  };

  return (
    <div className="users-page">
      {/* HEADER */}
      <div className="users-page__header">
        <h1>User Management</h1>
        <span className="badge">Admin</span>
      </div>

      {/* TOOLBAR */}
      <UserToolbar search={search} setSearch={setSearch} />

      {/* TABLE */}
      <div className="users-page__table">
        <UserTable users={users} loading={loading} />
      </div>

      {/* PAGINATION */}
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
}
