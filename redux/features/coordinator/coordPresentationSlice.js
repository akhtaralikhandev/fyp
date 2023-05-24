import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProjects: [],
  allPresentations: [],
  presentCreationError: "",
  createPresentationLoading: false,
  presentCreationSuccess: false,
  presentCreationSuccessMessage: "",
  newlyCreatedPresentationId: "",
  deletePresentError: "",
  deletePresentSuccess: "",
  updatePresentationSuccess: "",
  updatePresentationFailure: "",
  updatePresentationLoading: false,
};
const URL = "http://localhost:3000/api";
export const fetchAllProjectsCreatePresentation = createAsyncThunk(
  "deleteStudentFromProjectByCoordinator",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${URL}/coordinator/presentation/allProjects`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
export const fetchAllPresentations = createAsyncThunk(
  "fetchAllPresents",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${URL}/coordinator/presentation/allPresent`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
// export const CreatePresentation = createAsyncThunk(
//   "createPresentation2",
//   async (data, thunkAPI) => {
//     try {
//       const resp = await axios.get(
//         `http://localhost:3000/api/coordinator/presentation/create`,
//         data
//       );
//       console.log(data);
//       console.log(resp.data);
//       return resp.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
//     }
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
export const updatePresentation = createAsyncThunk(
  "updatePresentation",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(
        `http://localhost:3000/api/coordinator/presentation/update`,
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
export const deletePresentation = createAsyncThunk(
  "deletePresentations6",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${URL}/coordinator/presentation/create?id=${id}`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);
const coordPresentationSlice = createSlice({
  name: "coordPresentation",
  initialState,
  reducers: {
    clearPresentationCreationError: (state, action) => {
      state.presentCreationError = action.payload;
    },
    clearPresentationCreationSuccess: (state, action) => {
      state.presentCreationSuccessMessage = action.payload;
    },
    clearUpdatePresentationSuccess: (state, action) => {
      state.updatePresentationSuccess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchAllProjectsCreatePresentation.fulfilled,
        (state, action) => {
          state.allProjects = action.payload;
        }
      )
      .addCase(createPresentation.fulfilled, (state, action) => {
        console.log("action.payload from create presentaion fullfilled");
        console.log(action.payload);
        state.presentCreationSuccess = true;
        state.createPresentationLoading = false;
        state.newlyCreatedPresentationId = action.payload.id;
        state.presentCreationSuccessMessage =
          "Created successfully redirecting to the presentation page";
        state.allPresentations.push(action.payload);
      })
      .addCase(createPresentation.pending, (state, action) => {
        console.log(action.payload);
        state.createPresentationLoading = true;
      })
      .addCase(createPresentation.rejected, (state, action) => {
        console.log("not created");
        console.log(action.payload);
        state.createPresentationLoading = false;
        state.presentCreationError = action.payload;
      })
      .addCase(fetchAllPresentations.fulfilled, (state, action) => {
        console.log(
          "this is coordinator presentation slice all Presentations action.payload"
        );
        console.log(action.payload);
        state.allPresentations = action.payload;
      })
      .addCase(deletePresentation.pending, (state, action) => {
        state.createPresentationLoading = true;
      })
      .addCase(deletePresentation.rejected, (state, action) => {
        state.createPresentationLoading = true;
        state.deletePresentError = action.payload;
      })

      .addCase(deletePresentation.fulfilled, (state, action) => {
        const deletedPresentationId = action.payload.id;
        console.log(action.payload);
        state.allPresentations = state.allPresentations.filter(
          (presentation) => presentation.id !== action.payload?.id
        );

        console.log(state.allPresentations);
      })
      .addCase(updatePresentation.pending, (state, action) => {
        state.updatePresentationLoading = true;
      })
      .addCase(updatePresentation.rejected, (state, action) => {
        state.updatePresentationFailure = "Sorry cannot update at this moment";
      })
      .addCase(updatePresentation.fulfilled, (state, action) => {
        state.updatePresentationSuccess = "updated Succesfully";
      });
  },
});
export const {
  clearPresentationCreationError,
  clearPresentationCreationSuccess,
  clearUpdatePresentationSuccess,
} = coordPresentationSlice.actions;
export default coordPresentationSlice.reducer;
