import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSellerProduct } from "../../../../redux/slice/seller/product/thunk";
import { categoriesService } from "../../../../service/categoriesService";
import "./style.scss";
const AddProductModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    condition: "",
    location: "",
    isPublic: true,
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

    const result = await dispatch(
      createSellerProduct({
        ...form,
        price: Number(form.price),
      }),
    );

    onClose();
  };

  useEffect(() => {
    if (!open) return;

    if (categories.length) return;

    categoriesService.getCategories(dispatch);
  }, [dispatch, open, categories.length]);

  if (!open) return null;

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="product-modal loading-modal">
          <div className="spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h2>Create Product</h2>

          <button type="button" className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              name="name"
              placeholder="Nike Air Force"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Product description..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                placeholder="100"
                value={form.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
              >
                <option value="">-- Select Category --</option>

                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Condition</label>

              <input
                name="condition"
                placeholder="New"
                value={form.condition}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                name="location"
                placeholder="Ha Noi"
                value={form.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
            />

            <span>Public Product</span>
          </div>

          <div className="actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button className="create-btn" type="submit">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
