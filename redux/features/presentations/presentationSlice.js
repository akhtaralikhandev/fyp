import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employees: [],
};
export const fetchEmployees = createAsyncThunk(
  "fetchEmployees",
  async (department) => {
    const resp = await axios.get(
      `http://localhost:3000/api/presentation/employees?department=${department}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
export const createPresentation = createAsyncThunk(
  "createPresentation",
  async (data) => {
    const resp = await axios.post(
      "http://localhost:3000/api/presentation/create",
      data
    );
    console.log(resp);
    return resp.data;
  }
);
const presentationSlice = createSlice({
  name: "presentation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export default presentationSlice.reducer;
