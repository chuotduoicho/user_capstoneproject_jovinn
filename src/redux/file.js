import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      return { file: action.payload };
    },
    clearUrl: () => {
      return { file: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
