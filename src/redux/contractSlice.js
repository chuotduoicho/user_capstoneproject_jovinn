import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  },
});

const { reducer } = contractSlice;
export default reducer;
export const selectAllContracts = (state) => state.contract.listContracts;
export const selectContractStatus = (state) => state.contract.status;
