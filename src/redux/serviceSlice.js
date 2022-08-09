import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ServiceService from "../services/service.service";
const services = JSON.parse(localStorage.getItem("services"));
const servicesImpression = JSON.parse(
  localStorage.getItem("servicesImpression")
);
const servicesHistory = JSON.parse(localStorage.getItem("servicesHistory"));
const initialState = {
  listServices: services.content ? services.content : [],
  listServicesImpression: servicesImpression ? servicesImpression : [],
  listServicesHistory: servicesHistory ? servicesHistory : [],
  newServiceId: null,
  status: "idle",
};

export const fetchServicesImpression = createAsyncThunk(
  "service/fetchServicesImpression",
  async () => {
    const data = await ServiceService.get8ServicesImpression();
    console.log(data);
    return data;
  }
);
export const fetchServicesImpressionByCate = createAsyncThunk(
  "service/fetchServicesImpressionByCate",
  async (cateId) => {
    const data = await ServiceService.get8ServicesImpressionByCate(cateId);
    console.log(data);
    return data;
  }
);
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
export const updateServicePackage = createAsyncThunk(
  "service/updateServicePackage",
  async (obj) => {
    console.log(obj);
    const data = await ServiceService.updateServicePackage(obj);
    console.log(data);
    return data;
  }
);
export const addServicePackage = createAsyncThunk(
  "service/addServicePackage",
  async (obj) => {
    console.log(obj);
    const data = await ServiceService.addServicePackage(obj);
    console.log(data);
    return data;
  }
);
export const deleteServicePackage = createAsyncThunk(
  "service/deleteServicePackage",
  async (obj) => {
    console.log(obj);
    const data = await ServiceService.deleteServicePackage(obj);
    console.log(data);
    return data;
  }
);
const serviceSlice = createSlice({
  name: "service",
  initialState,
  extraReducers: {
    [fetchServicesImpression.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchServicesImpression.fulfilled]: (state, { payload }) => {
      state.listServicesImpression = payload;
      state.status = "success";
    },
    [fetchServicesImpression.rejected]: (state, action) => {
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
  },
});

const { reducer } = serviceSlice;
export default reducer;

export const selectAllServices = (state) => state.service.listServices;
export const selectServicesImpression = (state) =>
  state.service.listServicesImpression;
// export const selectServiceDetail = (state) => state.service.serviceDetail;
export const selectNewServiceId = (state) => state.service.newServiceId;
export const selectServiceStatus = (state) => state.service.status;
export const selectServiceById = (state, serviceId) =>
  state.service.listServices.find((service) => service.id === serviceId);
