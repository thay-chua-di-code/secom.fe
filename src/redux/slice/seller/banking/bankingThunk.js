import { createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "../../../../service/sellerService";

export const fetchSellerBankAccounts = createAsyncThunk(
  "sellerBanking/fetchSellerBankAccounts",
  async (_, { rejectWithValue }) => {
    try {
      return await sellerService.getSellerBankAccounts();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const createSellerBankAccount = createAsyncThunk(
  "sellerBanking/createSellerBankAccount",
  async (data, { rejectWithValue }) => {
    try {
      return await sellerService.createSellerBankAccount(data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const deleteSellerBankAccount = createAsyncThunk(
  "sellerBanking/deleteSellerBankAccount",
  async (id, { rejectWithValue }) => {
    try {
      return await sellerService.deleteSellerBankAccount(id);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);
