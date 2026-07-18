import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSellerProduct } from "../../../../redux/slice/seller/product/thunk";
import { categoriesService } from "../../../../service/categoriesService";
import "./style.scss";
import { toast } from "react-hot-toast";
import { X, PackagePlus } from "lucide-react";
const AddProductModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
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
    e.stopPropagation();

    try {
      await dispatch(
        createSellerProduct({
          ...form,
          price: Number(form.price),
        }),
      ).unwrap();

      toast.success("Product created successfully!", {
        position: "top-right",
        autoClose: 2500,
      });

      onClose();
    } catch (error) {
      console.error("Create product failed:", error);

      toast.error(
        error?.message ||
          error?.data?.message ||
          "Failed to create product. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
        },
      );
    }
  };

  useEffect(() => {
    if (!open) return;

    if (categories.length) return;

    categoriesService.getCategories(dispatch);
  }, [dispatch, open, categories.length]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <PackagePlus size={22} />
            </div>

            <div>
              <h2>Create Product</h2>
              <p>Add a new product to your store</p>
            </div>
          </div>
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
