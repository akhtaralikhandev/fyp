import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  render: "",
  projects: [],
  students: [],
  error: "",
  index: 0,
  createPanel: false,
  presentationsRender: "",
  panelRender: "All Panels",
  viewMoreId: "",
  setViewMore: false,
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
// export const createPresentation = createAsyncThunk(
//   "createPresentation6",
//   async (data) => {
//     const resp = await axios.post(`${URL}/presentation/create`, data);
//     console.log("presentation created ok done ");
//     console.log(resp);
//     return resp.data;
//   }
// );
export const createPresentation = createAsyncThunk(
  "createPresentations6",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(
        `http://localhost:3000/api/coordinator/presentation/create`,
        data
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const fetchProjects = createAsyncThunk(
  "fetchProjects",
  async (department_name) => {
    const resp = await axios.get(
      `${URL}/coordinator/projectList?department_name=${department_name}`
    );
    console.log(resp);
    console.log(department_name);
    console.log("this is called ");
    return resp.data;
  }
);
export const fetch_students_of_group = createAsyncThunk(
  "fetch_student",
  async (projectId) => {
    const resp = await axios.get(
      `${URL}/coordinator/students?projectId=${projectId}`
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
      const resp = await axios.put(`${URL}/coordinator/projectList`, {
        id: data.projectId,
        status: data.status,
      });
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
        `${URL}/coordinator/students?reg_no=${reg_no}`
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
        `${URL}/coordinator/students?reg_no=${data.reg_no}`,
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
export const handleAddingStudent2 = createAsyncThunk(
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
        `${URL}/coordinator/students?reg_no=${data.reg_no}`,
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
export const AddSupervisor = createAsyncThunk("addSupervisor", async (data) => {
  const resp = await axios.post(`${URL}/employee_project/supervisor`, data);
  console.log(resp.data);
  return resp.data;
});
export const AddCoSupervisor = createAsyncThunk(
  "AddCoSupervisor",
  async (data) => {
    const resp = await axios.post(`${URL}/employee_project/cosupervisor`, data);
    console.log(resp.data);
    return resp.data;
  }
);
export const deleteProject = createAsyncThunk(
  "project/delete",
  async (projectId) => {
    const resp = await axios.delete(
      `${URL}/coordinator/projectList?projectId=${projectId}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
export const DeleteStudentFromProjectByCoordinator = createAsyncThunk(
  "deleteStudentFromProjectByCoordinator",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(`${URL}/project/student`, data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const AddStudentFromProjectByCoordinator = createAsyncThunk(
  "AddStudentFromProjectByCoordinator",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(`${URL}/project/student`, data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const updateStudentFromProjectByCoordinator = createAsyncThunk(
  "updateStudentFromProjectByCoordinator",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${URL}/coordinator/students?reg_no=${data.reg_no}`,
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
const coordinatorSlice = createSlice({
  name: "coordinator",
  initialState,
  reducers: {
    setRender: (state, action) => {
      state.render = action.payload;
    },
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
    setCreatePanel: (state, action) => {
      state.createPanel = action.payload;
    },
    setPresentationRender: (state, action) => {
      state.presentationsRender = action.payload;
    },
    setPanelRender: (state, action) => {
      state.panelRender = action.payload;
    },
    setViewMoreId: (state, action) => {
      state.viewMoreId = action.payload;
      state.setViewMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.fulfilled, (state, action) => {
        console.log("fetchprojects called from coordinator slice");
        console.log(action.payload.projects);
        state.projects = action.payload;
      })
      .addCase(fetch_students_of_group.fulfilled, (state, action) => {
        console.log("slice called");
        console.log(action.payload);
        state.students = action.payload;
      })
      .addCase(handleAddingStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects.projects = state.projects.projects.filter(
          (project) => project.id !== action.payload.id
        );
      })
      .addCase(
        DeleteStudentFromProjectByCoordinator.fulfilled,
        (state, action) => {
          const { id, students } = action.payload;
          const projectIndex = state.projects?.projects?.findIndex(
            (project) => project.id === id
          );
          console.log(projectIndex);
          if (projectIndex !== undefined && projectIndex !== -1) {
            state.projects.projects[projectIndex] ??= {};
            state.projects.projects[projectIndex].students = students;
          }
          console.log(projectIndex);
        }
      )
      .addCase(
        AddStudentFromProjectByCoordinator.fulfilled,
        (state, action) => {
          const { id, students } = action.payload;
          const projectIndex = state.projects?.projects?.findIndex(
            (project) => project.id === id
          );
          if (projectIndex !== -1) {
            state.projects.projects[projectIndex].students = students;
          }
        }
      )
      .addCase(createPresentation.fulfilled, (state, action) => {
        state.projects[action.payload.projectId] = {
          ...state.projects[action.payload.projectId],
          presentationSchedule: action.payload.presentationSchedule,
        };
      });
  },
});
export const {
  setIndex,
  removeStudent,
  updateProjectStatus,
  setRender,
  setCreatePanel,
  setPresentationRender,
  setPanelRender,
  setViewMoreId,
} = coordinatorSlice.actions;
export default coordinatorSlice.reducer;
