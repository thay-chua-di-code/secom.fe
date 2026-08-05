import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import toast from "react-hot-toast";

import {
  banUser,
  fetchAdminUsers,
  unBanUser,
} from "../../../redux/slice/admin/users/userThunk";
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
  const [accountAction, setAccountAction] = useState(null);

  const usersState = useSelector((state) => state?.usersAdmin);

  const {
    users = [],
    loading: usersLoading,
    pageNumber = 1,
    pageSize = 10,
    totalPages = 1,
  } = usersState;

  const sellersState = useSelector((state) => state?.sellersAdmin);

  const {
    sellers = [],
    loading: sellersLoading,
    pageNumber: sellerPageNumber = 1,
    totalPages: sellerTotalPages = 1,
  } = sellersState;

  const isUserLocked = (user) =>
    user.isLocked ||
    user.locked ||
    user.status === "Locked" ||
    user.isActive === false;

  const handleAccountStatus = async () => {
    if (!accountAction?.user?.id) return;

    try {
      if (accountAction.type === "lock") {
        await dispatch(banUser(accountAction.user.id)).unwrap();
        toast.success("User account locked");
      } else {
        await dispatch(unBanUser(accountAction.user.id)).unwrap();
        toast.success("User account unlocked");
      }

      setAccountAction(null);
      dispatch(fetchAdminUsers({ pageNumber, pageSize }));
    } catch (error) {
      toast.error(error || "Update user account status failed");
    }
  };

  // ============================================
  // FETCH USERS
  // ============================================

  // useEffect(() => {
  //   dispatch(
  //     fetchAdminUsers({
  //       pageNumber: 1,
  //       pageSize: 10,
  //     }),
  //   );
  // }, [dispatch]);

  // ============================================
  // FETCH SELLERS
  // ============================================

  useEffect(() => {
    if (activeTab === "sellers") {
      dispatch(fetchAdminSellers());
    }
  }, [activeTab, dispatch]);

  // ============================================
  // TAB CHANGE
  // ============================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
    setSellerStatus("all");
  };

  // ============================================
  // USER PAGINATION
  // ============================================

  const handleUserPageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    dispatch(
      fetchAdminUsers({
        pageNumber: page,
        pageSize,
      }),
    );
  };

  // ============================================
  // SELLER FILTER
  // ============================================

  const filteredSellers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return sellers.filter((seller) => {
      const matchSearch =
        seller.shopName?.toLowerCase().includes(keyword) ||
        seller.userFullName?.toLowerCase().includes(keyword) ||
        seller.userEmail?.toLowerCase().includes(keyword);

      const matchStatus =
        sellerStatus === "all" ||
        seller.statusText?.toLowerCase() === sellerStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [sellers, search, sellerStatus]);

  const pendingSellers = useMemo(() => {
    return sellers.filter((seller) => seller.statusText === "PendingApproval")
      .length;
  }, [sellers]);

  return (
    <div className="users-page">
      <div className="users-page__card">
        <div className="users-page__toolbar">
          <div className="users-page__tabs">
            <button
              className={activeTab === "users" ? "active" : ""}
              onClick={() => handleTabChange("users")}
            >
              <Users size={14} />

              <span>Users</span>

              <b>{users.length}</b>
            </button>

            <button
              className={activeTab === "sellers" ? "active" : ""}
              onClick={() => handleTabChange("sellers")}
            >
              <Store size={14} />

              <span>Sellers request</span>

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

        {activeTab === "users" && (
          <div className="users-page__table-wrapper">
            {usersLoading ? (
              <div className="users-page__loading">Loading users...</div>
            ) : (
              <table className="users-page__table">
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>STATUS</th>
                    <th>CREATED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length === 0 ? (
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
                              {user.fullName?.charAt(0)?.toUpperCase()}
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
                              isUserLocked(user) ? "inactive" : "active"
                            }`}
                          >
                            <span />

                            {isUserLocked(user) ? "Locked" : "Active"}
                          </span>
                        </td>

                        <td>
                          <span className="created-date">
                            {new Date(user.createdAtUtc).toLocaleDateString(
                              "en-US",
                            )}
                          </span>
                        </td>

                        <td>
                          <div className="user-actions">
                            <button className="action-btn edit">
                              <Eye size={14} />
                            </button>
                            <button
                              type="button"
                              className={`action-btn ${
                                isUserLocked(user) ? "approve" : "reject"
                              }`}
                              disabled={usersLoading}
                              onClick={() =>
                                setAccountAction({
                                  type: isUserLocked(user) ? "unlock" : "lock",
                                  user,
                                })
                              }
                              title={
                                isUserLocked(user) ? "Unlock user" : "Lock user"
                              }
                            >
                              {isUserLocked(user) ? (
                                <Check size={14} />
                              ) : (
                                <X size={14} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ============================================
            SELLERS TABLE
        ============================================ */}

        {activeTab === "sellers" && (
          <div className="users-page__table-wrapper">
            {sellersLoading ? (
              <div className="users-page__loading">Loading sellers...</div>
            ) : (
              <table className="users-page__table sellers-table">
                <thead>
                  <tr>
                    <th>SELLER</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th>APPLIED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSellers.length === 0 ? (
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
                              "en-US",
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

                            {/* {seller.statusText === "PendingApproval" && (
                              <>
                                <button className="action-btn approve">
                                  <Check size={14} />
                                </button>

                                <button className="action-btn delete">
                                  <X size={14} />
                                </button>
                              </>
                            )} */}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ============================================
            PAGINATION
        ============================================ */}

        <div className="users-page__pagination">
          <span>
            Page <b>{activeTab === "users" ? pageNumber : sellerPageNumber}</b>{" "}
            of <b>{activeTab === "users" ? totalPages : sellerTotalPages}</b>
          </span>

          <div>
            <button
              disabled={
                activeTab === "users" ? pageNumber <= 1 : sellerPageNumber <= 1
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
                  ? pageNumber >= totalPages
                  : sellerPageNumber >= sellerTotalPages
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

      {/* ============================================
          SELLER DETAIL MODAL
      ============================================ */}

      <SellerDetailModal
        open={openDetail}
        sellerId={sellerId}
        onClose={() => {
          setOpenDetail(false);
          setSellerId(null);
        }}
      />

      {accountAction && (
        <div className="users-page__modal-backdrop" role="presentation">
          <div className="users-page__confirm" role="dialog" aria-modal="true">
            <h3>
              {accountAction.type === "lock" ? "Lock user?" : "Unlock user?"}
            </h3>
            <p>
              {accountAction.type === "lock"
                ? "This user will not be able to access protected features."
                : "This user will regain access according to their role."}
            </p>
            <strong>{accountAction.user.email}</strong>
            <div className="users-page__modal-actions">
              <button
                type="button"
                disabled={usersLoading}
                onClick={() => setAccountAction(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={usersLoading}
                onClick={handleAccountStatus}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
