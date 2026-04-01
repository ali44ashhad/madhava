import apiClient from './client';
import { STORE_ENDPOINTS } from './endpoints';

export const createReview = async (payload) => {
  const response = await apiClient.post(`${STORE_ENDPOINTS.REVIEWS}`, payload);
  return response.data?.data ?? response.data;
};

export const updateReview = async (reviewId, payload) => {
  const response = await apiClient.patch(`${STORE_ENDPOINTS.REVIEWS}/${reviewId}`, payload);
  return response.data?.data ?? response.data;
};

export const listApprovedProductReviews = async (productId, { page = 1, limit = 20 } = {}) => {
  const response = await apiClient.get(`/api/v1/store/products/${productId}/reviews`, {
    params: { page, limit },
  });
  return response.data?.data ?? response.data;
};

