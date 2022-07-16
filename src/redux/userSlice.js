import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerService from "../services/seller.service";
import UserService from "../services/user.service";
import { setMessage } from "./message";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const topSeller = JSON.parse(localStorage.getItem("topSeller"));
const initialState =
  currentUser && topSeller
    ? { topSellers: topSeller, currentUser: currentUser, status: "idle" }
    : { topSellers: [], currentUser: null, status: "idle" };
export const fetchTopSellers = createAsyncThunk(
  "user/fetchTopSellers",
  async () => {
    const data = await UserService.getTopSellers();
    return data;
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const data = await UserService.getUser();
    console.log("current user", data);
    return data;
  }
);
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({
    id,
    firstName,
    lastName,
    gender,
    birthDate,
    phone,
    address,
    city,
  }) => {
    console.log({
      id,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      address,
      city,
    });
    const data = await UserService.updateUserProfile({
      id,
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      address,
      city,
    });
    console.log("current user update", data);
    return data;
  }
);
export const updateDescriptionBio = createAsyncThunk(
  "user/updateDescriptionBio",
  async ({ descriptionBio }) => {
    console.log({ descriptionBio });
    const data = await sellerService.updateDescriptionBio({
      descriptionBio,
    });
    console.log("current user update", data);
    return data;
  }
);
export const joinSeller = createAsyncThunk("user/joinSeller", async (obj) => {
  console.log(obj);
  const data = await UserService.joinSeller(obj);
  console.log("join seller update", data);
  return data;
});
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword, confirmPassword }, thunkAPI) => {
    try {
      console.log({ oldPassword, newPassword, confirmPassword });
      const response = await UserService.changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );

      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
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
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchTopSellers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTopSellers.fulfilled]: (state, { payload }) => {
      state.topSellers = payload;
      state.status = "success";
    },
    [fetchTopSellers.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchCurrentUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCurrentUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.status = "success";
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateUserProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.status = "success";
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateDescriptionBio.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateDescriptionBio.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateDescriptionBio.rejected]: (state, action) => {
      state.status = "failed";
    },
    [changePassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [changePassword.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [changePassword.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = userSlice;
export default reducer;

export const selectTopSellers = (state) => state.user.topSellers;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectContractBuyerById = (state, contractId) =>
  state.user.currentUser.buyer.contracts.find(
    (contract) => contract.id === contractId
  );
export const selectContractSellerById = (state, contractId) =>
  state.user.currentUser.seller.contracts.find(
    (contract) => contract.id === contractId
  );
