import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employee: [],
  employeeError: "",
  render: "",
  projectId: "",
};
export const AcceptOrRejectSupervisingRequest = createAsyncThunk(
  "acceptOrReject",
  async (data) => {
    const resp = await axios.put(
      `${process.env.URL}/supervisor/projectRequest`,
      data
    );
    console.log(resp);
    return resp.data;
  }
);
export const fetchEmployee = createAsyncThunk(
  "fetch/employee",
  async (email) => {
    const resp = await axios.get(
      `${process.env.URL}/employee/employee?email=${email}`
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
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
  },
});
export const { setRender, setProjectId } = employeeSlice.actions;
export default employeeSlice.reducer;
