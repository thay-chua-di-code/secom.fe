import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminVouchers } from "../../../redux/slice/admin/vouchers/voucherThunk";
import Button from "../../../components/common/Button/Button";
import AddVoucher from "./Form/AddVoucher";

import "./style.scss";

const VoucherAdmin = () => {
  const dispatch = useDispatch();

  const { vouchers, loading, pagination } = useSelector(
    (state) => state.vouchersAdmin,
  );
  console.log(vouchers);
  const voucherItems = Array.isArray(vouchers)
    ? vouchers
    : vouchers?.items || [];

  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openAddModal, setOpenAddModal] = useState(false);

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
        return matchKeyword && voucher.active;
      }

      if (activeTab === "inactive") {
        return matchKeyword && !voucher.active;
      }

      return matchKeyword;
    });
  }, [voucherItems, keyword, activeTab]);

  const activeCount = voucherItems.filter((item) => item.active).length;

  const inactiveCount = voucherItems.filter((item) => !item.active).length;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("vi-VN");
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
                          voucher.active ? "active" : "inactive"
                        }`}
                      >
                        <span />

                        {voucher.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td>
                      <button className="action-btn edit">
                        <Pencil size={14} />
                      </button>
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
    </div>
  );
};

export default VoucherAdmin;
