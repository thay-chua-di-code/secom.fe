import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import "./style.scss";
import { sellerService } from "../../../../service/sellerService";

const createInitialForm = () => ({
  code: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  quantity: "",
  endAtUtc: "",
});

const toDateTimeLocalValue = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
};

const AddVoucherModal = ({
  open,
  onClose,
  mode = "create",
  initialVoucher = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(createInitialForm());

  const isEditMode = mode === "edit";
  const voucherId = initialVoucher?.id ?? initialVoucher?.voucherId ?? null;
  const modalTitle = isEditMode ? "Edit Voucher" : "Create Voucher";
  const submitLabel = isEditMode ? "Save Changes" : "Create Voucher";
  const submittingLabel = isEditMode ? "Saving..." : "Creating...";

  const baseStartAtUtc = useMemo(() => {
    if (initialVoucher?.startAtUtc) {
      return new Date(initialVoucher.startAtUtc).toISOString();
    }

    return new Date().toISOString();
  }, [initialVoucher?.startAtUtc]);

  useEffect(() => {
    if (!open) return;

    if (isEditMode && initialVoucher) {
      setForm({
        code: initialVoucher.code || "",
        discountType: initialVoucher.discountType || "percentage",
        discountValue: String(initialVoucher.discountValue ?? ""),
        minOrderAmount: String(initialVoucher.minOrderAmount ?? ""),
        quantity: String(initialVoucher.quantity ?? ""),
        endAtUtc: toDateTimeLocalValue(initialVoucher.endAtUtc),
      });
      return;
    }

    setForm(createInitialForm());
  }, [initialVoucher, isEditMode, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code.trim()) {
      toast.error("Voucher code is required");
      return;
    }

    if (Number(form.discountValue) <= 0) {
      toast.error("Discount value must be greater than 0");
      return;
    }

    if (
      form.discountType === "percentage" &&
      Number(form.discountValue) > 100
    ) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    if (Number(form.quantity) <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    if (form.endAtUtc && new Date(form.endAtUtc) <= new Date(baseStartAtUtc)) {
      toast.error("End date must be after start date");
      return;
    }

    const payload = {
      code: form.code.trim(),
      name: form.code.trim(),
      description: null,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount || 0),
      maxDiscountAmount: null,
      quantity: Number(form.quantity),
      startAtUtc: baseStartAtUtc,
      endAtUtc: form.endAtUtc ? new Date(form.endAtUtc).toISOString() : null,
    };

    try {
      setIsSubmitting(true);
      if (isEditMode) {
        if (!voucherId) {
          throw new Error("Voucher id is missing");
        }

        await sellerService.updateVoucher(voucherId, payload);
        toast.success("Seller voucher updated successfully");
      } else {
        await sellerService.createVoucher(payload);
        toast.success("Seller voucher created successfully");
      }

      onClose();
    } catch (error) {
      toast.error(
        error.message ||
          (isEditMode
            ? "Update seller voucher failed"
            : "Create seller voucher failed"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>{modalTitle}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>Voucher Code</label>
              <input
                name="code"
                placeholder="SALE10"
                value={form.code}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Expiration Date</label>

              <input
                type="datetime-local"
                name="endAtUtc"
                value={form.endAtUtc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Discount Type</label>

              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
              >
                <option value="percentage">Percent (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div className="form-group">
              <label>Discount Value</label>

              <input
                type="number"
                name="discountValue"
                placeholder="10"
                value={form.discountValue}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Minimum Order</label>

              <input
                type="number"
                name="minOrderAmount"
                placeholder="500000"
                value={form.minOrderAmount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                placeholder="100"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="seller-voucher-modal__note">
            Seller vouchers support editing persisted fields only: code, discount type,
            discount value, minimum order, quantity, and expiration date.
          </div>

          <div className="actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button className="create-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? submittingLabel : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucherModal;
