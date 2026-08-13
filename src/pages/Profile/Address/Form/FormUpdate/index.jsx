import { MapPin, X } from "lucide-react";

import { useEffect, useState } from "react";

import Button from "../../../../../components/common/Button/Button";
import { addressService } from "../../../../../service/addressService";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import "./style.scss";

export default function AddressUpdateModal({ open, onClose, initialData }) {
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

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      receiverName: initialData.receiverName || "",
      phoneNumber: initialData.phoneNumber || "",
      province: initialData.province || "",
      district: initialData.district || "",
      ward: initialData.ward || "",
      detailAddress: initialData.detailAddress || "",
      isDefault: Boolean(initialData.isDefault),
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialData?.id) {
      toast.error("Address information is missing.");

      return;
    }

    const result = await addressService.updateAddress(
      initialData.id,
      formData,
      dispatch,
    );

    if (result?.success) {
      toast.success("Update address success!");

      onClose();
    } else {
      toast.error("Update failed!");
    }
  };

  if (!open) return null;

  return (
    <div className="address-modal">
      <div className="address-modal__overlay" onClick={onClose} />

      <div className="address-modal__container">
        <div className="address-modal__header">
          <div className="address-modal__heading">
            <span>SHIPPING ADDRESS</span>

            <h2>Update Address</h2>

            <p>Update your shipping information.</p>
          </div>

          <button
            type="button"
            className="address-modal__close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          <div className="address-form__grid address-form__grid--2">
            <div className="address-form__group">
              <label>Receiver Name</label>

              <input
                name="receiverName"
                required
                value={formData.receiverName}
                onChange={handleChange}
                placeholder="Receiver name"
              />
            </div>

            <div className="address-form__group">
              <label>Phone Number</label>

              <input
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="address-form__grid address-form__grid--3">
            <div className="address-form__group">
              <label>Province</label>

              <input
                name="province"
                required
                value={formData.province}
                onChange={handleChange}
              />
            </div>

            <div className="address-form__group">
              <label>District</label>

              <input
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            <div className="address-form__group">
              <label>Ward</label>

              <input
                name="ward"
                required
                value={formData.ward}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="address-form__group">
            <label>Detail Address</label>

            <textarea
              rows={4}
              name="detailAddress"
              required
              value={formData.detailAddress}
              onChange={handleChange}
              placeholder="Street name, apartment, building..."
            />
          </div>

          <label className="default-checkbox">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />

            <span className="default-checkbox__icon">
              <MapPin size={15} />
            </span>

            <span>
              <strong>Set as default address</strong>

              <small>Use this address by default during checkout.</small>
            </span>
          </label>

          <div className="address-modal__footer">
            <button
              type="button"
              className="address-btn address-btn--cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <Button type="submit" className="address-btn address-btn--save">
              Update Address
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
