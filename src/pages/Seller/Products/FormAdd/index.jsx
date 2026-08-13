import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createSellerProduct,
  fetchSellerProducts,
} from "../../../../redux/slice/seller/product/thunk";
import { categoriesService } from "../../../../service/categoriesService";
import { uploadProductImages } from "../../../../api/productImageApi";
import ProductImageManager from "../components/ProductImageManager";
import "./style.scss";
import { toast } from "react-hot-toast";
import { PackagePlus, X } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stockQuantity: "",
  categoryId: "",
  condition: "",
  location: "",
};

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.data?.message ||
  error?.message ||
  fallback;

const AddProductModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [form, setForm] = useState(initialForm);
  const [pendingImages, setPendingImages] = useState([]);
  const [selectedPrimary, setSelectedPrimary] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const resetModalState = () => {
    pendingImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setForm(initialForm);
    setPendingImages([]);
    setSelectedPrimary(null);
  };

  const handleClose = () => {
    if (submitting || uploadingImages) return;
    resetModalState();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildImagePayload = async () => {
    if (!pendingImages.length) return [];

    const imagesForUpload = pendingImages.map((image) => ({
      ...image,
      isPrimary:
        selectedPrimary?.type === "pending" &&
        selectedPrimary.clientId === image.clientId,
    }));

    setUploadingImages(true);
    try {
      const uploadedImages = await uploadProductImages({
        pendingImages: imagesForUpload,
      });

      const hasPrimary = uploadedImages.some((image) => image.isPrimary);
      return uploadedImages.map((image, index) => ({
        imageUrl: image.imageUrl,
        publicId: image.publicId,
        isPrimary: hasPrimary ? image.isPrimary : index === 0,
        displayOrder: index,
      }));
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (submitting || uploadingImages) return;

    try {
      setSubmitting(true);
      const images = await buildImagePayload();
      const payload = {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        images,
      };

      if (
        !Number.isInteger(payload.stockQuantity) ||
        payload.stockQuantity < 0
      ) {
        toast.error("Stock quantity must be a non-negative integer");
        return;
      }

      await dispatch(createSellerProduct(payload)).unwrap();

      toast.success(
        "Product has been submitted and is pending admin approval.",
        { duration: 2500 },
      );
      await dispatch(fetchSellerProducts({ page: 1, pageSize: 10 }));
      resetModalState();
      onClose();
    } catch (error) {
      console.error("Create product failed:", error);
      toast.error(
        getErrorMessage(error, "Failed to create product. Please try again."),
        { duration: 3000 },
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!open || categories.length) return;
    categoriesService.getCategories(dispatch);
  }, [dispatch, open, categories.length]);

  if (!open) return null;

  const isBusy = submitting || uploadingImages;

  return (
    <div className="add-product-modal__overlay">
      <div className="add-product-modal">
        <div className="add-product-modal__header">
          <div className="add-product-modal__title">
            <div className="add-product-modal__icon">
              <PackagePlus size={22} />
            </div>
            <div>
              <h2>Create Product</h2>
              <p>Add a new product to your store</p>
            </div>
          </div>
          <button
            type="button"
            className="add-product-modal__close"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close create product modal"
          >
            <X size={18} />
          </button>
        </div>

        <form className="add-product-modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Nike Air Force"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Product description..."
              value={form.description}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                min="0"
                placeholder="100"
                value={form.price}
                onChange={handleChange}
                required
                disabled={isBusy}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                disabled={isBusy}
              >
                <option value="">-- Select Category --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                min="0"
                step="1"
                placeholder="0"
                value={form.stockQuantity}
                onChange={handleChange}
                required
                disabled={isBusy}
              />
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
                disabled={isBusy}
              >
                <option value="">-- Select Condition --</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                placeholder="Ha Noi"
                value={form.location}
                onChange={handleChange}
                disabled={isBusy}
              />
            </div>
          </div>

          <ProductImageManager
            mode="create"
            productName={form.name}
            pendingImages={pendingImages}
            onPendingImagesChange={setPendingImages}
            selectedPrimary={selectedPrimary}
            onSelectedPrimaryChange={setSelectedPrimary}
            disabled={isBusy}
            isBusy={isBusy}
          />

          <div className="actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleClose}
              disabled={isBusy}
            >
              Cancel
            </button>
            <button className="create-btn" type="submit" disabled={isBusy}>
              {uploadingImages
                ? "Is uploading image..."
                : submitting
                  ? "Is creating product..."
                  : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
