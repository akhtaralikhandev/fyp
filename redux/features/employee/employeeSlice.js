import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employee: [],
  employeeError: "",
  render: "",
  projectId: "",
  presentations: [],
};
const URL = "http://localhost:3000/api";
export const AcceptOrRejectSupervisingRequest = createAsyncThunk(
  "acceptOrReject",
  async (data) => {
    const resp = await axios.put(`${URL}/supervisor/projectRequest`, data);
    console.log(resp);
    return resp.data;
  }
);
export const fetchEmployee = createAsyncThunk(
  "fetch/employee",
  async (email) => {
    const resp = await axios.get(`${URL}/employee/employee?email=${email}`);
    console.log(resp.data);
    return resp.data;
  }
);
export const fetchPresentations = createAsyncThunk(
  "fetch/presentations",
  async (panelId) => {
    const resp = await axios.get(
      `${URL}/employee/presentations?panelId=${panelId}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setRender: (state, action) => {
      state.render = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
      })
      .addCase(fetchPresentations.fulfilled, (state, action) => {
        console.log("these are presentations");
        console.log(action.payload?.projects);
        state.presentations = action.payload?.projects;
      });
  },
});
export const { setRender, setProjectId } = employeeSlice.actions;
export default employeeSlice.reducer;
