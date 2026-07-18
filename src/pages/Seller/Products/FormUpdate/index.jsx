import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesService } from "../../../../service/categoriesService";
import { updateSellerProduct } from "../../../../redux/slice/seller/product/thunk";
import { toast } from "react-hot-toast";
import { PackageCheck, X } from "lucide-react";
import "./style.scss";

const UpdateProductModal = ({ open, product, onClose }) => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    condition: "",
    location: "",
    isActive: true,
    isPublic: true,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open || !product) return;

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      categoryId: product.categoryId || "",
      condition: product.condition || "",
      location: product.location || "",
      isActive: product.isActive ?? true,
      isPublic: product.isPublic ?? true,
    });
  }, [open, product]);

  // ===============================
  // FETCH CATEGORIES
  // ===============================

  useEffect(() => {
    if (!open) return;

    if (categories.length) return;

    categoriesService.getCategories(dispatch);
  }, [dispatch, open, categories.length]);

  // ===============================
  // HANDLE CHANGE
  // ===============================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===============================
  // HANDLE UPDATE
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product?.id) {
      toast.error("Product not found!");
      return;
    }

    try {
      setSubmitting(true);

      const updateData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        categoryId: form.categoryId,
        condition: form.condition,
        location: form.location,
        isActive: form.isActive,
        isPublic: form.isPublic,
      };

      await dispatch(
        updateSellerProduct({
          productId: product.id,
          data: updateData,
        }),
      ).unwrap();

      toast.success("Product updated successfully!", {
        duration: 2500,
      });

      onClose();
    } catch (error) {
      console.error("Update product failed:", error);

      toast.error(
        error?.message ||
          error ||
          "Failed to update product. Please try again.",
        {
          duration: 3000,
        },
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        {/* HEADER */}
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <PackageCheck size={22} />
            </div>

            <div>
              <h2>Update Product</h2>
              <p>Update your product information</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>

            <input
              name="name"
              placeholder="Nike Air Force"
              value={form.name}
              onChange={handleChange}
              required
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
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
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
              <label>Condition</label>

              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Condition --</option>
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                name="location"
                placeholder="Da Nang"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="switch-group">
            <label className="switch-item">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />

              <span className="switch" />

              <span className="switch-label">
                <strong>Active Product</strong>
                <small>Product is available for customers</small>
              </span>
            </label>

            <label className="switch-item">
              <input
                type="checkbox"
                name="isPublic"
                checked={form.isPublic}
                onChange={handleChange}
              />

              <span className="switch" />

              <span className="switch-label">
                <strong>Public Product</strong>
                <small>Allow this product to be visible publicly</small>
              </span>
            </label>
          </div>

          {/* ACTIONS */}
          <div className="actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button type="submit" className="create-btn" disabled={submitting}>
              {submitting ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
