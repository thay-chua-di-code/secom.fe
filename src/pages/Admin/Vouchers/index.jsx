import { useEffect, useMemo, useState } from "react";
import {
  Search,
  TicketPercent,
  CalendarDays,
  CircleDollarSign,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Percent,
  Users,
  Check,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import { formatCurrencyVN } from "../../../utils/fncUtils";

import {
  formatVoucherDiscountValue,
  getVoucherDiscountTypeLabel,
} from "../../../utils/voucherUtils";

import { useDispatch, useSelector } from "react-redux";

import {
  approveAdminVoucher,
  fetchAdminVouchers,
  rejectAdminVoucher,
} from "../../../redux/slice/admin/vouchers/voucherThunk";

import "./style.scss";

// =====================================================
// CONSTANT
// =====================================================

const VOUCHERS_PER_PAGE = 7;

// =====================================================
// HELPERS
// =====================================================

const isVoucherActive = (voucher) =>
  voucher?.isActive ?? voucher?.active ?? false;

const getVoucherStatus = (voucher) =>
  String(voucher?.approvalStatus || voucher?.status || "pending").toLowerCase();

const canModerateVoucher = (voucher) => getVoucherStatus(voucher) === "pending";

const getVoucherId = (voucher) => voucher?.id ?? voucher?.voucherId;

// =====================================================
// COMPONENT
// =====================================================

const VoucherAdmin = () => {
  const dispatch = useDispatch();

  // ===================================================
  // REDUX
  // ===================================================

  const { vouchers, loading, moderating } = useSelector(
    (state) => state.vouchersAdmin,
  );

  // ===================================================
  // NORMALIZE VOUCHERS
  // ===================================================

  const voucherItems = useMemo(() => {
    if (Array.isArray(vouchers)) {
      return vouchers;
    }

    if (Array.isArray(vouchers?.items)) {
      return vouchers.items;
    }

    return [];
  }, [vouchers]);

  // ===================================================
  // LOCAL STATE
  // ===================================================

  const [keyword, setKeyword] = useState("");

  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [activeTab, setActiveTab] = useState("all");

  // FE pagination
  const [page, setPage] = useState(1);

  const [approveTarget, setApproveTarget] = useState(null);

  const [rejectTarget, setRejectTarget] = useState(null);

  const [rejectReason, setRejectReason] = useState("");

  // ===================================================
  // SEARCH DEBOUNCE
  // ===================================================

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  // ===================================================
  // FETCH ALL VOUCHERS
  // ===================================================
  //
  // Không truyền page/pageSize.
  // Pagination xử lý ở FE.
  // ===================================================

  useEffect(() => {
    dispatch(fetchAdminVouchers({}));
  }, [dispatch]);

  // ===================================================
  // ACTIVE / INACTIVE COUNT
  // ===================================================

  const activeCount = useMemo(() => {
    return voucherItems.filter((voucher) => isVoucherActive(voucher)).length;
  }, [voucherItems]);

  const inactiveCount = useMemo(() => {
    return voucherItems.filter((voucher) => !isVoucherActive(voucher)).length;
  }, [voucherItems]);

  // ===================================================
  // FILTER VOUCHERS - FE
  // ===================================================

  const filteredVouchers = useMemo(() => {
    const keywordValue = debouncedKeyword.toLowerCase().trim();

    return voucherItems.filter((voucher) => {
      const code = String(voucher?.code || "").toLowerCase();

      const discountType = String(
        getVoucherDiscountTypeLabel(voucher?.discountType) || "",
      ).toLowerCase();

      const approvalStatus = getVoucherStatus(voucher);

      const matchKeyword =
        !keywordValue ||
        code.includes(keywordValue) ||
        discountType.includes(keywordValue) ||
        approvalStatus.includes(keywordValue);

      const matchTab =
        activeTab === "all" ||
        (activeTab === "active" && isVoucherActive(voucher)) ||
        (activeTab === "inactive" && !isVoucherActive(voucher));

      return matchKeyword && matchTab;
    });
  }, [voucherItems, debouncedKeyword, activeTab]);

  // ===================================================
  // FE TOTAL PAGES
  // ===================================================

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE), 1);
  }, [filteredVouchers.length]);

  // ===================================================
  // CURRENT PAGE DATA
  // ===================================================

  const paginatedVouchers = useMemo(() => {
    const startIndex = (page - 1) * VOUCHERS_PER_PAGE;

    const endIndex = startIndex + VOUCHERS_PER_PAGE;

    return filteredVouchers.slice(startIndex, endIndex);
  }, [filteredVouchers, page]);

  // ===================================================
  // RESET PAGE WHEN FILTER CHANGES
  // ===================================================

  useEffect(() => {
    setPage(1);
  }, [debouncedKeyword, activeTab]);

  // ===================================================
  // PAGE SAFETY
  // ===================================================

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ===================================================
  // DATE
  // ===================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-US");
  };

  // ===================================================
  // TAB CHANGE
  // ===================================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    setPage(1);
  };

  // ===================================================
  // PREVIOUS PAGE
  // ===================================================

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // ===================================================
  // NEXT PAGE
  // ===================================================

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // ===================================================
  // REFRESH
  // ===================================================

  const refreshVouchers = async () => {
    await dispatch(fetchAdminVouchers({}));
  };

  // ===================================================
  // APPROVE
  // ===================================================

  const handleApproveVoucher = async () => {
    const voucherId = getVoucherId(approveTarget);

    if (!voucherId) {
      toast.error("Voucher id is missing");

      return;
    }

    const result = await dispatch(approveAdminVoucher(voucherId));

    if (approveAdminVoucher.fulfilled.match(result)) {
      toast.success("Voucher approved successfully");

      setApproveTarget(null);

      await refreshVouchers();

      return;
    }

    toast.error(result.payload || "Approve voucher failed");
  };

  // ===================================================
  // REJECT
  // ===================================================

  const handleRejectVoucher = async (event) => {
    event.preventDefault();

    const voucherId = getVoucherId(rejectTarget);

    const reason = rejectReason.trim();

    if (!voucherId) {
      toast.error("Voucher id is missing");

      return;
    }

    if (!reason) {
      toast.error("Reject reason is required");

      return;
    }

    const result = await dispatch(
      rejectAdminVoucher({
        voucherId,
        reason,
      }),
    );

    if (rejectAdminVoucher.fulfilled.match(result)) {
      toast.success("Voucher rejected successfully");

      setRejectTarget(null);

      setRejectReason("");

      await refreshVouchers();

      return;
    }

    toast.error(result.payload || "Reject voucher failed");
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="voucher-admin">
      <div className="voucher-admin__card">
        {/* =============================================
            TOOLBAR
        ============================================= */}

        <div className="voucher-admin__toolbar">
          {/* TABS */}

          <div className="voucher-admin__tabs">
            {/* ALL */}

            <button
              type="button"
              className={activeTab === "all" ? "active" : ""}
              onClick={() => handleTabChange("all")}
            >
              <TicketPercent size={14} />

              <span>All Vouchers</span>

              <b>{voucherItems.length}</b>
            </button>

            {/* ACTIVE */}

            <button
              type="button"
              className={activeTab === "active" ? "active" : ""}
              onClick={() => handleTabChange("active")}
            >
              <BadgeCheck size={14} />

              <span>Active</span>

              <b>{activeCount}</b>
            </button>

            {/* INACTIVE */}

            <button
              type="button"
              className={activeTab === "inactive" ? "active" : ""}
              onClick={() => handleTabChange("inactive")}
            >
              <Percent size={14} />

              <span>Inactive</span>

              <b>{inactiveCount}</b>
            </button>
          </div>

          {/* SEARCH */}

          <div className="voucher-admin__search">
            <Search size={15} />

            <input
              type="text"
              placeholder="Search voucher..."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
        </div>

        {/* =============================================
            TABLE WRAPPER
        ============================================= */}

        <div className="voucher-admin__table-wrapper">
          <table className="voucher-admin__table">
            {/* =========================================
                TABLE HEADER
            ========================================= */}

            <thead>
              <tr>
                <th>CODE</th>
                <th>TYPE</th>
                <th>DISCOUNT</th>
                <th>MIN ORDER</th>
                <th>USAGE</th>
                <th>EXPIRES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            {/* =========================================
                TABLE BODY
            ========================================= */}

            <tbody>
              {loading ? (
                <tr className="voucher-admin__empty-row">
                  <td colSpan={8}>
                    <div className="voucher-admin__loading">
                      Loading vouchers...
                    </div>
                  </td>
                </tr>
              ) : paginatedVouchers.length === 0 ? (
                <tr className="voucher-admin__empty-row">
                  <td colSpan={8}>
                    <div className="voucher-admin__empty">
                      <TicketPercent size={28} />

                      <span>No vouchers found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedVouchers.map((voucher) => {
                  const voucherStatus = getVoucherStatus(voucher);

                  return (
                    <tr key={voucher.id ?? voucher.voucherId}>
                      {/* ===============================
                            VOUCHER
                        =============================== */}

                      <td>
                        <div className="voucher-info">
                          <div className="voucher-icon">
                            <TicketPercent size={16} />
                          </div>

                          <div className="voucher-info__content">
                            <strong title={voucher.code}>{voucher.code}</strong>

                            <span>Discount voucher</span>
                          </div>
                        </div>
                      </td>

                      {/* ===============================
                            TYPE
                        =============================== */}

                      <td>
                        <div className="discount-info">
                          <CircleDollarSign size={14} />

                          <strong>
                            {getVoucherDiscountTypeLabel(voucher.discountType)}
                          </strong>
                        </div>
                      </td>

                      {/* ===============================
                            DISCOUNT
                        =============================== */}

                      <td>
                        <div className="discount-info">
                          <CircleDollarSign size={14} />

                          <strong>{formatVoucherDiscountValue(voucher)}</strong>
                        </div>
                      </td>

                      {/* ===============================
                            MIN ORDER
                        =============================== */}

                      <td>
                        <div className="discount-info">
                          <CircleDollarSign size={14} />

                          <strong>
                            {formatCurrencyVN(voucher.minOrderAmount)}
                          </strong>
                        </div>
                      </td>

                      {/* ===============================
                            USAGE
                        =============================== */}

                      <td>
                        <div className="usage-info">
                          <div className="usage-number">
                            <Users size={13} />

                            <span>
                              {voucher.usedQuantity ?? 0} /{" "}
                              {voucher.quantity ?? 0}
                            </span>
                          </div>

                          <div className="usage-progress">
                            <span
                              style={{
                                width: `${
                                  voucher.quantity
                                    ? Math.min(
                                        ((voucher.usedQuantity || 0) /
                                          voucher.quantity) *
                                          100,
                                        100,
                                      )
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* ===============================
                            DATE
                        =============================== */}

                      <td>
                        <div className="date-info">
                          <div>
                            <CalendarDays size={13} />

                            <span>{formatDate(voucher.createdAtUtc)}</span>
                          </div>

                          <small>to</small>

                          <div>
                            <CalendarDays size={13} />

                            <span>{formatDate(voucher.expiresAtUtc)}</span>
                          </div>
                        </div>
                      </td>

                      {/* ===============================
                            STATUS
                        =============================== */}

                      <td>
                        <span className={`status-badge ${voucherStatus}`}>
                          <span />

                          {voucherStatus.charAt(0).toUpperCase() +
                            voucherStatus.slice(1)}
                        </span>
                      </td>

                      {/* ===============================
                            ACTION
                        =============================== */}

                      <td>
                        <div className="voucher-admin__actions">
                          {canModerateVoucher(voucher) ? (
                            <>
                              {/* APPROVE */}

                              <button
                                type="button"
                                className="action-btn approve"
                                disabled={moderating}
                                onClick={() => setApproveTarget(voucher)}
                                aria-label={`Approve voucher ${voucher.code}`}
                                title="Approve voucher"
                              >
                                <Check size={14} />
                              </button>

                              {/* REJECT */}

                              <button
                                type="button"
                                className="action-btn reject"
                                disabled={moderating}
                                onClick={() => setRejectTarget(voucher)}
                                aria-label={`Reject voucher ${voucher.code}`}
                                title="Reject voucher"
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <span className="voucher-admin__no-action">
                              Reviewed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* =============================================
            FE PAGINATION
        ============================================= */}

        <div className="voucher-admin__pagination">
          {/* PAGE INFO */}

          <div className="voucher-admin__pagination-info">
            <span>
              Page <b>{page}</b> of <b>{totalPages}</b>
            </span>

            <small>
              Showing <b>{paginatedVouchers.length}</b> of{" "}
              <b>{filteredVouchers.length}</b> vouchers
            </small>
          </div>

          {/* BUTTONS */}

          <div className="voucher-admin__pagination-buttons">
            {/* PREVIOUS */}

            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={handlePreviousPage}
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {/* CURRENT */}

            <button type="button" className="active" disabled>
              {page}
            </button>

            {/* NEXT */}

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={handleNextPage}
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ===============================================
          APPROVE MODAL
      =============================================== */}

      {approveTarget && (
        <div className="voucher-admin__modal-backdrop" role="presentation">
          <div
            className="voucher-admin__confirm"
            role="dialog"
            aria-modal="true"
          >
            <h3>Approve voucher?</h3>

            <p>
              Voucher: <strong>{approveTarget.code}</strong>
            </p>

            <div className="voucher-admin__modal-actions">
              <button
                type="button"
                className="voucher-admin__modal-btn"
                disabled={moderating}
                onClick={() => setApproveTarget(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="voucher-admin__modal-btn voucher-admin__modal-btn--primary"
                disabled={moderating}
                onClick={handleApproveVoucher}
              >
                {moderating ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===============================================
          REJECT MODAL
      =============================================== */}

      {rejectTarget && (
        <div className="voucher-admin__modal-backdrop" role="presentation">
          <form
            className="voucher-admin__confirm"
            role="dialog"
            aria-modal="true"
            onSubmit={handleRejectVoucher}
          >
            <h3>Reject voucher</h3>

            <p>
              Voucher: <strong>{rejectTarget.code}</strong>
            </p>

            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Enter rejection reason"
              rows={4}
              maxLength={500}
              required
            />

            <div className="voucher-admin__modal-actions">
              <button
                type="button"
                className="voucher-admin__modal-btn"
                disabled={moderating}
                onClick={() => {
                  setRejectTarget(null);

                  setRejectReason("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="voucher-admin__modal-btn voucher-admin__modal-btn--danger"
                disabled={moderating || !rejectReason.trim()}
              >
                {moderating ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default VoucherAdmin;
