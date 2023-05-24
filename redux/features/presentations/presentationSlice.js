import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employees: [],
  presentations: [],
};
const URL = "http://localhost:3000/api";
export const fetchPresentations = createAsyncThunk(
  "fetchPresentations",
  async (department_name, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${URL}/presentation/all?department_name=${department_name}`
      );
      console.log(resp.data);
      return resp.data?.allPresentations;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const fetchEmployees = createAsyncThunk(
  "fetchEmployees",
  async (department) => {
    const resp = await axios.get(
      `${URL}/presentation/employees?department=${department}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
export const createPresentation = createAsyncThunk(
  "createPresentation",
  async (data) => {
    const resp = await axios.post(`${URL}/presentation/create`, data);
    console.log(resp);
    return resp.data;
  }
);
const presentationSlice = createSlice({
  name: "presentation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchPresentations.fulfilled, (state, action) => {
        console.log(action.payload);
        state.presentations = action.payload;
      });
  },
});

export default presentationSlice.reducer;
