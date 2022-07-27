import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const messageSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
