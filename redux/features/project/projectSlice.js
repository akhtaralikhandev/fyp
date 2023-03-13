import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  project: [],
};
export const fetchProject = createAsyncThunk(
  "fetchProject",
  async (projectId) => {
    const response = await axios.get(
      `http://localhost:3000/api/student/id?id=${projectId}`
    );
    console.log(response);
    return response.data;
  }
);
export const updateProject = createAsyncThunk("updateProject", async (data) => {
  const response = await axios.put(
    `http://localhost:3000/api/project/update?projectId=${data.projectId}`,
    data
  );
  console.log(response);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.project = action.payload.project;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.project = action.payload;
      });
  },
});

export default projectSlice.reducer;
