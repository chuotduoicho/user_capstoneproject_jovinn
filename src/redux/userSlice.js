import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerService from "../services/seller.service";
import urlService from "../services/url.service";
import UserService from "../services/user.service";
import walletService from "../services/wallet.service";
import { setMessage } from "./message";
import { setUrl } from "./url";
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const wallet = JSON.parse(localStorage.getItem("wallet"));
const topSeller = JSON.parse(localStorage.getItem("topSeller"));
const initialState =
  currentUser && topSeller && wallet
    ? {
        topSellers: topSeller,
        currentUser: currentUser,
        wallet: wallet,
        status: "idle",
      }
    : { topSellers: [], currentUser: {}, wallet: {}, status: "idle" };
export const fetchTopSellers = createAsyncThunk(
  "user/fetchTopSellers",
  async () => {
    const data = await UserService.getTopSellers();
    return data;
  }
);
export const topupSuccess = createAsyncThunk(
  "user/topupSuccess",
  async (id) => {
    const data = await walletService.topupSuccess(id);
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
export const fetchWallet = createAsyncThunk("user/fetchWallet", async () => {
  const data = await UserService.getWallet();
  console.log("wallet", data);
  return data;
});
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
    avatar,
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
      avatar,
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
      avatar,
    });
    console.log("current user update", data);
    return data;
  }
);
export const updateDescriptionBio = createAsyncThunk(
  "user/updateDescriptionBio",
  async ({ descriptionBio, brandName }) => {
    console.log({ descriptionBio, brandName });
    const data = await sellerService.updateDescriptionBio({
      descriptionBio,
      brandName,
    });
    console.log("current user update", data);
    return data;
  }
);
export const updateSkill = createAsyncThunk("user/updateSkill", async (obj) => {
  console.log(obj);
  const data = await sellerService.updateSkill(obj);
  console.log("current user update", data);
  return data;
});
export const updateCertificate = createAsyncThunk(
  "user/updateCertificate",
  async (obj) => {
    console.log(obj);
    const data = await sellerService.updateCertificate(obj);
    console.log("current user update", data);
    return data;
  }
);
export const updateEducation = createAsyncThunk(
  "user/updateEducation",
  async (obj) => {
    console.log(obj);
    const data = await sellerService.updateEducation(obj);
    console.log("current user update", data);
    return data;
  }
);

export const addSkills = createAsyncThunk("user/addSkills", async (skill) => {
  console.log(skill);
  const data = await sellerService.addSkills(skill);
  console.log("current user update", data);
  return data;
});
export const addCertificates = createAsyncThunk(
  "user/addCertificates",
  async (cers) => {
    console.log(cers);
    const data = await sellerService.addCertificates(cers);
    console.log("current user update", data);
    return data;
  }
);
export const addEdus = createAsyncThunk("user/addEdus", async (edus) => {
  console.log(edus);
  const data = await sellerService.addEdus(edus);
  console.log("current user update", data);
  return data;
});
export const deleteSkill = createAsyncThunk("user/deleteSkill", async (id) => {
  console.log(id);
  const data = await sellerService.deleteSkill(id);
  console.log("current user update", data);
  return data;
});
export const deleteCer = createAsyncThunk("user/deleteCer", async (id) => {
  console.log(id);
  const data = await sellerService.deleteCer(id);
  console.log("current user update", data);
  return data;
});
export const deleteEdu = createAsyncThunk("user/deleteEdu", async (id) => {
  console.log(id);
  const data = await sellerService.deleteEdu(id);
  console.log("current user update", data);
  return data;
});
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
export const topup = createAsyncThunk("user/topup", async (obj, thunkAPI) => {
  try {
    console.log(obj);
    const response = await walletService.topup(obj);
    console.log(response);
    thunkAPI.dispatch(setMessage(response));
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const uploadFile = createAsyncThunk(
  "user/uploadFile",
  async (obj, thunkAPI) => {
    try {
      console.log(obj);
      const response = await urlService.uploadFile(obj);
      console.log(response);
      thunkAPI.dispatch(setUrl(response.url));
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
    [fetchWallet.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchWallet.fulfilled]: (state, { payload }) => {
      state.wallet = payload;
      state.status = "success";
    },
    [fetchWallet.rejected]: (state, action) => {
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
    [updateSkill.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateSkill.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateSkill.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateEducation.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateEducation.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateEducation.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateCertificate.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateCertificate.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateCertificate.rejected]: (state, action) => {
      state.status = "failed";
    },
    [topup.pending]: (state, action) => {
      state.status = "loading";
    },
    [topup.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [topup.rejected]: (state, action) => {
      state.status = "failed";
    },
    [topupSuccess.pending]: (state, action) => {
      state.status = "loading";
    },
    [topupSuccess.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [topupSuccess.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addSkills.pending]: (state, action) => {
      state.status = "loading";
    },
    [addSkills.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addSkills.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addEdus.pending]: (state, action) => {
      state.status = "loading";
    },
    [addEdus.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addEdus.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addCertificates.pending]: (state, action) => {
      state.status = "loading";
    },
    [addCertificates.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addCertificates.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteSkill.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteSkill.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteSkill.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteEdu.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteEdu.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteEdu.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteCer.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteCer.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteCer.rejected]: (state, action) => {
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
    [uploadFile.pending]: (state, action) => {
      state.status = "loading";
    },
    [uploadFile.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [uploadFile.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = userSlice;
export default reducer;

export const selectTopSellers = (state) => state.user.topSellers;
export const selectCurrentUser = (state) => state.user.currentUser;

export const selectWallet = (state) => state.user.wallet;
export const selectWalletTransactions = (state) =>
  state.user.wallet.transactions;
export const selectSeller = (state, sellerId) =>
  state.user.topSellers.find((seller) => seller.id === sellerId);
