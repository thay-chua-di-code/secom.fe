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
  },

  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.items;

        state.pagination = action.payload.pagination;
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
    builder.addCase(deleteSellerProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (p) => p.productId !== action.payload,
      );
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
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;

      const product = state.products.find((p) => p.productId === productId);

      if (product) {
        product.stock = quantity;
      }

      if (state.productDetail && state.productDetail.productId === productId) {
        state.productDetail.stock = quantity;
      }
    });
  },
});

export const { clearProductDetail, clearSellerError } =
  sellerProductSlice.actions;

export default sellerProductSlice.reducer;
