import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  departments: [],
};
const URL = "http://localhost:3000/api";
export const fetchDepartments = createAsyncThunk(
  "departments/fetch",
  async () => {
    const response = await axios.get(`${URL}/departement/departement`);
    console.log(response);
    return response.data;
  }
);
export const updateDepartments = createAsyncThunk(
  "departments/update",
  async (value) => {
    const response = await axios.put(`${URL}/departement/departement`, value);
    console.log(response);
    return response.data;
  }
);
const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {},
  extraReducers(builders) {
    builders.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
    });
  },
});
export default superAdminSlice.reducer;
