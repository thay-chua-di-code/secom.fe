import { createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "../../../../service/sellerService";

export const getSellerWalletThunk = createAsyncThunk(
  "sellerWallet/getWallet",
  async (_, thunkAPI) => {
    try {
      const response = await sellerService.getWalletSeller();
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
