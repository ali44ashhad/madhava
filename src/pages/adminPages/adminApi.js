import axios from "axios";

const BASE_URL = "http://localhost:5012/api";

export const adminApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   CATEGORIES
========================= */

export const listCategories = async () => {
  const res = await adminApi.get("/v1/admin/categories");
  return res.data?.data ?? res.data;
};

export const createCategory = async (data) => {
  const res = await adminApi.post("/v1/admin/categories", data);
  return res.data?.data ?? res.data;
};

/* =========================
   SUBCATEGORIES
========================= */

export const listSubcategories = async (categoryId) => {
  const res = await adminApi.get("/v1/admin/subcategories", {
    params: categoryId ? { categoryId } : {},
  });
  return res.data?.data ?? res.data;
};

export const createSubcategory = async (data) => {
  const res = await adminApi.post("/v1/admin/subcategories", data);
  return res.data?.data ?? res.data;
};

export const listStoreProducts = async (page = 1, limit = 20) => {
  const res = await axios.get(
    `${BASE_URL}/v1/store/products?page=${page}&limit=${limit}`
  );
  // API response: { success, data: { products, pagination }, error }
  const payload = res.data?.data ?? res.data;
  return payload;
};



export const createProduct = async (data) => {
  const res = await adminApi.post(`/v1/admin/products`, data);
  return res.data?.data ?? res.data;
};

/* =========================
   SKUs
========================= */

export const createSku = async (data) => {
  const res = await adminApi.post(`/v1/admin/skus`, data);
  return res.data?.data ?? res.data;
};

export const getSkuInventory = async (skuId) => {
  const res = await adminApi.get(`/v1/admin/skus/${skuId}/inventory`);
  return res.data?.data ?? res.data;
};

export const updateSkuStock = async (skuId, data) => {
  const res = await adminApi.patch(`/v1/admin/skus/${skuId}/stock`, data);
  return res.data?.data ?? res.data;
};

/* =========================
   ORDERS
========================= */

export const listOrders = async (params = {}) => {
  try {
    const res = await adminApi.get("/v1/admin/orders", { params });
    return res.data?.data ?? res.data ?? [];
  } catch {
    return [];
  }
};

export const approveOrder = async (orderId) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/approve`);
  return res.data?.data ?? res.data;
};

export const putOrderOnHold = async (orderId) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/on-hold`);
  return res.data?.data ?? res.data;
};

export const cancelOrder = async (orderId, body) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/cancel`, body);
  return res.data?.data ?? res.data;
};

export const markOrderAsShipped = async (orderId, body) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/ship`, body);
  return res.data?.data ?? res.data;
};

export const markOrderAsDelivered = async (orderId) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/deliver`);
  return res.data?.data ?? res.data;
};

export const initiateRefund = async (orderId, body = {}) => {
  const res = await adminApi.post(`/v1/admin/orders/${orderId}/refund`, body);
  return res.data?.data ?? res.data;
};
