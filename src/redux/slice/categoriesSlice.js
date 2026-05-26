import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  pending: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategories(state, action) {
      state.categoies = action.payload;
    },
    isPending(state, action) {
      state.pending = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { isPending } = categoriesSlice.actions;

export default categoriesSlice.reducer;
