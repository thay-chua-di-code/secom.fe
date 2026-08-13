import { useState } from "react";
import { X } from "lucide-react";
import Button from "../../../../../components/common/Button/Button";
import { addressService } from "../../../../../service/addressService";
import "./style.scss";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
export default function AddressModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    receiverName: "",
    phoneNumber: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addressService.createAddress(formData, dispatch);
    if (result.success) {
      toast.success("Address added successfully!");

      onClose();
    } else {
      toast.error("Failed to add address. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="address-modal">
      <div className="address-modal__overlay" onClick={onClose} />

      <div className="address-modal__container w-full max-w-3xl mx-4">
        <div className="address-modal__header">
          <div>
            <h2>Add New Address</h2>

            <p>Create a shipping address for your orders.</p>
          </div>

          <button
            type="button"
            className="address-modal__close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="address-form"
          data-testid="address-form"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-group">
              <label>Receiver Name</label>

              <input
                type="text"
                name="receiverName"
                required
                data-testid="address-receiver-input"
                value={formData.receiverName}
                onChange={handleChange}
                placeholder="Enter receiver name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phoneNumber"
                required
                data-testid="address-phone-input"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="form-group">
              <label>Province</label>

              <input
                type="text"
                name="province"
                required
                data-testid="address-province-input"
                value={formData.province}
                onChange={handleChange}
                placeholder="Province"
              />
            </div>

            <div className="form-group">
              <label>District</label>

              <input
                type="text"
                name="district"
                required
                data-testid="address-district-input"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
              />
            </div>

            <div className="form-group">
              <label>Ward</label>

              <input
                type="text"
                name="ward"
                required
                data-testid="address-ward-input"
                value={formData.ward}
                onChange={handleChange}
                placeholder="Ward"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Detail Address</label>

            <textarea
              rows={4}
              name="detailAddress"
              required
              data-testid="address-detail-input"
              value={formData.detailAddress}
              onChange={handleChange}
              placeholder="Street name, apartment, building..."
            />
          </div>

          <div className="default-checkbox">
            <input
              type="checkbox"
              id="defaultAddress"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />

            <label htmlFor="defaultAddress">Set as default address</label>
          </div>

          <div className="address-modal__footer">
            <Button
              type="submit"
              data-testid="address-save-btn"
              className="address-btn address-btn--save"
            >
              Save Address
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
