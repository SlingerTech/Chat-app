import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserDetails: {},
};

const StudentSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.UserDetails = action.payload;
    },
  },
});

export const { setUserDetails } = StudentSlice.actions;

export default StudentSlice.reducer;
