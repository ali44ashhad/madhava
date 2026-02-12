/**
 * API configuration – base URL from environment.
 * Set VITE_API_BASE_URL in .env (e.g. VITE_API_BASE_URL=http://localhost:5012)
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/** Store API prefix (public catalog) */
export const STORE_BASE = `${BASE_URL}/api/v1/store`;
export const API_BASE = `${BASE_URL}/api`;

export default BASE_URL;
