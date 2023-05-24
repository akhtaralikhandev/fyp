import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  project: [],
  allProjects: [],
};
const URL = "http://localhost:3000/api";
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
export const fetchAllProjects = createAsyncThunk(
  "fetchAllProjects",
  async (department_name, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${URL}/project/all?department_name=${department_name}`
      );
      console.log("this is from project slice ok done ");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
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
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload;
      });
  },
});

export default projectSlice.reducer;
