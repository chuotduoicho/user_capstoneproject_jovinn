import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CategoryService from "../services/category.service";
const categories = JSON.parse(localStorage.getItem("categories"));
const initialState = {
  listCategories: categories ? categories : [],
  listSkills: [],
  status: "idle",
};
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const data = await CategoryService.getAllCategories();
    return data;
  }
);
export const fetchSkills = createAsyncThunk(
  "category/fetchSkills",
  async () => {
    const data = await CategoryService.getAllSkills();
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.listCategories = payload;
      state.status = "success";
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchSkills.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSkills.fulfilled]: (state, { payload }) => {
      state.listSkills = payload;
      state.status = "success";
    },
    [fetchSkills.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = categorySlice;
export default reducer;

export const selectAllCategories = (state) => state.category.listCategories;
export const selectAllSkills = (state) => state.category.listSkills;
export const selectCategoryStatus = (state) => state.category.status;
