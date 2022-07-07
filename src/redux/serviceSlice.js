import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ServiceService from "../services/service.service";
const services = JSON.parse(localStorage.getItem("services"));
const initialState = services
  ? {
      listServices: services,
      newServiceId: null,
      status: "idle",
    }
  : {
      listServices: [],
      newServiceId: null,
      status: "idle",
    };
export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async () => {
    const data = await ServiceService.getAllServices();
    console.log(data);
    return data;
  }
);
export const fetchServiceDetail = createAsyncThunk(
  "service/fetchServiceDetail",
  async (serviceId) => {
    console.log(serviceId);
    const data = await ServiceService.getServiceById(serviceId);
    console.log(data);
    return data;
  }
);
export const fetchServicesByCategory = createAsyncThunk(
  "service/fetchServicesByCategory",
  async (cateId) => {
    console.log(cateId);
    const data = await ServiceService.getServiceByCateId(cateId);
    console.log(data);
    return data;
  }
);
export const addService = createAsyncThunk(
  "service/addService",
  async (service) => {
    console.log(service);
    const data = await ServiceService.addService(service);
    console.log(data);
    return data;
  }
);
export const updateService = createAsyncThunk(
  "service/updateService",
  async (obj) => {
    console.log(obj);
    const data = await ServiceService.updateService(obj);
    console.log(data);
    return data;
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: {
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
  },
});

const { reducer } = serviceSlice;
export default reducer;

export const selectAllServices = (state) => state.service.listServices;
// export const selectServiceDetail = (state) => state.service.serviceDetail;
export const selectNewServiceId = (state) => state.service.newServiceId;
export const selectServiceStatus = (state) => state.service.status;
export const selectServiceById = (state, serviceId) =>
  state.service.listServices.find((service) => service.id === serviceId);
