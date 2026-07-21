import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../redux/slice/admin/categories/categoriesThunk";

import "./style.scss";

export default function Categories() {
  const dispatch = useDispatch();

  const { categories, pagination, loading, createLoading, updateLoading } =
    useSelector((state) => state.categoriesAdmin);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchCategories({
        pageNumber: page,
        pageSize: 10,
      }),
    );
  }, [dispatch, page]);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.name?.toLowerCase().includes(keyword) ||
        item.slug?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && item.isActive) ||
        (statusFilter === "inactive" && !item.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const handleOpenCreate = () => {
    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
    });

    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      slug: item.slug,
    });

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (createLoading || updateLoading) return;

    setIsModalOpen(false);

    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await dispatch(
          updateCategory({
            id: editingId,
            payload: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createCategory(formData)).unwrap();
      }

      await dispatch(
        fetchCategories({
          pageNumber: page,
          pageSize: 10,
        }),
      );

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    await dispatch(deleteCategory(id));

    dispatch(
      fetchCategories({
        pageNumber: page,
        pageSize: 10,
      }),
    );
  };

  const totalCategories = pagination?.totalCount || categories.length;

  const activeCategories = categories.filter((item) => item.isActive).length;

  const inactiveCategories = categories.filter((item) => !item.isActive).length;

  return (
    <div className="categories">
      {/* Page Heading */}
      <div className="categories__heading">
        <div>
          <h1>Categories</h1>

          <p>{totalCategories} categories registered</p>
        </div>

        <button className="categories__add-btn" onClick={handleOpenCreate}>
          <Plus size={16} />

          <span>Add Category</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="categories__card">
        {/* Toolbar */}
        <div className="categories__toolbar">
          <div className="categories__tabs">
            <button
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => setStatusFilter("all")}
            >
              All
              <span>{totalCategories}</span>
            </button>

            <button
              className={statusFilter === "active" ? "active" : ""}
              onClick={() => setStatusFilter("active")}
            >
              Active
              <span>{activeCategories}</span>
            </button>

            <button
              className={statusFilter === "inactive" ? "active" : ""}
              onClick={() => setStatusFilter("inactive")}
            >
              Inactive
              <span>{inactiveCategories}</span>
            </button>
          </div>

          <div className="categories__search">
            <Search size={15} />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="categories__table-wrapper">
          {loading ? (
            <div className="categories__loading">Loading categories...</div>
          ) : (
            <table className="categories__table">
              <thead>
                <tr>
                  <th>CATEGORY</th>
                  <th>SLUG</th>
                  <th>STATUS</th>
                  <th>CREATED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="category-name">
                          <div className="category-icon">
                            {item.name?.charAt(0).toUpperCase()}
                          </div>

                          <span>{item.name}</span>
                        </div>
                      </td>

                      <td>
                        <span className="category-slug">{item.slug}</span>
                      </td>

                      <td>
                        {item.isActive ? (
                          <span className="status active">
                            <Check size={12} />
                            Active
                          </span>
                        ) : (
                          <span className="status inactive">
                            <X size={12} />
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <span className="created-date">
                          {new Date(item.createdAtUtc).toLocaleDateString(
                            "en-CA",
                          )}
                        </span>
                      </td>

                      <td>
                        <div className="category-actions">
                          <button
                            className="action-btn edit"
                            onClick={() => handleEdit(item)}
                            title="Edit category"
                          >
                            <Pencil size={15} />
                          </button>

                          {/* <button
                            className="action-btn delete"
                            onClick={() => handleDelete(item.id)}
                            title="Delete category"
                          >
                            <Trash2 size={15} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="categories__pagination">
          <span>
            Page {pagination?.pageNumber || page} of{" "}
            {pagination?.totalPages || 1}
          </span>

          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={
                page === pagination?.totalPages || !pagination?.totalPages
              }
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="category-modal-overlay" onClick={handleCloseModal}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="category-modal__header">
              <div className="category-modal__title">
                <div className="category-modal__icon">
                  {editingId ? <Pencil size={16} /> : <Plus size={16} />}
                </div>

                <div>
                  <h2>{editingId ? "Edit Category" : "Add Category"}</h2>

                  <p>
                    {editingId
                      ? "Update category information"
                      : "Create a new category"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="category-modal__close"
                onClick={handleCloseModal}
              >
                <X size={17} />
              </button>
            </div>

            {/* Modal Body */}
            <form className="category-modal__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category-name">Category Name</label>

                <input
                  id="category-name"
                  type="text"
                  placeholder="e.g. Electronics"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category-slug">Slug</label>

                <input
                  id="category-slug"
                  type="text"
                  placeholder="e.g. electronics"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="category-modal__footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={createLoading || updateLoading}
                >
                  {createLoading || updateLoading
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
