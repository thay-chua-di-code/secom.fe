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

const USERS_PER_PAGE = 7;

export default function UsersPage() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("users");

  const [search, setSearch] = useState("");
  const [sellerStatus, setSellerStatus] = useState("all");

  const [userPage, setUserPage] = useState(1);

  const [openDetail, setOpenDetail] = useState(false);
  const [sellerId, setSellerId] = useState(null);

  const [accountAction, setAccountAction] = useState(null);

  // =====================================================
  // REDUX
  // =====================================================

  const usersState = useSelector((state) => state?.usersAdmin);

  const { users = [], loading: usersLoading } = usersState || {};

  const sellersState = useSelector((state) => state?.sellersAdmin);

  const { sellers = [], loading: sellersLoading } = sellersState || {};

  // =====================================================
  // USER LOCK STATUS
  // =====================================================

  const isUserLocked = (user) =>
    user?.isLocked ||
    user?.locked ||
    user?.status === "Locked" ||
    user?.isActive === false;

  // =====================================================
  // FETCH ALL USERS
  // =====================================================
  //
  // KHÔNG truyền pageNumber.
  // KHÔNG dùng pagination backend.
  //
  // Quan trọng:
  // fetchAdminUsers của bạn phải có khả năng request endpoint
  // lấy full data khi không truyền pageNumber/pageSize.
  //
  // =====================================================

  useEffect(() => {
    if (activeTab !== "users") return;

    dispatch(fetchAdminUsers({}));
  }, [activeTab, dispatch]);

  // =====================================================
  // FETCH SELLERS
  // =====================================================

  useEffect(() => {
    if (activeTab !== "sellers") return;

    dispatch(fetchAdminSellers());
  }, [activeTab, dispatch]);

  // =====================================================
  // TAB CHANGE
  // =====================================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setSearch("");
    setSellerStatus("all");

    setUserPage(1);
  };

  // =====================================================
  // FILTER USERS ON FE
  // =====================================================

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      const fullName = String(user?.fullName || "").toLowerCase();
      const email = String(user?.email || "").toLowerCase();
      const role = String(user?.role || "").toLowerCase();
      const id = String(user?.id || "").toLowerCase();

      return (
        fullName.includes(keyword) ||
        email.includes(keyword) ||
        role.includes(keyword) ||
        id.includes(keyword)
      );
    });
  }, [users, search]);

  // =====================================================
  // USER FE PAGINATION
  // =====================================================

  const userTotalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredUsers.length / USERS_PER_PAGE), 1);
  }, [filteredUsers.length]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (userPage - 1) * USERS_PER_PAGE;

    const endIndex = startIndex + USERS_PER_PAGE;

    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, userPage]);

  // =====================================================
  // RESET PAGE WHEN SEARCH
  // =====================================================

  useEffect(() => {
    setUserPage(1);
  }, [search]);

  // =====================================================
  // FIX PAGE IF DATA CHANGES
  // =====================================================
  //
  // Ví dụ:
  // đang page 3
  // sau search/filter chỉ còn 1 page
  // => tự về page 1
  //
  // =====================================================

  useEffect(() => {
    if (userPage > userTotalPages) {
      setUserPage(userTotalPages);
    }
  }, [userPage, userTotalPages]);

  // =====================================================
  // USER PAGINATION ACTIONS
  // =====================================================

  const handleUserPrevPage = () => {
    setUserPage((prev) => Math.max(prev - 1, 1));
  };

  const handleUserNextPage = () => {
    setUserPage((prev) => Math.min(prev + 1, userTotalPages));
  };

  // =====================================================
  // LOCK / UNLOCK
  // =====================================================

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

      // Refresh lại TOÀN BỘ users.
      // Không truyền page.
      await dispatch(fetchAdminUsers({}));
    } catch (error) {
      toast.error(error || "Update user account status failed");
    }
  };

  // =====================================================
  // SELLER FILTER
  // =====================================================

  const filteredSellers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return sellers.filter((seller) => {
      const matchSearch =
        !keyword ||
        seller.shopName?.toLowerCase().includes(keyword) ||
        seller.userFullName?.toLowerCase().includes(keyword) ||
        seller.userEmail?.toLowerCase().includes(keyword);

      const matchStatus =
        sellerStatus === "all" ||
        seller.statusText?.toLowerCase() === sellerStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [sellers, search, sellerStatus]);

  // =====================================================
  // SELLER PAGINATION FE
  // =====================================================
  //
  // Mình handle luôn seller phía FE để cùng một cơ chế.
  //
  // =====================================================

  const sellerTotalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredSellers.length / USERS_PER_PAGE), 1);
  }, [filteredSellers.length]);

  const [sellerPage, setSellerPage] = useState(1);

  const paginatedSellers = useMemo(() => {
    const startIndex = (sellerPage - 1) * USERS_PER_PAGE;

    return filteredSellers.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [filteredSellers, sellerPage]);

  useEffect(() => {
    setSellerPage(1);
  }, [sellerStatus, search]);

  useEffect(() => {
    if (sellerPage > sellerTotalPages) {
      setSellerPage(sellerTotalPages);
    }
  }, [sellerPage, sellerTotalPages]);

  // =====================================================
  // PENDING SELLERS
  // =====================================================

  const pendingSellers = useMemo(() => {
    return sellers.filter((seller) => seller.statusText === "PendingApproval")
      .length;
  }, [sellers]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="users-page">
      <div className="users-page__card">
        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="users-page__toolbar">
          <div className="users-page__tabs">
            <button
              type="button"
              className={activeTab === "users" ? "active" : ""}
              onClick={() => handleTabChange("users")}
            >
              <Users size={14} />

              <span>Users</span>

              <b>{users.length}</b>
            </button>

            <button
              type="button"
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

        {/* =================================================
            USERS TABLE
        ================================================= */}

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
                  {paginatedUsers.length === 0 ? (
                    <tr className="users-page__empty-row">
                      <td colSpan={6}>
                        <div className="empty-state">No users found.</div>
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr key={user.id}>
                        {/* USER */}

                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {user.fullName?.charAt(0)?.toUpperCase() || "U"}
                            </div>

                            <div>
                              <strong>{user.fullName || "Unknown"}</strong>

                              <span title={user.id}>{user.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* EMAIL */}

                        <td>
                          <span className="user-email" title={user.email}>
                            {user.email}
                          </span>
                        </td>

                        {/* ROLE */}

                        <td>
                          <span className="role-badge">{user.role}</span>
                        </td>

                        {/* STATUS */}

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

                        {/* CREATED */}

                        <td>
                          <span className="created-date">
                            {user.createdAtUtc
                              ? new Date(user.createdAtUtc).toLocaleDateString(
                                  "en-US",
                                )
                              : "--"}
                          </span>
                        </td>

                        {/* ACTION */}

                        <td>
                          <div className="user-actions">
                            <button
                              type="button"
                              className={`action-btn ${
                                isUserLocked(user) ? "approve" : "delete"
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

        {/* =================================================
            SELLER TABLE
        ================================================= */}

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
                  {paginatedSellers.length === 0 ? (
                    <tr className="users-page__empty-row">
                      <td colSpan={5}>
                        <div className="empty-state">
                          No seller applications found.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedSellers.map((seller) => (
                      <tr key={seller.id}>
                        <td>
                          <div className="user-info seller-info">
                            <img
                              src={
                                seller.verificationImageUrl ||
                                "https://i.pravatar.cc/100"
                              }
                              alt={seller.shopName || "Seller"}
                            />

                            <div>
                              <strong>{seller.shopName}</strong>

                              <span>{seller.userFullName}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="user-email" title={seller.userEmail}>
                            {seller.userEmail}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              seller.statusText
                                ?.toLowerCase()
                                .replace("pendingapproval", "pending") || ""
                            }`}
                          >
                            <span />

                            {seller.statusText}
                          </span>
                        </td>

                        <td>
                          <span className="created-date">
                            {seller.submittedAtUtc
                              ? new Date(
                                  seller.submittedAtUtc,
                                ).toLocaleDateString("en-US")
                              : "--"}
                          </span>
                        </td>

                        <td>
                          <div className="user-actions">
                            <button
                              type="button"
                              className="action-btn edit"
                              onClick={() => {
                                setSellerId(seller.id);
                                setOpenDetail(true);
                              }}
                            >
                              <Eye size={14} />
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

        {/* =================================================
            FE PAGINATION
        ================================================= */}

        <div className="users-page__pagination">
          <span>
            Page <b>{activeTab === "users" ? userPage : sellerPage}</b> of{" "}
            <b>{activeTab === "users" ? userTotalPages : sellerTotalPages}</b>
          </span>

          <div>
            <button
              type="button"
              disabled={activeTab === "users" ? userPage <= 1 : sellerPage <= 1}
              onClick={() => {
                if (activeTab === "users") {
                  handleUserPrevPage();
                } else {
                  setSellerPage((prev) => Math.max(prev - 1, 1));
                }
              }}
            >
              <ChevronLeft size={14} />
            </button>

            <button
              type="button"
              disabled={
                activeTab === "users"
                  ? userPage >= userTotalPages
                  : sellerPage >= sellerTotalPages
              }
              onClick={() => {
                if (activeTab === "users") {
                  handleUserNextPage();
                } else {
                  setSellerPage((prev) => Math.min(prev + 1, sellerTotalPages));
                }
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          SELLER DETAIL
      ================================================= */}

      <SellerDetailModal
        open={openDetail}
        sellerId={sellerId}
        onClose={() => {
          setOpenDetail(false);
          setSellerId(null);
        }}
      />

      {/* =================================================
          LOCK / UNLOCK
      ================================================= */}

      {accountAction && (
        <div className="users-page__modal-backdrop">
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
