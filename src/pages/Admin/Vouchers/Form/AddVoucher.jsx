import { useState } from "react";
import { X, Check } from "lucide-react";
import "./style.scss";

import Button from "../../../../components/common/Button/Button";
import { createAdminVoucher } from "../../../../redux/slice/admin/vouchers/voucherThunk";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  normalizeVoucherDiscountType,
  VOUCHER_DISCOUNT_TYPES,
} from "../../../../utils/voucherUtils";

const initialForm = {
  code: "",
  discountType: VOUCHER_DISCOUNT_TYPES.PERCENTAGE,
  discountValue: "",
  minOrderAmount: "",
  expiresAtUtc: "",
  usageLimit: "",
  isActive: true,
};

const AddVoucher = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: formData.code.trim().toUpperCase(),
        discountType: normalizeVoucherDiscountType(formData.discountType),
        discountValue: Number(formData.discountValue),
        minOrderAmount: Number(formData.minOrderAmount),
        usageLimit: Number(formData.usageLimit),
        expiresAtUtc: new Date(formData.expiresAtUtc).toISOString(),
        isActive: formData.isActive ?? true,
      };

      if (typeof payload.isActive !== "boolean") {
        throw new Error("Voucher status must be active or inactive.");
      }

      console.debug("[CreateVoucher] payload", payload);

      await dispatch(createAdminVoucher(payload)).unwrap();
      toast.success("Add voucher successfully");
      setFormData(initialForm);
      onClose();
    } catch (error) {
      console.error("Create voucher error:", error);
      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Add voucher failed",
      );
    }
  };

  return (
    <div className="voucher-modal-overlay" onClick={onClose}>
      <div className="voucher-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="voucher-modal__header">
          <h3>Create Voucher</h3>
          <button
            type="button"
            className="voucher-modal__close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="voucher-modal__body">
            {/* ROW 1: CODE & TYPE */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="code">VOUCHER CODE</label>
                <div className="input-wrapper">
                  <input
                    id="code"
                    type="text"
                    name="code"
                    placeholder="e.g. SAVE20"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="discountType">DISCOUNT TYPE</label>
                <div className="input-wrapper">
                  <select
                    id="discountType"
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleChange}
                  >
                    <option value={VOUCHER_DISCOUNT_TYPES.PERCENTAGE}>Percentage</option>
                    <option value={VOUCHER_DISCOUNT_TYPES.FIXED_AMOUNT}>Fixed Amount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ROW 2: VALUE & MIN ORDER */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="discountValue">
                  {formData.discountType === VOUCHER_DISCOUNT_TYPES.PERCENTAGE
                    ? "DISCOUNT PERCENTAGE (%)"
                    : "DISCOUNT AMOUNT (VND)"}
                </label>
                <div className="input-wrapper">
                  <input
                    id="discountValue"
                    type="number"
                    name="discountValue"
                    min="1"
                    placeholder="0"
                    value={formData.discountValue}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="minOrderAmount">MIN ORDER (VND)</label>
                <div className="input-wrapper">
                  <input
                    id="minOrderAmount"
                    type="number"
                    name="minOrderAmount"
                    min="0"
                    placeholder="0"
                    value={formData.minOrderAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* ROW 3: MAX USES & EXPIRY */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="usageLimit">MAX USES</label>
                <div className="input-wrapper">
                  <input
                    id="usageLimit"
                    type="number"
                    name="usageLimit"
                    min="1"
                    placeholder="100"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="expiresAtUtc">EXPIRY DATE</label>
                <div className="input-wrapper">
                  <input
                    id="expiresAtUtc"
                    type="date" // Convert to date to match mm/dd/yyyy in the image
                    name="expiresAtUtc"
                    value={formData.expiresAtUtc}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* ROW 4: STATUS & BUTTONS (Align according to the UI) */}
            {/* STATUS */}
            <div className="form-group status-group">
              <label htmlFor="isActive">STATUS</label>

              <div className="input-wrapper">
                <select
                  id="isActive"
                  name="isActive"
                  value={String(formData.isActive)}
                  onChange={(event) => {
                    setFormData((prev) => ({
                      ...prev,
                      isActive: event.target.value === "true",
                    }));
                  }}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="form-actions-group">
              <Button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" className="save-btn">
                <Check size={16} />
                Create Voucher
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucher;
