import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
} from "./categoriesThunk";

const initialState = {
  categories: [],

  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },

  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  statusLoading: false,

  success: false,
  error: null,
};

const categorySlice = createSlice({
  name: "adminCategory",

  initialState,

  reducers: {
    clearCategoryState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // GET ALL
      // =====================

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload.data.items;

        state.pagination = {
          pageNumber: action.payload.data.pageNumber,
          pageSize: action.payload.data.pageSize,
          totalCount: action.payload.data.totalCount,
          totalPages: action.payload.data.totalPages,
        };
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // CREATE
      // =====================

      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })

      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
        state.success = true;
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      // =====================
      // UPDATE
      // =====================

      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })

      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
        state.success = true;
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })

      // =====================
      // DELETE
      // =====================

      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.categories = state.categories.filter(
          (item) => item.id !== action.payload,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =====================
      // UPDATE STATUS
      // =====================

      .addCase(updateCategoryStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        const updatedCategory = action.payload?.data ?? action.payload;
        const categoryId = updatedCategory?.id ?? updatedCategory?.categoryId;
        const index = state.categories.findIndex(
          (item) => String(item.id ?? item.categoryId) === String(categoryId),
        );

        state.statusLoading = false;
        state.success = true;

        if (index !== -1) {
          state.categories[index] = {
            ...state.categories[index],
            ...updatedCategory,
          };
        }
      })
      .addCase(updateCategoryStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
