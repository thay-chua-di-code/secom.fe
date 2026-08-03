import { createAsyncThunk } from "@reduxjs/toolkit";
import voucherApi from "../../../../api/voucherApi";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong";

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? response;

export const fetchAdminVouchers = createAsyncThunk(
  "adminVoucher/fetchAdminVouchers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await voucherApi.getAdminVouchers(params);

      return unwrapApiData(response);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const createAdminVoucher = createAsyncThunk(
  "adminVoucher/createAdminVoucher",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await voucherApi.createVoucher(payload);

      return unwrapApiData(response);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const updateAdminVoucher = createAsyncThunk(
  "adminVoucher/updateAdminVoucher",
  async ({ voucherId, payload }, { rejectWithValue }) => {
    try {
      const response = await voucherApi.updateVoucher(voucherId, payload);

      return unwrapApiData(response);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const deleteAdminVoucher = createAsyncThunk(
  "adminVoucher/deleteAdminVoucher",
  async (voucherId, { rejectWithValue }) => {
    try {
      await voucherApi.deleteVoucher(voucherId);

      return voucherId;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const approveAdminVoucher = createAsyncThunk(
  "adminVoucher/approveAdminVoucher",
  async (voucherId, { rejectWithValue }) => {
    try {
      const response = await voucherApi.approveVoucher(voucherId);

      return unwrapApiData(response);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const rejectAdminVoucher = createAsyncThunk(
  "adminVoucher/rejectAdminVoucher",
  async ({ voucherId, reason }, { rejectWithValue }) => {
    try {
      const response = await voucherApi.rejectVoucher(voucherId, reason);

      return unwrapApiData(response);
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);
