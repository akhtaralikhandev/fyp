import { createSlice } from "@reduxjs/toolkit";
import { signOut2 } from "../../app/store";
const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signOut2, (state) => {
      state.user = [];
    });
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
