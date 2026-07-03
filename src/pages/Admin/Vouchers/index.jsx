import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  TicketPercent,
  CalendarDays,
  CircleDollarSign,
  BadgeCheck,
} from "lucide-react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminVouchers } from "../../../redux/slice/admin/vouchers/voucherThunk";
import Button from "../../../components/common/Button/Button";
import AddVoucher from "./Form/AddVoucher";

const VoucherAdmin = () => {
  const dispatch = useDispatch();

  const { vouchers, loading, pagination } = useSelector(
    (state) => state.vouchersAdmin,
  );

  const voucherItems = Array.isArray(vouchers)
    ? vouchers
    : vouchers?.items || [];

  const [keyword, setKeyword] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  useEffect(() => {
    dispatch(
      fetchAdminVouchers({
        page: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  return (
    <div className="voucher-admin">
      <div className="page-header">
        <div>
          <h2>Voucher Management</h2>
          <p>Manage all discount vouchers in the system</p>
        </div>

        <Button className="btn-add" onClick={() => setOpenAddModal(true)}>
          <Plus size={18} />
          Add Voucher
        </Button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />

          <input
            placeholder="Search voucher..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Used</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="loading">
                  Loading...
                </td>
              </tr>
            ) : voucherItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty">
                  No voucher found.
                </td>
              </tr>
            ) : (
              voucherItems.map((voucher) => (
                <tr key={voucher.id}>
                  <td>
                    <div className="voucher-code">
                      <TicketPercent size={18} />
                      {voucher.code}
                    </div>
                  </td>

                  <td>
                    <div className="discount">
                      <CircleDollarSign size={16} />
                      {voucher.discountValue}
                    </div>
                  </td>

                  <td>{voucher.quantity}</td>

                  <td>{voucher.usedQuantity}</td>

                  <td>
                    <div className="date">
                      <CalendarDays size={15} />
                      {voucher.startDate}
                    </div>
                  </td>

                  <td>
                    <div className="date">
                      <CalendarDays size={15} />
                      {voucher.endDate}
                    </div>
                  </td>

                  <td>
                    <span
                      className={
                        voucher.active ? "status active" : "status inactive"
                      }
                    >
                      <BadgeCheck size={15} />
                      {voucher.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button className="edit-btn">
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Total: <b>{pagination.totalCount}</b>
        </span>

        <div className="pages">
          <button>{"<"}</button>

          <button className="active">{pagination.pageNumber}</button>

          <button>{">"}</button>
        </div>
      </div>

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
