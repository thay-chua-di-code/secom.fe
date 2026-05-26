import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
  userInfo: {},
  pending: false,
};

const userSlice = createSlice({
  initialState: initialValue,
  name: "user",
  reducers: {
    setPending: (state, action) => {
      state.pending = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setPending, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
