import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import AddVoucherModal from "./FormAdd";
import "./style.scss";

const Vouchers = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const vouchers = [];

  return (
    <div className="seller-vouchers">
      {/* Header */}
      <div className="seller-vouchers__header">
        <div>
          <span className="seller-vouchers__label">Promotion Management</span>

          <h1>Voucher Management</h1>

          <p>Create and manage discount vouchers for your customers.</p>
        </div>

        <Button
          className="seller-vouchers__add-btn"
          onClick={() => setOpenAdd(true)}
        >
          + Add Voucher
        </Button>
      </div>

      {/* Table */}
      <div className="seller-vouchers__table-card">
        <div className="seller-vouchers__table-wrapper">
          <table className="seller-vouchers__table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Discount</th>
                <th>Min Order</th>
                <th>Quantity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {vouchers?.map((item) => {
                const isActive = new Date(item.endAtUtc) > new Date();

                return (
                  <tr key={item.id}>
                    <td data-label="Code">
                      <span className="seller-vouchers__code">{item.code}</span>
                    </td>

                    <td data-label="Name">
                      <span className="seller-vouchers__name">{item.name}</span>
                    </td>

                    <td data-label="Discount">
                      <strong className="seller-vouchers__discount">
                        {item.discountType === "PERCENT"
                          ? `${item.discountValue}%`
                          : `${item.discountValue.toLocaleString()} VNĐ`}
                      </strong>
                    </td>

                    <td data-label="Min Order">
                      {item.minOrderAmount.toLocaleString()} VNĐ
                    </td>

                    <td data-label="Quantity">
                      <span className="seller-vouchers__quantity">
                        {item.quantity}
                      </span>
                    </td>

                    <td data-label="Start Date">
                      {new Date(item.startAtUtc).toLocaleDateString("vi-VN")}
                    </td>

                    <td data-label="End Date">
                      {new Date(item.endAtUtc).toLocaleDateString("vi-VN")}
                    </td>

                    <td data-label="Status">
                      <span
                        className={`seller-vouchers__status ${
                          isActive
                            ? "seller-vouchers__status--active"
                            : "seller-vouchers__status--expired"
                        }`}
                      >
                        <span className="seller-vouchers__status-dot" />
                        {isActive ? "Active" : "Expired"}
                      </span>
                    </td>

                    <td data-label="Action">
                      <div className="seller-vouchers__actions">
                        <button
                          type="button"
                          className="seller-vouchers__action-btn seller-vouchers__action-btn--edit"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="seller-vouchers__action-btn seller-vouchers__action-btn--delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {vouchers?.length === 0 && (
                <tr className="seller-vouchers__empty-row">
                  <td colSpan={9}>
                    <div className="seller-vouchers__empty">
                      <div className="seller-vouchers__empty-icon">🎟️</div>

                      <h3>No vouchers found</h3>

                      <p>
                        Seller voucher list endpoint is not available in the
                        current API contract. Create works; update and delete
                        require a backend list/get endpoint to provide voucher
                        IDs safely.
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenAdd(true)}
                        className="seller-vouchers__empty-btn"
                      >
                        Create Voucher
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {openAdd && (
        <AddVoucherModal open={openAdd} onClose={() => setOpenAdd(false)} />
      )}
    </div>
  );
};

export default Vouchers;
