import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Store,
  Phone,
  MapPin,
  FileText,
  ImagePlus,
  Send,
  CheckCircle2,
} from "lucide-react";

import { uploadImageToCloudinary } from "../../../../utils/uploadImgCloud";
import { sellerService } from "../../../../service/sellerService";

import "./style.scss";

import Button from "../../../../components/common/Button/Button";

export default function StoreInformation({ onSubmitted }) {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    shopName: "",
    description: "",
    phoneNumber: "",
    address: "",
    verificationImage: null,
  });

  // ============================================================
  // IMAGE PREVIEW
  // ============================================================

  useEffect(() => {
    if (!formData.verificationImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(formData.verificationImage);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [formData.verificationImage]);

  // ============================================================
  // INPUT CHANGE
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // IMAGE CHANGE
  // ============================================================

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      verificationImage: e.target.files?.[0] || null,
    }));
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // ==========================================================
    // VALIDATION
    // ==========================================================

    if (!formData.shopName.trim()) {
      return toast.error("Shop name is required");
    }

    if (!formData.phoneNumber.trim()) {
      return toast.error("Phone number is required");
    }

    if (!formData.address.trim()) {
      return toast.error("Address is required");
    }

    if (!formData.verificationImage) {
      return toast.error("Verification document is required");
    }

    const toastId = "seller-register";

    try {
      setLoading(true);

      // ========================================================
      // UPLOAD IMAGE
      // ========================================================

      toast.loading("Uploading verification document...", {
        id: toastId,
      });

      const verificationImageUrl = await uploadImageToCloudinary(
        formData.verificationImage,
      );

      // ========================================================
      // SUBMIT APPLICATION
      // ========================================================

      toast.loading("Submitting seller application...", {
        id: toastId,
      });

      const payload = {
        shopName: formData.shopName.trim(),

        description: formData.description.trim(),

        phoneNumber: formData.phoneNumber.trim(),

        address: formData.address.trim(),

        verificationImage: verificationImageUrl,
      };

      await sellerService.becomeSeller(payload);

      // ========================================================
      // SUCCESS
      // ========================================================

      toast.success(
        "Your seller application has been submitted successfully and is pending admin approval.",
        {
          id: toastId,
        },
      );

      setFormData({
        shopName: "",
        description: "",
        phoneNumber: "",
        address: "",
        verificationImage: null,
      });

      setTimeout(() => {
        toast.dismiss(toastId);

        onSubmitted?.();
      }, 2500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit seller application";

      toast.error(message, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="store-information">
      <div className="form-card">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="form-card__header">
          <div className="form-card__header-icon">
            <Store size={22} />
          </div>

          <div className="form-card__header-content">
            <span className="form-card__eyebrow">STORE APPLICATION</span>

            <h2>Seller information</h2>

            <p className="subtitle">
              Enter your store information and upload a verification document.
            </p>
          </div>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSubmit}>
          {/* ===================================================
              SHOP + PHONE
          =================================================== */}

          <div className="seller-form-grid">
            {/* SHOP NAME */}

            <div className="form-group">
              <label htmlFor="shopName">
                Shop Name
                <span>*</span>
              </label>

              <div className="form-control">
                <div className="form-control__icon">
                  <Store size={18} />
                </div>

                <input
                  id="shopName"
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="e.g. Secom Tech Store"
                  disabled={loading}
                />
              </div>
            </div>

            {/* PHONE */}

            <div className="form-group">
              <label htmlFor="phoneNumber">
                Phone Number
                <span>*</span>
              </label>

              <div className="form-control">
                <div className="form-control__icon">
                  <Phone size={18} />
                </div>

                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+84 123 456 789"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* ===================================================
              ADDRESS
          =================================================== */}

          <div className="form-group">
            <label htmlFor="address">
              Address
              <span>*</span>
            </label>

            <div className="form-control">
              <div className="form-control__icon">
                <MapPin size={18} />
              </div>

              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your store or business address"
                disabled={loading}
              />
            </div>
          </div>

          {/* ===================================================
              DESCRIPTION
          =================================================== */}

          <div className="form-group">
            <label htmlFor="description">
              Description
              <small>Optional</small>
            </label>

            <div className="form-control form-control--textarea">
              <div className="form-control__icon form-control__icon--textarea">
                <FileText size={18} />
              </div>

              <textarea
                id="description"
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell customers a little about your store, products and services..."
                disabled={loading}
                maxLength={1000}
              />
            </div>

            <div className="form-character-count">
              {formData.description.length}
              /1000
            </div>
          </div>

          {/* ===================================================
              VERIFICATION
          =================================================== */}

          <div className="form-group">
            <label>
              Verification Document
              <span>*</span>
            </label>

            <label
              className={`seller-upload ${
                formData.verificationImage ? "has-file" : ""
              }`}
            >
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                disabled={loading}
              />

              {/* ICON */}

              <div className="seller-upload__icon">
                {formData.verificationImage ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <ImagePlus size={24} />
                )}
              </div>

              {/* TEXT */}

              <div className="seller-upload__text">
                {formData.verificationImage ? (
                  <>
                    <strong>{formData.verificationImage.name}</strong>
                  </>
                ) : (
                  <>
                    <strong>
                      Upload verification document (PNG, JPG, JPEG or WEBP)
                    </strong>
                  </>
                )}
              </div>

              {/* BUTTON */}

              <span className="seller-upload__button">
                {formData.verificationImage ? "Change" : "Browse"}
              </span>
            </label>

            {/* =================================================
                IMAGE PREVIEW
            ================================================= */}

            {previewUrl && (
              <div className="verification-preview">
                <div className="verification-preview__image">
                  <img src={previewUrl} alt="Verification document preview" />
                </div>

                <div className="verification-preview__info">
                  <div className="verification-preview__success">
                    <CheckCircle2 size={16} />
                    Document selected
                  </div>

                  <strong>{formData.verificationImage?.name}</strong>

                  <span>
                    {formData.verificationImage?.size
                      ? `${(
                          formData.verificationImage.size /
                          1024 /
                          1024
                        ).toFixed(2)} MB`
                      : ""}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              SUBMIT
          =================================================== */}

          <div className="form-submit-area">
            <div className="form-submit-area__notice">
              <CheckCircle2 size={17} />

              <span>Please review your information before submitting.</span>
            </div>

            <Button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="seller-submit-spinner" />
                  Submitting application...
                </>
              ) : (
                <>
                  Submit Application
                  <Send size={17} />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
