import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  updateCategoryStatus,
} from "../../../redux/slice/admin/categories/categoriesThunk";
import toast from "react-hot-toast";

import "./style.scss";

const ITEMS_PER_PAGE = 7;

export default function Categories() {
  const dispatch = useDispatch();

  const {
    categories = [],
    loading,
    createLoading,
    updateLoading,
    statusLoading,
  } = useSelector((state) => state.categoriesAdmin);

  // ==============================
  // STATE
  // ==============================

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [statusTarget, setStatusTarget] = useState(null);
  const [statusReason, setStatusReason] = useState("");

  // ==============================
  // FETCH ALL CATEGORIES
  // ==============================

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ==============================
  // FILTER
  // ==============================

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return categories.filter((item) => {
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

  // ==============================
  // PAGINATION
  // ==============================

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage]);

  // ==============================
  // FIXED TABLE HEIGHT
  // ALWAYS 7 ROWS
  // ==============================

  const displayCategories = useMemo(() => {
    const items = [...paginatedCategories];

    while (items.length < ITEMS_PER_PAGE) {
      items.push(null);
    }

    return items;
  }, [paginatedCategories]);

  // ==============================
  // STATISTICS
  // ==============================

  const totalCategories = categories.length;

  const activeCategories = categories.filter((item) => item.isActive).length;

  const inactiveCategories = categories.filter((item) => !item.isActive).length;

  // ==============================
  // MODAL
  // ==============================

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
    if (createLoading || updateLoading) {
      return;
    }

    setIsModalOpen(false);

    setEditingId(null);

    setFormData({
      name: "",
      slug: "",
    });
  };

  // ==============================
  // CREATE / UPDATE
  // ==============================

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

      // Fetch lại toàn bộ categories
      await dispatch(fetchCategories());

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenStatusModal = (item) => {
    setStatusTarget(item);
    setStatusReason("");
  };

  const handleCloseStatusModal = () => {
    if (statusLoading) return;
    setStatusTarget(null);
    setStatusReason("");
  };

  const handleSubmitStatus = async (event) => {
    event.preventDefault();

    if (!statusTarget?.id) {
      toast.error("Category id is missing");
      return;
    }

    const nextIsActive = !statusTarget.isActive;

    try {
      await dispatch(
        updateCategoryStatus({
          id: statusTarget.id,
          payload: {
            isActive: nextIsActive,
            reason: statusReason.trim() || null,
          },
        }),
      ).unwrap();

      toast.success(
        nextIsActive
          ? "Category activated successfully"
          : "Category disabled successfully",
      );
      await dispatch(fetchCategories());
      handleCloseStatusModal();
    } catch (error) {
      toast.error(error || "Update category status failed");
    }
  };

  // ==============================
  // PAGINATION ACTIONS
  // ==============================

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <div className="categories">
      {/* ==============================
          PAGE HEADING
      ============================== */}

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

      {/* ==============================
          MAIN CARD
      ============================== */}

      <div className="categories__card">
        {/* ==============================
            TOOLBAR
        ============================== */}

        <div className="categories__toolbar">
          <div className="categories__tabs">
            <button
              className={statusFilter === "all" ? "active" : ""}
              onClick={() => {
                setStatusFilter("all");
                setPage(1);
              }}
            >
              All
              <span>{totalCategories}</span>
            </button>

            <button
              className={statusFilter === "active" ? "active" : ""}
              onClick={() => {
                setStatusFilter("active");
                setPage(1);
              }}
            >
              Active
              <span>{activeCategories}</span>
            </button>

            <button
              className={statusFilter === "inactive" ? "active" : ""}
              onClick={() => {
                setStatusFilter("inactive");
                setPage(1);
              }}
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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* ==============================
            TABLE
        ============================== */}

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
                  displayCategories.map((item, index) => {
                    // Empty row
                    if (!item) {
                      return (
                        <tr key={`empty-${index}`} className="empty-row">
                          <td colSpan="5"></td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={item.id}>
                        {/* CATEGORY */}

                        <td>
                          <div className="category-name">
                            <div className="category-icon">
                              {item.name?.charAt(0).toUpperCase()}
                            </div>

                            <span>{item.name}</span>
                          </div>
                        </td>

                        {/* SLUG */}

                        <td>
                          <span className="category-slug">{item.slug}</span>
                        </td>

                        {/* STATUS */}

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

                        {/* CREATED */}

                        <td>
                          <span className="created-date">
                            {new Date(item.createdAtUtc).toLocaleDateString(
                              "en-CA",
                            )}
                          </span>
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="category-actions">
                            <button
                              className="action-btn edit"
                              onClick={() => handleEdit(item)}
                              title="Edit category"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              className={`action-btn ${
                                item.isActive ? "delete" : "activate"
                              }`}
                              onClick={() => handleOpenStatusModal(item)}
                              title={
                                item.isActive
                                  ? "Disable category"
                                  : "Activate category"
                              }
                              disabled={statusLoading}
                            >
                              {item.isActive ? (
                                <X size={15} />
                              ) : (
                                <Check size={15} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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

        {/* ==============================
            PAGINATION
        ============================== */}

        <div className="categories__pagination">
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <div>
            <button disabled={currentPage <= 1} onClick={handlePreviousPage}>
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={handleNextPage}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ==============================
          MODAL
      ============================== */}

      {isModalOpen && (
        <div className="category-modal-overlay" onClick={handleCloseModal}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}

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

            {/* FORM */}

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

              {/* FOOTER */}

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

      {statusTarget && (
        <div className="category-modal-overlay" onClick={handleCloseStatusModal}>
          <form
            className="category-modal category-modal--compact"
            onClick={(event) => event.stopPropagation()}
            onSubmit={handleSubmitStatus}
          >
            <div className="category-modal__header">
              <div className="category-modal__title">
                <div className="category-modal__icon">
                  {statusTarget.isActive ? <X size={16} /> : <Check size={16} />}
                </div>

                <div>
                  <h2>
                    {statusTarget.isActive
                      ? "Disable Category"
                      : "Activate Category"}
                  </h2>

                  <p>{statusTarget.name}</p>
                </div>
              </div>

              <button
                type="button"
                className="category-modal__close"
                onClick={handleCloseStatusModal}
              >
                <X size={17} />
              </button>
            </div>

            <label className="category-status-reason">
              Reason
              <textarea
                value={statusReason}
                maxLength={500}
                placeholder="Optional reason for status change"
                onChange={(event) => setStatusReason(event.target.value)}
              />
            </label>

            <div className="category-modal__footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCloseStatusModal}
                disabled={statusLoading}
              >
                Cancel
              </button>

              <button type="submit" className="submit-btn" disabled={statusLoading}>
                {statusLoading ? "Saving..." : "Confirm"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
