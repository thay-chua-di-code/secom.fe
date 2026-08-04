import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminSellers,
  fetchSellerDetail,
  approveSeller,
  rejectSeller,
} from "./thunk";

const initialState = {
  sellers: [],
  sellerDetail: null,
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  loading: false,
  actionLoading: false,
  error: null,
};

const sellerAdminSlice = createSlice({
  name: "sellerAdmin",
  initialState,

  reducers: {
    clearSellerState: (state) => {
      state.sellers = [];
      state.sellerDetail = null;

      state.pageNumber = 1;
      state.pageSize = 10;
      state.totalCount = 0;
      state.totalPages = 0;

      state.loading = false;
      state.actionLoading = false;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch Seller List
      // ===============================
      .addCase(fetchAdminSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminSellers.fulfilled, (state, action) => {
        state.loading = false;

        state.sellers = action.payload.items;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchAdminSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // Fetch Seller Detail
      // ===============================
      .addCase(fetchSellerDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSellerDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerDetail = action.payload;
      })

      .addCase(fetchSellerDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // Approve Seller
      // ===============================
      .addCase(approveSeller.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(approveSeller.fulfilled, (state, action) => {
        state.actionLoading = false;

        const sellerId = action.payload;

        // Update list
        const seller = state.sellers.find((x) => x.id === sellerId);

        if (seller) {
          seller.status = 1;
          seller.statusText = "Approved";
          seller.approvedAtUtc = new Date().toISOString();
        }

        // Update detail if the modal is open
        if (state.sellerDetail && state.sellerDetail.id === sellerId) {
          state.sellerDetail.status = 1;
          state.sellerDetail.statusText = "Approved";
          state.sellerDetail.approvedAtUtc = new Date().toISOString();
        }
      })

      .addCase(approveSeller.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ===============================
      // Reject Seller
      // ===============================
      .addCase(rejectSeller.pending, (state) => {
        state.actionLoading = true;
      })

      .addCase(rejectSeller.fulfilled, (state, action) => {
        state.actionLoading = false;

        const { sellerId, reason } = action.payload;

        const seller = state.sellers.find((x) => x.id === sellerId);

        if (seller) {
          seller.status = 2;
          seller.statusText = "Rejected";
          seller.rejectionReason = reason;
          seller.rejectedAtUtc = new Date().toISOString();
        }

        if (state.sellerDetail && state.sellerDetail.id === sellerId) {
          state.sellerDetail.status = 2;
          state.sellerDetail.statusText = "Rejected";
          state.sellerDetail.rejectionReason = reason;
          state.sellerDetail.rejectedAtUtc = new Date().toISOString();
        }
      })

      .addCase(rejectSeller.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerState } = sellerAdminSlice.actions;

export default sellerAdminSlice.reducer;
