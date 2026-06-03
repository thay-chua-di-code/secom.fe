import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const orderAdminSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // thêm sau
  },
});

export default orderAdminSlice.reducer;
