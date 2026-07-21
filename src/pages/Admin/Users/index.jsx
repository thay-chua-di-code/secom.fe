import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  Store,
  ChevronLeft,
  ChevronRight,
  Eye,
  Check,
  X,
} from "lucide-react";

import { fetchAdminUsers } from "../../../redux/slice/admin/users/userThunk";
import { fetchAdminSellers } from "../../../redux/slice/admin/seller/thunk";

import SellerDetailModal from "../Seller/Detail";

import "./style.scss";

export default function UsersPage() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("users");
  const [search, setSearch] = useState("");
  const [sellerStatus, setSellerStatus] = useState("all");

  const [openDetail, setOpenDetail] = useState(false);
  const [sellerId, setSellerId] = useState(null);

  const usersState = useSelector((state) => state?.usersAdmin);

  const {
    users = [],
    loading: usersLoading,
    pageNumber,
    pageSize,
    totalPages,
  } = usersState;

  const sellersState = useSelector((state) => state?.sellersAdmin);

  const {
    sellers = [],
    loading: sellersLoading,
    pageNumber: sellerPageNumber,
    pageSize: sellerPageSize,
    totalPages: sellerTotalPages,
  } = sellersState;

  const loading = activeTab === "users" ? usersLoading : sellersLoading;

  useEffect(() => {
    dispatch(
      fetchAdminUsers({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === "sellers") {
      dispatch(fetchAdminSellers());
    }
  }, [activeTab, dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
  };

  const handleUserPageChange = (page) => {
    dispatch(
      fetchAdminUsers({
        pageNumber: page,
        pageSize,
      }),
    );
  };

  const pendingSellers = sellers.filter(
    (seller) => seller.statusText === "PendingApproval",
  ).length;

  const filteredSellers = sellers.filter((seller) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      seller.shopName?.toLowerCase().includes(keyword) ||
      seller.userFullName?.toLowerCase().includes(keyword) ||
      seller.userEmail?.toLowerCase().includes(keyword);

    const matchStatus =
      sellerStatus === "all" ||
      seller.statusText?.toLowerCase() === sellerStatus.toLowerCase();

    return matchSearch && matchStatus;
  });

  return (
    <div className="users-page">
      {/* PAGE HEADING */}
      <div className="users-page__heading">
        <div>
          <h1>User Management</h1>

          <p>Manage platform users, sellers and account permissions.</p>
        </div>

        <Link to="/admin/seller" className="users-page__seller-btn">
          <Store size={14} />
          Seller Applications
        </Link>
      </div>

      {/* MAIN CARD */}
      <div className="users-page__card">
        {/* TOOLBAR */}
        <div className="users-page__toolbar">
          <div className="users-page__tabs">
            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => handleTabChange("users")}
            >
              <Users size={14} />
              Users
              <b>{users.length}</b>
            </button>

            <button
              className={activeTab === "sellers" ? "active" : ""}
              onClick={() => handleTabChange("sellers")}
            >
              <Store size={14} />
              Sellers
              <b>{pendingSellers}</b>
            </button>
          </div>

          <div className="users-page__toolbar-actions">
            {activeTab === "sellers" && (
              <select
                value={sellerStatus}
                onChange={(e) => setSellerStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pendingapproval">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            )}

            <div className="users-page__search">
              <Search size={15} />

              <input
                type="text"
                placeholder={
                  activeTab === "users"
                    ? "Search users..."
                    : "Search sellers..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        {activeTab === "users" && (
          <div className="users-page__table-wrapper">
            <table className="users-page__table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {usersLoading ? (
                  <tr>
                    <td colSpan="6">
                      <div className="users-page__loading">
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">No users found.</div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">
                            {user.fullName?.charAt(0)}
                          </div>

                          <div>
                            <strong>{user.fullName}</strong>
                            <span>{user.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="user-email">{user.email}</span>
                      </td>

                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${
                            user.isActive ? "active" : "inactive"
                          }`}
                        >
                          <span />
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <span className="created-date">
                          {new Date(user.createdAtUtc).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </td>

                      <td>
                        <div className="user-actions">
                          <button className="action-btn edit">
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* SELLERS TABLE */}
        {activeTab === "sellers" && (
          <div className="users-page__table-wrapper">
            <table className="users-page__table sellers-table">
              <thead>
                <tr>
                  <th>Seller</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {sellersLoading ? (
                  <tr>
                    <td colSpan="5">
                      <div className="users-page__loading">
                        Loading sellers...
                      </div>
                    </td>
                  </tr>
                ) : filteredSellers.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        No seller applications found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSellers.map((seller) => (
                    <tr key={seller.id}>
                      <td>
                        <div className="user-info seller-info">
                          <img
                            src={
                              seller.verificationImageUrl ||
                              "https://i.pravatar.cc/100"
                            }
                            alt={seller.shopName}
                          />

                          <div>
                            <strong>{seller.shopName}</strong>
                            <span>{seller.userFullName}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="user-email">{seller.userEmail}</span>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${seller.statusText
                            ?.toLowerCase()
                            .replace("pendingapproval", "pending")}`}
                        >
                          <span />
                          {seller.statusText}
                        </span>
                      </td>

                      <td>
                        <span className="created-date">
                          {new Date(seller.submittedAtUtc).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </td>

                      <td>
                        <div className="user-actions">
                          <button
                            className="action-btn edit"
                            onClick={() => {
                              setSellerId(seller.id);
                              setOpenDetail(true);
                            }}
                          >
                            <Eye size={14} />
                          </button>

                          {seller.statusText === "PendingApproval" && (
                            <>
                              <button className="action-btn approve">
                                <Check size={14} />
                              </button>

                              <button className="action-btn delete">
                                <X size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="users-page__pagination">
          <span>
            Page <b>{activeTab === "users" ? pageNumber : sellerPageNumber}</b>{" "}
            of <b>{activeTab === "users" ? totalPages : sellerTotalPages}</b>
          </span>

          <div>
            <button
              disabled={
                activeTab === "users"
                  ? pageNumber === 1
                  : sellerPageNumber === 1
              }
              onClick={() => {
                if (activeTab === "users") {
                  handleUserPageChange(pageNumber - 1);
                }
              }}
            >
              <ChevronLeft size={14} />
            </button>

            <button
              disabled={
                activeTab === "users"
                  ? pageNumber === totalPages
                  : sellerPageNumber === sellerTotalPages
              }
              onClick={() => {
                if (activeTab === "users") {
                  handleUserPageChange(pageNumber + 1);
                }
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SELLER DETAIL MODAL */}
      <SellerDetailModal
        open={openDetail}
        sellerId={sellerId}
        onClose={() => {
          setOpenDetail(false);
          setSellerId(null);
        }}
      />
    </div>
  );
}
