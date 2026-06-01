import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
    if (initialData) {
      setFormData(initialData);
    }
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

      <div className="address-modal__container w-full max-w-3xl mx-4">
        {/* HEADER */}
        <div className="address-modal__header">
          <div>
            <h2>Update Address</h2>
            <p>Update your shipping address information.</p>
          </div>

          <button className="address-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="address-form">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="form-group">
              <label>Receiver Name</label>
              <input
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="form-group">
              <label>Province</label>
              <input
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>District</label>
              <input
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ward</label>
              <input
                name="ward"
                value={formData.ward}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Detail Address</label>
            <textarea
              rows={4}
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="default-checkbox">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              id="isDefaultUpdate"
            />
            <label htmlFor="isDefaultUpdate">Set as default address</label>
          </div>

          {/* FOOTER */}
          <div className="address-modal__footer">
            <Button type="submit" className="address-btn address-btn--save">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
