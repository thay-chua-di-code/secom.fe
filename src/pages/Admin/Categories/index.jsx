import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(
        updateCategory({
          id: editingId,
          payload: formData,
        }),
      ).then(() => {
        dispatch(
          fetchCategories({
            pageNumber: page,
            pageSize: 10,
          }),
        );
      });
    } else {
      dispatch(createCategory(formData)).then(() => {
        dispatch(
          fetchCategories({
            pageNumber: page,
            pageSize: 10,
          }),
        );
      });
    }

    setFormData({
      name: "",
      slug: "",
    });

    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name,
      slug: item.slug,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;

    dispatch(deleteCategory(id));
  };

  return (
    <div className="categories">
      <div className="categories__header">
        <h1>Category Management</h1>
      </div>

      <div className="categories__form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value,
              })
            }
          />

          <button type="submit" disabled={createLoading || updateLoading}>
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <div className="categories__table">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>{item.slug}</td>

                  <td>
                    {item.isActive ? (
                      <span className="active">Active</span>
                    ) : (
                      <span className="inactive">Inactive</span>
                    )}
                  </td>

                  <td>{new Date(item.createdAtUtc).toLocaleDateString()}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
{/* 
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="categories__pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>
          Page {pagination.pageNumber} /{pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
