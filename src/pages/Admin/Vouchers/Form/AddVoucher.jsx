import React, { useState } from "react";
import "./style.scss";
import Button from "../../../../components/common/Button/Button";
import { createAdminVoucher } from "../../../../redux/slice/admin/vouchers/voucherThunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const AddVoucher = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: "",
    discountType: "Percentage",
    discountValue: "",
    minOrderAmount: "",
    expiresAtUtc: "",
    usageLimit: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        discountValue: Number(formData.discountValue),
        minOrderAmount: Number(formData.minOrderAmount),
        usageLimit: Number(formData.usageLimit),

        expiresAtUtc: new Date(formData.expiresAtUtc).toISOString(),
      };

      const res = await dispatch(createAdminVoucher(payload)).unwrap();

      if (res.success) {
        setFormData({
          code: "",
          discountType: "Percentage",
          discountValue: "",
          minOrderAmount: "",
          expiresAtUtc: "",
          usageLimit: "",
        });

        toast.success("Add voucher success");
      }

      onClose();
    } catch (error) {
      toast.error("Add voucher failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="voucher-modal">
        <div className="modal-header">
          <h3>Add New Voucher</h3>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Voucher Code</label>

            <input
              type="text"
              name="code"
              placeholder="SUMMER2026"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Discount Type</label>

            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
            >
              <option value="Percentage">Percentage</option>

              <option value="Fixed">Fixed Amount</option>
            </select>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Discount Value</label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Minimum Order</label>

              <input
                type="number"
                name="minOrderAmount"
                value={formData.minOrderAmount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Usage Limit</label>

              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expired At</label>

              <input
                type="datetime-local"
                name="expiresAtUtc"
                value={formData.expiresAtUtc}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <Button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" className="save-btn">
              Create Voucher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucher;
