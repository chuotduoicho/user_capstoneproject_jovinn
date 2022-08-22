import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import contractService from "../services/contract.service";
import { setMessage } from "./message";
const initialState = {
  listContracts: [],
  listComment: [],
  contractDetail: {},
  newContractId: null,
  avatarBuyer: null,
  avatarSeller: null,
  statusContractDetail: "idle",
  status: "idle",
};
export const fetComments = createAsyncThunk(
  "contract/fetComments",
  async (obj) => {
    const data = await commentService.listComment(obj);
    return data;
  }
);
export const fetchContracts = createAsyncThunk(
  "contract/fetchContracts",
  async () => {
    const data = await contractService.getAllContracts();
    return data;
  }
);
export const fetchContractDetail = createAsyncThunk(
  "contract/fetchContractDetail",
  async (obj) => {
    const data = await contractService.getContractDetail(obj);
    return data;
  }
);
export const fetchListContracts = createAsyncThunk(
  "contract/fetchListContracts",
  async () => {
    const data = await contractService.getContracts();
    return data;
  }
);
export const deleveryMilestone = createAsyncThunk(
  "contract/deleveryMilestone",
  async (order) => {
    console.log(order);
    const data = await contractService.delevery(order);
    console.log(data);
    return data;
  }
);
export const deleveryMilestoneUpdate = createAsyncThunk(
  "contract/deleveryMilestoneUpdate",
  async (order) => {
    console.log(order);
    const data = await contractService.deleveryUpdate(order);
    console.log(data);
    return data;
  }
);
export const deleveryMilestoneAccept = createAsyncThunk(
  "contract/deleveryMilestoneAccept",
  async (order) => {
    console.log(order);
    const data = await contractService.acceptDeleveryMilestone(order);
    console.log(data);
    return data;
  }
);
export const addExtraOffer = createAsyncThunk(
  "contract/addExtraOffer",
  async (obj) => {
    console.log(obj);
    const data = await contractService.addExtraOffer(obj);
    console.log(data);
    return data;
  }
);
export const acceptExtra = createAsyncThunk(
  "contract/acceptExtra",
  async (obj) => {
    console.log(obj);
    const data = await contractService.acceptExtra(obj);
    console.log(data);
    return data;
  }
);
export const cancleExtra = createAsyncThunk(
  "contract/cancleExtra",
  async (obj) => {
    console.log(obj);
    const data = await contractService.cancleExtra(obj);
    console.log(data);
    return data;
  }
);
export const addContract = createAsyncThunk(
  "contract/addContract",
  async (order, thunkAPI) => {
    try {
      console.log(order);
      const data = await contractService.addContract(order);
      console.log(data);
      // thunkAPI.dispatch(setMessage(data.data.message));
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.messages) ||
        error.messages ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
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
export const acceptRequestBuyer = createAsyncThunk(
  "contract/acceptRequestBuyer",
  async (obj, thunkAPI) => {
    console.log(obj);
    try {
      const data = await contractService.acceptRequestBuyer(obj);
      console.log(data);
      // thunkAPI.dispatch(setMessage(data.data.message));
      return data;
    } catch (error) {
      console.log("eror", error.response);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const acceptDeleveryContract = createAsyncThunk(
  "contract/acceptDeleveryContract",
  async (orderId) => {
    console.log(orderId);
    const data = await contractService.acceptDeleveryContract(orderId);
    console.log(data);
    return data;
  }
);
export const uploadDeleveryContract = createAsyncThunk(
  "contract/uploadDeleveryContract",
  async (orderId) => {
    console.log(orderId);
    const data = await contractService.uploadDeleveryContract(orderId);
    console.log(data);
    return data;
  }
);
export const rejectOrder = createAsyncThunk(
  "contract/rejectOrder",
  async (orderId) => {
    console.log(orderId);
    const data = await contractService.rejectOrder(orderId);
    console.log(data);
    return data;
  }
);
export const addRating = createAsyncThunk("contract/addRating", async (obj) => {
  console.log(obj);
  const data = await commentService.addRating(obj);
  console.log(data);
  return data;
});
export const addComment = createAsyncThunk(
  "contract/addComment",
  async (obj) => {
    console.log(obj);
    const data = await commentService.addComment(obj);
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
export const flagContract = createAsyncThunk(
  "contract/flagContract",
  async (id) => {
    console.log(id);
    const data = await contractService.flagContract(id);
    console.log(data);
    return data;
  }
);
export const getAvatar = createAsyncThunk("contract/getAvatar", async (id) => {
  console.log(id);
  const data = await contractService.getAvatar(id);
  console.log(data);
  return data;
});
const contractSlice = createSlice({
  name: "contract",
  initialState,
  extraReducers: {
    [fetComments.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetComments.fulfilled]: (state, { payload }) => {
      state.listComment = payload;
      state.status = "success";
    },
    [fetComments.rejected]: (state, action) => {
      state.status = "failed";
    },
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
    [fetchContractDetail.pending]: (state, action) => {
      state.statusContractDetail = "loading";
    },
    [fetchContractDetail.fulfilled]: (state, { payload }) => {
      state.contractDetail = payload;
      state.statusContractDetail = "success";
    },
    [fetchContractDetail.rejected]: (state, action) => {
      state.statusContractDetail = "failed";
    },
    [fetchListContracts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchListContracts.fulfilled]: (state, { payload }) => {
      state.listContracts = payload;
      state.status = "success";
    },
    [fetchListContracts.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleveryMilestone.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleveryMilestone.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleveryMilestone.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleveryMilestoneUpdate.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleveryMilestoneUpdate.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleveryMilestoneUpdate.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleveryMilestoneAccept.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleveryMilestoneAccept.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleveryMilestoneAccept.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addExtraOffer.pending]: (state, action) => {
      state.status = "loading";
    },
    [addExtraOffer.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addExtraOffer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [acceptExtra.pending]: (state, action) => {
      state.status = "loading";
    },
    [acceptExtra.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [acceptExtra.rejected]: (state, action) => {
      state.status = "failed";
    },
    [cancleExtra.pending]: (state, action) => {
      state.status = "loading";
    },
    [cancleExtra.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [cancleExtra.rejected]: (state, action) => {
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
    [rejectOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [rejectOrder.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [rejectOrder.rejected]: (state, action) => {
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
    [acceptRequestBuyer.pending]: (state, action) => {
      state.status = "loading";
    },
    [acceptRequestBuyer.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [acceptRequestBuyer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [acceptDeleveryContract.pending]: (state, action) => {
      state.status = "loading";
    },
    [acceptDeleveryContract.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [acceptDeleveryContract.rejected]: (state, action) => {
      state.status = "failed";
    },
    [uploadDeleveryContract.pending]: (state, action) => {
      state.status = "loading";
    },
    [uploadDeleveryContract.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [uploadDeleveryContract.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addRating.pending]: (state, action) => {
      state.status = "loading";
    },
    [addRating.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addRating.rejected]: (state, action) => {
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
    [flagContract.pending]: (state, action) => {
      state.status = "loading";
    },
    [flagContract.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [flagContract.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getAvatar.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAvatar.fulfilled]: (state, { payload }) => {
      state.avatarBuyer = payload.avatarBuyer;
      state.avatarSeller = payload.avatarSeller;
      state.status = "success";
    },
    [getAvatar.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = contractSlice;
export default reducer;
export const selectAllContracts = (state) => state.contract.listContracts;
export const selectAllComment = (state) => state.contract.listComment;
export const selectContractDetail = (state) => state.contract.contractDetail;
export const selectOrders = (state) =>
  state.contract.listContracts.filter((val) => {
    if (val.contractStatus == null) return val;
  });
export const selectContracts = (state) =>
  state.contract.listContracts.filter((val) => {
    if (val.orderStatus == "TO_CONTRACT") return val;
  });
export const selectContractStatus = (state) => state.contract.status;
export const selectContractDetailStatus = (state) =>
  state.contract.statusContractDetail;
export const selectContractBuyerById = (state, contractId) =>
  state.contract.listContracts.find((contract) => contract.id === contractId);
export const selectContractSellerById = (state, contractId) =>
  state.contract.listContracts.find((contract) => contract.id === contractId);
export const selectAvatarBuyer = (state) => state.contract.avatarBuyer;
export const selectAvatarSeller = (state) => state.contract.avatarSeller;
