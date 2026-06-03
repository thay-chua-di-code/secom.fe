import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userAdminSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // thêm sau
  },
});

export default userAdminSlice.reducer;
