import { createSlice } from "@reduxjs/toolkit";
import { GetTodo, GetById } from "../api/api";

const initialState = {
  data: [],
  isLoading: false,
  toDoById: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clearToDoById: (state) => {
      state.toDoById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(GetTodo.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(GetById.fulfilled, (state, action) => {
        state.toDoById = action.payload;
      });
  },
});

export const { clearToDoById } = counterSlice.actions;

export default counterSlice.reducer;
