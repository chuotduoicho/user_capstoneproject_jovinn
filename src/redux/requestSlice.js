import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestService from "../services/request.service";
const requests = JSON.parse(localStorage.getItem("requests"));
const initialState = requests
  ? {
      listRequests: requests,
      listOffers: [],
      listSellersInvite: [],
      status: "idle",
    }
  : {
      listRequests: [],
      listOffers: [],
      listSellersInvite: [],
      status: "idle",
    };
export const fetchRequestsBuyer = createAsyncThunk(
  "request/fetchRequestsBuyer",
  async () => {
    const data = await requestService.getRequestsOfBuyer();
    console.log(data);
    return data;
  }
);
export const fetchRequestsSeller = createAsyncThunk(
  "request/fetchRequestsSeller",
  async () => {
    const data = await requestService.getAllRequests();
    console.log(data);
    return data;
  }
);
export const fetchRequestsSellerByCate = createAsyncThunk(
  "request/fetchRequestsSellerByCate",
  async (cateId) => {
    console.log(cateId);
    const data = await requestService.getAllRequestsByCate(cateId);
    console.log(data);
    return data;
  }
);
export const fetchSellerInvite = createAsyncThunk(
  "request/fetchSellerInvite",
  async (requestId) => {
    console.log(requestId);
    const data = await requestService.getAllSellerInvite(requestId);
    console.log(data);
    return data;
  }
);
export const fetchOffersBuyer = createAsyncThunk(
  "request/fetchOffersBuyer",
  async (requestId) => {
    console.log(requestId);
    const data = await requestService.getOffersOfBuyer(requestId);
    console.log(data);
    return data;
  }
);
export const fetchOffersSeller = createAsyncThunk(
  "request/fetchOffersSeller",
  async () => {
    console.log();
    const data = await requestService.getOffersOfSeller();
    console.log(data);
    return data;
  }
);
export const addRequest = createAsyncThunk(
  "request/addRequest",
  async (request) => {
    console.log(request);
    const data = await requestService.addRequest(request);
    console.log(data);
    return data;
  }
);
export const addOffer = createAsyncThunk(
  "request/addOffer",
  async (request) => {
    console.log(request);
    const data = await requestService.addOffer(request);
    console.log(data);
    return data;
  }
);
export const updateRequest = createAsyncThunk(
  "request/updateRequest",
  async (obj) => {
    console.log(obj);
    const data = await requestService.updateRequest(obj);
    console.log(data);
    return data;
  }
);
export const applyRequest = createAsyncThunk(
  "request/applyRequest",
  async (requesId) => {
    console.log(requesId);
    const data = await requestService.applyRequest(requesId);
    console.log(data);
    return data;
  }
);
export const applyOffer = createAsyncThunk(
  "request/applyOffer",
  async (obj) => {
    console.log(obj);
    const data = await requestService.applyOffer(obj);
    console.log(data);
    return data;
  }
);
const requestSlice = createSlice({
  name: "request",
  initialState,
  extraReducers: {
    [fetchRequestsBuyer.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRequestsBuyer.fulfilled]: (state, { payload }) => {
      state.listRequests = payload;
      state.status = "success";
    },
    [fetchRequestsBuyer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchRequestsSeller.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRequestsSeller.fulfilled]: (state, { payload }) => {
      state.listRequests = payload;
      state.status = "success";
    },
    [fetchRequestsSeller.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchRequestsSellerByCate.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRequestsSellerByCate.fulfilled]: (state, { payload }) => {
      state.listRequests = payload;
      state.status = "success";
    },
    [fetchRequestsSellerByCate.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addRequest.pending]: (state, action) => {
      state.status = "loading";
    },
    [addRequest.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addRequest.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addOffer.pending]: (state, action) => {
      state.status = "loading";
    },
    [addOffer.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addOffer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateRequest.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateRequest.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateRequest.rejected]: (state, action) => {
      state.status = "failed";
    },
    [applyRequest.pending]: (state, action) => {
      state.status = "loading";
    },
    [applyRequest.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [applyRequest.rejected]: (state, action) => {
      state.status = "failed";
    },
    [applyOffer.pending]: (state, action) => {
      state.status = "loading";
    },
    [applyOffer.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [applyOffer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchSellerInvite.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSellerInvite.fulfilled]: (state, { payload }) => {
      state.listSellersInvite = payload.sellersApply;
      state.status = "success";
    },
    [fetchSellerInvite.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchOffersSeller.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOffersSeller.fulfilled]: (state, { payload }) => {
      state.listOffers = payload.content;
      state.status = "success";
    },
    [fetchOffersSeller.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchOffersBuyer.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOffersBuyer.fulfilled]: (state, { payload }) => {
      state.listOffers = payload.content;
      state.status = "success";
    },
    [fetchOffersBuyer.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = requestSlice;
export default reducer;

export const selectAllRequests = (state) => state.request.listRequests;

export const selectRequestStatus = (state) => state.request.status;
export const selectRequestById = (state, requestId) =>
  state.request.listRequests.find(
    (request) => request.postRequestId === requestId
  );
export const selectAllOffer = (state) => state.request.listOffers;
export const selectOfferById = (state, offerId) =>
  state.request.listOffers.find((offer) => offer.id === offerId);
export const selectAllSellersInvite = (state) =>
  state.request.listSellersInvite;
export const selectSellersById = (state, sellerId) =>
  state.request.listSellersInvite.find((seller) => (seller.id = sellerId));
