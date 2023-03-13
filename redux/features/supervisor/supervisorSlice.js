import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  projects: [],
  students: [],
  error: "",
  index: 0,
};

export const fetchProjects = createAsyncThunk(
  "fetchProjects",
  async (supervisor_email) => {
    const resp = await axios.get(
      `http://localhost:3000/api/supervisor/projectList?supervisor_email=${supervisor_email}`
    );
    console.log(resp);
    console.log(supervisor_email);
    return resp.data;
  }
);
export const fetch_students_of_group = createAsyncThunk(
  "fetch_student",
  async (projectId) => {
    const resp = await axios.get(
      `http://localhost:3000/api/coordinator/students?projectId=${projectId}`
    );
    console.log(projectId);
    console.log(resp);
    return resp.data;
  }
);
export const handleProjectApproval = createAsyncThunk(
  "project/approval",
  async (data) => {
    try {
      const resp = await axios.put(
        "http://localhost:3000/api/supervisor/projectList",
        {
          id: data.projectId,
          status: data.status,
          supervisor_accepted: data.supervisor_accepted,
        }
      );
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const handleStudentRemoval = createAsyncThunk(
  "project/student_removal",
  async (reg_no) => {
    try {
      const resp = await axios.delete(
        `http://localhost:3000/api/coordinator/students?reg_no=${reg_no}`
      );
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const handleAddingStudent = createAsyncThunk(
  "project/adding_student",
  async (data) => {
    try {
      const resp = await axios.post(
        `http://localhost:3000/api/coordinator/students?reg_no=${data.reg_no}`,
        {
          projectId: data.projectId,
        }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const handleEditingStudent = createAsyncThunk(
  "project/adding_student",
  async (data) => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/api/coordinator/students?reg_no=${data.reg_no}`,
        {
          data,
        }
      );
      console.log(resp);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);

const superVisorSlice = createSlice({
  name: "coordinator",
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    removeStudent: (state, action) => {
      console.log(action.payload);
      state.students = state.students.filter(
        (x) => x.reg_no !== action.payload
      );
    },
    updateProjectStatus: (state, action) => {
      const { projectId, status } = action.payload;
      const projectIndex = state.projects.findIndex(
        (project) => project.id === projectId
      );
      if (projectIndex !== -1) {
        state.projects[projectIndex].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetch_students_of_group.fulfilled, (state, action) => {
        console.log(action.payload);
        state.students = action.payload;
      })
      .addCase(handleAddingStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      });
  },
});
export const { setIndex, removeStudent, updateProjectStatus } =
  superVisorSlice.actions;
export default superVisorSlice.reducer;
