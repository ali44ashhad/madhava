import apiClient from '../api/client';
import { STORE_ENDPOINTS } from '../api/endpoints';

/**
 * Fetch active categories for store (public)
 * GET /api/v1/store/categories
 */
export async function getStoreCategories() {
  const res = await apiClient.get(STORE_ENDPOINTS.CATEGORIES);
  const data = res.data?.data ?? res.data;
  return Array.isArray(data) ? data : data?.categories ?? [];
}

/**
 * Fetch products for store (public). Used for search, listings, etc.
 * GET /api/v1/store/products?page=1&limit=50&categorySlug=...
 */
export async function getStoreProducts(params = {}) {
  const { page = 1, limit = 50, ...rest } = params;
  const res = await apiClient.get(STORE_ENDPOINTS.PRODUCTS, {
    params: { page, limit, ...rest },
  });
  const payload = res.data?.data ?? res.data;
  return payload;
}

/**
 * Fetch subcategories for a category (public)
 * GET /api/v1/store/subcategories?categorySlug=statues
 */
export async function getStoreSubcategories(params = {}) {
  const { categorySlug, ...rest } = params;
  if (!categorySlug) return [];
  const res = await apiClient.get(STORE_ENDPOINTS.SUBCATEGORIES, {
    params: { categorySlug, ...rest },
  });
  const payload = res.data ?? {};
  const data = payload?.data ?? payload;
  return Array.isArray(data) ? data : data?.subcategories ?? [];
}

/**
 * Fetch single product by id (public)
 * GET /api/v1/store/products/:id
 */
export async function getStoreProductById(id) {
  if (!id) return null;
  const res = await apiClient.get(`${STORE_ENDPOINTS.PRODUCTS}/${id}`);
  return res.data?.data ?? null;
}

/**
 * Fetch single product by slug (best-effort).
 * Tries multiple common endpoints/strategies so existing slug-based routes keep working.
 */
export async function getStoreProductBySlug(slug) {
  if (!slug) return null;

  try {
    const res = await apiClient.get(
      `${STORE_ENDPOINTS.PRODUCT_BY_SLUG}/${encodeURIComponent(slug)}`
    );
    return res.data?.data ?? null;
  } catch {
    // ignore
  }

  try {
    const res = await apiClient.get(
      `${STORE_ENDPOINTS.PRODUCT_SLUG_DIRECT}/${encodeURIComponent(slug)}`
    );
    return res.data?.data ?? null;
  } catch {
    // ignore
  }

  try {
    const payload = await getStoreProducts({ page: 1, limit: 100, q: slug });
    const products = Array.isArray(payload?.products)
      ? payload.products
      : Array.isArray(payload)
        ? payload
        : [];
    const exact = products.find((p) => (p?.slug || "").toLowerCase() === slug.toLowerCase());
    return exact || null;
  } catch {
    return null;
  }
}
