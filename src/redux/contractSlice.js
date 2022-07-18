import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import contractService from "../services/contract.service";
const contracts = JSON.parse(localStorage.getItem("contracts"));
const initialState = contracts
  ? { listContracts: contracts, newContractId: null, status: "idle" }
  : { listContracts: [], newContractId: null, status: "idle" };

export const fetchContracts = createAsyncThunk(
  "contract/fetchContracts",
  async () => {
    const data = await contractService.getAllContracts();
    return data;
  }
);
export const addContract = createAsyncThunk(
  "contract/addContract",
  async (order) => {
    console.log(order);
    const data = await contractService.addContract(order);
    console.log(data);
    return data;
  }
);
export const acceptOrder = createAsyncThunk(
  "contract/addContract",
  async (orderId) => {
    console.log(orderId);
    const data = await contractService.acceptOrder(orderId);
    console.log(data);
    return data;
  }
);
export const addComment = createAsyncThunk(
  "contract/addComment",
  async (id, text) => {
    console.log(id, text);
    const data = await commentService.addComment(id, text);
    console.log(data);
    return data;
  }
);
export const editComment = createAsyncThunk(
  "contract/editComment",
  async (id, text) => {
    console.log(id, text);
    const data = await commentService.updateComment(id, text);
    console.log(data);
    return data;
  }
);
export const deleteComment = createAsyncThunk(
  "contract/deleteComment",
  async (id) => {
    console.log(id);
    const data = await commentService.deleteComment(id);
    console.log(data);
    return data;
  }
);
const contractSlice = createSlice({
  name: "contract",
  initialState,
  extraReducers: {
    [fetchContracts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchContracts.fulfilled]: (state, { payload }) => {
      state.listContracts = payload;
      state.status = "success";
    },
    [fetchContracts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addContract.pending]: (state, action) => {
      state.status = "loading";
    },
    [addContract.fulfilled]: (state, { payload }) => {
      state.newContractId = payload.id;
      state.status = "success";
    },
    [addContract.rejected]: (state, action) => {
      state.status = "failed";
    },
    [acceptOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [acceptOrder.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [acceptOrder.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addComment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [editComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [editComment.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [editComment.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteComment.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteComment.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = contractSlice;
export default reducer;
export const selectAllContracts = (state) => state.contract.listContracts;
export const selectContractStatus = (state) => state.contract.status;
