import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IResultDefinition {
  postId: string;
  surveyResult: any;
  surveyResultText: any;
}

const initialState: {
  results: Array<IResultDefinition>;
  status: string;
  error: any;
} = {
  results: [],
  status: "idle",
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(load.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched surveys to the array
        state.results = state.results.concat(action.payload);
      })
      .addCase(load.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const load = createAsyncThunk("results/load", async () => {
  const response = await axios.get("api/result/get-all");
  return response.data;
});

export const load_one = createAsyncThunk("results/load", async (id: string) => {
  const response = await axios.get(`api/result/get-one/${id}`);
  return response.data;
});

export const post = createAsyncThunk(
  "results/post",
  async (data: {
    postId: string;
    surveyResult: any;
    surveyResultText: string;
  }) => {
    const response = await axios.post("api/result/create", data);
    return response.data;
  }
);

export const updateResult = createAsyncThunk(
  "results/update",
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.put(`api/result/update/${id}`, { data });
    return response.data;
  }
);

export default resultsSlice.reducer;
