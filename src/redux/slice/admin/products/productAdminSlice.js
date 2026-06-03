import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,

  loading: false,
  error: null,
};

const productAdminSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
});

export default productAdminSlice.reducer;
