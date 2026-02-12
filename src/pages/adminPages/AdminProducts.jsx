import React, { useEffect, useState } from "react";
import {
  listCategories,
  listSubcategories,
  listStoreProducts,
  createProduct,
} from "./adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
    isFeatured: false,
  });

  /* =======================
     LOAD DATA
  ======================= */

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (pageNum = 1) => {
    setLoadingProducts(true);
    try {
      const res = await listStoreProducts(pageNum, 20);
      const list = Array.isArray(res?.products) ? res.products : res?.data?.products ?? [];
      const pag = res?.pagination ?? res?.data?.pagination;

      setProducts(list);
      if (pag) {
        setTotalPages(pag.totalPages ?? 1);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await listCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  /* =======================
     LOAD SUBCATEGORIES
  ======================= */

  useEffect(() => {
    if (!formData.categoryId) {
      setSubcategories([]);
      setFormData((p) => ({ ...p, subcategoryId: "" }));
      return;
    }

    const fetchSubs = async () => {
      try {
        const data = await listSubcategories(formData.categoryId);
        setSubcategories(Array.isArray(data) ? data : []);
      } catch {
        setSubcategories([]);
      }
    };

    fetchSubs();
  }, [formData.categoryId]);

  /* =======================
     HANDLERS
  ======================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim()) return setError("Product name is required");
    if (!formData.categoryId) return setError("Select category");
    if (!formData.subcategoryId) return setError("Select subcategory");

    setLoadingCreate(true);
    try {
      await createProduct({
        name: formData.name.trim(),
        description: formData.description?.trim(),
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId,
        isFeatured: formData.isFeatured,
      });

      setSuccess("Product created successfully");

      setFormData({
        name: "",
        description: "",
        categoryId: "",
        subcategoryId: "",
        isFeatured: false,
      });

      setPage(1);
      await fetchProducts(1);

      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create product"
      );
    } finally {
      setLoadingCreate(false);
    }
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog</p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm((p) => !p)}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {showForm ? "✕ Cancel" : "+ Add Product"}
            </button>
          </div>
        </div>

        {/* CREATE FORM */}
        {showForm && (
          <div className="mb-8 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Create New Product</h2>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              {success && (
                <div className="mb-4 p-4 bg-green-50 text-green-700 border-l-4 border-green-500 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subcategory <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subcategoryId"
                      value={formData.subcategoryId}
                      onChange={handleChange}
                      disabled={!formData.categoryId}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-900">Featured Product</span>
                        <p className="text-xs text-gray-600 mt-0.5">Highlight this product on the homepage</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 sm:flex-none sm:w-40 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingCreate}
                    className="flex-1 sm:flex-none sm:w-40 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loadingCreate ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {loadingProducts ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="max-w-sm mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Start building your catalog by adding your first product</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg"
              >
                + Add First Product
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => {
                const categoryName = categories.find((c) => c.id === product.categoryId)?.name ?? "-";
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    {/* Image Section */}
                    <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {product.featuredImageUrl ? (
                        <img
                          src={product.featuredImageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {product.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1.5 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Price Badge */}
                      {product.minPrice != null && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-3 py-1.5 bg-gray-900 bg-opacity-90 text-white text-sm font-bold rounded-full shadow-lg backdrop-blur-sm">
                            ₹{Number(product.minPrice).toFixed(2)}
                            {product.maxPrice != null && product.maxPrice !== product.minPrice && (
                              <span className="text-xs opacity-75"> - ₹{Number(product.maxPrice).toFixed(2)}</span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-mono truncate">
                          ID: {product.slug || product.id}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                        {product.description || "No description available"}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">Category</span>
                          <span className="text-gray-900 font-semibold">{categoryName}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">Subcategory</span>
                          <span className="text-gray-500 text-xs font-mono">
                            {product.subcategoryId ? `${product.subcategoryId.slice(0, 8)}...` : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold shadow-lg">
                  <span>Page {page}</span>
                  <span className="text-gray-400">of</span>
                  <span>{totalPages}</span>
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;