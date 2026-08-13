import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSellerProducts,
  fetchSellerProductById,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
  inactiveSellerProduct,
  updateInventory,
} from "./thunk";

const initialState = {
  products: [],
  productDetail: null,
  loading: false,
  actionLoading: false,
  error: null,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {
    clearProductDetail(state) {
      state.productDetail = null;
    },

    clearSellerError(state) {
      state.error = null;
    },

    productCreatedRealtime(state, action) {
      const incoming = action.payload;
      const incomingId = incoming?.productId || incoming?.id;
      if (!incomingId) return;

      const index = state.products.findIndex(
        (product) => (product.productId || product.id) === incomingId,
      );

      if (index >= 0) {
        state.products[index] = {
          ...state.products[index],
          ...incoming,
        };
        return;
      }

      if (state.products.length < Number(state.pagination.pageSize || 10)) {
        state.products.unshift(incoming);
      }

      state.pagination.totalCount = Number(state.pagination.totalCount || 0) + 1;
    },

    productUpdatedRealtime(state, action) {
      const incoming = action.payload;
      const incomingId = incoming?.productId || incoming?.id;
      if (!incomingId) return;

      const index = state.products.findIndex(
        (product) => (product.productId || product.id) === incomingId,
      );

      if (index >= 0) {
        state.products[index] = {
          ...state.products[index],
          ...incoming,
        };
      }

      if (state.productDetail && (state.productDetail.productId || state.productDetail.id) === incomingId) {
        state.productDetail = {
          ...state.productDetail,
          ...incoming,
        };
      }
    },

    productDeletedRealtime(state, action) {
      const payload = action.payload;
      const productId = payload?.productId || payload;
      if (!productId) return;

      const hadProduct = state.products.some(
        (product) => (product.productId || product.id) === productId,
      );

      state.products = state.products.filter(
        (product) => (product.productId || product.id) !== productId,
      );

      if (state.productDetail && (state.productDetail.productId || state.productDetail.id) === productId) {
        state.productDetail = null;
      }

      if (hadProduct) {
        state.pagination.totalCount = Math.max(Number(state.pagination.totalCount || 0) - 1, 0);
      }
    },

    productStockUpdatedRealtime(state, action) {
      const { productId, stockQuantity, lowStockThreshold, isLowStock } = action.payload || {};
      if (!productId) return;

      const product = state.products.find((item) => (item.productId || item.id) === productId);
      if (product) {
        product.stock = stockQuantity;
        product.stockQuantity = stockQuantity;
        product.lowStockThreshold = lowStockThreshold;
        product.isLowStock = isLowStock;
      }

      if (state.productDetail && (state.productDetail.productId || state.productDetail.id) === productId) {
        state.productDetail.stock = stockQuantity;
        state.productDetail.stockQuantity = stockQuantity;
        state.productDetail.lowStockThreshold = lowStockThreshold;
        state.productDetail.isLowStock = isLowStock;
      }
    },
  },

  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.items || [];

        state.pagination = action.payload.pagination || initialState.pagination;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // GET DETAIL
    builder
      .addCase(fetchSellerProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchSellerProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE
    builder
      .addCase(createSellerProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createSellerProduct.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.products.unshift(action.payload);
      })
      .addCase(createSellerProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // UPDATE
    builder
      .addCase(updateSellerProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.products.findIndex(
          (p) => p.productId === action.payload.productId,
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }

        state.productDetail = action.payload;
      })
      .addCase(updateSellerProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // DELETE
    builder
      .addCase(deleteSellerProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.products = state.products.filter(
          (p) => (p.productId || p.id) !== action.payload,
        );
        state.pagination.totalCount = Math.max(
          Number(state.pagination.totalCount || 0) - 1,
          0,
        );
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // INACTIVE
    builder.addCase(inactiveSellerProduct.fulfilled, (state, action) => {
      const product = state.products.find(
        (p) => p.productId === action.payload,
      );

      if (product) {
        product.isActive = false;
      }

      if (
        state.productDetail &&
        state.productDetail.productId === action.payload
      ) {
        state.productDetail.isActive = false;
      }
    });

    // UPDATE INVENTORY
    builder
      .addCase(updateInventory.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { productId, stockQuantity, lowStockThreshold } = action.payload;

        const product = state.products.find((p) => (p.productId || p.id) === productId);

        if (product) {
          product.stock = stockQuantity;
          product.stockQuantity = stockQuantity;
          product.lowStockThreshold = lowStockThreshold;
        }

        if (state.productDetail && (state.productDetail.productId || state.productDetail.id) === productId) {
          state.productDetail.stock = stockQuantity;
          state.productDetail.stockQuantity = stockQuantity;
          state.productDetail.lowStockThreshold = lowStockThreshold;
        }
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearProductDetail,
  clearSellerError,
  productCreatedRealtime,
  productUpdatedRealtime,
  productDeletedRealtime,
  productStockUpdatedRealtime,
} =
  sellerProductSlice.actions;

export default sellerProductSlice.reducer;
