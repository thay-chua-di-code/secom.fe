import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../../utils/uploadImgCloud";
import { sellerService } from "../../../../service/sellerService";
import "./style.scss";
import Button from "../../../../components/common/Button/Button";

export default function StoreInformation({ onRegisterSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    phoneNumber: "",
    address: "",
    verificationImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      verificationImage: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if (!formData.shopName.trim()) {
      //   return toast.error("Shop name is required");
      // }

      // if (!formData.phoneNumber.trim()) {
      //   return toast.error("Phone number is required");
      // }

      // if (!formData.address.trim()) {
      //   return toast.error("Address is required");
      // }

      // if (!formData.verificationImage) {
      //   return toast.error("Verification image is required");
      // }

      setLoading(true);

      toast.loading("Uploading image...", {
        id: "seller-register",
      });

      const verificationImageUrl = await uploadImageToCloudinary(
        formData.verificationImage,
      );

      toast.loading("Submitting application...", {
        id: "seller-register",
      });

      const payload = {
        shopName: formData.shopName,
        description: formData.description,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        verificationImage: verificationImageUrl,
      };

      const result = await sellerService.becomeSeller(payload);

      if (result.data.success === 200) {
        toast.success("Seller application submitted successfully!", {
          id: "seller-register",
        });

        onRegisterSuccess(result.data.status);
      }

      setFormData({
        shopName: "",
        description: "",
        phoneNumber: "",
        address: "",
        verificationImage: null,
      });
    } catch (error) {
      toast.error(error.message || "Failed to submit application", {
        id: "seller-register",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-information">
      <div className="form-card">
        <h2>Seller Registration</h2>

        <p className="subtitle">
          Complete your seller application to start selling on Secom
          Marketplace.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Shop Name <span>*</span>
            </label>

            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              placeholder="Enter your shop name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your shop..."
            />
          </div>

          <div className="form-group">
            <label>
              Phone Number <span>*</span>
            </label>

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+84..."
            />
          </div>

          <div className="form-group">
            <label>
              Address <span>*</span>
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label>
              Verification Document <span>*</span>
            </label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {formData.verificationImage && (
              <img
                src={URL.createObjectURL(formData.verificationImage)}
                alt="preview"
                style={{
                  width: "180px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </div>

          <Button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
