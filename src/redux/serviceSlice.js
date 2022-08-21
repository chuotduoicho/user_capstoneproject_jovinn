import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ServiceService from "../services/service.service";
const services = JSON.parse(localStorage.getItem("services"));
const serviceDetail = JSON.parse(localStorage.getItem("serviceDetail"));
const servicesImpression = JSON.parse(
  localStorage.getItem("servicesImpression")
);
const servicesHistory = JSON.parse(localStorage.getItem("servicesHistory"));
const initialState = {
  listServices: {},
  listServicesImpression: [],
  list8Boxes: [],
  listServicesHistory: [],
  serviceDetail: {},
  listRating: [],
  newServiceId: null,
  status: "idle",
  statusServiceDetail: "idle",
};
export const fetchServicesHistory = createAsyncThunk(
  "service/fetchServicesHistory",
  async () => {
    const data = await ServiceService.getServicesHistory();
    return data;
  }
);
export const fetchServicesImpression = createAsyncThunk(
  "service/fetchServicesImpression",
  async () => {
    const data = await ServiceService.get8ServicesImpression();
    return data;
  }
);
export const fetchRating = createAsyncThunk(
  "service/fetchRating",
  async (serviceId) => {
    const data = await ServiceService.getRating(serviceId);
    return data;
  }
);
export const fetchServicesImpressionByCate = createAsyncThunk(
  "service/fetchServicesImpressionByCate",
  async (cateId) => {
    const data = await ServiceService.get8ServicesImpressionByCate(cateId);
    return data;
  }
);
export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async (obj) => {
    const data = await ServiceService.getServices(obj);
    return data;
  }
);
export const fetchServicesSeller = createAsyncThunk(
  "service/fetchServicesSeller",
  async (obj) => {
    const data = await ServiceService.getServicesSeller(obj);
    return data;
  }
);
export const fetchServicesSearchFilter = createAsyncThunk(
  "service/fetchServicesSearchFilter",
  async (obj) => {
    const data = await ServiceService.getServicesSearchFilter(obj);
    return data;
  }
);
export const fetchServiceDetail = createAsyncThunk(
  "service/fetchServiceDetail",
  async (serviceId) => {
    console.log(serviceId);
    const data = await ServiceService.getServiceById(serviceId);
    return data;
  }
);
export const fetchServiceDetailBuyer = createAsyncThunk(
  "service/fetchServiceDetailBuyer",
  async (serviceId) => {
    const data = await ServiceService.getServiceByIdBuyer(serviceId);
    return data;
  }
);
export const fetchServicesByCategory = createAsyncThunk(
  "service/fetchServicesByCategory",
  async (cateId) => {
    const data = await ServiceService.getServiceByCateId(cateId);
    return data;
  }
);
export const addService = createAsyncThunk(
  "service/addService",
  async (service) => {
    const data = await ServiceService.addService(service);
    return data;
  }
);
export const updateService = createAsyncThunk(
  "service/updateService",
  async (obj) => {
    const data = await ServiceService.updateService(obj);
    return data;
  }
);
export const pauseService = createAsyncThunk(
  "service/pauseService",
  async (obj) => {
    const data = await ServiceService.pauseService(obj);
    return data;
  }
);
export const updateServicePackage = createAsyncThunk(
  "service/updateServicePackage",
  async (obj) => {
    const data = await ServiceService.updateServicePackage(obj);
    return data;
  }
);
export const addServicePackage = createAsyncThunk(
  "service/addServicePackage",
  async (obj) => {
    const data = await ServiceService.addServicePackage(obj);
    return data;
  }
);
export const deleteServicePackage = createAsyncThunk(
  "service/deleteServicePackage",
  async (obj) => {
    const data = await ServiceService.deleteServicePackage(obj);
    return data;
  }
);
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (obj) => {
    const data = await ServiceService.deleteService(obj);
    return data;
  }
);
const serviceSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: {
    [fetchServicesHistory.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesHistory.fulfilled]: (state, { payload }) => {
      state.listServicesHistory = payload;
      state.status = "success";
    },
    [fetchServicesHistory.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServicesImpression.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesImpression.fulfilled]: (state, { payload }) => {
      state.list8Boxes = payload;
      state.status = "success";
    },
    [fetchServicesImpression.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchRating.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchRating.fulfilled]: (state, { payload }) => {
      state.listRating = payload;
      state.status = "success";
    },
    [fetchRating.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServicesImpressionByCate.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesImpressionByCate.fulfilled]: (state, { payload }) => {
      state.listServicesImpression = payload;
      state.status = "success";
    },
    [fetchServicesImpressionByCate.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServices.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServices.fulfilled]: (state, { payload }) => {
      state.listServices = payload;
      state.status = "success";
    },
    [fetchServices.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServicesSeller.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesSeller.fulfilled]: (state, { payload }) => {
      state.listServices = payload;
      state.status = "success";
    },
    [fetchServicesSeller.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServicesSearchFilter.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesSearchFilter.fulfilled]: (state, { payload }) => {
      state.listServices = payload;
      state.listServicesImpression = payload.content;
      state.status = "success";
    },
    [fetchServicesSearchFilter.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServicesByCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesByCategory.fulfilled]: (state, { payload }) => {
      state.listServices = payload;
      state.status = "success";
    },
    [fetchServicesByCategory.rejected]: (state, action) => {
      state.status = "failed";
    },
    [fetchServiceDetail.pending]: (state, action) => {
      state.statusServiceDetail = "loading";
    },
    [fetchServiceDetail.fulfilled]: (state, { payload }) => {
      state.serviceDetail = payload;
      state.statusServiceDetail = "success";
    },
    [fetchServiceDetail.rejected]: (state, action) => {
      state.statusServiceDetail = "failed";
    },
    [fetchServiceDetailBuyer.pending]: (state, action) => {
      state.statusServiceDetail = "loading";
    },
    [fetchServiceDetailBuyer.fulfilled]: (state, { payload }) => {
      state.serviceDetail = payload;
      state.statusServiceDetail = "success";
    },
    [fetchServiceDetailBuyer.rejected]: (state, action) => {
      state.statusServiceDetail = "failed";
    },
    [addService.pending]: (state, action) => {
      state.status = "loading";
    },
    [addService.fulfilled]: (state, { payload }) => {
      state.newServiceId = payload.message;
      state.status = "success";
    },
    [addService.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateService.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateService.fulfilled]: (state, { payload }) => {
      state.newServiceId = payload.id;
      state.status = "success";
    },
    [updateService.rejected]: (state, action) => {
      state.status = "failed";
    },
    [pauseService.pending]: (state, action) => {
      state.status = "loading";
    },
    [pauseService.fulfilled]: (state, { payload }) => {
      // state.newServiceId = payload.id;
      state.status = "success";
    },
    [pauseService.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateServicePackage.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateServicePackage.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [updateServicePackage.rejected]: (state, action) => {
      state.status = "failed";
    },
    [addServicePackage.pending]: (state, action) => {
      state.status = "loading";
    },
    [addServicePackage.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [addServicePackage.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteServicePackage.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteServicePackage.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteServicePackage.rejected]: (state, action) => {
      state.status = "failed";
    },
    [deleteService.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteService.fulfilled]: (state, { payload }) => {
      state.status = "success";
    },
    [deleteService.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

const { reducer } = serviceSlice;
export default reducer;

export const selectAllServices = (state) => state.service.listServices;
export const selectServicesImpression = (state) =>
  state.service.listServicesImpression;
export const selectServicesHistory = (state) =>
  state.service.listServicesHistory;
export const selectServiceDetail = (state) => state.service.serviceDetail;

export const selectListRating = (state) => state.service.listRating;
export const selectNewServiceId = (state) => state.service.newServiceId;
export const selectServiceStatus = (state) => state.service.status;
export const selectServiceDetailStatus = (state) =>
  state.service.statusServiceDetail;
export const selectServiceById = (state, serviceId) =>
  state.service.listServices.find((service) => service.id === serviceId);
export const selectTop8Boxes = (state) => state.service.list8Boxes;
