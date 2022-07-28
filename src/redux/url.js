import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      return { url: action.payload };
    },
    clearUrl: () => {
      return { url: "" };
    },
  },
});

const { reducer, actions } = urlSlice;

export const { setUrl, clearUrl } = actions;
export default reducer;
