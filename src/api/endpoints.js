export const STORE_ENDPOINTS = {
    CATEGORIES: '/api/v1/store/categories',
    PRODUCTS: '/api/v1/store/products',
    PRODUCT_BY_SLUG: '/api/v1/store/products/by-slug',
    PRODUCT_SLUG_DIRECT: '/api/v1/store/products/slug',
    SUBCATEGORIES: '/api/v1/store/subcategories',
    CART: '/api/v1/store/cart',
    ADDRESSES: '/api/v1/store/addresses',
    ORDERS: '/api/v1/store/orders',
    COUPONS: '/api/v1/store/coupons',
};

export const AUTH_ENDPOINTS = {
    SIGNUP: '/api/v1/auth/signup/request-otp',
    SIGNUP_VERIFY: '/api/v1/auth/signup/verify-otp',

    LOGIN_OTP: '/api/v1/auth/login/request-otp',
    VERIFY_OTP: '/api/v1/auth/login/verify-otp',

    GET_ME: '/api/v1/auth/me',
    REFRESH: '/api/v1/auth/refresh',
};


