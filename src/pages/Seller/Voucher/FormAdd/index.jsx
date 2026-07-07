import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSellerProduct } from "../../../../redux/slice/seller/product/thunk";
import { categoriesService } from "../../../../service/categoriesService";
import "./style.scss";
import { sellerService } from "../../../../service/sellerService";
const AddVoucherModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    quantity: "",
    startAtUtc: "",
    endAtUtc: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await sellerService.createVoucher({
      ...form,
      sellerId: userInfo.userId,
      discountValue: Number(form.discountValue),
      minOrderAmount: Number(form.minOrderAmount),
      maxDiscountAmount: Number(form.maxDiscountAmount),
      quantity: Number(form.quantity),
      startAtUtc: new Date(form.startAtUtc).toISOString(),
      endAtUtc: new Date(form.endAtUtc).toISOString(),
    });

    console.log('Compoennt: ', res)

    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>Create Voucher</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
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
              <label>Voucher Name</label>
              <input
                name="name"
                placeholder="Summer Sale"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Voucher description..."
              value={form.description}
              onChange={handleChange}
            />
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
              <label>Maximum Discount</label>

              <input
                type="number"
                name="maxDiscountAmount"
                placeholder="100000"
                value={form.maxDiscountAmount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
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

            <div className="form-group"></div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Start Date</label>

              <input
                type="datetime-local"
                name="startAtUtc"
                value={form.startAtUtc}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="datetime-local"
                name="endAtUtc"
                value={form.endAtUtc}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button className="create-btn" type="submit">
              Create Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoucherModal;
