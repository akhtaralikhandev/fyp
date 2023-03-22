import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  panel: [],
  panelCreatedError: "",
};
export const fetchPanels = createAsyncThunk(
  "fetchPanels",
  async (department_name) => {
    const resp = await axios.get(
      `http://localhost:3000/api/panel/panel?department_name=${department_name}`
    );
    console.log(resp.data);
    return resp.data;
  }
);
// export const createPanels = createAsyncThunk("createPanels", async (data) => {
//   const resp = await axios.post(`http://localhost:3000/api/panel/panel`, data);
//   console.log(resp.data);
//   return resp.data;
// });

export const createPanels = createAsyncThunk(
  "createPanels",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.post(
        `http://localhost:3000/api/panel/panel`,
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

export const updatePanel = createAsyncThunk("updatePanel", async (data) => {
  const resp = await axios.put(`http://localhost:3000/api/panel/panel`, data);
  console.log(resp.data);
  return resp.data;
});
export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    clearPanelCreationError: (state, action) => {
      state.panelCreatedError = "";
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
      });
  },
});
export const { clearPanelCreationError } = panelSlice.actions;
export default panelSlice.reducer;
