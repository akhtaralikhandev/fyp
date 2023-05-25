import { RequestStatus } from "@prisma/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  joinRequest: [],
  student: [],
  projects: [],
  havingProject: true,
  projectId: "",
  render: "",
  studentRegisterSuccess: "",
  studentRegisterFailure: "",
  addingStudentByStudentError: "",
  login: false,
  registerStudentPending: false,
};
const BASE_URL = process.env.BASE_URL; // Assuming you have BASE_URL defined in your environment variables
const URL = `${BASE_URL}/api`; // Concatenate the BASE_URL with the endpoint
export const registerStudent = createAsyncThunk(
  "createStudent",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(
        `/api/student/register`, // Use the complete URL including the endpoint

        data,
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": URL,
          },
        }
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data);
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
export const fetchStudents = createAsyncThunk(
  "fetchStudents",
  async (reg_no) => {
    const resp = await axios.get(`${URL}/student/student?reg_no=${reg_no}`, {
      reg_no: reg_no,
    });
    console.log(resp);
    console.log("fetch students from student slice");
    return resp.data;
  }
);
export const fetProject = createAsyncThunk("fetchProject2", async (id) => {
  const resp = await axios.get(`${URL}/project/id?id=${id}`);
  console.log("fetc project called from student slice");
  console.log(resp.data);
  return resp.data;
});
export const joinRequests = createAsyncThunk("joinRequest", async (data) => {
  const resp = await axios.post(`${URL}/project/joinRequest`, {
    reg_no: data.reg_no,
    projectId: data.projectId,
  });
  console.log("join requests from student slice");
  console.log(resp);
  //   console.log(departement_name);
  return resp.data;
});
export const undoJoinRequests = createAsyncThunk(
  "undoJoinRequest",
  async (requestId) => {
    const resp = await axios.put(`${URL}/project/joinRequest`, {
      id: requestId,
      status: RequestStatus.REJECTED,
    });
    console.log("join requests from student slice");
    console.log(resp);
    //   console.log(departement_name);
    return resp.data;
  }
);
export const leaveGroup = createAsyncThunk("joinRequest", async (reg_no) => {
  const resp = await axios.put(`${URL}/project/leave`, {
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
      `${URL}/project/joinRequest?projectId=${projectId}`
    );
    console.log("fetchJoin Requests slice ");
    console.log(resp.data);
    return resp.data;
  }
);
export const studentProjectApproval = createAsyncThunk(
  "project/adding_student",
  async (data) => {
    try {
      const resp = await axios.put(
        `${URL}/project/joinRequest?reg_no=${data.reg_no}&projectId=${data.projectId}&id=${data.id}`,
        {
          projectId: data.projectId,
          status: data.status,
        }
      );
      console.log("this  is the data from the response object adding approval");
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const addStudentByAdminStudent = createAsyncThunk(
  "addStudentByAdminStudent",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/api/student/addStudent?reg_no=${data.reg_no}&projectId=${data.projectId}`,
        data
      );
      console.log(resp.data);
      console.log("this is the edited project");
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const removeStudentByAdminStudent = createAsyncThunk(
  "removeStudentByAdminStudent",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${URL}/student/addStudent?reg_no=${data.reg_no}&projectId=${data.projectId}`,
        data
      );
      console.log(resp.data);
      console.log("this is the edited project");
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    gotoLogin2: (state, action) => {
      state.login = false;
    },
    HavingProject: (state, action) => {
      state.havingProject = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
    setRender: (state, action) => {
      state.render = action.payload;
    },
    clearMsg: (state, action) => {
      state.studentRegisterSuccess = action.payload;
    },
    clearFailure: (state, action) => {
      state.studentRegisterFailure = action.payload;
    },
    clearAddingStudentError: (state, action) => {
      state.addingStudentByStudentError = action.payload;
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
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        console.log(action.payload);
        state.projects = action.payload.project;
      })
      .addCase(undoJoinRequests.fulfilled, (state, action) => {
        state.student.ProjectJoiningRequest =
          state.student.ProjectJoiningRequest.filter(
            (x) => x?.id !== action.payload.project.id
          );
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.studentRegisterSuccess = "Account Created Plz very your email";
        state.login = true;
        state.registerStudentPending = false;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.studentRegisterFailure = action.payload;
        state.registerStudentPending = false;
      })
      .addCase(registerStudent.pending, (state, action) => {
        state.registerStudentPending = true;
      })
      .addCase(joinRequests.fulfilled, (state, action) => {
        state.student.ProjectJoiningRequest.push(action.payload.project);
      })
      .addCase(studentProjectApproval.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("this is the action.payload from student sliceeee");

        state.projects.students = action.payload.Project.students;
        state.projects.student_request = action.payload.Project.student_request;
      })
      .addCase(addStudentByAdminStudent.fulfilled, (state, action) => {
        state.projects.students.push(action.payload);
      })
      .addCase(removeStudentByAdminStudent.fulfilled, (state, action) => {
        state.projects.students = state.projects.students.filter(
          (x) => x?.reg_no !== action.payload.reg_no
        );
      })
      .addCase(addStudentByAdminStudent.rejected, (state, action) => {
        state.addingStudentByStudentError = action.payload;
      });
  },
});
export const {
  HavingProject,
  clearMsg,
  clearFailure,
  setProjectId,
  setRender,
  clearAddingStudentError,
  gotoLogin2,
} = studentSlice.actions;
export default studentSlice.reducer;
