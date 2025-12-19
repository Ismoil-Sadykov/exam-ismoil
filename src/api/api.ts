import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = import.meta.env.VITE_SOME_USERS;

export const GetTodo = createAsyncThunk("counter/GetTodo", async () => {
  try {
    const { data } = await axios.get(`${api}/api/to-dos`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const DeleteUser = createAsyncThunk(
  "counter/DeleteUser",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${api}/api/to-dos?id=${id}`);
      dispatch(GetTodo());
    } catch (error) {
      console.error(error);
    }
  }
);

export const EditUser = createAsyncThunk(
  "counter/EditUser",
  async ({ idx, nameEdit, descEdit }, { dispatch }) => {
    const updateUser = {
      name: nameEdit,
      description: descEdit,
      id: idx,
    };
    try {
      await axios.put(`${api}/api/to-dos`, updateUser);
      dispatch(GetTodo());
    } catch (error) {
      console.error(error);
    }
  }
);

export const ChangeStatus = createAsyncThunk(
  "counter/ChangeStatus",
  async (id, { dispatch }) => {
    try {
      await axios.put(`${api}/completed?id=${id}`);
      dispatch(GetTodo());
    } catch (error) {
      console.error(error);
    }
  }
);

export const AddUser = createAsyncThunk(
  "counter/AddUser",
  async (e, { dispatch }) => {
    const target = e.target;
    const files = target["imgAdd"].files;
    const formData = new FormData();
    formData.append("Name", target["nameAdd"].value);
    formData.append("Description", target["descAdd"].value);
    for (let i = 0; i < files.length; i++) {
      formData.append("Images", files[i]);
    }
    try {
      await axios.post(`${api}/api/to-dos`, formData);
      dispatch(GetTodo());
    } catch (error) {
      console.error(error);
    }
  }
);

export const GetById = createAsyncThunk("counter/GetById", async (id) => {
  try {
    const { data } = await axios.get(`${api}/api/to-dos/${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const DeleteImg = createAsyncThunk(
  "counter/DeleteImg",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${api}/api/to-dos/images/${id}`);
      dispatch(GetTodo());
    } catch (error) {
      console.error(error);
    }
  }
);