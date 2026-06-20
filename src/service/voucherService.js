import axiosClient from "../api/axiosClient";

const BASE = "http://localhost:3001/vouchers";

export const voucherService = {
  getAll: async () => {
    const res = await axiosClient.get(BASE);
    return res.data;
  },

  getByCode: async (code) => {
    const res = await axiosClient.get(`${BASE}?code=${code}`);
    return res.data?.[0] || null;
  },
};
