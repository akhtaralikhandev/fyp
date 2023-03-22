import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  joinRequest: [],
  student: [],
  projects: [],
  havingProject: true,
  projectId: "",
};
export const fetchStudents = createAsyncThunk(
  "fetchStudents",
  async (reg_no) => {
    const resp = await axios.get(
      `http://localhost:3000/api/student/student?reg_no=${reg_no}`,
      {
        reg_no: reg_no,
      }
    );
    console.log(resp);
    //   console.log(departement_name);
    return resp.data;
  }
);
export const fetProject = createAsyncThunk("fetchProject2", async () => {
  const resp = await axios.get("http://localhost:3000/api/project/id?id=9");
  console.log("fetc project called from student slice");
  console.log(resp);
  return resp.data;
});
export const joinRequests = createAsyncThunk("joinRequest", async (data) => {
  const resp = await axios.post(
    `http://localhost:3000/api/project/joinRequest`,
    {
      reg_no: data.reg_no,
      projectId: data.projectId,
    }
  );
  console.log(resp);
  //   console.log(departement_name);
  return resp.data;
});
export const leaveGroup = createAsyncThunk("joinRequest", async (reg_no) => {
  const resp = await axios.put(`http://localhost:3000/api/project/leave`, {
    reg_no: reg_no,
  });
  console.log(resp);
  // update session if the request was successful

  return resp.data;
});

export const fetchJoinRequests = createAsyncThunk(
  "fetchJoinRequests",
  async (projectId) => {
    const resp = await axios.get(
      `http://localhost:3000/api/project/joinRequest?projectId=${projectId}`
    );
    console.log("fetchJoin Requests slice ");
    return resp.data;
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    HavingProject: (state, action) => {
      state.havingProject = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.student = action.payload;
      })
      .addCase(fetProject.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchJoinRequests.fulfilled, (state, action) => {
        state.joinRequest = action.payload;
      });
  },
});
export const { HavingProject, setProjectId } = studentSlice.actions;
export default studentSlice.reducer;
