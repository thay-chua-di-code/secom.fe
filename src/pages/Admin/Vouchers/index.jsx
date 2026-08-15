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

const isVoucherActive = (voucher) => voucher?.isActive ?? voucher?.active ?? false;

const getVoucherStatus = (voucher) =>
  String(voucher?.approvalStatus || voucher?.status || "pending").toLowerCase();

const canModerateVoucher = (voucher) => getVoucherStatus(voucher) === "pending";

const VoucherAdmin = () => {
  const dispatch = useDispatch();

  const { vouchers, loading, moderating, pagination } = useSelector(
    (state) => state.vouchersAdmin,
  );
  const voucherItems = useMemo(
    () => (Array.isArray(vouchers) ? vouchers : vouchers?.items || []),
    [vouchers],
  );

  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [approveTarget, setApproveTarget] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    dispatch(
      fetchAdminVouchers({
        page: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  const filteredVouchers = useMemo(() => {
    return voucherItems.filter((voucher) => {
      const matchKeyword = voucher.code
        ?.toLowerCase()
        .includes(keyword.toLowerCase());

      if (activeTab === "active") {
        return matchKeyword && isVoucherActive(voucher);
      }

      if (activeTab === "inactive") {
        return matchKeyword && !isVoucherActive(voucher);
      }

      return matchKeyword;
    });
  }, [voucherItems, keyword, activeTab]);

  const activeCount = voucherItems.filter((item) => isVoucherActive(item)).length;

  const inactiveCount = voucherItems.filter((item) => !isVoucherActive(item)).length;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US");
  };

  const getVoucherId = (voucher) => voucher?.id ?? voucher?.voucherId;

  const refreshVouchers = () => {
    dispatch(fetchAdminVouchers({ page: pagination?.pageNumber || 1, pageSize: pagination?.pageSize || 10 }));
  };

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
      refreshVouchers();
      return;
    }

    toast.error(result.payload || "Approve voucher failed");
  };

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

    const result = await dispatch(rejectAdminVoucher({ voucherId, reason }));

    if (rejectAdminVoucher.fulfilled.match(result)) {
      toast.success("Voucher rejected successfully");
      setRejectTarget(null);
      setRejectReason("");
      refreshVouchers();
      return;
    }

    toast.error(result.payload || "Reject voucher failed");
  };

  return (
    <div className="voucher-admin">
      <div className="voucher-admin__card">
        {/* =========================================
            TOOLBAR
        ========================================== */}

        <div className="voucher-admin__toolbar">
          <div className="voucher-admin__tabs">
            <button
              className={activeTab === "all" ? "active" : ""}
              onClick={() => setActiveTab("all")}
            >
              <TicketPercent size={14} />

              <span>All Vouchers</span>

              <b>{voucherItems.length}</b>
            </button>

            <button
              className={activeTab === "active" ? "active" : ""}
              onClick={() => setActiveTab("active")}
            >
              <BadgeCheck size={14} />

              <span>Active</span>

              <b>{activeCount}</b>
            </button>

            <button
              className={activeTab === "inactive" ? "active" : ""}
              onClick={() => setActiveTab("inactive")}
            >
              <Percent size={14} />

              <span>Inactive</span>

              <b>{inactiveCount}</b>
            </button>
          </div>

          <div className="voucher-admin__search">
            <Search size={15} />

            <input
              type="text"
              placeholder="Search voucher..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* =========================================
            TABLE
        ========================================== */}

        <div className="voucher-admin__table-wrapper">
          <table className="voucher-admin__table">
            <thead>
              <tr>
                <th>CODE</th>
                <th>TYPE</th>
                <th>DISCOUNT</th>
                <th>MIN ORDER</th>
                <th>USAGE</th>
                <th>EXPRIES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="voucher-admin__loading">
                      Loading vouchers...
                    </div>
                  </td>
                </tr>
              ) : filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="voucher-admin__empty">
                      <TicketPercent size={28} />

                      <span>No vouchers found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((voucher) => (
                  <tr key={voucher.id ?? voucher.voucherId}>
                    {/* VOUCHER */}

                    <td>
                      <div className="voucher-info">
                        <div className="voucher-icon">
                          <TicketPercent size={16} />
                        </div>

                        <div>
                          <strong>{voucher.code}</strong>

                          <span>Discount voucher</span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}

                    <td>
                      <div className="discount-info">
                        <CircleDollarSign size={14} />

                        <strong>{getVoucherDiscountTypeLabel(voucher.discountType)}</strong>
                      </div>
                    </td>

                    {/* Discount */}

                    <td>
                      <div className="discount-info">
                        <CircleDollarSign size={14} />

                        <strong>
                          {formatVoucherDiscountValue(voucher)}
                        </strong>
                      </div>
                    </td>

                    {/* Min Order */}

                    <td>
                      <div className="discount-info">
                        <CircleDollarSign size={14} />

                        <strong>
                          {formatCurrencyVN(voucher.minOrderAmount)}
                        </strong>
                      </div>
                    </td>

                    {/* Usage */}
                    <td>
                      <div className="usage-info">
                        <div className="usage-number">
                          <Users size={13} />

                          <span>
                            {voucher.usedQuantity} / {voucher.quantity}
                          </span>
                        </div>

                        <div className="usage-progress">
                          <span
                            style={{
                              width: `${
                                voucher.quantity
                                  ? Math.min(
                                      (voucher.usedQuantity /
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

                    {/* STATUS */}

                    <td>
                      {(() => {
                        const voucherStatus = getVoucherStatus(voucher);
                        return (
                      <span
                        className={`status-badge ${voucherStatus}`}
                      >
                        <span />

                        {voucherStatus.charAt(0).toUpperCase() + voucherStatus.slice(1)}
                      </span>
                        );
                      })()}
                    </td>

                    {/* ACTION */}

                    <td>
                      <div className="voucher-admin__actions">
                        {canModerateVoucher(voucher) ? (
                          <>
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
                          <span className="voucher-admin__no-action">Reviewed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* =========================================
            PAGINATION
        ========================================== */}

        <div className="voucher-admin__pagination">
          <span>
            Showing <b>{filteredVouchers.length}</b> of{" "}
            <b>{pagination?.totalCount || 0}</b> vouchers
          </span>

          <div>
            <button>
              <ChevronLeft size={15} />
            </button>

            <button className="active">{pagination?.pageNumber || 1}</button>

            <button>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {approveTarget && (
        <div className="voucher-admin__modal-backdrop" role="presentation">
          <div className="voucher-admin__confirm" role="dialog" aria-modal="true">
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

      {rejectTarget && (
        <div className="voucher-admin__modal-backdrop" role="presentation">
          <form className="voucher-admin__confirm" role="dialog" aria-modal="true" onSubmit={handleRejectVoucher}>
            <h3>Reject voucher</h3>
            <p>Voucher: <strong>{rejectTarget.code}</strong></p>
            <textarea
              value={rejectReason}
              onChange={(event) => setRejectReason(event.target.value)}
              placeholder="Enter rejection reason"
              rows={4}
              required
            />
            <div className="voucher-admin__modal-actions">
              <button
                type="button"
                className="voucher-admin__modal-btn"
                disabled={moderating}
                onClick={() => setRejectTarget(null)}
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
