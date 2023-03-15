import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  panel: [],
};
export const fetchPanels = createAsyncThunk(
  "fetchPanels",
  async (department_name) => {
    const resp = await axios.get(
      `http://localhost:3000/api/panel/panel?department_name=${department_name}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
export const createPanels = createAsyncThunk("createPanels", async (data) => {
  const resp = await axios.post(`http://localhost:3000/api/panel/panel`, data);
  console.log(resp.data);
  return resp.data;
});

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPanels.fulfilled, (state, action) => {
      state.panel = action.payload;
    });
  },
});
export default panelSlice.reducer;
