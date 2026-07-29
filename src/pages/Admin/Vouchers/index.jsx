import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  TicketPercent,
  CalendarDays,
  CircleDollarSign,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Percent,
  Users,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminVoucher,
  fetchAdminVouchers,
} from "../../../redux/slice/admin/vouchers/voucherThunk";
import Button from "../../../components/common/Button/Button";
import AddVoucher from "./Form/AddVoucher";

import "./style.scss";

const isVoucherActive = (voucher) => voucher?.isActive ?? voucher?.active ?? false;

const VoucherAdmin = () => {
  const dispatch = useDispatch();

  const { vouchers, loading, deleting, pagination } = useSelector(
    (state) => state.vouchersAdmin,
  );
  const voucherItems = Array.isArray(vouchers)
    ? vouchers
    : vouchers?.items || [];

  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

    return new Date(date).toLocaleDateString("vi-VN");
  };

  const getVoucherId = (voucher) => voucher?.id ?? voucher?.voucherId;

  const handleDeleteVoucher = async () => {
    const voucherId = getVoucherId(deleteTarget);

    if (!voucherId) {
      toast.error("Voucher id is missing");
      return;
    }

    try {
      await dispatch(deleteAdminVoucher(voucherId)).unwrap();
      toast.success("Voucher deleted successfully");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error || "Delete voucher failed");
    }
  };

  return (
    <div className="voucher-admin">
      <div className="voucher-admin__heading">
        <Button
          className="voucher-admin__add-btn"
          onClick={() => setOpenAddModal(true)}
        >
          <Plus size={15} />

          <span>Create Voucher</span>
        </Button>
      </div>

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
                  <tr key={voucher.id}>
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

                        <strong>{voucher.discountType}</strong>
                      </div>
                    </td>

                    {/* Discount */}

                    <td>
                      <div className="discount-info">
                        <CircleDollarSign size={14} />

                        <strong>
                          {formatCurrencyVN(voucher.discountValue)}
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
                      <span
                        className={`status-badge ${
                          isVoucherActive(voucher) ? "active" : "inactive"
                        }`}
                      >
                        <span />

                        {isVoucherActive(voucher) ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td>
                      <div className="voucher-admin__actions">
                        <button type="button" className="action-btn edit">
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          className="action-btn delete"
                          disabled={deleting}
                          onClick={() => setDeleteTarget(voucher)}
                          aria-label={`Delete voucher ${voucher.code}`}
                        >
                          <Trash2 size={14} />
                        </button>
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

      {/* =========================================
          ADD MODAL
      ========================================== */}

      {openAddModal && (
        <AddVoucher
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      )}

      {deleteTarget && (
        <div className="voucher-admin__modal-backdrop" role="presentation">
          <div className="voucher-admin__confirm" role="dialog" aria-modal="true">
            <h3>Delete voucher?</h3>
            <p>
              This will delete voucher <strong>{deleteTarget.code}</strong> from
              the system.
            </p>
            <div className="voucher-admin__modal-actions">
              <button
                type="button"
                className="voucher-admin__modal-btn"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="voucher-admin__modal-btn voucher-admin__modal-btn--danger"
                disabled={deleting}
                onClick={handleDeleteVoucher}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherAdmin;
