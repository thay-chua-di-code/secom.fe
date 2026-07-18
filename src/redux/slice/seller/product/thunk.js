import { createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "../../../../service/sellerService";

// ================= GET ALL =================

export const fetchSellerProducts = createAsyncThunk(
  "sellerProduct/fetchSellerProducts",
  async ({ page = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await sellerService.getProducts(page, pageSize);
      console.log(res);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= GET DETAIL =================

export const fetchSellerProductById = createAsyncThunk(
  "sellerProduct/fetchSellerProductById",
  async (productId, { rejectWithValue }) => {
    try {
      return await sellerService.getProductById(productId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= CREATE =================

export const createSellerProduct = createAsyncThunk(
  "sellerProduct/createSellerProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await sellerService.createProduct(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= UPDATE =================
export const updateSellerProduct = createAsyncThunk(
  "sellerProduct/updateSellerProduct",
  async ({ productId, data }, { rejectWithValue }) => {
    try {
      return await sellerService.updateProduct(productId, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);


// ================= DELETE =================

export const deleteSellerProduct = createAsyncThunk(
  "sellerProduct/deleteSellerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await sellerService.deleteProduct(productId);

      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= INACTIVE =================

export const inactiveSellerProduct = createAsyncThunk(
  "sellerProduct/inactiveSellerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await sellerService.inactiveProduct(productId);

      return productId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// ================= UPDATE INVENTORY =================

export const updateInventory = createAsyncThunk(
  "sellerProduct/updateInventory",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await sellerService.updateInventory(productId, quantity);

      return {
        productId,
        quantity,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
