import axiosClient from "./axiosClient";

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? response;

export const adminReturnRequestApi = {
  getReturnRequests({ page = 1, pageSize = 20, status } = {}) {
    return axiosClient.get("/admin/return-requests", {
      params: {
        page,
        pageSize,
        ...(status && status !== "all" ? { status } : {}),
      },
    });
  },

  getReturnRequest(id) {
    return axiosClient.get(`/admin/return-requests/${id}`);
  },

  reviewReturnRequest(id, action, payload = {}) {
    return axiosClient.patch(`/admin/return-requests/${id}/${action}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export const normalizeReturnRequestList = (response) => {
  const data = unwrapApiData(response);

  if (Array.isArray(data)) {
    return { items: data, totalCount: data.length, pageNumber: 1, totalPages: 1 };
  }

  return {
    items: Array.isArray(data?.items) ? data.items : [],
    totalCount: data?.totalCount ?? data?.items?.length ?? 0,
    pageNumber: data?.pageNumber ?? 1,
    totalPages: data?.totalPages ?? 1,
  };
};

export const normalizeReturnRequest = unwrapApiData;

export default adminReturnRequestApi;
