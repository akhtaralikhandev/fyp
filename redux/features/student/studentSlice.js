import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  joinRequest: [],
};
export const fetchRequests = createAsyncThunk("fetchRequest", async (data) => {
  const resp = await axios.get(
    `http://localhost:3000/api/project/joinRequest?projectId=${data.projectId}`,
    {
      reg_no: data.reg_no,
      projectId: data.projectId,
    }
  );
  console.log(resp);
  //   console.log(departement_name);
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
  //   console.log(departement_name);
  return resp.data;
});

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRequests.fulfilled, (state, action) => {
      state.joinRequest = action.payload;
    });
  },
});

export default studentSlice.reducer;
