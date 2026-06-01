import { X } from "lucide-react";
import { useState } from "react";

import Button from "../../../../components/common/Button/Button";

import "./style.scss";

export default function FormAdd({ open, onClose, onSubmit }) {
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
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
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

          <button className="address-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="form-group">
              <label>Receiver Name</label>

              <input
                type="text"
                name="receiverName"
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
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-3">
            <div className="form-group">
              <label>Province</label>

              <input
                type="text"
                name="province"
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
                value={formData.ward}
                onChange={handleChange}
                placeholder="Ward"
              />
            </div>
          </div>

          <div className="form-group mt-4">
            <label>Detail Address</label>

            <textarea
              rows="4"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              placeholder="Street name, building, apartment..."
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
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
