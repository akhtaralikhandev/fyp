import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  panel: [],
  panelCreatedError: "",
  updatePanelError: "",
};
const URL = "http://localhost:3000/api";
// export const fetchPanels = createAsyncThunk(
//   "fetchPanels",
//   async (department_name) => {
//     const resp = await axios.get(
//       `${URL}/panel/panel?department_name=${department_name}`
//     );
//     console.log("from panel slice");
//     console.log(resp.data);
//     return resp.data;
//   }
// );
export const fetchPanels = createAsyncThunk(
  "fetchPanels",
  async (department_name, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${URL}/panel/panel?department_name=${department_name}`
      );
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);

export const createPanels = createAsyncThunk(
  "createPanels",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(`${URL}/panel/panel`, data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);

// export const updatePanel = createAsyncThunk("updatePanel", async (data) => {
//   const resp = await axios.put(`http://localhost:3000/api/panel/panel`, data);
//   console.log(resp.data);
//   console.log("this is the update panel");
//   return resp.data;
// });
export const updatePanel = createAsyncThunk(
  "updatePanel",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.put(`${URL}/panel/panel`, data);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data); // pass the error response data to the rejected state
    }
  }
);

export const updatePanelByRemoving = createAsyncThunk(
  "updatePanelByRemoving",
  async (data) => {
    const resp = await axios.put(`${URL}/panel/removeItem`, data);
    console.log(resp.data);
    console.log("this is the update panel");
    return resp.data;
  }
);
export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    clearPanelCreationError: (state, action) => {
      state.panelCreatedError = "";
    },
    clearPanelUpdateError: (state, action) => {
      state.updatePanelError = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPanels.fulfilled, (state, action) => {
        state.panel = action.payload;
      })
      .addCase(createPanels.rejected, (state, action) => {
        console.log(action.payload);
        state.panelCreatedError = action.payload;
      })
      .addCase(updatePanel.fulfilled, (state, action) => {
        const ExceptPanel = state.panel.filter(
          (x) => x.id != action.payload.id
        );
        state.panel = [...ExceptPanel, action.payload];
      })
      .addCase(updatePanelByRemoving.fulfilled, (state, action) => {
        const ExceptPanel2 = state.panel.filter(
          (x) => x.id != action.payload.id
        );
        state.panel = [...ExceptPanel2, action.payload];
      })
      .addCase(updatePanel.rejected, (state, action) => {
        state.updatePanelError = action.payload.message;
      });
  },
});
export const { clearPanelCreationError, clearPanelUpdateError } =
  panelSlice.actions;
export default panelSlice.reducer;
